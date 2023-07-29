import en from "./lang_en"
import cn from "./lang_cn"
import tw from "./lang_tw"
import br from "./lang_br"
import de from "./lang_de"
import es from "./lang_es"
import id from "./lang_id"
import pt from "./lang_pt"
import ru from "./lang_ru"
import th from "./lang_th"
import tr from "./lang_tr"
import uk from "./lang_uk"
import vn from "./lang_vn"
import ja from "./lang_ja"
import ar from "./lang_ar"
import fr from "./lang_fr"
import translationLang from "./utils"

export const langObj = {
  en,
  cn,
  tw,
  br,
  de,
  es,
  id,
  pt,
  ru,
  th,
  tr,
  uk,
  vn,
  ja,
  ar,
  fr
}
// todo
window.g_lang = 'cn'
console.log("lang");

const preLang = ["en", "cn", "br", "de", "es", "id", "pt", "ru", "th", "tr", "uk", "vn", "ja", "ar", "fr", "tw"]
const Translate = new translationLang(langObj, preLang)
export const lang_string = Translate.lang_string.bind(Translate)
export const lang_string_node = Translate.lang_string_node.bind(Translate)
