import {
	HTTP
} from '../utils/HTTP.js'

const http = new HTTP()

// 获取直播间设置
const getLiveSetting = () => {
	return new Promise((resolve, reject) => {
		http.request({
			url: '/Users/toGetLive',
			header: {
				accesstoken: wx.getStorageSync('access_token')
			},
			success(res) {
				resolve(res)
			}
		})
	})
}
// 修改（保存）直播间配置  
const saveLiveSetting = ({ live_title, live_desc, live_bg, live_url, live_header}) => {
	
	return new Promise((resolve, reject) => {
		http.request({
			url: '/Users/toSetLive',
			header: {
				accesstoken: wx.getStorageSync('access_token')
			},
			data:{
				live_title,
				live_desc,
				live_bg,
				live_url,
				live_header
			},
			success(res) {
				resolve(res)
			}
		})
	})
}

export { getLiveSetting, saveLiveSetting }
