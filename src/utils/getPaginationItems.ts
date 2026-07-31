export type PaginationItem = number | '...';

export function getPaginationItems(
  currentPage: number,
  totalPages: number
): PaginationItem[] {
  // Semua halaman muat
  if (totalPages <= 3) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  // Halaman awal
  if (currentPage <= 2) {
    return [1, 2, 3, '...', totalPages];
  }

  // Halaman akhir
  if (currentPage >= totalPages - 1) {
    return [1, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  // Halaman tengah
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
}
