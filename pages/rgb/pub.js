//index.js
//获取应用实例
const app = getApp()
var mqtt = require('../../utils/mqtt.js');

Page({

  data: {
    rgb:{
      r:null,
      g:null,
      b:null
    },
    // topic:"MQP/rgb",
    topic:"starplatinumoramqp/rgb",
    // msg:"1"
    // msg:1
  },

 rInput:function(e){
   
    this.setData({
      'rgb.r':parseInt(e.detail.value)
    })
  },

  gInput:function(e){
   
    this.setData({
      'rgb.g':parseInt(e.detail.value)
    })
  },

  bInput:function(e){
   
    this.setData({
      'rgb.b':parseInt(e.detail.value)
    })
  },



  //事件处理函数
  TopicInput:function(e){
    this.setData({
      topic:e.detail.value
    })
  },

  MsgInput:function(e){
   
    this.setData({
      msg:e.detail.value
    })
  },

  //发送mqtt
  sendmqtt: function() {
   
    // app.globalData.client.publish(this.data.topic, this.data.msg );

    var rgb= JSON.stringify(this.data.rgb);
    app.globalData.client.publish(this.data.topic, rgb );

    // if(this.data.msg==1){
    //   this.data.msg=0;
    // }else{
    //   this.data.msg=1;
    // }
    console.log("发送成功！");
    
    
  },
  
  

  
})
