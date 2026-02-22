class saavn_playResponse<T> {
  final String status;
  final String? message;
  final T? data;

  saavn_playResponse({required this.status, this.message, this.data});

  factory saavn_playResponse.fromJson(
    Map<String, dynamic> json,
    T Function(Object? json) dataFromJson,
  ) {
    return saavn_playResponse(
      status: json['status'],
      message: json['message'],
      data: dataFromJson(json['data']),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'status': status,
      'message': message,
      'data': (data as dynamic)?.toJson(),
    };
  }
}
