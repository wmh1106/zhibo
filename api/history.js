
import {
	HTTP
} from '../utils/HTTP.js'

const http = new HTTP()

// 我的 - 历史list
const historyApi = () => {
	return new Promise((resolve, reject) => {
		http.request({
			url: '/Collection/historyArray',
			header: {
				accesstoken: wx.getStorageSync('access_token')
			},
			success(res) {
				// if(res.status === 1){
				// 	resolve(res)
				// }else{
				// 	reject(res)
				// }
				console.log(res)
				resolve(res)
				
			}
		})
	})
}

const historyListData = function () {
	return historyApi().then((result) => {
		return result
	})
}

export { historyListData }
