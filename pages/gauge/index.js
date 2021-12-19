import * as echarts from '../../ec-canvas/echarts';

const app = getApp();

var option = {
  backgroundColor: "#ffffff",
  series: [{
    min:-20,
    // max:60,
    // max:100,
    max:60,
    // min:-10,
    // max:70,


    name: '业务指标',
    type: 'gauge',
    // 温度仪表盘 微信小程序  echarts 
    // echarts  gauge 上下限
    detail: {
      // formatter: '{value}%'
      formatter: '{value}℃'
    },
    axisLine: {
      show: true
    },
    data: [{
      // value: 40,
      // name: '完成率',
      value: 37,
      name: '温度',
    }]

  }]
};


var optionHum = {
  backgroundColor: "#ffffff",
  series: [{
    min:0,
    // max:60,
    // max:100,
    max:100,
    // min:-10,
    // max:70,


    name: '湿度',
    type: 'gauge',
    // 温度仪表盘 微信小程序  echarts 
    // echarts  gauge 上下限
    detail: {
      formatter: '{value}%'
      // formatter: '{value}℃'
    },
    axisLine: {
      show: true
    },
    data: [{
      // value: 40,
      // name: '完成率',
      value: 37,
      name: '湿度',
    }]

  }]
};

var chart
var chartHum

function initChartHum(canvas, width, height, dpr) {
  // const chart
  chartHum = echarts.init(canvas, null, {
    // width: width,
    // height: height,
    // width: width+20,
    // height: height+20,
    width: width+100,
    // height: height+100,
    height: height+150,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chartHum);
console.log("setChart hum");
chartHum.setOption(optionHum, true);

  return chartHum;
}

function initChart(canvas, width, height, dpr) {
  // const chart
   chart = echarts.init(canvas, null, {
    // width: width,
    // height: height,

    width: width+100,
 
    height: height+150,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);

  // var option = {
  //   backgroundColor: "#ffffff",
  //   series: [{
  //     min:-20,
  //     max:60,
  //     // min:-10,
  //     // max:70,

  
  //     name: '业务指标',
  //     type: 'gauge',
  //     // 温度仪表盘 微信小程序  echarts 
  //     // echarts  gauge 上下限
  //     detail: {
  //       // formatter: '{value}%'
  //       formatter: '{value}℃'
  //     },
  //     axisLine: {
  //       show: true
  //     },
  //     data: [{
  //       // value: 40,
  //       // name: '完成率',
  //       value: 37,
  //       name: '温度',
  //     }]

  //   }]
  // };

  // option.series.max=200;
  // option.series[0].data[0].value=temp;
  console.log("option");
  console.log(option);
  chart.setOption(option, true);

  return chart;
}

function changeChart(chart,temp,hum) {
  

  option.series[0].data[0].value=temp;
  optionHum.series[0].data[0].value=hum;
  chart.setOption(option, true);
  chartHum.setOption(optionHum, true);
}


function changeTempChart(chart,temp) {
  

  option.series[0].data[0].value=temp;
  optionHum.series[0].data[0].value=temp;
  chart.setOption(option, true);

}

Page({
  onShareAppMessage: function (res) {
    return {
      title: 'ECharts 可以在微信小程序中使用啦！',
      path: '/pages/index/index',
      success: function () { },
      fail: function () { }
    }
  },
  data: {
    //  chart:null,
    ec: {
      onInit: initChart
    },
    ecHum: {
      onInit: initChartHum
    },
    button_type: 'primary',
    sub_text: '订阅',
    sub_state: false,
    topic: 'MQP/msg',
    msg: ''
  },

  onReady() {
   this. mqttsub();
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

       var receive=JSON.parse(payload);
       console.log("receive");
       console.log(receive);

      //  changeTempChart(chart,receive.temp);
       changeChart(chart,receive.temp,receive.hum);
      //  var listData=[{"code":"01","temp": receive.temp,"hum": receive.hum,}]
      that.setData({
        value:receive.temp,
        // listData:listData,
        // // msg: packet.payload + '<br>' + that.data.msg
        // msg: payload + '<br>' + that.data.msg
      })
    })
  }
});
