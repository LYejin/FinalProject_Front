import React from "react";
import { TextFieldBox } from "../../../common/Index";
import DataPickerBox from "../../../common/box/DataPickerBox";

const EmpInfoBox = ({ detailEmpInfo }) => {
  console.log(detailEmpInfo);
  return (
    <table class="table table-bordered">
      <tbody>
        <tr>
          <th scope="row">사진</th>
          <td>kkkkkkkk</td>
        </tr>
        <tr>
          <th scope="row">이름</th>
          <td colSpan="3">
            <TextFieldBox width={"100%"} value={detailEmpInfo.kor_NM} />
          </td>
        </tr>
        <tr>
          <th scope="row">로그인 ID</th>
          <td>
            <TextFieldBox width={"100%"} value={detailEmpInfo.username} />
          </td>
          <th>메일 ID</th>
          <td>
            <TextFieldBox width={"100%"} value={detailEmpInfo.email_ADD} />
          </td>
        </tr>
        <tr>
          <th scope="row">로그인 비밀번호</th>
          <td>
            <TextFieldBox width={"100%"} />
          </td>
          <th>결재 비밀번호</th>
          <td>
            <TextFieldBox width={"100%"} />
          </td>
        </tr>
        <tr>
          <th scope="row">성별</th>
          <td>{/* 성별 */}</td>
        </tr>
        <tr>
          <th scope="row">개인메일</th>
          <td colSpan="3">
            <TextFieldBox width={"155px"} value={detailEmpInfo.personal_MAIL} />
            @
            <TextFieldBox
              width={"155px"}
              value={detailEmpInfo.personal_MAIL_CP}
            />
          </td>
        </tr>
        <tr>
          <th scope="row">급여메일</th>
          <td colSpan="3">
            <TextFieldBox width={"155px"} value={detailEmpInfo.salary_MAIL} />@
            <TextFieldBox
              width={"155px"}
              value={detailEmpInfo.salary_MAIL_CP}
            />
          </td>
        </tr>
        <tr>
          <th scope="row">휴대전화</th>
          <td>
            <TextFieldBox width={"100%"} value={detailEmpInfo.tel} />
          </td>
          <th>전화번호(집)</th>
          <td>
            <TextFieldBox width={"100%"} value={detailEmpInfo.home_TEL} />
          </td>
        </tr>
        <tr>
          <th scope="row">주소</th>
          <td></td>
        </tr>
        <tr>
          <th scope="row">최소 입사일</th>
          <td>
            <DataPickerBox joinTime={detailEmpInfo.join_DT} />
          </td>
          <th>최종 퇴사일</th>
          <td></td>
        </tr>
      </tbody>
    </table>
  );
};

export default EmpInfoBox;
