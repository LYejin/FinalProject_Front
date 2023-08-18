import { useEffect, useState } from "react";
import { API_URL } from "../axios/constants";
import axios from "axios";
import { authAxiosInstance } from "../axios/axiosInstance";

const useGetEmpList = (estimateId, type) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(async () => {
    await authAxiosInstance("system/user/groupManage/employee/getList", {})
      .then((response) => {
        console.log(response);
        setData(response);
      })
      .finally(() => {
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError(true);
      });
  }, []);

  return { data, error, isLoading };
};

export default useGetEmpList;
