import Scanner from './Scanner'
import nestTokens from './nestTokens'

export default function parseTemplateToTokens(templateStr) {
  //   创建扫描器
  let myScan = new Scanner(templateStr)
  let tokens = new Array()
  let word
  while (!myScan.eos()) {
    //   收集标记出现之前的文字
    word = myScan.scanUntil('{{')
    // 如果不为空 存起来
    if (word !== '') {
      tokens.push(['text', word])
    }
    // 过双大括号
    myScan.scan('{{')
    // 收集结束标记出现之前的文字
    word = myScan.scanUntil('}}')
    if (word !== '') {
      // 这个word是双大括号中间的东西

      if (word[0] === '#') {
        //   #情况 去除#存起来
        tokens.push(['#', word.substring(1)])
      } else if (word[0] === '/') {
        tokens.push(['/', word.substring(1)])
      } else {
        tokens.push(['name', word])
      }
    }
    myScan.scan('}}')

    console.log([...tokens])
  }

  // console.log('零散的token', tokens)
  let res = nestTokens(tokens)
  // console.log('this is res', res)
  console.log('this is res', res)
  return res
}
