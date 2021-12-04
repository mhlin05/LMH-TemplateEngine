/**
 * 功能是可以在dataObj对象中，寻找用连续点符号的keyName属性
 * 比如
    dataObj = 
    {
        a:{
            b:{
                c: 100
            }
        }
    }

    那么lookup(dataObj,'a.b.c') 结果为100

 */

export default function lookup(dataObj, keyName) {
  if (keyName.indexOf('.' !== -1) && keyName !== '.') {
    //   如果有.符号  拆开
    let keys = keyName.split('.')
    // 设置临时变量
    let res = dataObj
    for (let i = 0; i < keys.length; i++) {
      res = res[keys[i]]
    }

    return res
  }

  //   没有点符号
  return dataObj[keyName]
}

/**
 * reduce版本
 * 
 * function lookup(dataObj, keyName) {
  if (keyName.indexOf('.' !== -1)) {
    let keyArr = keyName.split('.')

    let res = keyArr.reduce((a, b) => {
      return a[b]
    }, dataObj)

    return res
  }
}
 */
