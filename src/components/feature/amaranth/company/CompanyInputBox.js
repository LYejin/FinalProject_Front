    import React, { useRef, useState } from "react";
    import { useForm } from 'react-hook-form';
    import { Form, Row, Col } from "react-bootstrap";
    import { Button, TextFieldBox } from "../../../common/Index";
    import DatePicker from "react-datepicker";
    import "react-datepicker/dist/react-datepicker.css";
    import "./CompanyInputBox.css"
    import axios from "axios";
    import { getNowJoinTime } from "../../../../util/time";



    const CompanyInputBox = ({formData}) => {
    const { register, handleSubmit, setValue, getValues, reset } = useForm();

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

    const ACCT_FG_OP = ['일반 의료기관', '일반비영리', '학교(교비)', '산학협력단'];
    const CO_FG_OP = ['개인', '법인'];
    const [selectedImage, setSelectedImage] = useState();
    const [ch_formData, setChFormData] = useState({});
    const up_FormData = useRef(); //{ EST_DT: "", OPEN_DT: "", CLOSE_DT: "" }
    const [selectedDate, setSelectedDate] = useState();

    const handleDateChange = (key, date) => {
       
            // if(formData["co_CD"] || getValues("CO_CD")){
            //      setSelectedDate((prevState) => ({
            //         ...prevState,
            //         [key]: date
            //         }));
            // }else if(!formData["co_CD"]){
            //     console.log("sdvnsdnovonsidvonsdiv");
            //     setSelectedDate({ EST_DT: "", OPEN_DT: "", CLOSE_DT: "" });
            // }
            console.log(selectedDate);
            setSelectedDate((prevState) => ({
                ...prevState,
                [key]: date
                }));
       
    };
    React.useEffect(() => {
        

        if(formData){
        console.log("마운틴",formData);
        setSelectedImage(formData.pic_FILE_ID);
    
        for (const key in formData) {
        const uppercaseKey = key.toUpperCase();
        up_FormData[uppercaseKey] = formData[key];
        setValue(uppercaseKey, formData[key]);
        }
        console.log("qudrud",getValues());
        setSelectedDate(getValues());//
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
        let inputElement = null;
    
        if (key === "USE_YN") {
        inputElement = (
            <div>
            <label>
                <input type="radio" value="1" {...register(key)} />
                사용
            </label>
            <label>
                <input type="radio" value="0" {...register(key)} />
                미사용
            </label>
            </div>
        );
        } else if (key === "CO_FG" || key === "ACCT_FG") {
        const options = key === "CO_FG" ? CO_FG_OP : ACCT_FG_OP;
        inputElement = (
            <select name={key} {...register(key)}>
            {options.map((option) => (
                <option key={option} value={option}>
                {option}
                </option>
            ))}
            </select>
        );
        } else if (key === "EST_DT" || key === "OPEN_DT" || key === "CLOSE_DT") {

        const modifiedKey = key.split('_')[0].toLowerCase()+"_DT";
        const selectedDateValue = selectedDate && selectedDate[key] ?  new Date(selectedDate[key]) : null;
        const formDataModifiedDate = formData && formData[modifiedKey] ? new Date(formData[modifiedKey]) : null;
        
        inputElement = (
            <DatePicker
                selected={selectedDateValue} 
            onChange={(date) => {
                handleDateChange(key, getNowJoinTime(date))
                setValue(key, date);
            }
            }
            dateFormat="yyyy-MM-dd"
            
            />
        );
        } else if (key === "PIC_FILE_ID") {
        inputElement = (
            <div>
            <input type="file" id="imageInput" name={key} onChange={handleImageChange} />
            {selectedImage && (
                <img
                src={selectedImage}
                alt="Company Logo"
                style={{ maxWidth: "100%", marginTop: "10px" }}
                />
            )}
            </div>
        );
        } else {
        inputElement = (
            <input type="text" name={key} className="companyReqInputStyle" {...register(key)} />
        );
        }
    
        return {
        key,
        label: labels[key],
        input: inputElement,
        };
    });

    return (
        <div className="company-form">
        <hr />
        <form onChange={onChangeInput} onSubmit={handleSubmit(onSubmit)}>
            <table className="tableStyle">
            <tbody>
                {inputFields.map((field, index) => {
                if (index % 2 === 0) {
                    return (
                    <tr key={field.key}>
                        <th className="headerCellStyle">{field.label}</th>
                        <td className="cellStyle">{field.input}</td>
                        {index + 1 < inputFields.length && (
                        <React.Fragment>
                            <th className="headerCellStyle">
                            {inputFields[index + 1].label}
                            </th>
                            <td className="cellStyle">
                            {inputFields[index + 1].input}
                            </td>
                        </React.Fragment>
                        )}
                    </tr>
                    );
                }
                return null;
                })}
            </tbody>
            </table>
            <div className="button-container">
            <button type="submit" className="action-button">
                추가하기
            </button>
            <button type="button" className="action-button" onClick={updateBtnClick}>
                수정하기
            </button>
            <button type="button" className="action-button" onClick={removeBtnClick}>
                삭제하기
            </button>
            </div>
        </form>
        </div>
    );
    };


    export default CompanyInputBox;
