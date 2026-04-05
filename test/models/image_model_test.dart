import 'package:saavn_play/src/models/image_model.dart';
import 'package:test/test.dart';

void main() {
  group('ImageModel Tests', () {
    test('should create image model from JSON', () {
      final json = {
        'quality': '500x500',
        'link': 'https://example.com/image_500.jpg',
        'width': 500,
        'height': 500,
        'isDefault': true,
      };

      final imageModel = ImageModel.fromJson(json);

      expect(imageModel.quality, equals('500x500'));
      expect(imageModel.link, equals('https://example.com/image_500.jpg'));
      expect(imageModel.width, equals(500));
      expect(imageModel.height, equals(500));
      expect(imageModel.isDefault, isTrue);
    });

    test('should create image model with minimal JSON', () {
      final json = {
        'quality': '150x150',
        'link': 'https://example.com/image_150.jpg',
      };

      final imageModel = ImageModel.fromJson(json);

      expect(imageModel.quality, equals('150x150'));
      expect(imageModel.link, equals('https://example.com/image_150.jpg'));
      expect(imageModel.width, isNull);
      expect(imageModel.height, isNull);
      expect(imageModel.isDefault, isFalse);
    });

    test('should convert image model to JSON', () {
      final imageModel = ImageModel(
        quality: '150x150',
        link: 'https://example.com/image_150.jpg',
        width: 150,
        height: 150,
        isDefault: false,
      );

      final json = imageModel.toJson();

      expect(json['quality'], equals('150x150'));
      expect(json['link'], equals('https://example.com/image_150.jpg'));
      expect(json['width'], equals(150));
      expect(json['height'], equals(150));
      expect(json['isDefault'], isFalse);
    });

    test('should get size when both dimensions are available', () {
      final imageModel = ImageModel(
        quality: '500x500',
        link: 'https://example.com/image.jpg',
        width: 500,
        height: 500,
      );

      final size = imageModel.getSize();

      expect(size, isNotNull);
      expect(size!.width, equals(500));
      expect(size.height, equals(500));
    });

    test('should return null size when dimensions are missing', () {
      final imageModel = ImageModel(
        quality: '500x500',
        link: 'https://example.com/image.jpg',
      );

      final size = imageModel.getSize();

      expect(size, isNull);
    });

    test('should identify high resolution images', () {
      final highRes = ImageModel(
        quality: '1000x1000',
        link: 'https://example.com/image.jpg',
        width: 1000,
        height: 1000,
      );

      final mediumRes = ImageModel(
        quality: '300x300',
        link: 'https://example.com/image.jpg',
        width: 300,
        height: 300,
      );

      expect(highRes.isHighResolution(), isTrue);
      expect(mediumRes.isHighResolution(), isFalse);
    });

    test('should identify low resolution images', () {
      final lowRes = ImageModel(
        quality: '50x50',
        link: 'https://example.com/image.jpg',
        width: 50,
        height: 50,
      );

      final highRes = ImageModel(
        quality: '500x500',
        link: 'https://example.com/image.jpg',
        width: 500,
        height: 500,
      );

      expect(lowRes.isLowResolution(), isTrue);
      expect(highRes.isLowResolution(), isFalse);
    });

    test('should calculate aspect ratio', () {
      final squareImage = ImageModel(
        quality: '500x500',
        link: 'https://example.com/image.jpg',
        width: 500,
        height: 500,
      );

      final wideImage = ImageModel(
        quality: '1000x500',
        link: 'https://example.com/image.jpg',
        width: 1000,
        height: 500,
      );

      expect(squareImage.getAspectRatio(), equals(1.0));
      expect(wideImage.getAspectRatio(), equals(2.0));
    });

    test('should return null aspect ratio when height is zero', () {
      final imageModel = ImageModel(
        quality: '500x0',
        link: 'https://example.com/image.jpg',
        width: 500,
        height: 0,
      );

      expect(imageModel.getAspectRatio(), isNull);
    });

    test('should return null aspect ratio when dimensions are missing', () {
      final imageModel = ImageModel(
        quality: '500x500',
        link: 'https://example.com/image.jpg',
      );

      expect(imageModel.getAspectRatio(), isNull);
    });
  });

  group('Size Tests', () {
    test('should create size object', () {
      final size = Size(500, 300);

      expect(size.width, equals(500));
      expect(size.height, equals(300));
    });

    test('should convert size to string', () {
      final size = Size(500, 300);

      expect(size.toString(), equals('Size(500x300)'));
    });
  });
}