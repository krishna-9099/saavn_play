import 'package:saavn_play/src/endpoints/search.dart';

void main(List<String> args) async {
  final search = SearchEndpoint();

  final results = await search.songs('Imagine Dragons');

  print('=== Search Results for "Imagine Dragons" ===');
  print('Total results: ${results['total'] ?? 0}');
  print('Results returned: ${results['results']?.length ?? 0}');
  print('');

  for (var song in results['results'] ?? []) {
    print('Song: ${song['song'] ?? song['title'] ?? song['name']}');
    print('Artists: ${song['primary_artists'] ?? song['singers'] ?? song['artist']}');
    print('Album: ${song['album'] ?? song['more_info']?['album']}');
    print('Duration: ${song['duration'] ?? song['more_info']?['duration']} seconds');
    print('=============================');
  }
}
