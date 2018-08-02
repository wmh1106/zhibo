// pages/user/endBindPhone/endBindPhone.js
Page({
    data: {
        phone:''
    },
    onLoad(event){
        this.setData({
            phone: event.phone
        })
        // console.log()
    },
    goToBindPhonePage() {
        wx.navigateTo({
            url: '../phone/phone',
        })
    }
})