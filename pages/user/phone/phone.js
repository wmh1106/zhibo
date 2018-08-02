import {
    HTTP
} from '../../../utils/HTTP.js'

const http = new HTTP()

Page({
    data: {
        codeText: '获取验证码',
        isShowCountDown: false,
        countDown: 60,
        phoneInfo:{
            number:'',
            code:''
        }
    },
    getCode() {
        if (this.data.isShowCountDown) return

        this.setData({
            isShowCountDown: true
        })

        let tiemr = setInterval(() => {
            let count = this.data.countDown
            count -= 1
            if (count <= 0) {
                clearInterval(tiemr)
                this.setData({
                    isShowCountDown: false,
                    countDown: 60
                })
                return;
            }
            this.setData({
                countDown: count
            })
        }, 1000)

        http.request({
            url: '/Index/sendSms',
            method: 'POST',
            data: {
                mobile: 15000766043
            },
            success(data) {
                console.log(data)
            },
            error(msg) {
                console.error(msg)
                
                wx.showToast({
                    title: msg,
                    icon:'none',
                    mask:true
                })
            },
            fail(error) {
                console.error(error)
                wx.showToast({
                    title: String(error),
                    mask: true
                })
            }
        })
    },

    bindPhone(){
        http.request({
            url:'/Users/bindUserMobile',
            data:{
                sUserName:0,
                    sVerCode:0
            },
            success(data) {
                console.log(data)
            },
            error(msg) {
                wx.showToast({
                    title: msg,
                    icon: 'none',
                    mask: true
                })
            },
            fail(error) {
                wx.showToast({
                    title: error.errMsg,
                    mask: true
                })
            }
        })
    }
})