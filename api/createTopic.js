import {
	HTTP
} from '../utils/HTTP.js'

const http = new HTTP()

// 创建话题
const createTopicApi = (data) => {
	console.log(data)
	return new Promise((resolve, reject) => {
		http.request({
			url: '/Article/liveAdd',
			data:data,
			success(res) {
				if (res.status === 1){
					resolve(res)
				}else{
					reject(res)
				}
			}
		})
	})
}

export { createTopicApi }
