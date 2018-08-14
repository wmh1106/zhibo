// 关注  list

import {
	HTTP
} from '../utils/HTTP.js'

const http = new HTTP()

const likeApi = ()=>{
	return new Promise((resolve,reject)=>{
		http.request({
			url:'/Collection/collArray',
			success(res){
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
