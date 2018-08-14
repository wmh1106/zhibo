import {
	HTTP
} from '../utils/HTTP.js'

const http = new HTTP()

// 我的 - 关注list
const live = (id) => {
	return new Promise((resolve, reject) => {
		http.request({
			url: '/Collection/collAdd',
			header: {
				accesstoken: wx.getStorageSync('access_token')
			},
			data:{
				id
			},
			success(res) {
				console.log(res)
				resolve(res)
			}
		})
	})
}

export { live }
