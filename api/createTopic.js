import {
	HTTP
} from '../utils/HTTP.js'

const http = new HTTP()

// 创建话题 title, desc, thumb, stime
const createTopic = (data) => {
	return new Promise((resolve, reject) => {
		http.request({
			url: '/Article/liveAdd',
			header:{
				accesstoken: wx.getStorageSync('access_token')
			},
			data:{
				...data
			},
			success(res) {
				resolve(res)
			}
		})
	})
}

// 修改话题
const editorTopic = () =>{
	return new Promise((resolve, reject) => {
		http.request({
			url: '/Article/liveAdd',
			header: {
				accesstoken: wx.getStorageSync('access_token')
			},
			data: {
				...data
			},
			success(res) {
				resolve(res)
			}
		})
	})
}

export { createTopic, editorTopic }
