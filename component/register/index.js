import {
    getLogin,
    getUserAgreedApi,
    saveUserInfo
} from '../../utils/api.js'
import runtime from '../../utils/runtime.js'

Component({
    properties: {

    },
    data: {
        isShow: true
    },
    methods: {
        getUserInfo(e) {
            if (e.detail.userInfo) {
                this.setData({
                    isShow: false
                })
            }
            wx.getSetting({
                success: function(res) {
                    console.log(res)
                    if (res.authSetting['scope.userInfo']) {
                        getLogin().then((res) => {
                            const code = res.code;
                            console.log(code,'+++++++++++++++')
                            wx.getUserInfo({
                                success(res) {
                                    const {
                                        encryptedData,
                                        iv,
                                        userInfo
                                    } = {
                                        res
                                    }
                                    getUserAgreedApi(res.code).then(res => {
                                        const data = {
                                            openid: res.data.openid,
                                            code: code,
                                            encryptedData: encryptedData,
                                            iv: iv,
                                            userInfo: userInfo,
                                        }

                                        wx.setStorage({
                                            key: 'userInfo',
                                            data: userInfo,
                                        })

                                        saveUserInfo(data).then(res=>{
                                            console.log(res)
                                        })
                                    })
                                }
                            })
                        }).catch(error => {
                            console.log(error)
                        })
                    }
                },
                fail(error) {
                    console.error(error)
                }
            })
        }
    }
})