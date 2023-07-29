
import ReactHtmlParser from 'react-html-parser'


class translationLang {
  constructor(langObj, preLang) {
    this.langObj = langObj || {}
    this.preLang = preLang || ["en", "cn"]
    this.g_lang = window.g_lang || "en"
  }
  lang_string_node(n, arr_replace) {
    let lang = []
    if (this.preLang.includes(this.g_lang)) {
      lang = this.langObj[this.g_lang]
    } else {
      lang = this.langObj["en"]
    }
    if (!lang[n]) return this.langObj["en"][n] ? ReactHtmlParser(this.langObj["en"][n]) : ReactHtmlParser(n)
    let r
    try {
      r = lang[n]
      if (arr_replace) {
        arr_replace.forEach(function(d, index) {
          r = r.replace('$' + index + '$', d)
        })
      }
    } catch (n) {
      r = void 0
    }
    if (void 0 !== r) return ReactHtmlParser(r)
  }

  lang_string(n, arr_replace) {
    let lang = []
    console.log(1);
    if (this.preLang.includes(this.g_lang)) {
      lang = this.langObj[this.g_lang]
    } else {
      lang = this.langObj["en"]
    }
    if (!lang[n]) return n
    let r
    try {
      r = lang[n]
      if (arr_replace) {
        arr_replace.forEach(function(d, index) {
          r = r.replace('$' + index + '$', d)
        })
      }
    } catch (n) {
      r = void 0
    }
    if (void 0 !== r) return r
  }
}

export default translationLang
