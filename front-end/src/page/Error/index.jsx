import React, {useEffect} from 'react'
import {useRequest} from "../../utils/index.js";
import {Button} from "antd";
const Error = ()=>{

  const {fetchData: fetchData1, data: data1, error: error1, } = useRequest({url: '/app/test-error-1'})
  const {fetchData: fetchData2, data: data2, error: error2} = useRequest({url: '/app/test-error-2'})
  const {fetchData: fetchData3, data: data3, error: error3} = useRequest({url: '/app/test-error-3'})
  const {fetchData: fetchData4, data: data4, error: error4} = useRequest({url: '/app/test-error-4'})


  console.log('---');
  const consoleResult = [
    {name: '请求正常+响应正常+业务正常', data: data1, error: error1},
    {name: '业务错误',data: data2, error: error2},
    {name: '请求错误',data: data3, error: error3},
    {name: '响应错误',data: data4, error: error4},
  ]
  console.table(consoleResult)
  console.log('---');


  const onRequest1 = ()=>{
    fetchData1()
  }
  const onRequest2 = ()=>{
    fetchData2()
  }
  const onRequest3 = ()=>{
    fetchData3()
  }
  const onRequest4 = ()=>{
    fetchData4()
  }

  useEffect(()=>{
    console.log('请求正常+响应正常+业务正常', data1);
  }, [data1])
  useEffect(()=>{
    console.log('业务错误', error2);

  }, [error2])
  useEffect(()=>{
    console.log('请求错误', error3);

  }, [error3])
  useEffect(()=>{
    console.log('响应错误', error4);

  }, [error4])



  return (
    <div>
      <h1> 所有响应数据类型 </h1>

      <Button onClick={onRequest1}>请求正常+响应正常+业务正常</Button>
      <Button onClick={onRequest2}>请求正常+响应正常+业务错误</Button>
      <Button onClick={onRequest3}>请求错误</Button>
      <Button onClick={onRequest4}>请求正常+响应错误</Button>
    </div>
  )
}
export default Error
