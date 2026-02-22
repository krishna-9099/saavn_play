/// Generic response wrapper for API responses.
///
/// Contains the status, optional message, and optional data of type [T].
class SaavnPlayResponse<T> {
  /// The status of the response (e.g., "success" or "failure").
  final String status;

  /// Optional message providing additional information.
  final String? message;

  /// The response data, if available.
  final T? data;

  /// Creates a new [SaavnPlayResponse] instance.
  SaavnPlayResponse({required this.status, this.message, this.data});

  /// Creates a [SaavnPlayResponse] from a JSON map.
  ///
  /// [json] - The JSON map to parse.
  /// [dataFromJson] - A function to convert the data field to type [T].
  factory SaavnPlayResponse.fromJson(
    Map<String, dynamic> json,
    T Function(Object? json) dataFromJson,
  ) {
    return SaavnPlayResponse(
      status: json['status'],
      message: json['message'],
      data: dataFromJson(json['data']),
    );
  }

  /// Converts this response to a JSON map.
  Map<String, dynamic> toJson() {
    return {
      'status': status,
      'message': message,
      'data': (data as dynamic)?.toJson(),
    };
  }
}
