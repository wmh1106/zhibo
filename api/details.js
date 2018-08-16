import {
	HTTP
} from '../utils/HTTP.js'

import {
	formatTime,
	compare
} from '../utils/util.js'

const http = new HTTP()

// 直播详情
const details = (id) => {
	return new Promise((resolve, reject) => {
		http.request({
			url: '/Article/liveDetails', 
			header: {
				accesstoken: wx.getStorageSync('access_token')
			},
			data: {
				id
			},
			success: (res) => {

				// 处理数据
				const list = res.datas.map(item => {
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
				res.datas = list
				resolve(res)
			}
		})
	})
}


export { details }
