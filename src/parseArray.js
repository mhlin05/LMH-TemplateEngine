/**
 * 处理数组，结合renderTemplate实现递归
 * 注意：这个参数手的参数是token 不是tokens
 * ['#','student',[]]
 */

import lookup from './lookup'
import renderTemplate from './renderTemplate'

// 递归调用renderTemplate 调用次数由data的数组长度决定
export default function parseArray(token, data) {
  // 得到整体数据data中这个数组要使用的部分
  let v = lookup(data, token[1])
  console.log('get v', v)
  //   结果字符串
  let resultStr = ''

  //   遍历v数组，v一定是数组

  for (let i = 0; i < v.length; i++) {
    // 这里要补一个'.'属性
    resultStr += renderTemplate(token[2], {
      '.': v[i],
      ...v[i]
    })

    console.log('this is add .', {
      '.': v[i],
      ...v[i]
    })
  }

  return resultStr
}
