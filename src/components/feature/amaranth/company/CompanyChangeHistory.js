import React from 'react';
import { useEffect } from 'react';
import { authAxiosInstance } from '../../../../axios/axiosInstance';

const CompanyChangeHistory = () => {
  React.useEffect(() => {
    const getList = async () => {
      const CH_CATEGORY = '회사';
      const response = await authAxiosInstance.get(
        'system/admin/groupManage/ChangeHistorySelect/' + CH_CATEGORY
      );
      console.log(response.data);
    };
    getList();
  });

  return (
    <div id="sectionG01" class="section section-grid">
      <div class="section-header">
        <div class="right">
          <button type="button" class="btn btn-default">
            Excel
          </button>
          <div class="btn-group">
            <button type="button" class="btn btn-default">
              선택 삭제
            </button>
            <button type="button" class="btn btn-default">
              선택 이동
            </button>
          </div>
          <button type="button" class="btn btn-default collapsible"></button>
        </div>
        <h3>테스트</h3>
      </div>
      <div class="section-body">
        <table id="tableG01" class="table table-striped table-hover">
          <colgroup>
            <col />
            <col />
            <col />
            <col />
            <col />
            <col />
            <col />
          </colgroup>
          <thead>
            <tr>
              <th>번호</th>
              <th>변경일시</th>
              <th>변경구분</th>
              <th>회사</th>
              <th>변경정보</th>
              <th>변경자(ID)</th>
              <th>변경자IP</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td align="center">번호#1</td>
              <td align="center">변경일시#1</td>
              <td align="center">변경구분#1</td>
              <td align="center">회사#1</td>
              <td align="center">변경정보#1</td>
              <td align="center">변경자(ID)#1</td>
              <td align="center">변경자IP#1</td>
            </tr>
            <tr>
              <td align="center">번호#2</td>
              <td align="center">변경일시#2</td>
              <td align="center">변경구분#2</td>
              <td align="center">회사#2</td>
              <td align="center">변경정보#2</td>
              <td align="center">변경자(ID)#2</td>
              <td align="center">변경자IP#2</td>
            </tr>
            <tr>
              <td align="center">번호#3</td>
              <td align="center">변경일시#3</td>
              <td align="center">변경구분#3</td>
              <td align="center">회사#3</td>
              <td align="center">변경정보#3</td>
              <td align="center">변경자(ID)#3</td>
              <td align="center">변경자IP#3</td>
            </tr>
            <tr>
              <td align="center">번호#4</td>
              <td align="center">변경일시#4</td>
              <td align="center">변경구분#4</td>
              <td align="center">회사#4</td>
              <td align="center">변경정보#4</td>
              <td align="center">변경자(ID)#4</td>
              <td align="center">변경자IP#4</td>
            </tr>
            <tr>
              <td align="center">번호#5</td>
              <td align="center">변경일시#5</td>
              <td align="center">변경구분#5</td>
              <td align="center">회사#5</td>
              <td align="center">변경정보#5</td>
              <td align="center">변경자(ID)#5</td>
              <td align="center">변경자IP#5</td>
            </tr>
          </tbody>
        </table>
        <div class="text-center">
          <div class="meta-pagination"></div>
        </div>
      </div>
      <div class="section-footer">
        <div class="left"></div>
        <div class="right"></div>
        <div class="center"></div>
      </div>
    </div>
  );
};

export default CompanyChangeHistory;
