// 请求封装 - 开始
import axios from "axios";
import {useEffect, useState} from "react";
import {message} from "antd";

const instance = axios.create({
  baseURL: 'http://localhost:3009',
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
export function useRequest(axiosConf = {}, config = {}) {


  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [data, setData] = useState({});

  const {showError} = config

  const fetchData = async (customConfig) => {
    setLoading(true);
    try {
      const test = {...axiosConf, ...customConfig}

      console.log('axiosConf', axiosConf);

      console.log('customConfig', customConfig);

      const response = await instance(test);
      setData(response.data.data);
    } catch (err) {
      if(showError){
        message.error('获取数据错误',)
        console.error(err)
      }
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, data, fetchData };
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


export function isEmpty(value) {
  if (value === null || value === undefined) {
    return true;
  }
  if (typeof value === 'string' && value.trim() === '') {
    return true;
  }
  if (Array.isArray(value) && value.length === 0) {
    return true;
  }
  if (typeof value === 'object' && Object.keys(value).length === 0) {
    return true;
  }
  return false;
}
