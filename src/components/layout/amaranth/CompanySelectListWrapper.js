import React, { useState } from "react";
import axios from "../../../../node_modules/axios/index";
import CompanyBoxItem from "./CompanyBoxItem";


const CompanySelectListWrapper = ({ width, title, dataCount, data, formData,formDataSet }) => {
  const selectListWrapper = {
    position: "relative",
    width: width,
    height: "100%",
    border: "1px solid #ebebeb",
  }; 
  const [listData, listDataSet] = useState()
  const asyncRequest = async (url, methodType, data, headers) => {
    const cookies= document.cookie
    const token = cookies.split("=")[1];
    try {
      const response = await axios({
        method: methodType,
        url: url,
        data: data,
        withCredentials: true,
        headers: { Authorization: token },
      });
      console.log(response.data);
      
      return response;
    } catch (e) {
      console.log(e);
      throw e;
    }
  };
  const clickEmp = async (co_CD) => {
    const empData = ''
    try {
      const empData = await asyncRequest("system/admin/groupManage/CompanyDetail/" + co_CD, 'get');
      formDataSet(empData.data);
    } catch (error) {
      console.error(error);
    }
    return empData;
  };

  const clickAddBtn= () => {
    console.log("안녕".formData);
    formDataSet(prevFormData => ({ 
      ...prevFormData, 
      acct_FG:"" ,
      business:"" ,
      ceo_NM: "",
      ceo_TEL:"" ,
      close_DT: "",
      co_CD: "",
      co_FG: "",
      co_NB: "",
      co_NM: "",
      co_NMK: "",
      est_DT: "",
      ho_ADDR: "",
      ho_ADDR1: "",
      ho_FAX: "",
      ho_ZIP: "",
      jongmok: "",
      open_DT: "",
      pic_FILE_ID: "",
      ppl_NB: "",
      reg_NB: "",
      use_YN: "",
    }));
  }


  React.useEffect(() => {
   
    const fetchData = async () => {
      try {
        const response = await asyncRequest("system/admin/groupManage/CompanySelect", 'get');
        const first_formData = await asyncRequest("system/admin/groupManage/CompanyDetail/" + response.data[0].co_CD
        , 'get');

        //formSetting(response.data,first_formData.data )
        listDataSet(response.data);
        formDataSet(first_formData.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();

  },[])





  return (
    <div style={selectListWrapper}>
      <div className="listBoxHeader">
        <span className="listBoxtitle">{title}</span>
        <span className="listBoxDataCount">{dataCount}</span>건
        <span className="listBoxSort">정렬순</span>
      </div>
      <div className="listWrapper">
      {listData && listData.map((data) => (
        <CompanyBoxItem
          clickEmp = {clickEmp} 
          key={data.co_CD} // 각 항목의 고유한 키를 지정해주어야 합니다.
          leftTop={data.co_CD} // 데이터의 실제 필드 값을 사용하도록 수정
          rightBotton={data.co_FG} // 데이터의 실제 필드 값을 사용하도록 수정
          rightTop={data.co_NM} // 데이터의 실제 필드 값을 사용하도록 수정
          leftBottom={data.ceo_NM} // 데이터의 실제 필드 값을 사용하도록 수정
        />
      ))}
    </div>
      <div className="footerBox" onClick={clickAddBtn}>
        <i class="fa-solid fa-circle-plus"></i>추가
      </div>
    </div>
    
  );
};


export default CompanySelectListWrapper;


