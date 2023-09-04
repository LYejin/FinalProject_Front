export const onChangePhoneNumber = tel => {
  // 정제된 숫자를 원하는 전화번호 형식으로 변환합니다.
  let formattedPhoneNumber = '';
  if (tel.length <= 3) {
    formattedPhoneNumber = tel;
  } else if (tel.length <= 7) {
    formattedPhoneNumber = `${tel.slice(0, 3)}-${tel.slice(3)}`;
  } else {
    formattedPhoneNumber = `${tel.slice(0, 3)}-${tel.slice(3, 7)}-${tel.slice(
      7,
      11
    )}`;
  }
  return formattedPhoneNumber;
};
