import {
    http
} from '../utils/http2.js'


// 创建话题 
const createTopic = ({ title, desc, thumb, stime}) => {
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
const editorTopic = () => {

    return http({
        url: '/Article/liveAdd',
        header: {
            accesstoken: wx.getStorageSync('access_token')
        },
        data: {
			
        }
    }).then(res => res)

}

export {
    createTopic,
    editorTopic
}