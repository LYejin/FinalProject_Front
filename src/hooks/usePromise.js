import { useState, useEffect, useCallback } from 'react';

// const [loading, response, error] = usePromise(() => {
//   const query = category === "all" ? "" : `&category=${category}`;
//   return axios.get(
//     `https://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=ae3df86896064a709c97f5898afccbc5`
//   );
// }, [category]);

//promiseCreator : 실제 비동기 동작용 함수
//dept : useEffect에서 종속된 변수들
export default function usePromise(promiseCreator, deps) {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const result = await promiseCreator();
      setResponse(result);
    } catch (e) {
      setError(e);
    }
    //서버에 요청한 자료가 로딩 완료되면 완료 설정
    setLoading(false);
  }, deps);

  useEffect(() => {
    try {
      setLoading(true);
      fetchData();
    } catch (e) {
      console.log(e);
    }
  }, deps);

  return [loading, response, error];
}
