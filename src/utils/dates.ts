export const getYearDays = (year: number): string[] => {
  const days: string[] = [];
  const startDate = new Date(year, 0, 1);
  const endDate = new Date(year, 11, 31);

  const currentDate = new Date(startDate);
  while (currentDate <= endDate) {
    days.push(formatDate(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return days;
};

export const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

export const formatDisplayDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
};

export const getMonthName = (monthIndex: number): string => {
  const date = new Date(2024, monthIndex, 1);
  return date.toLocaleDateString('en-US', { month: 'short' });
};

export const isToday = (dateString: string): boolean => {
  return dateString === formatDate(new Date());
};

export const isFuture = (dateString: string): boolean => {
  const today = formatDate(new Date());
  return dateString > today;
};
