import {
    http
} from '../utils/http2.js'

// 我的 - 手机 - 验证码
const getCode = (phoneNumber) => {

    return http({
        url: '/Index/sendSms',
        header: {
            accesstoken: wx.getStorageSync('access_token')
        },
        data: {
            mobile: phoneNumber
        }
    }).then(res => res)

}


// 我的 - 手机 - 绑定手机
const bindPhone = (sUserName, sVerCode) => {

    return http({
        url: '/Users/toBindTel',
        header: {
            accesstoken: wx.getStorageSync('access_token')
        },
        data: {
            sUserName,
            sVerCode
        }
    }).then(res => res)

}

export {
    getCode,
    bindPhone
}