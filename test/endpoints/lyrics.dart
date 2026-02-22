import 'package:saavn_play/saavn_play.dart';
import 'package:saavn_play/src/endpoints/lyrics.dart';
import 'package:test/test.dart';

void main(List<String> args) {
  final lyrics = LyricsEndpoint();

  group("Lyrics Endpoint => ", () {
    test("Get lyrics by song Id", () async {
      final res = await lyrics.get("oYiQ9Bqa");

      expect(res, isA<LyricsResponse>());
    });
  });
}
