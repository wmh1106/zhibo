import {
    wxPromise
} from '../utils/wxPromise.js'
import {
    http
} from '../utils/http2.js'


// 1. 登陆 , 拿 code
const getLogin = function() {
    const wxLogin = wxPromise(wx.login)
    return wxLogin()
}

// 2. 获取用户信息
const getUserInfo = function() {
    const wxUserInfo = wxPromise(wx.getUserInfo)
    return wxUserInfo()
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

        wx.setStorageSync('access_token', res.access_token)
        wx.setStorageSync('userInfo', {
            avatar_url: res.avatar_url,
            nickname: res.nickname,
            mobile: res.mobile
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

    const checkSession = () => {

        const checkSession = wxPromise(wx.checkSession)

        return checkSession().then(res => true, error => false)

    }

    const getSetting = () => {
        const getSetting = wxPromise(wx.getSetting)
        return getSetting().then(res => {
            return res.authSetting && res.authSetting['scope.userInfo'] ? true : false
        }, error => false)
    }
    const isLoginState = Promise.all([checkSession(), getSetting()])
	
    return isLoginState.then(res => {
        return res.every(e => e === true)
    })
}

export {
    login,
    isShowRegister
}