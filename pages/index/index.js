//index.js
var config = require('../../config.js');
var app = require('../../app.js');
//获取应用实例
Page({
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    autoplay: false,
    interval: 5000,
    duration: 1000
  },
  //事件处理函数
  bindViewTap(){
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function() {

  },
  getUserInfo: app.getUserInfo,

    goToSearchPage(){
        wx.navigateTo({
            url: './search/search'
        })
    }
})