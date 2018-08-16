import {
	HTTP
} from '../utils/HTTP.js'

const http = new HTTP()

// 我的 - 关注list
const live = (userid) => {
	return new Promise((resolve, reject) => {
		http.request({
			url: '/Collection/collAdd',
			header: {
				accesstoken: wx.getStorageSync('access_token')
			},
			data:{
				userid
			},
			success(res) {
				resolve(res)
			}
		})
	})
}

export { live }
