import 'dart:convert';

import 'package:dio/dio.dart';

/// API version configuration for JioSaavn API requests.
///
/// The JioSaavn API has multiple versions (v1-v6), with v6 being the latest.
/// Different endpoints may require different API versions.
enum ApiVersion {
  /// API version 1
  v1(1),

  /// API version 2
  v2(2),

  /// API version 3
  v3(3),

  /// API version 4 - used for some radio and featured content endpoints
  v4(4),

  /// API version 5
  v5(5),

  /// API version 6 - the latest and default version
  v6(6);

  /// The numeric value of the API version.
  final int value;

  const ApiVersion(this.value);
}

/// Base client class for making API requests to JioSaavn.
///
/// This abstract class provides the foundation for all endpoint classes.
/// It handles HTTP requests using Dio and manages API versioning.
///
/// Example:
/// ```dart
/// class MyEndpoint extends BaseClient {
///   Future<MyData> fetchData() async {
///     final response = await request(call: 'my.endpoint');
///     return MyData.fromJson(response);
///   }
/// }
/// ```
abstract class BaseClient {
  /// Optional Dio BaseOptions for custom configuration.
  final BaseOptions? options;

  /// The Dio HTTP client instance used for making requests.
  final Dio dio;

  /// Default API version to use for requests (defaults to v6).
  final ApiVersion defaultApiVersion;

  /// Creates a new [BaseClient] instance.
  ///
  /// [options] - Optional Dio configuration options.
  /// [defaultApiVersion] - The API version to use by default (defaults to v6).
  BaseClient([this.options, this.defaultApiVersion = ApiVersion.v6])
      : dio = Dio(
          options ??
              BaseOptions(
                baseUrl: 'https://www.jiosaavn.com/api.php',
                queryParameters: {
                  '_format': 'json',
                  '_marker': '0',
                  'ctx': 'web6dot0',
                },
                responseType: ResponseType.plain,
              ),
        );

  /// Makes an API request to the JioSaavn API.
  ///
  /// [call] - The API endpoint to call (use [endpoints] from collection/endpoints.dart).
  /// [apiVersion] - Override the default API version for this request.
  /// [isAPIv4] - Legacy parameter (deprecated, use [apiVersion] instead).
  /// [language] - The language for the request (defaults to 'english').
  /// [queryParameters] - Additional query parameters for the request.
  ///
  /// Returns the parsed JSON response as a Map.
  ///
  /// Example:
  /// ```dart
  /// final response = await request(
  ///   call: 'search.getResults',
  ///   queryParameters: {'q': 'Imagine Dragons'},
  /// );
  /// ```
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
      '/',
      queryParameters: {
        'api_version': version.value,
        '__call': call,
        ...?queryParameters,
      },
      options: Options(
        headers: {
          'cookie':
              'L=${Uri.encodeComponent(language)}; gdpr_acceptance=true; DL=english',
        },
      ),
    );

    return jsonDecode(res.data as String) as Map<String, dynamic>;
  }
}
