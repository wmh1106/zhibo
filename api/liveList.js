

import {
	HTTP
} from '../utils/HTTP.js'

const http = new HTTP()

// 我的 - 关注list
const likeApi = ()=>{
	return new Promise((resolve,reject)=>{
		http.request({
			url:'/Collection/collArray',
			header:{
				accesstoken: wx.getStorageSync('access_token')
			},
			success(res){
				console.log(res)
				resolve(res)
			}
		})
	})
}

const likeListData = function(){
	return likeApi().then((result)=>{
		return result
	})
}

export { likeListData}
