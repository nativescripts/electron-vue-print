/*
 * zepto/jquery工具类
 * None++
 * 2018/10/16
 */

var baseTool = {
  setItemLocalStorage: function(items) {
    for (var key in items) {
      try {
        window.localStorage.setItem(key, items[key])
      } catch (e) {}
    }
  },
  getItemLocalStorage: function(key) {
    try {
      return window.localStorage.getItem(key)
    } catch (e) {}
  },
  removeItemLocalStorage: function(key) {
    try {
      return window.localStorage.removeItem(key)
    } catch (e) {}
  },
  clearLocalStorage: function() {
    try {
      window.localStorage.clear()
    } catch (e) {}
  },
  // 保存指定cookie
  //todo: domin添加
  setCookie: function(name, value, Day) {
    if(typeof window ==="undefined") return;
    if (!Day) {
      Day = 5
    }

    var exp = new Date();
    exp.setTime(exp.getTime() + Day * 24 * 60 * 60000);
      var str = name + '=' + value + ';path=/';
      // str += '; domain=' + '';//todo
      str += '; expires=' + exp.toUTCString();
    document.cookie = str;
  },
  // 获取指定cookie
  getCookie: function(name) {
    if(typeof window ==="undefined") return;
    if (name) {
      var arr,
        reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
      if ((arr = document.cookie.match(reg))) return decodeURIComponent(arr[2])
      else return null
    } else {
      return null
    }
  },
  // 删除指定cookie
  delCookie: function(key) {
    var exp = new Date()
    exp.setTime(exp.getTime() - 1)
    var cval = this.getCookie(key)
    if (cval != null) {
      document.cookie = key + '=' + cval + ';expires=' + exp.toGMTString()
      document.cookie =
        key +
        '=0;expires=' +
        new Date(0).toUTCString() +
        '; path=/; domain=' +
        document.domain
    }
  },
  // 清除该域名下所有cookie
  clearCookie: function() {
    var keys = document.cookie.match(/[^ =;]+(?==)/g)
    if (keys) {
      for (var i = keys.length; i--; ) {
        document.cookie =
          keys[i] +
          '=0;expires=' +
          new Date(0).toUTCString() +
          '; path=/; domain=' +
          document.domain
      }
    }
  },
  // 获取url参数
  getUrlQueryString: function(name) {
    if(typeof window ==="undefined") return;
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i'),
      r = location.search.substr(1).match(reg)
    if (r !== null) {
      return window.decodeURIComponent(r[2]).split('?isApp=true')[0]
    }
    return ''
  },
    //判断是否是IOS
    isIos: function () {
        return navigator.userAgent.indexOf("iPhone") > 0 || navigator.userAgent.indexOf("iPad") > 0 || navigator.userAgent.indexOf("iPod") > 0;
    },
    // 判断是否是微信
    isWeixin: function () {
        return navigator.userAgent.indexOf("MicroMessenger") > 0 ? true : false;
    },
    // 判断是否是QQ
    isQQ: function () {
        return navigator.userAgent.indexOf("QQ") > 0 ? true : false;
    },
    // 判断是否是HaimaApp
    isHaimaApp: function () {
        return navigator.userAgent.indexOf("haimaliaotian") > 0 ? true : false;
    },
    // 姓名脱敏 默认后脱敏 **会
    nameDese: function (str, type) {
        typeof str === 'number' && (str += '');
        if (type === "pre") {
            return str.substring(0, 1) + '**';
        } else {
            return '**' + str.substr(str.length - 1);
        }
    },
    // 手机号脱敏
    desensitizePhone: function (phone) {
        var p = phone.toString();
        if (p.length >= 11) {
            return p.substr(0, 3) + '****' + p.substr(p.length - 4);
        }
        return p;
    },
    // 格式化金额
    formateMoney: function (string, num, text) {
        var __num = num || 10000, __text = text || "万元";
        if (window.parseFloat(string) >= __num) {
            return ((window.parseFloat(string) / __num) + __text);
        } else {
            return (string + "元");
        }
    },
    // 格式化金额2
    formateMoney2: function (string, separator) {
        if (!separator) separator = ',';
        typeof string === 'number' && (string += '');
        return string.replace(/\b\d+\b/, function (str) {
            var len = str.length, miu = Math.floor((len % 3 === 0 ? (len - 1) : len) / 3);
            if (len < 4) {
                return str
            }
            ;
            str = str.split('');
            for (var i = 1, j = 0; i <= miu; i++, j++) {
                str.splice(len - i * 3 - j, 0, separator);
                len++
            }
            return str.join('');
        })
    },
    // 格式化卡号
    bankCardFormat: function (_bk) {
        var _bkParagraph = parseInt(_bk.length / 4),
            _f = _bk.length % 4,
            _newBk = '';
        for (var i = 0, l = _bkParagraph; i < l; i++) {
            if (i === (l - 1)) {
                if (_f) {
                    _newBk += _bk.substr(i * 4, 4) + ' ' + _bk.substring(i * 4 + 4, _bk.length);
                } else {
                    _newBk += _bk.substr(i * 4, 4);
                }
            } else {
                _newBk += _bk.substr(i * 4, 4) + ' ';
            }
        }
        return _newBk;
    },
    // 日期处理
    formatRaiseDay: function (date) {
        var result = [];
        date = window.parseInt(date);
        if (date / 1440 >= 1) {
            result.push(Math.floor(date / 1440) + '天');
            date = date % 1440;
        }
        if (date / 60 >= 1) {
            result.push(Math.floor(date / 60) + '小时');
            date = date % 60;
        }
        if (date > 0) {
            result.push(Math.floor(date) + '分钟');
        }
        return result.join('');
    },
    // 时间处理
    initDatetime: function (time) {
        time = time.split(/[\s-:]/g);
        return [time[0], '年', time[1], '月', time[2], '日'].join('');
    },
    // 区转化市处理
    initChange: function (code) {
        return parseInt(code/100)*100;
    },
    // 数据处理
    initData99: function (number) {
        number = parseInt(number);
        if (number && number > 99) {
            number = "99+";
        } else if (number) {
            //
        } else {
            number = "";
        }
        return number;
    },
    // url处理
    initHttpHtml: function (str) {
        let reg = /(http:\/\/|https:\/\/|www.)((\w|=|\?|\.|\/|&|-)+)/g;
        // return str.replace(reg, '<a href="/dealH.html?urlId=$1$2">$1$2</a>');
        return str.replace(reg, '<span>AAAZZZQQQ'+'$1$2'+'AAAZZZQQQ</span>');
    },
    // 判断字符串中是否含有url
    checkUrl: function (str) {
        var _str = this.initHttpHtml(str).split('AAAZZZQQQ')[1];
        var RegUrl = new RegExp();
        RegUrl.compile("^(((ht|f)tp(s?))\://)?(www.|[a-zA-Z].)[a-zA-Z0-9\-\.]+\.(com|edu|gov|mil|net|org|biz|info|name|museum|us|ca|uk)(\:[0-9]+)*(/($|[a-zA-Z0-9\.\,\;\?\’\\\+&%\$#\=~_\-]+))*$");
        if (!RegUrl.test(_str)) {
            return false;
        }
        return true;
    }
}
export default baseTool
