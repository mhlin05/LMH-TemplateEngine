/**
 * 函数功能为折叠tokens，将#和/之间的tokens能够整合起来
 */
export default function nestTokens(tokens) {
  // 结果数组
  let nestedTokens = []
  // 栈结构 存放小tokens
  let sections = []
  //   收集器 天生指向nestedTokens结果数组，引用类型值，所以指向的是同一个数组
  let collector = nestedTokens

  for (let i = 0; i < tokens.length; i++) {
    let token = tokens[i]

    switch (token[0]) {
      case '#':
        //   收集器中存放token
        collector.push(token)
        // 入栈
        sections.push(token)
        // 收集器更换指向
        collector = token[2] = []
        break
      case '/':
        //   出栈
        sections.pop()
        // 收集器回溯指向
        collector =
          sections.length > 0 ? sections[sections.length - 1][2] : nestedTokens
        break
      default:
        collector.push(token)
        break
    }
  }
  return nestedTokens
}
