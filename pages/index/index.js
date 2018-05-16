//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    AvatarUrl: "",
    NiceName: "Login...",
    UsePermission: true
  },
  onLoad: function () {
    // 查看是否授权
    var that = this;
    wx.getSetting({
      success: function (res) {
        console.log(res.authSetting);
        if (res.authSetting['scope.userInfo']) {
          that.setData({UsePermission:true})
          that.获取用户信息();
        }
        else{
          wx.showToast({ title: "Access to user information failure!", })
          that.setData({ UsePermission: false })
        }
      }
    })
  },
  bindGetUserInfo: function (e) {
    console.log(e.detail.userInfo)
    if (e.detail.userInfo) {
      this.setData({ UsePermission: true })
      this.获取用户信息();
    } else {
     wx.showToast({
       title: 'Allow permission to be granted',
     })
    }
  },
  获取用户信息: function () {
    var that = this;
    wx.showLoading({ title: 'Logging in' })
    wx.login({
      success: function (res) {
        if (res.code) {
          getApp().globalData.code = res.code;
          console.log('Code=' + res.code);
          wx.getUserInfo({
            success: function (res) {
              getApp().globalData.userInfo = res.userInfo
              if(that.userInfoReadyCallback)  that.userInfoReadyCallback(res)
              console.log(res.userInfo);
              that.setData({
                AvatarUrl: app.globalData.userInfo.avatarUrl,
                NiceName: app.globalData.userInfo.nickName
              })
              that.AutoLogin(res);      //自动登陆
            },
            fail: function () { 
              that.setData({ UsePermission: false })
            }
          })
        }
      }
    })
  },
  //-----自动登陆-----//
  AutoLogin: function (res) {
    //----HTTP登陆请求-----//
    wx.request({
      url: getApp().globalData.HomeUrl + getApp().globalData.LoginUrl,
      data: { 
        "js_code": getApp().globalData.code,
        "nickname": res.userInfo.nickName, 
        "gender": res.userInfo.gender, 
        "province": res.userInfo.province, 
        "city": res.userInfo.city, 
        "avatarUrl": res.userInfo.avatarUrl
      },
      method: 'POST',
      success: function (Ares) {
        wx.hideLoading();
        console.log(Ares.data);
        if (Ares.statusCode == 200) {
          //---登陆成功----//
          getApp().globalData.user_id = Ares.data.user.userId;
          getApp().globalData.integration = Ares.data.user.integration;
        }
        else {
          wx.showModal({
            title: 'Login failure',
            content: 'Interface return：' + Ares.data,
          })
        }
      },
      fail: function () { wx.hideLoading(); wx.showToast({ title: 'Login failure'})}
    })
  },
  点击开门:function(e){
    var that = this;
    wx.showModal({
      title: 'Open the door?',
      content: 'Please confirm whether to open the door and settle',
      confirmText:'Ok',
      cancelText:'Cancel',
      success:function(res){
        if(res.confirm){
          //用户点击确认
          that.开门请求();
        }
      }
    })
  },
  开门请求:function(){
    //----HTTP开门请求-----//
    wx.showLoading({ title: 'Uploading' })
    wx.request({
      url: getApp().globalData.HomeUrl + getApp().globalData.OpenDoorUrl,
      data: {"userId": getApp().globalData.user_id},
      method: 'POST',
      success: function (Ares) {
        wx.hideLoading();
        console.log(Ares.data);
        if (Ares.statusCode == 200) {
          //---开门成功----//
          wx.showToast({title: 'Door is open'})
        }
        else {
          wx.showModal({
            title: 'Open door failure',
            content: 'Interface return：' + Ares.data,
          })
        }
      },
      fail: function () { wx.hideLoading(); wx.showToast({ title: 'Login failure' }) }
    })
  }
})
