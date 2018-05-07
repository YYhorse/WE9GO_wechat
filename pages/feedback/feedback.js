var app = getApp()      // 获取入口文件app的应用实例
Page({
  data: {
  },
  点击提交:function(e){
    console.log(app.globalData.userInfo.nickName);
  }
})