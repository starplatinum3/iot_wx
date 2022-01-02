// pages/index.js

const app = getApp()  //全局变量
var mqtt = require('../../utils/mqtt.js');  //引入mqttjs


Page({


  sendToDb:function (x,y,z){
    wx.request({
      url: app.globalData.baseUrl+"/acc/save",
   
      method:"POST",
      data: {
        "createTime": new Date(),
   
        "x": x,
        "y": y,
        "z": z
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
    topic: 'ZUCC-IOTMQP/adxl',
    resAcc:{x:1,y:1,z:1},
    xs:[],
    ys:[],
    zs:[]
  },
  // onReady
  stopSub(){
    app.globalData.client.unsubscribe(this.data.topic)
  },

  enQueue(deq,val){
    deq.push(val)
    if(deq.length>=10){
      deq.shift()
    }
  },
  onReady(){
    console.log("onReady");
    app.globalData.client.subscribe(this.data.topic);
    var that=this
    app.globalData.client.on('message', function (topic, payload) {
      console.log("topic");
      console.log(topic);
   
      console.log(" that.data");
      console.log(that.data);
      if(topic!=that.data.topic){
           return
      }
    

       var receive=JSON.parse(payload);
      var xs= that.data.xs
      // xs.push(receive.x)
      // if(xs.length>=10){
      //   xs.shift()
      // }

      that.enQueue(xs,receive.x)
       that.setData({
         xs:xs
       })
     console.log("that.data.xs");
     console.log(that.data.xs);
       console.log("receive");
       console.log(receive);
    //  这里接收数据就很慢了
       that.setData({
        resAcc:receive
      })

    that.  sendToDb(receive.x,receive.y,receive.z)
    })
  },

  startCompass: function() {
    var that = this
    console.log("startCompass");
    wx.startCompass({ //启动罗盘传感器监听功能
      success: function() {
        wx.onCompassChange(function(res) { //监听罗盘传感器
          that.setData({
            resCompass: res  //res为回调函数的参数，监听数据赋值给resCompass，监听数据都在回调函数的参数res里面
          })
        })
      }
    })
  },
  stopCompass: function() {
    var that = this;
    wx.stopCompass({ //停止罗盘传感器监听功能
      success: function(res) {
        console.log('罗盘已经停止！')
      }
    })
  },
  startAcc: function() {
    var that = this;
    wx.startAccelerometer({ //启动加速度感器监听功能
      success: function() {
        wx.onAccelerometerChange(function(res) { //监听罗盘传感器
          that.setData({
            resAcc: res  //res为回调函数的参数
          })
        })
      }
    })
  },
  stopAcc: function() {
    wx.stopAccelerometer({ //停止罗盘传感器监听功能
      success: function(res) {
        console.log('已停止加速度传感器监听！')
      }
    })
  },

  startGyroscope: function() {
    var that = this;
    wx.startGyroscope({ //启动陀螺仪传感器监听功能
      success: function(res) {
        wx.onGyroscopeChange(function(res) { //监听陀螺仪传感器
          that.setData({
            resGyroscope: res  //res为回调函数的参数
          })
        })
      }
    })
  },
  stopGyroscope: function() {
    wx.stopGyroscope({ //停止陀螺仪传感器监听功能
      success: function(res) {
        console.log('已停止陀螺仪传感器监听！')
      }
    })
  }
})