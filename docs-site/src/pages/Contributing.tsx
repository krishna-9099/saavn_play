import { Link } from 'react-router-dom';
import GlassCard from '../components/ui/GlassCard';
import CodeBlock from '../components/ui/CodeBlock';

const Contributing = () => {
  const forkCode = `# Clone your fork
git clone https://github.com/YOUR_USERNAME/saavn_play.git
cd saavn_play`;

  const branchCode = `# Create a feature branch
git checkout -b feature/amazing-feature`;

  const commitCode = `# Stage your changes
git add .

# Commit with a descriptive message
git commit -m "feat: add amazing feature"`;

  const pushCode = `# Push to your fork
git push origin feature/amazing-feature`;

  const testCode = `# Run all tests
dart test

# Run with coverage
dart test --coverage=coverage

# Analyze code
dart analyze`;

  const sections = [
    {
      id: 'how-to-contribute',
      title: 'How to Contribute',
      content: (
        <div className="space-y-4">
          <p className="text-gray-400">
            We welcome contributions from the community! Whether you're fixing a bug, adding a feature, or improving documentation, your help is appreciated.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: '🐛', title: 'Bug Reports', desc: 'Found a bug? Open an issue with reproduction steps.' },
              { icon: '✨', title: 'Feature Requests', desc: 'Have an idea? Suggest it in GitHub Discussions.' },
              { icon: '📝', title: 'Documentation', desc: 'Help improve docs, examples, or tutorials.' },
              { icon: '🔧', title: 'Code Contributions', desc: 'Submit PRs for bug fixes or new features.' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-lg bg-white/[0.03] border border-white/5">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <h4 className="font-semibold text-white mb-1">{item.title}</h4>
                  <p className="text-sm text-gray-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: 'development-setup',
      title: 'Development Setup',
      content: (
        <div className="space-y-4">
          <p className="text-gray-400">
            Follow these steps to set up your development environment:
          </p>

          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-white mb-2">1. Fork and Clone</h4>
              <p className="text-gray-400 text-sm mb-3">
                Fork the repository on GitHub, then clone your fork locally.
              </p>
              <CodeBlock code={forkCode} language="bash" />
            </div>

            <div>
              <h4 className="font-semibold text-white mb-2">2. Create a Branch</h4>
              <p className="text-gray-400 text-sm mb-3">
                Create a feature branch from the main branch.
              </p>
              <CodeBlock code={branchCode} language="bash" />
            </div>

            <div>
              <h4 className="font-semibold text-white mb-2">3. Install Dependencies</h4>
              <p className="text-gray-400 text-sm mb-3">
                Install Dart dependencies.
              </p>
              <CodeBlock code="dart pub get" language="bash" />
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'code-style',
      title: 'Code Style Guidelines',
      content: (
        <div className="space-y-4">
          <p className="text-gray-400">
            Follow these guidelines to maintain code quality:
          </p>

          <ul className="space-y-3">
            {[
              { title: 'Dart Style Guide', desc: 'Follow the official Dart style guide and Effective Dart guidelines.' },
              { title: 'Linting', desc: 'Use the provided analysis_options.yaml. Run `dart analyze` before committing.' },
              { title: 'Documentation', desc: 'Add dartdoc comments to all public APIs with clear descriptions.' },
              { title: 'Naming Conventions', desc: 'Use camelCase for variables/functions, PascalCase for classes.' },
              { title: 'Type Safety', desc: 'Leverage Dart\'s type system. Avoid dynamic types when possible.' },
              { title: 'Error Handling', desc: 'Use custom exceptions and provide meaningful error messages.' },
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-emerald-500 mt-1">✓</span>
                <div>
                  <span className="font-medium text-white">{item.title}:</span>{' '}
                  <span className="text-gray-400">{item.desc}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ),
    },
    {
      id: 'pull-request-process',
      title: 'Pull Request Process',
      content: (
        <div className="space-y-4">
          <p className="text-gray-400">
            Follow these steps to submit a pull request:
          </p>

          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-white mb-2">1. Make Your Changes</h4>
              <CodeBlock code={commitCode} language="bash" />
            </div>

            <div>
              <h4 className="font-semibold text-white mb-2">2. Run Tests</h4>
              <p className="text-gray-400 text-sm mb-3">
                Ensure all tests pass and code is analyzed.
              </p>
              <CodeBlock code={testCode} language="bash" />
            </div>

            <div>
              <h4 className="font-semibold text-white mb-2">3. Push Changes</h4>
              <CodeBlock code={pushCode} language="bash" />
            </div>

            <div>
              <h4 className="font-semibold text-white mb-2">4. Open a Pull Request</h4>
              <p className="text-gray-400 text-sm mb-3">
                Go to the original repository and open a PR. Include:
              </p>
              <ul className="space-y-2 ml-4">
                {[
                  'Clear description of changes',
                  'Reference any related issues',
                  'Screenshots for UI changes',
                  'Updated documentation if needed',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-400">
                    <span className="text-gray-600">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'commit-conventions',
      title: 'Commit Message Conventions',
      content: (
        <div className="space-y-4">
          <p className="text-gray-400">
            We follow Conventional Commits specification:
          </p>

          <div className="space-y-2">
            {[
              { prefix: 'feat:', desc: 'New feature' },
              { prefix: 'fix:', desc: 'Bug fix' },
              { prefix: 'docs:', desc: 'Documentation changes' },
              { prefix: 'style:', desc: 'Code style changes (formatting, etc.)' },
              { prefix: 'refactor:', desc: 'Code refactoring' },
              { prefix: 'test:', desc: 'Adding or updating tests' },
              { prefix: 'chore:', desc: 'Build process or tooling changes' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.03] border border-white/5">
                <code className="text-emerald-400 font-mono text-sm">{item.prefix}</code>
                <span className="text-gray-400">{item.desc}</span>
              </div>
            ))}
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-4">
          <span className="text-emerald-500">Contributing</span>
        </h1>
        <p className="text-gray-400 text-lg">
          Learn how to contribute to saavn_play and help make it better.
        </p>
      </div>

      {/* Quick Links */}
      <GlassCard className="p-6" hover={false}>
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-6 -m-6">
          <h3 className="text-lg font-semibold text-white mb-3">
            <span className="text-emerald-400">Quick Links</span>
          </h3>
          <div className="flex flex-wrap gap-4">
            <a
              href="https://github.com/krishna-9099/saavn_play/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              Open Issues
            </a>
            <a
              href="https://github.com/krishna-9099/saavn_play/pulls"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              Pull Requests
            </a>
            <Link to="/changelog" className="btn btn-secondary">
              Changelog
            </Link>
          </div>
        </div>
      </GlassCard>

      {/* Sections */}
      {sections.map((section) => (
        <GlassCard key={section.id} className="p-6">
          <h2 id={section.id} className="text-2xl font-bold text-white mb-4">
            <span className="text-emerald-500">{section.title}</span>
          </h2>
          {section.content}
        </GlassCard>
      ))}

      {/* Thank You */}
      <GlassCard className="p-6 text-center">
        <h3 className="text-xl font-bold text-white mb-2">Thank You!</h3>
        <p className="text-gray-400">
          Your contributions help make saavn_play better for everyone.
        </p>
      </GlassCard>
    </div>
  );
};

export default Contributing;
