import {
    http
} from '../utils/http2.js'
import {
    formatTime,
    compare
} from '../utils/util.js'

// 我的 - 关注list
const likeListData = () => {
    return http({
        url: '/Collection/collArray',
        header: {
            accesstoken: wx.getStorageSync('access_token')
        }
    }).then(res => res)
}
// 添加 关注
const live = (userid) => {
    return http({
        url: '/Collection/collAdd',
        header: {
            accesstoken: wx.getStorageSync('access_token')
        },
        data: {
            userid
        }
    }).then(res => {
		console.log(res)
		return res
	})

}
// 取消关注 /Collection/collDel 
const liveDel = (userid) => {
	return http({
		url: '/Collection/collDel',
		header: {
			accesstoken: wx.getStorageSync('access_token')
		},
		data: {
			userid
		}
	}).then(res => res)

}
export {
    live,
	liveDel,
    likeListData
}