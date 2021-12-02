import parseTemplateToTokens from './parseTemplateToTokens'

window.LMH_TemplateEngine = {
  render(templateStr, data) {
    console.log(parseTemplateToTokens(templateStr))
  }
}
