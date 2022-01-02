//index.js
//获取应用实例
const app = getApp()
var mqtt = require('../../utils/mqtt.js');


// Page({
//   data: {
//     listData: [{
//         "code": "01",
//         "text": "text1",
//         "type": "type1"
//       },
//       {
//         "code": "02",
//         "text": "text2",
//         "type": "type2"
//       },
//       {
//         "code": "03",
//         "text": "text3",
//         "type": "type3"
//       },
//       {
//         "code": "04",
//         "text": "text4",
//         "type": "type4"
//       },
//       {
//         "code": "05",
//         "text": "text5",
//         "type": "type5"
//       },
//       {
//         "code": "06",
//         "text": "text6",
//         "type": "type6"
//       },
//       {
//         "code": "07",
//         "text": "text7",
//         "type": "type7"
//       }
//     ]
//   },
//   onLoad: function () {
//     console.log('onLoad')
//   }

// })


Page({
  // data: {
  //   button_type:'primary',
  //   sub_text:'订阅',
  //   sub_state:false,
  //   topic:'CJP/msg',
  //   msg:''
  // },

  data: {
    listData: [{
      "code":"01",
      "temp": "01",
      "hum": "text1",
   
    },
    {
      "code":"02",
      "temp": "02",
      "hum": "text2",
     
    },
    {
      "code":"03",
      "temp": "03",
      "hum": "text3",
   
    },
    {
      "code":"04",
      "temp": "04",
      "hum": "text4",
 
    },
    {
      "code":"05",
      "temp": "05",
      "hum": "text5",
     
    },
    {
      "code":"06",
      "temp": "06",
      "hum": "text6",
     
    },
    {
      "code":"07",
      "temp": "07",
      "hum": "text7",
      
    }],
    button_type: 'primary',
    sub_text: '订阅',
    sub_state: false,
    // topic: 'MQP/msg',
    // topic: 'IOT-MQP/msg',
    // topic: 'IOT-MQP/msg',
    topic: "ZUCC-IOTMQP/esp",
    msg: ''
  },

  TopicInput: function (e) {
    this.setData({
      topic: e.detail.value
    })
  },

  toAdxlMqtt(){
    wx.navigateTo({
      url: '../adxl_mqtt/index'
    });
  },

  to_line_acc(){
    // var arr=[]
    // arr.push()
    // arr.pop()
    // js  列表 弹出 第一个
    // arr.shift();
    wx.navigateTo({
      url: '../line_acc/index'
    });
  },
  toConnect(){
    wx.navigateTo({
      url: '../connect/connect'
    });
  },
  
  
  sendToDb:function (hum,temp){
    wx.request({
      url: app.globalData.baseUrl+"/hum/save",
      // url: 'https://baidu.com',
      // url: 'http://baidu.com',
      method:"POST",
      data: {
          // id:id
          "createTime": Date(),
          "hum": hum,
          "temp": temp
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
      console.log("res");
      console.log(res);
      }
    })
  },
  toRotate(){
    wx.navigateTo({
      url: '../rotate/index'
    });
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
      
       var listData=[{"code":"01","temp": receive.temp,"hum": receive.hum,}]
      //  var listData=  that.data.listData
      //  listData.push({"code":"01","temp": receive.temp,"hum": receive.hum,})
      //  that.data.listData.push({"code":"01","temp": receive.temp,"hum": receive.hum,})
      console.log("listData");
      console.log(listData);
      that.setData({
        listData:listData,
        // msg: packet.payload + '<br>' + that.data.msg
        msg: payload + '<br>' + that.data.msg
      })

      // that.sendToDb(receive.hum,receive.temp)
    })
  }
})