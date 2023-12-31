// 请求封装 - 开始
import axios from "axios";
import {useEffect, useState} from "react";
import {message} from "antd";

export const BASE_URL = 'http://localhost:3009'

// 从后端得到的映射表
export const codeMessageMap = {
  ok: 200,

  // 业务错误
  20001: '库存不足', // 假设代表库存不足

  // 请求错误
  40001: '无法根据id找到数据', // 无法根据id找到数据

  // 响应错误
  50001: '数据库错误'
}

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 50000,
});

instance.interceptors.response.use(function (response) {
  console.log('response axios', response);

  if(response.status === 200 && response.data.code === 200){
    return response
  } else {
    // 业务错误情况
    console.error('error request', response)
    return Promise.reject(response)
  }

}, function (error) {
  // 如果 httpcode 是非200 ，就会执行这里
  console.log('response axios error', error)
  return Promise.reject(error);
});

// todo - 在实践中优化
export function useRequest(axiosConf = {}, config = {}) {


  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [data, setData] = useState({});


  const {showError = true} = config

  const fetchData = async (customConfig) => {
    setLoading(true);
    try {
      const test = {...axiosConf, ...customConfig}

      console.log('axiosConf', axiosConf);

      console.log('customConfig', customConfig);

      const response = await instance(test);
      const responseData = response.data
      setData(responseData); //
      console.log('response123333', responseData);

      // await Promise.resolve(responseData) // 这个还需要保留吗
      return responseData
    } catch (err) {
      setData(null)
      if(err.response){
        // 请求错误400  or 响应错误500
        setError(err.response.data);

        await Promise.reject(err.response.data)

      }  else{
        // 业务错误
        setError(err.data);

        await Promise.reject(err.data)
      }


    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{
    if(!showError){return}
    if(isEmpty(error)){return}

    console.log('error111123', error);

    const errorMessage = codeMessageMap[error.code] || error.message
    message.error(errorMessage)
  }, [showError, error])

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

/**
 * 对比两个数组的item， 返回不同item
 *
 * @param {Array} array1 - 数组1
 * @param {Array} array2 - 数组2
 * @returns {Array} 不同item组成的数组
 */
export function arrayDifference(array1, array2) {
  return array1.filter(element => !array2.includes(element));
}

export const useCountdown = (initialSeconds) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(false);

  const startCountdown = () => {
    setIsActive(true);
  };

  useEffect(() => {
    if (!isActive || seconds <= 0) {
      return;
    }

    const timer = setTimeout(() => {
      setSeconds(seconds - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [isActive, seconds]);

  return {seconds, startCountdown};
};

console.log('utils');
