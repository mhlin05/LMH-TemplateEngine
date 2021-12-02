/**
 * 扫描器类
 */

export default class Scanner {
  constructor(templateStr) {
    this.templateStr = templateStr
    //   指针
    this.pos = 0
    // 尾巴
    this.tail = templateStr
  }
  /**
   * 功能弱，就是走过指定内容
   * 无返回值
   */
  scan(tag) {
    if (this.tail.indexOf(tag) === 0) {
      this.pos += tag.length
      this.tail = this.templateStr.substring(this.pos)
    }
  }
  /**
   * 让指针进行扫描，直到遇到指定内容结束
   * 并且返回结束之前的内容
   */
  scanUntil(stopTag) {
    //   存扫描开始的位置
    let backup_pos = this.pos

    // 写&& 是为了防止找不到stopTag，也可停止下来
    while (this.tail.indexOf(stopTag) !== 0 && !this.eos()) {
      this.pos++
      this.tail = this.templateStr.substring(this.pos)
    }

    return this.templateStr.substring(backup_pos, this.pos)
  }

  //   指针是否已经到头 返回布尔值 end of string
  eos() {
    return this.pos >= this.templateStr.length
  }
}
