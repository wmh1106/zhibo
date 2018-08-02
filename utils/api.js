import { config} from '../config.js'
// wx：login
const getLogin = function () {
    return new Promise((resolve, reject) => {
        wx.login({
            success(res) {
                if (res.code && res.errMsg === "login:ok") {
                    return resolve(res)
                } else {
                    console.error('登录失败！' + res.errMsg)

                    return reject(res)
                }
            },
            fail(error) {
                reject(error)
            }
        });
    })
}
// api：微信用户授权
const getUserAgreedApi = function (code) {
    return new Promise((resolve, reject) => {
        wx.request({
            url: config.service.initLoginUrl,
            data: {
                code: code
            },
            success(res) {
                return resolve(res)
            },
            fail(error) {
                return reject(error)
            }
        });
    })
}

// api：保存微信授权信息
const saveUserInfo = function(data){
    return new Promise((resolve,reject)=>{
        wx.request({
            url: config.service.saveWxInfoUrl,
            data: {
                openid: data.openid,
                code: data.code,
                encryptedData: data.encryptedData,
                iv: data.iv,
                userInfo: data.userInfo,
            },
            success(res) {
                return resolve(res)
            },
            error(error){
                return reject(error)
            }
        });
    })
}




export {
    getLogin,
    getUserAgreedApi,
    saveUserInfo
}