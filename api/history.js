
import {
	HTTP
} from '../utils/HTTP.js'

import {
	formatTime,
	compare
} from '../utils/util.js'

const http = new HTTP()

// 我的 - 历史list
const historyList = (page) => {
	return new Promise((resolve, reject) => {
		http.request({
			url: '/Collection/historyArray',
			header: {
				accesstoken: wx.getStorageSync('access_token')
			},
			data: { page},
			success(res) {
				// 处理数据
				const list = res.data.map(item => {
					let state = ''
					switch (item.stauts) {
						case 0:
							state = '审核中'
							break
						case 1:
							state = '已审核'
							break
						case 2:
							state = '直播中'
							break
						case 3:
							state = '已结束'
							break
						default:
							state = '未知'
					}

					return {
						...item,
						state,
						created: formatTime(item.created)
					}
				})
				res.data = list;
				resolve(res)
			}
		})
	})
}

const historyAdd = (id)=>{
	return new Promise((resolve, reject) => {
		http.request({
			url: '/Collection/historyAdd',
			header: {
				accesstoken: wx.getStorageSync('access_token')
			},
			data:{id},
			success(res) {
				resolve(res)
			}
		})
	})
}

export { historyList, historyAdd}
