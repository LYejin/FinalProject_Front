import { useEffect, useState } from "react";
import { authAxiosInstance } from "../axios/axsiosInstance";
import { API_URL } from "../axios/constants";
import axios from "axios";

const useEstimateList = (estimateId, type) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    authAxiosInstance(API_URL.estimate, {
      params: { id: estimateId, type: type },
    })
      .then(
        axios.spread((likeRes, careerRes, distanceRes) => {
          console.log(
            likeRes.data,
            careerRes.data.distanceRes.data,
            distanceRes.data
          );

          const response = {
            res1: likeRes.data,
            res2: careerRes.data.distanceRes.data,
            res3: distanceRes.data,
          };
          setData(response);
        })
      )
      .finally(() => {
        setIsLoading(false);
      })
      .catch(error => {
        console.log(error);
        setError(true);
      });
  }, []);

  return { data, error, isLoading };
};

export default useEstimateList;
