//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    text: "Page animation",
    animation: '',
    topic: 'ZUCC-IOTMQP/adxl'
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数


  },


  getAnim() {
    //实例化一个动画
    this.animation = wx.createAnimation({
      // 动画持续时间，单位ms，默认值 400
      duration: 1000,
      /**
       * http://cubic-bezier.com/#0,0,.58,1  
       *  linear  动画一直较为均匀
       *  ease    从匀速到加速在到匀速
       *  ease-in 缓慢到匀速
       *  ease-in-out 从缓慢到匀速再到缓慢
       * 
       *  http://www.tuicool.com/articles/neqMVr
       *  step-start 动画一开始就跳到 100% 直到动画持续时间结束 一闪而过
       *  step-end   保持 0% 的样式直到动画持续时间结束        一闪而过
       */
      timingFunction: 'linear',
      // 延迟多长时间开始
      delay: 100,
      /**
       * 以什么为基点做动画  效果自己演示
       * left,center right是水平方向取值，对应的百分值为left=0%;center=50%;right=100%
       * top center bottom是垂直方向的取值，其中top=0%;center=50%;bottom=100%
       */
      transformOrigin: 'left top 0',
      success: function (res) {
        console.log(res)
      }
    })
  },

  onReady: function () {
    // 页面渲染完成
    app.globalData.client.subscribe(this.data.topic);
    var topic = this.data.topic;
    console.log("topic");
    console.log(topic);
    let that = this
    // unction (topic, message, packet) {
    // https://blog.csdn.net/weixin_30614587/article/details/98610910
    // app.globalData.client.on('message', function (topic, message, packet) {
    app.globalData.client.on('message', function (topic, payload) {
      console.log("topic");
      console.log(topic);

      console.log(" that.data");
      console.log(that.data);
      // console.log(" packet.payload");
      // console.log(packet.payload);

      var receive = JSON.parse(payload);
      console.log("receive");
      console.log(receive);
      that.translateXY(receive.x, receive.y)

    })
  },

  /**
   * 旋转
   */
  rotate: function () {
    //顺时针旋转10度
    //
    this.animation.rotate(150).step()
    this.setData({
      //输出动画
      animation: this.animation.export()
    })
  },
  scaleY(y) {
    // 230*240/300
    return y * 230 / 300;
    // if(y>230){
    //   return 230;
    // }
    // if(y<-230){
    //   return -230;
    // }
  },

  scaleX(x) {
    // 230*240/300
    return x * 150 / 300;
    // if(y>230){
    //   return 230;
    // }
    // if(y<-230){
    //   return -230;
    // }
  },
  translateY() {
    let anim = wx.createAnimation({
      duration: 200,
      timingFunction: 'linear',
      delay: 0,
    });
    // anim.translateY(500).step();
    // (-111 就出去了
    // anim.translateY(255).step().translateY(110).step().translateY(-111).step()
    // anim.translateY(255).step().translateY(0).step().translateY(-111).step()
    // 0 在最上面
    // anim.translateY(255).step().translateY(0).step()
    // anim.translateY(255).step().translateY(0).step().translateY(-255).step()
    // anim.translateX(150).step().translateX(-150).step().translateX(-160).step()
    // 320 160  , 80 /2==40 120
    // anim.translateX(140).step()
    anim.translateX(120).step()
    this.setData({
      //输出动画
      animation: anim
    })
  },
  translateXY(x, y) {
    // wx.anim
    let anim = wx.createAnimation({
      duration: 200,
      timingFunction: 'linear',
      delay: 0,
    });
    // anim.translateY(500).step();
    // (-111 就出去了
    // anim.translateY(255).step().translateY(110).step().translateY(-111).step()
    // anim.translateY(255).step().translateY(0).step().translateY(-111).step()
    // 0 在最上面
    // anim.translateY(255).step().translateY(0).step()
    // anim.translateY(255).step().translateY(0).step().translateY(-255).step()
    // anim.translateX(150).step().translateX(-150).step().translateX(-160).step()
    // 320 160  , 80 /2==40 120
    // anim.translateX(140).step()
    anim.translateX(this.scaleX(x)).translateY(this.scaleX(y)).step()
    this.setData({
      //输出动画
      animation: anim
    })
  },


  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})