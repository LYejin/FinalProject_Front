import React, { useState } from "react";
import { useForm } from 'react-hook-form';
import { Form, Row, Col } from "react-bootstrap";
import axios from "axios";



const CompanyInputBox = ({formData}) => {
  const { register, handleSubmit, setValue, reset } = useForm();

  const labels = {
    CO_CD: "회사코드",
    USE_YN: "사용여부",
    CO_NM: "회사명",
    CO_NMK: "회사약칭",
    BUSINESS: "업태",
    JONGMOK: "종목",
    REG_NB: "사업자번호",
    CEO_NM: "대표자명",
    HO_FAX: "대표자팩스",
    CEO_TEL: "대표자전화번호",
    PPL_NB: "대표자주민번호",
    HO_ZIP: "본점우편번호",
    HO_ADDR: "본점주소",
    HO_ADDR1: "본점번지",
    CO_FG: "회사구분",
    CO_NB: "법인드록번호",
    EST_DT: "설립일",
    OPEN_DT: "개업일",
    CLOSE_DT: "폐업일",
    ACCT_FG: "회사계정유형",
    PIC_FILE_ID: "사진 업로드",
  };

  const ACCT_FG_OP = ['일반 의료기관', '일반비열리', '학교(교비)', '산학협력단'];
  const CO_FG_OP = ['개인', '법인'];
  const [selectedImage, setSelectedImage] = useState();
  const [ch_formData, setChFormData] = useState({});

  React.useEffect(() => {

    if(formData){
    console.log("마운틴",formData);
    setSelectedImage(formData.pic_FILE_ID);

    const uppercaseFormData = {};
    for (const key in formData) {
      const uppercaseKey = key.toUpperCase();
      uppercaseFormData[uppercaseKey] = formData[key];
      setValue(uppercaseKey, formData[key]);
    }
    console.log("qudrud",formData);
  }
  }, [formData]);

  //이미지 데이터 인코딩 
  //base64 = 이미지URL을 문자형으로 
  //Blob = base64를 정수형 베열형태 => 원시 데이터로 
  const blobToByteArray = blob => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        console.log("로그");
        const base64Data = reader.result
        //const byteArray = new Uint8Array(base64Data);
        resolve(base64Data);
      };
      reader.onerror = reject;
      //reader.readAsArrayBuffer(blob);   //BLOB형으로 변환
      reader.readAsDataURL(blob);//base64형으로 변환
    });
  };
 
  const handleImageChange = async (e) => {
    setSelectedImage('');
    const imageFile = await blobToByteArray(e.target.files[0]);
    if (imageFile) {
      setSelectedImage((imageFile)); // 선택한 이미지 파일의 URL로 업데이트
    }
  };
  const asyncRequest = async (url, methodType, data, headers) => {
  
    const cookies= document.cookie
    const token = cookies.split("=")[1];
    try {
      const response = await axios({
        method: methodType,
        url: url,
        data: data,
        withCredentials: true,

        headers: { Authorization: token, headers },
      });

      console.log('가져온 값', response.data);
      return response;
    } catch (e) {
      console.log(e);
      throw e;
    }
  };

  const onSubmit = async (empdata) => {
    console.log(empdata);
    console.log(selectedImage);
    
    try {
      const n_formData = new FormData();
      for (const key in empdata) {
        n_formData.append(key, empdata[key]);
      }
      if (selectedImage) {
        const imageByteArray = selectedImage
        console.log("이미지",imageByteArray);
        n_formData.append("PIC_FILE_ID", imageByteArray);
      }

      console.log("전달데이터",n_formData);
      for (let pair of n_formData.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
      }
      

      const response = await asyncRequest(
        "system/admin/groupManage/CompanyInsert" ,
        "post",
        n_formData,
        {"Content-Type": "multipart/form-data"}, // 이부분 코드 확인하기
      );
      console.log("전달된:",response.data);
    } catch (error) {
      console.error("데이터 전송 실패:", error);
    }
  };

  const onChangeInput = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    setChFormData((prevChFormData) => ({
      ...prevChFormData,
      [fieldName]: fieldValue,
    }));
  };
  
 
  const updateBtnClick = async () => {
      if(ch_formData.PIC_FILE_ID !== ""){
        ch_formData.PIC_FILE_ID = selectedImage;
      }
      console.log(ch_formData.PIC_FILE_ID);
      setChFormData((prevChFormData) => ({
        ...prevChFormData,
        CO_CD : formData.co_CD,
      }));

      try {
        const response = await asyncRequest("system/admin/groupManage/CompanyUpdate", "put", ch_formData, {"Content-Type": "multipart/form-data"})
        console.log(response.data);
      } catch (error) {
        console.log(error);        
      }
      console.log(ch_formData);
  }

  const removeBtnClick = async () => {
    reset();
    const CO_CD = formData.co_CD;
    try {
      const response = await asyncRequest("system/admin/groupManage/CompanyRemove/"+CO_CD, "put")
      console.log(response.data);
    } catch (error) {
      console.log(error);        
    }    

}

  const inputFields = Object.keys(labels).map((key) => {
    if (key === "USE_YN") {
      return (
        <Form.Group key={key}>
          <Form.Label>{labels[key]}</Form.Label>
          <Form.Check
            type="radio"
            label="사용"
            name={key}
            value="1"
            {...register(key)}
          />
          <Form.Check
            type="radio"
            label="미사용"
            name={key}
            value="0"
            {...register(key)}
          />
        </Form.Group>
      );
    } else if (key === "CO_FG" || key === "ACCT_FG") {
      const options = key === "CO_FG" ? CO_FG_OP : ACCT_FG_OP;
      return (
        <Form.Group key={key}>
          <Form.Label>{labels[key]}</Form.Label>
          <Form.Control as="select" name={key} {...register(key)} className="form-control-sm">
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
      );
    } else if (key === "EST_DT" || key === "OPEN_DT" || key === "CLOSE_DT") {
      return (
        <Form.Group key={key}>
          <Form.Label>{labels[key]}</Form.Label>
          <Form.Control type="date" name={key} {...register(key)} className="form-control-sm" />
        </Form.Group>
      );
    } else if (key === "PIC_FILE_ID") {
      return (
        <Form.Group key={key}>
          <Form.Label>{labels[key]}</Form.Label>
          <input
            type="file"
            id="imageInput"
            name={key}
            onChange={handleImageChange} // 이미지 변경 핸들러 추가
            className="form-control-sm"
          />
          {selectedImage && (
              <img
              src={ selectedImage}
              alt="Company Logo" // 또는 "Company Profile Picture"
              style={{ maxWidth: "100%", marginTop: "10px" }}
            />
          )}
        </Form.Group>
      );
    } else {
      return (
        <Form.Group key={key}>
          <Form.Label>{labels[key]}</Form.Label>
          <Form.Control type="text" name={key} {...register(key)} className="form-control-sm" />
        </Form.Group>
      );
    }
  });

  return (
    <div className="company-form">
      <h2>[기본정보]</h2>
      <hr />
      <Form onChange={onChangeInput} onSubmit={handleSubmit(onSubmit)}>
        <Row className="grid-container">
          <Col sm={4}>{inputFields.slice(0, Math.ceil(inputFields.length / 2))}</Col>
          <Col sm={4}>{inputFields.slice(Math.ceil(inputFields.length / 2))}</Col>
        </Row>
        <input type="submit" value={"추가하기"} className="mx-4" />
        <input type="button" value={"수정하기"} className="mx-4" onClick={updateBtnClick}/>
        <input type="button" value={"삭제하기"} onClick={removeBtnClick}/>
      </Form>
    </div>
  );
};

export default CompanyInputBox;

