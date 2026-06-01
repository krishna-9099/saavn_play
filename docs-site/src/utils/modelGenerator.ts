interface ClassDefinition {
    name: string;
    fields: FieldDefinition[];
}

interface FieldDefinition {
    name: string;
    type: string;
    jsonKey: string | null;
    isNullable: boolean;
    isList: boolean;
    isNested: boolean;
    nestedClassName?: string;
}

const PRIMITIVE_TYPE_MAP: Record<string, string> = {
    string: 'String',
    number: 'num',
    boolean: 'bool',
};

function toPascalCase(str: string): string {
    return str
        .replace(/[-_\s]+(.)?/g, (_, c: string | undefined) => (c ? c.toUpperCase() : ''))
        .replace(/^(.)/, (_, c: string) => c.toUpperCase());
}

function toCamelCase(str: string): string {
    const pascal = toPascalCase(str);
    return pascal.charAt(0).toLowerCase() + pascal.slice(1);
}

function isSnakeCase(str: string): boolean {
    return str.includes('_') && str === str.toLowerCase();
}

function inferType(value: unknown, fieldName: string, classes: ClassDefinition[]): string {
    if (value === null || value === undefined) {
        return 'dynamic';
    }

    if (Array.isArray(value)) {
        if (value.length === 0) return 'List<dynamic>';
        const elementType = inferType(value[0], fieldName, classes);
        return `List<${elementType}>`;
    }

    if (typeof value === 'object') {
        const className = toPascalCase(fieldName);
        if (!classes.some((c) => c.name === className)) {
            const fields = analyzeObject(value as Record<string, unknown>, classes);
            classes.push({ name: className, fields });
        }
        return className;
    }

    if (typeof value === 'number') {
        return Number.isInteger(value) ? 'int' : 'double';
    }

    return PRIMITIVE_TYPE_MAP[typeof value] || 'dynamic';
}

function analyzeObject(obj: Record<string, unknown>, classes: ClassDefinition[]): FieldDefinition[] {
    const fields: FieldDefinition[] = [];

    for (const [key, value] of Object.entries(obj)) {
        const camelName = toCamelCase(key);
        const needsJsonKey = isSnakeCase(key) && camelName !== key;

        if (value === null || value === undefined) {
            fields.push({
                name: camelName,
                type: 'dynamic',
                jsonKey: needsJsonKey ? key : null,
                isNullable: true,
                isList: false,
                isNested: false,
            });
            continue;
        }

        if (Array.isArray(value)) {
            if (value.length > 0 && typeof value[0] === 'object' && value[0] !== null) {
                const nestedClassName = toPascalCase(key);
                if (!classes.some((c) => c.name === nestedClassName)) {
                    const nestedFields = analyzeObject(value[0] as Record<string, unknown>, classes);
                    classes.push({ name: nestedClassName, fields: nestedFields });
                }
                fields.push({
                    name: camelName,
                    type: `List<${nestedClassName}>`,
                    jsonKey: needsJsonKey ? key : null,
                    isNullable: false,
                    isList: true,
                    isNested: true,
                    nestedClassName,
                });
            } else {
                const elementType = value.length > 0 ? inferType(value[0], key, classes) : 'dynamic';
                fields.push({
                    name: camelName,
                    type: `List<${elementType}>`,
                    jsonKey: needsJsonKey ? key : null,
                    isNullable: false,
                    isList: true,
                    isNested: false,
                });
            }
            continue;
        }

        if (typeof value === 'object') {
            const nestedClassName = toPascalCase(key);
            if (!classes.some((c) => c.name === nestedClassName)) {
                const nestedFields = analyzeObject(value as Record<string, unknown>, classes);
                classes.push({ name: nestedClassName, fields: nestedFields });
            }
            fields.push({
                name: camelName,
                type: nestedClassName,
                jsonKey: needsJsonKey ? key : null,
                isNullable: false,
                isList: false,
                isNested: true,
                nestedClassName,
            });
            continue;
        }

        const type = inferType(value, key, classes);
        fields.push({
            name: camelName,
            type,
            jsonKey: needsJsonKey ? key : null,
            isNullable: false,
            isList: false,
            isNested: false,
        });
    }

    return fields;
}

function generateClassCode(classDef: ClassDefinition): string {
    const lines: string[] = [];

    lines.push(`@JsonSerializable()`);
    lines.push(`class ${classDef.name} {`);

    for (const field of classDef.fields) {
        if (field.jsonKey) {
            lines.push(`  @JsonKey(name: '${field.jsonKey}')`);
        }
        const nullableSuffix = field.isNullable ? '?' : '';
        lines.push(`  final ${field.type}${nullableSuffix} ${field.name};`);
    }

    lines.push('');
    lines.push(`  ${classDef.name}({`);

    for (const field of classDef.fields) {
        if (field.isNullable) {
            lines.push(`    this.${field.name},`);
        } else {
            lines.push(`    required this.${field.name},`);
        }
    }

    lines.push(`  });`);

    lines.push('');
    lines.push(`  factory ${classDef.name}.fromJson(Map<String, dynamic> json) =>`);
    lines.push(`      _\$${classDef.name}FromJson(json);`);

    lines.push('');
    lines.push(`  Map<String, dynamic> toJson() => _\$${classDef.name}ToJson(this);`);

    lines.push(`}`);

    return lines.join('\n');
}

export function generateDartModel(json: unknown, rootClassName: string): string {
    if (!json || typeof json !== 'object') {
        return '// Invalid JSON input';
    }

    const classes: ClassDefinition[] = [];

    const rootFields = analyzeObject(json as Record<string, unknown>, classes);
    const rootClass: ClassDefinition = {
        name: toPascalCase(rootClassName),
        fields: rootFields,
    };

    const allClasses = [rootClass, ...classes];

    const parts: string[] = [];
    parts.push(`import 'package:json_annotation/json_annotation.dart';`);
    parts.push('');

    const partFileName = `${toCamelCase(rootClassName)}.g.dart`;
    parts.push(`part '${partFileName}';`);
    parts.push('');

    for (let i = 0; i < allClasses.length; i++) {
        if (i > 0) parts.push('');
        parts.push(generateClassCode(allClasses[i]));
    }

    return parts.join('\n');
}

export function generateClassNameFromEndpoint(endpoint: string): string {
    const parts = endpoint
        .replace(/[^a-zA-Z0-9]/g, ' ')
        .trim()
        .split(/\s+/);

    const meaningful = parts.filter((p) => p.length > 2);
    if (meaningful.length === 0) return 'ApiResponse';

    return toPascalCase(meaningful.join(' ') + ' Response');
}
