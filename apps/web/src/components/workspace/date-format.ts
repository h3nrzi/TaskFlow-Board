export const dayString = (value?: string) =>
  value
    ? new Date(`${value}T12:00:00`).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      })
    : 'No date';
