var app = getApp()      // 获取入口文件app的应用实例
Page({
  data: {
    feedinfo:null,
    nowTime:null,
  },
  点击提交:function(e){
    var that = this;
    console.log(getApp().globalData.userInfo.nickName);
    //----HTTP意见反馈-----//
    wx.showLoading({ title: 'Uploading' })
    that.获取当前时间();
    wx.request({
      url: getApp().globalData.HomeUrl + getApp().globalData.FeedbackUrl,
      data: { 
        "userId": getApp().globalData.user_id,
        "feedback": that.data.nowTime + "'"+getApp().globalData.userInfo.nickName + "':" + that.data.feedinfo
      },
      method: 'POST',
      success: function (Ares) {
        wx.hideLoading();
        console.log(Ares.data);
        if (Ares.statusCode == 200) {
          wx.showToast({ title: 'Submitted successfully' })
          wx.navigateBack();
        }
        else {
          wx.showModal({
            title: 'Submitted failure',
            content: 'Interface return：' + Ares.data,
          })
        }
      },
      fail: function () { wx.hideLoading(); wx.showToast({ title: 'Submitted failure' }) }
    })
  },
  输入内容:function(e){
    this.setData({ feedinfo:e.detail.value})
  },
  获取当前时间:function(){
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    console.log("当前时间戳为：" + timestamp);
    //获取当前时间  
    var n = timestamp * 1000;
    var date = new Date(n);
    var Y = date.getFullYear(); //年  
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1); //月  
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();  //日  
    var h = date.getHours(); //时  
    var m = date.getMinutes(); //分  
    var s = date.getSeconds();  //秒 
    this.setData({  nowTime: Y + M + D + ' ' + h + ":" + m + ":" + s })
    console.log("当前时间：" + Y + M + D + h + ":" + m + ":" + s);
  }
})