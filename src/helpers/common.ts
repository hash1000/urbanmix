// Select/Deselect options in checkbox list. Returns a list of selected options
export const getSelectedOptions = (options: string[], id: string) => {
  const newOptions = [...options];
  const index = newOptions.indexOf(id);

  if (index !== -1) newOptions.splice(index, 1);
  else newOptions.splice(newOptions.length, index, id);
  return newOptions;
};

export const convertFirebaseTimestamp = (timestamp: {
  seconds: number;
  nanoseconds: number;
}) => {
  if (timestamp) {
    const seconds = timestamp.seconds || 0;
    const nanoseconds = timestamp.nanoseconds || 0;
    const milliseconds = seconds * 1000 + nanoseconds / 1e6;

    // Convert to JavaScript Date object
    return new Date(milliseconds);
  }

  return null;
};
