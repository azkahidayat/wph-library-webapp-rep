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

interface FormDateParams {
  date: Date | undefined | string;
  month?: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow';
}

export const formatDate = ({ date, month = 'long' }: FormDateParams) => {
  if (!date) {
    return '';
  }
  if (typeof date === 'string') {
    return new Date(date).toLocaleDateString('id-ID', {
      day: '2-digit',
      month: month,
      year: 'numeric',
    });
  }
  return date.toLocaleDateString('id-ID', {
    day: '2-digit',
    month: month,
    year: 'numeric',
  });
};
