import 'package:dio/dio.dart';
import 'package:saavn_play/saavn_play.dart';

import 'package:saavn_play/src/client.dart';
import 'package:saavn_play/src/collection/endpoints.dart';
import 'package:saavn_play/src/utils/link.dart';

class LyricsEndpoint extends BaseClient {
  LyricsEndpoint([super.options]);

  Future<LyricsResponse> get(String songId) async {
    final response = await request(
      call: endpoints.lyrics,
      isAPIv4: true,
      queryParameters: {"lyrics_id": songId},
    );

    final lyricReq = LyricsRequest.fromJson(response);

    if (lyricReq.lyrics == null) {
      throw DioException(
        type: DioExceptionType.badResponse,
        error: "Lyrics not found for this song",
        requestOptions: RequestOptions(
          baseUrl: options?.baseUrl,
          queryParameters: options?.queryParameters,
          path: endpoints.lyrics,
        ),
      );
    }

    return LyricsResponse(
      copyright: lyricReq.lyricsCopyRight,
      snippet: lyricReq.snippet,
      lyrics: lyricReq.lyrics == null ? null : sanitizeLyrics(lyricReq.lyrics!),
    );
  }
}
