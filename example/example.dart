import 'package:saavn_play/src/saavn_play.dart';

void main(List<String> args) async {
  final client = SaavnPlayClient();

  final results = await client.search.songs('Imagine Dragons');

  for (var song in results.results) {
    print('${song.name} by ${song.primaryArtists}');
    print(
      'Stream URLs: ${song.downloadUrl?.map((e) => '${e.quality}: ${e.link}').join('\n')}',
    );
    print('=============================');
  }
}
