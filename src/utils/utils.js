// 格式化日期
export function dateFmt(value) {
  if (null != value && "" != value) {
    var date = new Date(value);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    if (m < 10) {
      m = "0" + m;
    }
    var d = date.getDate();
    if (d < 10) {
      d = "0" + d;
    }
    return y + '-' + m + '-' + d;
  } else {
    return "";
  }
}
// 对象数据置空
export function reset(obj) {
  Object.keys(obj).forEach(key => {
    switch (typeof obj[key]) {
      case 'string':
        obj[key] = '';
        break;
      case 'number':
        obj[key] = 0;
        break;
      case 'object':
        if (obj[key] instanceof Array) {
          obj[key] = []
        } else if (obj[key] instanceof Date) {
          obj[key] = ""
        } else {
          reset(obj[key]);
        }
        break;
      case 'boolean':
        obj[key] = true;
        break;
      default:
        obj[key] = ''
        break;
    }
  })
}