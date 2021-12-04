# 简单完成mustache模板引擎





## 环境搭建

webpack-dev-server是一个小型的node.js Express服务器,它使用webpack-dev-middleware中间件来为通过webpack打包生成的资源文件提供Web服务。

```
const path = require('path')

module.exports = {
 
  //   配置webpack-dev-server
  devServer: {
    //   静态文件根目录
    contentBase: path.join(__dirname, 'www'),
    compress: false,
    port: 8080,
    // 虚拟路径，bundle.js文件没有真正生成
    publicPath: '/xuni/'
  }
}
```



## 实现-parseTemplateToTokens

​	将template转换为Tokens数组，通过Scanner类扫描templateStr，将template变为简单（零散）的tokens数组；再通过nestTokens方法将零散的token整合为最终的token数组。

### Scanner扫描器类

​	Scanner类中包括三个方法，分别是

- scan

  scan方法功能比较弱，传入一个参数tag，函数功能为跳过这个tag。

- scanUntil

  方法传入一个stopTag，让指针进行扫描，直到遇到指定的stopTag停止，并且返回结束之前的内容。

- eos

  判断指针是否已经到头

​	Scanner类的成员：templateStr（扫描的字符串），pos（指针的位置），tail（下次开始扫描的字符串）

### nestTokens方法

​	将零散的tokens整合起来，\#和/之间的tokens能够整合起来。

#### 	collector思想

​	设置一个collector收集器初始指向结果数组nestedTokens，遍历零散的tokens，当遇到#时将整个token存入收集器中，并将这个token入栈，收集器更换指向到这个token[2]；遇到/时出栈一次并将收集器重新赋值为栈顶或者结果数组（栈空）；否则将token存入收集器。

​	**充分利用了引用这一规则，详细看源码**

​		

​	

## 实现-renderTemplate

### lookup

假如有一个token为['name','a.b.c']，为了实现多层引用的实现，写了一个lookup函数。

```
data = {
      a: {
        b: {
          c: 100
        }
      }
    }
```

代码主要利用字符串split方法，将字符串根据`.`隔开形成数组，循环遍历得到结果。主要关注一下`reduce版本`代码，弹幕看到后去实现的。reduce当有初始值时，第一个遍历的是数组第一个元素，否则是从第二个开始，将第一个元素当作初始值。

```
function lookup(dataObj, keyName) {
  if (keyName.indexOf('.' !== -1)) {
    let keyArr = keyName.split('.')

    let res = keyArr.reduce((a, b) => {
      return a[b]
    }, dataObj)

    return res
  }
}
```

### parseArray

```
for (let i = 0; i < v.length; i++) {
    // 这里要补一个'.'属性
    resultStr += renderTemplate(token[2], {
      '.': v[i],
      ...v[i]
    })
```

解决了循环中`.`无法识别的问题

