import {
    HTTP
} from '../utils/HTTP.js'

const http = new HTTP()

// 1. 登陆 , 拿 code
const getLogin = function() {
    return new Promise((resolve, reject) => {
        wx.login({
            success(res) {
                if (res.code) {
                    return resolve(res)
                } else {
                    return reject(res)
                }
            },
            fail(error) {
                reject(error)
            }
        });
    })
}

// 2. 获取用户信息
const getUserInfo = function() {
    return new Promise((resolve, reject) => {
        wx.getUserInfo({
            success(res) {
                return resolve(res)
            },
            fail(error) {
                reject(error)
            }
        });
    })
}

// 3. 发送服务端：微信用户授权 /Login
const userAgreeLoginApi = function(option) {
    return new Promise((resolve, reject) => {
        http.request({
			url: '/Login',
            data: {
				code: option.code,
				encryptedData: option.encryptedData,
				iv:option.iv,
				userInfo: option.userInfo
            },
            success(res) {
				wx.setStorageSync('access_token', res.data.access_token)
                return resolve(res)
            }
        });
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
		.catch((error)=>{
			console.log(error)	
			return {
				...error,
				fail:true
			}
		})
}

// 判断用户是否 授权 && 登录
const isShowRegister = function () {

	const checkSession = new Promise(function (resolve, reject) {
		wx.checkSession({
			success: (res) => {
				console.log('登录', res)
				resolve(false)
			},
			fail: (res) => {
				console.log('未登录', res)
				resolve(true)
			}
		})


	})

	const getSetting = new Promise(function (resolve, reject) {
		wx.getSetting({
			success: res => {
				if (res.authSetting && res.authSetting['scope.userInfo']) {
					console.log('授权', res)
					resolve(false)
				} else {
					console.log('未授权', res)
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