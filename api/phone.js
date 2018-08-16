import {
	HTTP
} from '../utils/HTTP.js'

const http = new HTTP()

// 我的 - 手机 - 验证码
const getCode = (phoneNumber) => {
	return new Promise((resolve, reject) => {
		http.request({
			url: '/Index/sendSms',
			header: {
				accesstoken: wx.getStorageSync('access_token')
			},
			data:{
				mobile:phoneNumber
			},
			success(res) {
				resolve(res)
			}
		})
	})
}


// 我的 - 手机 - 绑定手机
const bindPhone = (sUserName, sVerCode) => {
	return new Promise((resolve, reject) => {
		http.request({
			url: '/Users/toBindTel',
			header: {
				accesstoken: wx.getStorageSync('access_token')
			},
			data: {
				sUserName,
				sVerCode
			},
			success(res) {
				resolve(res)
			}
		})
	})
}

export { getCode, bindPhone }
