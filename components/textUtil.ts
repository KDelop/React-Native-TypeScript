export const ellipsisText = (maxLength: number, text: string) => {
  if (text.length > maxLength) {
    return `${text.substr(0, maxLength)}...`;
  }
  return text;
};
