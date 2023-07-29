import React, {useEffect, useState} from 'react'
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import {lang_string, lang_string_node} from "../../lang/lang.js";
import {useCountdown} from './../../utils/index'
const Lang = ()=>{
  const [code, setCode ] = useState('')
  const {seconds, startCountdown} = useCountdown(3);

  useEffect(()=>{
    startCountdown()
  }, [])


  useEffect(()=>{
    let codeString = `let langMap = {
  en: {
    "hello world": "hello world", 
  },
  cn: {
    "hello world": "你好", 
  }
}`
    setCode(codeString)
  }, [])


  useEffect(() => {
    Prism.highlightAll();
  }, [code]);


  return (
    <>

      <h1>国际化</h1>
      <h2>国际化核心：</h2>
      <p>1. 使用多层嵌套对象作为数据结构存储多语言数据</p>
      <pre>
        <code className="language-javascript">
          {code}
        </code>
      </pre>
      <p>2. 在页面加载时，确定用户语言，并且设置语言</p>
      <p>3. 使用封装好的 lang_string 函数，以英语语言作为 key 值，找到其他语言的 value 值</p>
      <p>示例：lang_string('Congratulations, you have successfully registered!') 函数最终显示为 {lang_string('Congratulations, you have successfully registered!')}</p>

      <h2>实际工作中，会遇到的问题</h2>
      <p>1. 多语言内容存在变量问题</p>
      <p>假设遇到多语言的某些字符串是变量，应该如何处理？比如现有多语言翻译为 `3秒后自动跳转返回活动页面`，3 秒是倒计时时间</p>
      <p>应该使用 lang_string('You have successfully registered for $0$') 函数最终显示为 {lang_string(`You have successfully registered for $0$`, [seconds])}</p>
      <p>2. 多语言内容需要使用原生 HTML 标签问题</p>
      <p>假设遇到多语言的某些字符串是 HTML 的变量，应该如何处理？</p>
      <p>应该使用 lang_string_node(`please contact us via:<a href="mailto:security@gate.io">security@gate.io</a>.`) 函数处理，处理结果为 {lang_string_node(`please contact us via:<a href="mailto:security@gate.io">security@gate.io</a>.`)}</p>
    </>
  )

}
export default Lang
