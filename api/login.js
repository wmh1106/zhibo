import {
    wxPromise
} from '../utils/wxPromise.js'
import {
    http
} from '../utils/http2.js'


// 1. 登陆 , 拿 code
const getLogin = function() {

    const wxLogin = wxPromise(wx.login)

    return wxLogin().then(res => {
        if (res.code) {
            return res
        } else {
            return new Error(res)
        }
    })
}

// 2. 获取用户信息
const getUserInfo = function() {

    const wxUserInfo = wxPromise(wx.getUserInfo)
    return wxUserInfo().then(res => res)

}

// 3. 发送服务端：微信用户授权 /Login
const userAgreeLoginApi = function(option) {

    return http({
        url: '/Login',
        data: {
            code: option.code,
            encryptedData: option.encryptedData,
            iv: option.iv,
            userInfo: option.userInfo
        }
    }).then(res => {

        wx.setStorage({
            key: "access_token",
            data: res.access_token
        })
        wx.setStorage({
            key: "userInfo",
            data: {
                avatar_url: res.avatar_url,
                nickname: res.nickname,
                mobile: res.mobile
            }
        })

        return res

    })

}

// 组合上面1，2，3步骤，并返回出去
const login = function() {

    const option = {}

    return getLogin()
        .then((result) => {
            option.code = result.code
            return getUserInfo()
        })
        .then((result) => {
            option.encryptedData = result.encryptedData
            option.iv = result.iv
            option.userInfo = result.userInfo
            return userAgreeLoginApi(option)
        })
}

// 判断用户是否 授权 && 登录
const isShowRegister = function() {

    const checkSession = new Promise(function(resolve, reject) {
        wx.checkSession({
            success: (res) => {
                resolve(false)
            },
            fail: (res) => {
                resolve(true)
            }
        })


    })

    const getSetting = new Promise(function(resolve, reject) {
        wx.getSetting({
            success: res => {
                if (res.authSetting && res.authSetting['scope.userInfo']) {
                    resolve(false)
                } else {
                    resolve(true)
                }
            },
            fail: error => {
                console.log('未授权', error)
                resolve(true)
            }
        })
    })

    return Promise.all([checkSession, getSetting])
}

export {
    login,
    isShowRegister
}