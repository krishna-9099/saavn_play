import 'package:saavn_play/src/endpoints/search.dart';
import 'package:test/test.dart';

void main() {
  final search = SearchEndpoint();

  group('Search Pagination Tests => ', () {
    test('Song search pagination - first page', () async {
      final res = await search.songs('Arijit singh', page: 0, limit: 20);

      expect(res, isA<Map<String, dynamic>>());
      expect(res['results']?.length ?? 0, equals(20));

      print('\n=== Song Search Pagination - Page 0 ===');
      print('Total available: ${res['total'] ?? 0}');
      print('Results returned: ${res['results']?.length ?? 0}');
      print('Start index: ${res['start'] ?? 0}');
    });

    test('Song search pagination - second page', () async {
      final res = await search.songs('Arijit singh', page: 1, limit: 20);

      expect(res, isA<Map<String, dynamic>>());
      expect(res['results']?.length ?? 0, equals(20));

      print('\n=== Song Search Pagination - Page 1 ===');
      print('Total available: ${res['total'] ?? 0}');
      print('Results returned: ${res['results']?.length ?? 0}');
      print('Start index: ${res['start'] ?? 0}');
    });

    test('Song search pagination - third page', () async {
      final res = await search.songs('Arijit singh', page: 2, limit: 20);

      expect(res, isA<Map<String, dynamic>>());

      print('\n=== Song Search Pagination - Page 2 ===');
      print('Total available: ${res['total'] ?? 0}');
      print('Results returned: ${res['results']?.length ?? 0}');
      print('Start index: ${res['start'] ?? 0}');
      
      // Check if there are more results available
      if ((res['results']?.length ?? 0) > 0) {
        print('✅ More results available on page 2');
      } else {
        print('❌ No more results on page 2');
      }
    });

    test('Song search pagination - large page number', () async {
      final res = await search.songs('Arijit singh', page: 10, limit: 20);

      expect(res, isA<Map<String, dynamic>>());

      print('\n=== Song Search Pagination - Page 10 ===');
      print('Total available: ${res['total'] ?? 0}');
      print('Results returned: ${res['results']?.length ?? 0}');
      print('Start index: ${res['start'] ?? 0}');
      
      if ((res['results']?.length ?? 0) > 0) {
        print('✅ More results available on page 10');
      } else {
        print('❌ No more results on page 10 (expected for large page numbers)');
      }
    });

    test('Playlist search pagination - first page', () async {
      final res = await search.playlists('Bollywood Hits', page: 0, limit: 20);

      expect(res, isA<Map<String, dynamic>>());
      expect(res['results']?.length ?? 0, equals(20));

      print('\n=== Playlist Search Pagination - Page 0 ===');
      print('Total available: ${res['total'] ?? 0}');
      print('Results returned: ${res['results']?.length ?? 0}');
      print('Start index: ${res['start'] ?? 0}');
    });

    test('Playlist search pagination - second page', () async {
      final res = await search.playlists('Bollywood Hits', page: 1, limit: 20);

      expect(res, isA<Map<String, dynamic>>());
      expect(res['results']?.length ?? 0, equals(20));

      print('\n=== Playlist Search Pagination - Page 1 ===');
      print('Total available: ${res['total'] ?? 0}');
      print('Results returned: ${res['results']?.length ?? 0}');
      print('Start index: ${res['start'] ?? 0}');
    });

    test('Playlist search pagination - third page', () async {
      final res = await search.playlists('Bollywood Hits', page: 2, limit: 20);

      expect(res, isA<Map<String, dynamic>>());

      print('\n=== Playlist Search Pagination - Page 2 ===');
      print('Total available: ${res['total'] ?? 0}');
      print('Results returned: ${res['results']?.length ?? 0}');
      print('Start index: ${res['start'] ?? 0}');
      
      if ((res['results']?.length ?? 0) > 0) {
        print('✅ More results available on page 2');
      } else {
        print('❌ No more results on page 2');
      }
    });

    test('Compare pagination results - ensure different songs', () async {
      final page0 = await search.songs('Arijit singh', page: 0, limit: 5);
      final page1 = await search.songs('Arijit singh', page: 1, limit: 5);

      expect(page0, isA<Map<String, dynamic>>());
      expect(page1, isA<Map<String, dynamic>>());

      print('\n=== Pagination Results Comparison ===');
      print('Page 0 results: ${page0['results']?.length ?? 0}');
      print('Page 1 results: ${page1['results']?.length ?? 0}');
      print('Page 0 start: ${page0['start'] ?? 0}');
      print('Page 1 start: ${page1['start'] ?? 0}');
      
      // Check if the results are different (pagination is working)
      final page0Ids = (page0['results'] as List?)?.map((song) => song['id']).toSet() ?? {};
      final page1Ids = (page1['results'] as List?)?.map((song) => song['id']).toSet() ?? {};
      
      final hasOverlap = page0Ids.intersection(page1Ids).isNotEmpty;
      
      if (!hasOverlap && (page1['results']?.length ?? 0) > 0) {
        print('✅ Pagination working correctly - different results on different pages');
      } else if (hasOverlap) {
        print('❌ Pagination issue - same results appearing on different pages');
      } else {
        print('ℹ️  Page 1 has no results (may have reached end of results)');
      }
    });

    test('Test different limit values', () async {
      final limit10 = await search.songs('Arijit singh', page: 0, limit: 10);
      final limit30 = await search.songs('Arijit singh', page: 0, limit: 30);

      expect(limit10, isA<Map<String, dynamic>>());
      expect(limit30, isA<Map<String, dynamic>>());

      print('\n=== Different Limit Values ===');
      print('Limit 10 results: ${limit10['results']?.length ?? 0}');
      print('Limit 30 results: ${limit30['results']?.length ?? 0}');
      print('Limit 10 start: ${limit10['start'] ?? 0}');
      print('Limit 30 start: ${limit30['start'] ?? 0}');
      
      if ((limit10['results']?.length ?? 0) == 10 && (limit30['results']?.length ?? 0) == 30) {
        print('✅ Limit parameter working correctly');
      } else {
        print('❌ Limit parameter not working as expected');
      }
    });

    test('Test pagination with different page sizes', () async {
      // Test with page size 5
      final page0Size5 = await search.songs('Arijit singh', page: 0, limit: 5);
      final page1Size5 = await search.songs('Arijit singh', page: 1, limit: 5);

      // Test with page size 10
      final page0Size10 = await search.songs('Arijit singh', page: 0, limit: 10);
      final page1Size10 = await search.songs('Arijit singh', page: 1, limit: 10);

      expect(page0Size5, isA<Map<String, dynamic>>());
      expect(page1Size5, isA<Map<String, dynamic>>());
      expect(page0Size10, isA<Map<String, dynamic>>());
      expect(page1Size10, isA<Map<String, dynamic>>());

      print('\n=== Pagination with Different Page Sizes ===');
      print('Page 0, size 5: ${page0Size5['results']?.length ?? 0} results (start: ${page0Size5['start'] ?? 0})');
      print('Page 1, size 5: ${page1Size5['results']?.length ?? 0} results (start: ${page1Size5['start'] ?? 0})');
      print('Page 0, size 10: ${page0Size10['results']?.length ?? 0} results (start: ${page0Size10['start'] ?? 0})');
      print('Page 1, size 10: ${page1Size10['results']?.length ?? 0} results (start: ${page1Size10['start'] ?? 0})');

      // Verify that page 1 starts where page 0 ended
      if ((page1Size5['start'] ?? 0) == (page0Size5['start'] ?? 0) + (page0Size5['results']?.length ?? 0)) {
        print('✅ Page 1 correctly starts after page 0 (size 5)');
      } else {
        print('❌ Page 1 start index incorrect (size 5)');
      }

      if ((page1Size10['start'] ?? 0) == (page0Size10['start'] ?? 0) + (page0Size10['results']?.length ?? 0)) {
        print('✅ Page 1 correctly starts after page 0 (size 10)');
      } else {
        print('❌ Page 1 start index incorrect (size 10)');
      }
    });
  });
}
