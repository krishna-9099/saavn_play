/// Pagination information for search responses.
///
/// Contains total count and starting index for paginated results.
/// Follows Single Responsibility Principle - handles only pagination logic.
class SearchPagination {
  /// Total number of results available.
  final int total;

  /// Starting index for the current page of results.
  final int start;

  SearchPagination({
    required this.total,
    required this.start,
  });

  /// Creates a SearchPagination from a JSON map.
  factory SearchPagination.fromJson(Map<String, dynamic> json) {
    return SearchPagination(
      total: json['total'] as int? ?? 0,
      start: json['start'] as int? ?? 0,
    );
  }

  /// Converts this instance to a JSON map.
  Map<String, dynamic> toJson() {
    return {
      'total': total,
      'start': start,
    };
  }
}