import * as echarts from '../../ec-canvas/echarts';

const app = getApp();

var option = {
  title: {
    // text: '测试下面legend的红色区域不应被裁剪',
    left: 'center'
  },
  legend: {
    // data: ['A', 'B', 'C'],
    // data: ['temp', 'hum', 'C'],
    data: ['temp', 'hum'],
    top: 50,
    left: 'center',
    // backgroundColor: 'red',
    z: 100
  },
  grid: {
    containLabel: true,
    // left: '20%',
    left: '4%',
    // right: '4%',
    right: '20%',
    bottom: '3%',
 
  },
  tooltip: {
    show: true,
    trigger: 'axis'
  },
  // xAxis echarts 单位
  // xAxis name 的位置 在下面
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    // show: false
    // name: '时间\n（分钟\n:秒）',// 给X轴加单位
    name: '时间\n（分钟:秒）',// 给X轴加单位
    // name: ' ',// 给X轴加单位
// namegap
    nameTextStyle: {
      // padding: [20, 0, 0, -10]    
      // 四个数字分别为上右下左与原位置距离
      // padding: [100, 0, 0, -10]  
      // padding: [100, 0, 0, -100]  
      // padding: [100, 100, 0, -100]  
      // padding: [100, 100, -100, -100]  
      // padding: [100, 100, 200, -100]  
      // padding: [100, 100, 200, -50]  
      // padding: [-100, 100, 200, -50]  
      // padding: [-100, 100, 200, -22]  
      // padding: [-100, 100, 200, -11]  
      // padding: [-20, 100, 200, -11]  
      // padding: [-20, -20, 200, -11]  
      padding: [-20, -20, -42, -11]  
  }
  },
  // yAxis
  yAxis: {
    name: '温度或者\n湿度\n（摄氏度，%)',// 给X轴加单位
    x: 'center',
    type: 'value',
    splitLine: {
      lineStyle: {
        type: 'dashed'
      }
    }
    // show: false
  },
  series: [{
    // name: 'A',
    name: 'temp',
    type: 'line',
    smooth: true,
    data: [18, 36, 65, 30, 78, 40, 33]
  }, {
    // name: 'B',
    name: 'hum',
    type: 'line',
    smooth: true,
    data: [12, 50, 51, 35, 70, 30, 20]
  }
  // , {
  //   name: 'C',
  //   type: 'line',
  //   smooth: true,
  //   data: [10, 30, 31, 50, 40, 20, 10]
  // }
]
};
var chart

