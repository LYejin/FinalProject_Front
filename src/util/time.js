export const getCreateAtTime = data => {
  return (
    String(data.createAt).slice(0, 10) +
    ' ' +
    String(data.createAt).slice(11, 16)
  );
};

export const getNowTime = () => {
  let now = new Date();
  let todayYear = now.getFullYear();
  let todayMonth = now.getMonth() + 1;
  let todayDate = now.getDate();
  return todayYear + '-' + todayMonth + '-' + todayDate;
};

export const getNowJoinTime = data => {
  let todayYear = data.getFullYear();
  let todayMonth =
    data.getMonth() / 10 === 1
      ? data.getMonth() + 1
      : '0' + (data.getMonth() + 1);
  let todayDate =
    data.getDate() / 10 >= 1 ? data.getDate() : '0' + data.getDate();
  return todayYear + '-' + todayMonth + '-' + todayDate;
};

export const getJoinTime = data => {
  return data.substr(0, 10);
};

export const parseDateString = dateString => {
  if (dateString) {
    const year = parseInt(dateString.substr(0, 4), 10);
    const month = parseInt(dateString.substr(4, 2), 10) - 1;
    const day = parseInt(dateString.substr(6, 2), 10);
    return new Date(year, month, day);
  }
  return null;
};

export const parseDateToString = date => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}${month}${day}`;
};

export const updateArray = (myArray, oldValue, newValue) => {
  if (!myArray instanceof Array) return;
  console.log(myArray);
  const index = myArray.indexOf(oldValue);
  if (index !== -1) {
    myArray[index] = newValue;
  }
};
