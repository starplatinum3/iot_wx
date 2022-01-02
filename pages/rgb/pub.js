//index.js
//获取应用实例
const app = getApp()
var mqtt = require('../../utils/mqtt.js');

function test1(){

    // 云函数入口文件
    const cloud = require('wx-server-sdk')
    const got = require('got');
    cloud.init()

    // 云函数入口函数
    exports.main = async (event, context) => {
      let getResponse = await got('httpbin.org/get')
      return getResponse.body
    }
}

Page({

  onReady: function () {

  
  },
  // 显示取色器
  toPick: function () {
    this.setData({
      pick: true
    })
  },
  //取色结果回调
  pickColor(e) {
    let rgb = e.detail.color;
    console.log("rgb");
    console.log(rgb);
    console.log("rgb.r");
    console.log(rgb.r);
    // rgb. 
    // rgb 颜色 怎么获得  微信小程序

    console.log("rgb.JSON");
    console.log(rgb.JSON);
    // rgb.replace
    // rgb.substr
    //  var rgbNum = rgb.substr(3, rgb.length-3); // 获取子字符串。
    //  var rgbNum :String= rgb.substr(4, rgb.length-4); // 获取子字符串。
    //  var rgbNum = rgb.substr(4, rgb.length-4); // 获取子字符串。
    var rgbNum = rgb.substr(4, rgb.length - 5); // 获取子字符串。
    // js 字符串 replace 
    // js 字符串  提取



    console.log("rgbNum");
    console.log(rgbNum);
    // rgbNum.split(",")

    var sps = rgbNum.split(",");
    console.log("sps");
    console.log(sps);
    var rgbNew = {
      "r": sps[0],
      "g": sps[1],
      "b": sps[2],
    }
    this.setData({
      'rgbColor': rgb,
      "rgb": rgbNew
    })
    this.sendmqtt();

    // this.sendToDb(hum,temp);
    
    

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

  data: {

    rgbColor: 'rgb(0,154,97)', //初始值
    pick: false,
    rgb: {
      r: null,
      g: null,
      b: null
    },
    // topic:"MQP/rgb",
    // topic:"starplatinumoramqp/rgb",
    // topic:"ZUCC-MQP/rgb",
    topic: "ZUCC-IOTMQP/rgb",
    // topic: "ZUCC-IOTMQP/esp",
    
    // msg:"1"
    // msg:1
  },

  rInput: function (e) {

    this.setData({
      'rgb.r': parseInt(e.detail.value)
    })
  },

  gInput: function (e) {

    this.setData({
      'rgb.g': parseInt(e.detail.value)
    })
  },

  bInput: function (e) {

    this.setData({
      'rgb.b': parseInt(e.detail.value)
    })
  },



  //事件处理函数
  TopicInput: function (e) {
    this.setData({
      topic: e.detail.value
    })
  },

  MsgInput: function (e) {

    this.setData({
      msg: e.detail.value
    })
  },

  //发送mqtt
  sendmqtt: function () {

    // app.globalData.client.publish(this.data.topic, this.data.msg );

    var rgb = JSON.stringify(this.data.rgb);
    app.globalData.client.publish(this.data.topic, rgb);

    // if(this.data.msg==1){
    //   this.data.msg=0;
    // }else{
    //   this.data.msg=1;
    // }
    console.log("发送成功！");


  },




})