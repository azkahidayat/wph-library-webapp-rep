// export const formatDateTime = (date: string) => {
//   return new Intl.DateTimeFormat('id-ID', {
//     day: 'numeric',
//     month: 'short',
//     year: 'numeric',
//     hour: '2-digit',
//     minute: '2-digit',
//     hour12: false,
//   }).format(new Date(date));
// };

export const formatDateTime = (date: string) =>
  new Date(date).toLocaleString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

export const formatDate = (date: Date | undefined) => {
  if (!date) {
    return '';
  }
  return date.toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
};
