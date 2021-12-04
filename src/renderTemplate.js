/**
 * 函数的功能是让tokens数组变为字符串
 */
import lookup from './lookup'
import parseArray from './parseArray'

export default function renderTemplate(tokens, data) {
  // console.log(tokens)
  let res = []
  // token = ['name','tagname',[1,2,3]]
  // 0 1 2
  for (let i = 0; i < tokens.length; i++) {
    let token = tokens[i]

    switch (token[0]) {
      case 'text':
        res.push(token[1])
        break
      case 'name':
        res.push(lookup(data, token[1]))
        break
      case '#':
        res.push(parseArray(token, data))
        break
    }
    // 看类型
  }

  return res.join('')
}
