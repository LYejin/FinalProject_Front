export const getCreateAtTime = data => {
  return (
    String(data.createAt).slice(0, 10) +
    " " +
    String(data.createAt).slice(11, 16)
  );
};
