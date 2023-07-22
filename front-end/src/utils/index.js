// 请求封装 - 开始
import axios from "axios";
import {useEffect, useState} from "react";

const instance = axios.create({
  baseURL: 'https://www.sesametest.co:8080',
  timeout: 50000,
});

instance.interceptors.response.use(function (response) {
  console.log('asddsa', response);

  if(response.status === 200 && response.data.code === 200){
    return response
  } else {
    console.error('error request', response)
    return Promise.reject(response)
  }

}, function (error) {
  // todo 如果httpcode 是非200 ，就会执行这里?
  console.error('error request error', error)
  return Promise.reject(error);
});

// todo - 在实践中优化
export function useRequest(url, method='GET', data=null) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance({
          url,
          method,
          data
        });
        setResult(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url, method, data]);

  return { loading, error, result };
}

/*
// createRes 如果请求正常的话，数据结构与后端的接口文档保持一致
{
	code: 200,
	message: 'success',
	data: 12332
}
*/

// 请求封装 - 结束
