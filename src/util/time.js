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
  let todayDate = data.getDate();
  return todayYear + '-' + todayMonth + '-' + todayDate;
};

export const getJoinTime = data => {
  return data.substr(0, 10);
};

export const updateArray = (myArray, oldValue, newValue) => {
  if (!myArray instanceof Array) return;
  console.log(myArray);
  const index = myArray.indexOf(oldValue);
  if (index !== -1) {
    myArray[index] = newValue;
  }
};