/**************************************时间格式化处理************************************/
function dateFtt(fmt, date) { //author: meizz 
  var o = {
    "M+": date.getMonth() + 1, //月份 
    "d+": date.getDate(), //日 
    "h+": date.getHours(), //小时 
    "m+": date.getMinutes(), //分 
    "s+": date.getSeconds(), //秒 
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度 
    "S": date.getMilliseconds() //毫秒 
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

//创建时间格式化显示
function crtTimeFtt(value, row, index) {
  var crtTime = new Date(value);
  // top.
  return dateFtt("yyyy-MM-dd hh:mm:ss", crtTime); //直接调用公共JS里面的时间类处理的办法  
}

function initChart(canvas, width, height, dpr) {

  console.log("width");
  console.log(width);
  console.log("height");
  console.log(height);
  // echarts xAxis 名字显示不完全
  chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    // width: width*0.7,
    // height: height*0.7,

    // width: width*0.2,
    // height: height*0.2,

    // width: width*1.5,
    // height: height*1.5,
    // 数字变大了 他就变小了

    // width: width*2,
    // height: height*2,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);
  console.log('setChart');

  // //wx. request para 
  // wx.request({
  //   url: app.globalData.baseUrl + `/hum/list`,
  //   // url: 'https://baidu.com',
  //   // url: 'http://baidu.com',
  //   method: "POST",
  //   data: {
  //     //  微信 Date 下周的日期
  //     // id:id
  //     // "createTime": Date(),
  //     // "fromTime":
  //     // "hum": hum,
  //     // "temp": temp

  //     "createTime": null,
  //     "hum": null,
  //     "id": null,
  //     "temp": null
  //   },


  //   header: {
  //     'content-type': 'application/json' // 默认值
  //   },
  //   success: function (res) {
  //     console.log("res");
  //     console.log(res);
  //     res.content;
  //     let hums = []
  //     let temps = []
  //     let dates = []

  //     var ftmTimeStr = crtTimeFtt(res.data.content[2].createTime)
  //     //  console.log("crt");
  //     //  console.log(crt);
  //     // 怎么才能让那边知道我 修改了呢
  //     app.setData {
  //       aboutTime: ftmTimeStr
  //     }
  //     res.data.content.forEach(element => {
  //       // element.hum
  //       hums.push(element.hum)
  //       temps.push(element.temp)
  //       // temps.push(element.temp)
  //       var createTime = element.createTime
  //       // var minu=createTime.getMinute()
  //       console.log("createTime");
  //       console.log(createTime);
  //       var crt = crtTimeFtt(createTime)
  //       console.log("crt");
  //       console.log(crt);


  //       var date = new Date(createTime)
  //       console.log("date");
  //       console.log(date);
  //       // date.getMinutes()
  //       // console.log("minu");
  //       // console.log(minu);
  //       // dates.push(element.createTime)
  //       dates.push(date.getMinutes() + ":" + date.getSeconds())
  //     });

  //     option.series[0].data = temps
  //     option.series[1].data = hums
  //     option.xAxis.data = dates
  //     console.log("dates");
  //     console.log(dates);
  //     // initChart()
  //     chart.setOption(option);
  //   }
  // })
  chart.setOption(option);

  return chart;
}



//获取上周起始时间结束时间、下周起始时间结束时间开始时间和本周起始时间结束时间;（西方）
function getStartTimeOfWeek(n) {
  var now = new Date();
  var year = now.getFullYear();
  //因为月份是从0开始的,所以获取这个月的月份数要加1才行
  var month = now.getMonth() + 1;
  var date = now.getDate();
  var day = now.getDay();
  console.log(date);
  //判断是否为周日,如果不是的话,就让今天的day-1(例如星期二就是2-1)
  if (day !== 0) {
    n = n + (day - 1);
  } else {
    n = n + day;
  }
  if (day) {
    //这个判断是为了解决跨年的问题
    if (month > 1) {
      month = month;
    }
    //这个判断是为了解决跨年的问题,月份是从0开始的
    else {
      year = year - 1;
      month = 12;
    }
  }
  now.setDate(now.getDate() - n);
  year = now.getFullYear();
  month = now.getMonth() + 1;
  date = now.getDate();
  // console.log(n);
  var s = year + "-" + (month < 10 ? ('0' + month) : month) + "-" + (date < 10 ? ('0' + date) : date);
  return s;
}

/***参数都是以周一为基准的***/
//上周的开始时间
// console.log(getTime(7));
//上周的结束时间
// console.log(getTime(1));
//本周的开始时间
// console.log(getTime(0));
//本周的结束时间
// console.log(getTime(-6));
//下周的开始时间
// console.log(getTime(-7));
//下周结束时间
// console.log(getTime(-13));

// function getHumThisWeek(canvas, width, height, dpr) {
//   wx.request({
//     url: app.globalData.baseUrl+"/hum/save",
//     // url: 'https://baidu.com',
//     // url: 'http://baidu.com',
//     method:"POST",
//     data: {
//       //  微信 Date 下周的日期
//         // id:id
//         "createTime": Date(),
//         "fromTime":
//         "hum": hum,
//         "temp": temp
//     },
//     header: {
//       'content-type': 'application/json' // 默认值
//     },
//     success: function(res) {
//     console.log("res");
//     console.log(res);
//     }
//   })
// }

Page({
  onShareAppMessage: function (res) {
    return {
      title: 'ECharts 可以在微信小程序中使用啦！',
      path: '/pages/index/index',
      success: function () {},
      fail: function () {}
    }
  },

  initLine() {
    var that=this
    //wx. request para 
    wx.request({
      url: app.globalData.baseUrl + `/hum/list`,
      // url: 'https://baidu.com',
      // url: 'http://baidu.com',
      method: "POST",
      data: {
        //  微信 Date 下周的日期
        // id:id
        // "createTime": Date(),
        // "fromTime":
        // "hum": hum,
        // "temp": temp

        "createTime": null,
        "hum": null,
        "id": null,
        "temp": null
      },


      header: {
        'content-type': 'application/json' // 默认值
      },
  
      success: function (res) {
        console.log("res");
        console.log(res);
        res.content;
        let hums = []
        let temps = []
        let dates = []

        var ftmTimeStr = crtTimeFtt(res.data.content[2].createTime)
        //  console.log("crt");
        //  console.log(crt);
        // 怎么才能让那边知道我 修改了呢
        that.setData ({
          aboutTime: ftmTimeStr
        })
        res.data.content.forEach(element => {
          // element.hum
          hums.push(element.hum)
          temps.push(element.temp)
          // temps.push(element.temp)
          var createTime = element.createTime
          // var minu=createTime.getMinute()
          console.log("createTime");
          console.log(createTime);
          var crt = crtTimeFtt(createTime)
          console.log("crt");
          console.log(crt);


          var date = new Date(createTime)
          console.log("date");
          console.log(date);
          // date.getMinutes()
          // console.log("minu");
          // console.log(minu);
          // dates.push(element.createTime)
          dates.push(date.getMinutes() + ":" + date.getSeconds())
        });

        option.series[0].data = temps
        option.series[1].data = hums
        option.xAxis.data = dates
        console.log("dates");
        console.log(dates);
        // initChart()
        chart.setOption(option);
      }
    })
    // chart.setOption(option);
  },

  //接收信息函数
  mqttsub: function () {
    var that = this;
    if (this.data.sub_state == true) {
      app.globalData.client.unsubscribe(this.data.topic)
      that.setData({
        button_type: 'primary',
        sub_text: '订阅',
        sub_state: false
      })
      return;
    }
    app.globalData.client.subscribe(this.data.topic);
    var topic = this.data.topic;
    console.log("topic");
    console.log(topic);
    that.setData({
      button_type: 'warn',
      sub_text: '取消订阅',
      sub_state: true
    })
    // unction (topic, message, packet) {
    // https://blog.csdn.net/weixin_30614587/article/details/98610910
    // app.globalData.client.on('message', function (topic, message, packet) {
    app.globalData.client.on('message', function (topic, payload) {
      console.log("topic");
      console.log(topic);
      // console.log("message");
      // console.log(message);
      // console.log("payload");
      // console.log(payload);
      console.log(" that.data");
      console.log(that.data);
      // console.log(" packet.payload");
      // console.log(packet.payload);

      var receive = JSON.parse(payload);
      console.log("receive");
      console.log(receive);

      var listData = [{
        "code": "01",
        "temp": receive.temp,
        "hum": receive.hum,
      }]
      that.setData({
        listData: listData,
        // msg: packet.payload + '<br>' + that.data.msg
        msg: payload + '<br>' + that.data.msg
      })
      //wx. request para 
      wx.request({
        url: app.globalData.baseUrl + `/hum/list`,
        // url: 'https://baidu.com',
        // url: 'http://baidu.com',
        method: "POST",
        data: {
          //  微信 Date 下周的日期
          // id:id
          // "createTime": Date(),
          // "fromTime":
          // "hum": hum,
          // "temp": temp

          "createTime": null,
          "hum": null,
          "id": null,
          "temp": null
        },


        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          console.log("res");
          console.log(res);
          res.content;
          let hums = []
          let temps = []
          let dates = []
          res.content.array.forEach(element => {
            // element.hum
            hums.push(element.hum)
            temps.push(element.temp)
            // temps.push(element.temp)
            dates.push(element.createTime)
          });

          option.series[0].data = temps
          option.series[1].data = hums
          option.xAxis.data = dates
          // initChart()
          chart.setOption(option);
        }
      })

      // that.sendToDb(receive.hum,receive.temp)
    })
  },
  data: {
    ec: {
      onInit: initChart
    },
    aboutTime: new Date()
  },

  onReady() {
    this.initLine()
  }
});