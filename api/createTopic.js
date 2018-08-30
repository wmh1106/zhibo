import {
    http
} from '../utils/http2.js'


// 创建话题 
const topicCreate = ({ title, desc, thumb, stime}) => {
    return http({
        url: '/Article/liveAdd',
        header: {
            accesstoken: wx.getStorageSync('access_token')
        },
        data: {
			title, desc, thumb, stime
        }
    }).then(res => res)
}

// 修改话题
const topicEditor = (id) => {

    return http({
		url: '/Article/liveEdit',
        header: {
            accesstoken: wx.getStorageSync('access_token')
        },
        data: {
			id
        }
    }).then(res => res)

}

// 获取话题详情
const topicDetails = (id) => {
	return http({
		url: '/Article/liveDetails',
		header: {
			accesstoken: wx.getStorageSync('access_token')
		},
		data: {
			id
		}
	}).then(res => res)

}



export {
    topicCreate,
    topicEditor,
	topicDetails
}