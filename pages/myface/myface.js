var app = getApp()      // 获取入口文件app的应用实例
Page({
  data: {
    faceUrl:null,
    buttonInfo:"Upload face image",
    image_photo: '',
  },
  onLoad: function (options) {
    this.获取用户人脸();
  },
  获取用户人脸:function(){
    var that = this;
    wx.showLoading({ title: 'Loading' })
    wx.request({
      url: getApp().globalData.HomeUrl + getApp().globalData.GetFaceInfoUrl,
      data: { "userId": getApp().globalData.user_id },
      method: 'GET',
      success: function (Ares) {
        wx.hideLoading();
        console.log(Ares.data);
        if (Ares.statusCode == 200) {
          //---人脸信息成功----//
          if(Ares.data.image_url!=null){
            that.setData({
              buttonInfo: "Update face",
              faceUrl: Ares.data.image_url
            })
          }
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
  },
  点击更换头像:function(e){
    var that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有  
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
      success: function (res) {
        var tempFilePaths = res.tempFilePaths;
        that.setData({ faceUrl: tempFilePaths[0] });
        that.上传面部请求();
      }
    })
  },
  上传面部请求:function(){
    var that = this;
    wx.showLoading({ title: 'Uploading' });
    wx.uploadFile({
      url: getApp().globalData.HomeUrl + getApp().globalData.UpdataFaceUrl,
      filePath: that.data.faceUrl,
      name: 'avatar',
      formData: {'userId': app.globalData.user_id},
      success: function (Ares) {
        console.log(Ares.data);
        wx.hideLoading();
        if (Ares.statusCode == 200) {
          console.log('Upload success');
          wx.showModal({
            title: 'Success',
            content: 'Your face information is uploaded!',
            success: function (res) {
              if (res.confirm || res.cancel) {
                wx.navigateBack();
              }
            }
          })
        }
        else {
          wx.showModal({
            title: 'Error',
            content: 'Inter error=' + Ares.data,
            success: function (res) {
              if (res.confirm || res.cancel)
                wx.navigateBack();
            }
          })
        }
      },
      fail: function () {
        wx.hideLoading();
        wx.showToast({ title: 'Error,the Service is error!', })
      }
    })
  },
  显示ID:function(e){
    wx.showModal({
      title: 'UserId',
      content: getApp().globalData.user_id
    })
  }
})