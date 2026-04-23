export const formatTitle = (title: string): string => {
  return title;
};

export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};
