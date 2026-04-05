import 'package:saavn_play/src/models/download_url.dart';
import 'package:test/test.dart';

void main() {
  group('DownloadUrl Tests', () {
    test('should create download URL from JSON', () {
      final json = {
        'quality': '320kbps',
        'link': 'https://example.com/audio_320.mp3',
        'isDefault': true,
      };

      final downloadUrl = DownloadUrl.fromJson(json);

      expect(downloadUrl.quality, equals('320kbps'));
      expect(downloadUrl.link, equals('https://example.com/audio_320.mp3'));
      expect(downloadUrl.isDefault, isTrue);
    });

    test('should convert download URL to JSON', () {
      final downloadUrl = DownloadUrl(
        quality: '96kbps',
        link: 'https://example.com/audio_96.mp3',
        isDefault: false,
      );

      final json = downloadUrl.toJson();

      expect(json['quality'], equals('96kbps'));
      expect(json['link'], equals('https://example.com/audio_96.mp3'));
      expect(json['isDefault'], isFalse);
    });

    test('should extract bitrate from quality string', () {
      final downloadUrl = DownloadUrl(
        quality: '320kbps',
        link: 'https://example.com/audio.mp3',
      );

      expect(downloadUrl.getBitrate(), equals(320));
    });

    test('should return null for non-kbps quality string', () {
      final downloadUrl = DownloadUrl(
        quality: 'high',
        link: 'https://example.com/audio.mp3',
      );

      expect(downloadUrl.getBitrate(), isNull);
    });

    test('should identify high quality audio', () {
      final highQuality = DownloadUrl(
        quality: '320kbps',
        link: 'https://example.com/audio.mp3',
      );

      final lowQuality = DownloadUrl(
        quality: '96kbps',
        link: 'https://example.com/audio.mp3',
      );

      expect(highQuality.isHighQuality(), isTrue);
      expect(lowQuality.isHighQuality(), isFalse);
    });

    test('should identify low quality audio', () {
      final lowQuality = DownloadUrl(
        quality: '64kbps',
        link: 'https://example.com/audio.mp3',
      );

      final highQuality = DownloadUrl(
        quality: '320kbps',
        link: 'https://example.com/audio.mp3',
      );

      expect(lowQuality.isLowQuality(), isTrue);
      expect(highQuality.isLowQuality(), isFalse);
    });
  });
}