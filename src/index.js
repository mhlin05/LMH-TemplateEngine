import parseTemplateToTokens from './parseTemplateToTokens'
import renderTemplate from './renderTemplate'

window.LMH_TemplateEngine = {
  render(templateStr, data) {
    // 形成tokens数组
    let tokens = parseTemplateToTokens(templateStr)
    // 调用renderTemplate函数，让tokens数组变为dom字符串
    let res = renderTemplate(tokens, data)
    console.log(res)
    return res
  }
}
