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
export function number_chinese(str) {
  var num = parseFloat(str);
  var strOutput = "",
      strUnit = '仟佰拾亿仟佰拾万仟佰拾元角分';
  num += "00";
  var intPos = num.indexOf('.');  
  if (intPos >= 0){
      num = num.substring(0, intPos) + num.substr(intPos + 1, 2);
  }
  strUnit = strUnit.substr(strUnit.length - num.length);
  for (var i=0; i < num.length; i++){
      strOutput += '零壹贰叁肆伍陆柒捌玖'.substr(num.substr(i,1),1) + strUnit.substr(i,1);
  }
  return strOutput.replace(/零角零分$/, '整').replace(/零[仟佰拾]/g, '零').replace(/零{2,}/g, '零').replace(/零([亿|万])/g, '$1').replace(/零+元/, '元').replace(/亿零{0,3}万/, '亿').replace(/^元/, "零元")

}