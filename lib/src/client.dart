import 'dart:convert';

import 'package:dio/dio.dart';

/// API version configuration
enum ApiVersion {
  v1(1),
  v2(2),
  v3(3),
  v4(4),
  v5(5),
  v6(6);

  final int value;
  const ApiVersion(this.value);
}

abstract class BaseClient {
  final BaseOptions? options;
  final Dio dio;

  /// Default API version to use for requests (defaults to v6)
  final ApiVersion defaultApiVersion;

  BaseClient([this.options, this.defaultApiVersion = ApiVersion.v6])
    : dio = Dio(
        options ??
            BaseOptions(
              baseUrl: 'https://www.saavn_play.com/api.php',
              queryParameters: {
                '_format': 'json',
                '_marker': '0',
                'ctx': 'web6dot0',
              },
              responseType: ResponseType.plain,
            ),
      );

  Future<Map<String, dynamic>> request({
    /// Use [endpoints] from [lib/collection/endpoints.dart]
    required String call,

    /// Override the default API version for this request
    ApiVersion? apiVersion,

    /// Legacy parameter - if true, uses v4 (deprecated, use apiVersion instead)
    @Deprecated('Use apiVersion parameter instead') bool isAPIv4 = false,

    String language = 'english',
    Map<String, dynamic>? queryParameters,
  }) async {
    // Determine API version: explicit parameter > isAPIv4 legacy > default
    final version = apiVersion ?? (isAPIv4 ? ApiVersion.v4 : defaultApiVersion);

    final res = await dio.get(
      "/",
      queryParameters: {
        'api_version': version.value,
        '__call': call,
        ...?queryParameters,
      },
      options: Options(
        headers: {
          "cookie":
              'L=${Uri.encodeComponent(language)}; gdpr_acceptance=true; DL=english',
        },
      ),
    );

    return jsonDecode(res.data as String) as Map<String, dynamic>;
  }
}
