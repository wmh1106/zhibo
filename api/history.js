import {
    http
} from '../utils/http2.js'

import {
    formatTime,
    compare
} from '../utils/util.js'

// 我的 - 历史list
const historyList = (page) => {
    return http({
        url: '/Collection/historyArray',
        header: {
            accesstoken: wx.getStorageSync('access_token')
        },
        data: {
            page
        }
    }).then(res => {
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
        res.data = list
        return res
    })

}

// 添加历史记录
const historyAdd = (id) => {
	return http({
		url: '/Collection/historyAdd',
		header: {
			accesstoken: wx.getStorageSync('access_token')
		},
		data: {
			id
		}
	}).then(res => res)
}

export {
    historyList,
    historyAdd
}