export const getCreateAtTime = (data) => {
  return (
    String(data.createAt).slice(0, 10) +
    " " +
    String(data.createAt).slice(11, 16)
  );
};

export const getNowTime = () => {
  let now = new Date();
  let todayYear = now.getFullYear();
  let todayMonth = now.getMonth() + 1;
  let todayDate = now.getDate();
  return todayYear + "-" + todayMonth + "-" + todayDate;
};
