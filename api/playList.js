import {
	HTTP
} from '../utils/HTTP.js'

const http = new HTTP()

// 我的直播list
const playList = () => {
	return new Promise((resolve, reject) => {
		http.request({
			url: '/Article/index',
			header:{
				access_token: wx.getStorageSync('access_token')
			},
			success(res) {
				// if(res.status === 1){
				// 	resolve(res)
				// }else{
				// 	reject(res)
				// }
				resolve(res)
			}
		})
	})
}

const playListData = function () {
	return playList().then((result) => {
		return result
	})
}

export { playListData }
