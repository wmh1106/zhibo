import {
    http
} from '../utils/http2.js'

import {
    formatTime,
    compare
} from '../utils/util.js'


// 推荐、最新、热点
const getIndexList = (type, page) => {

    return http({
        url: '/Article/index',
        // header: {
        //     accesstoken: wx.getStorageSync('access_token')
        // },
        data: {
            order: type,
            page: page
        }
    }).then(res => {
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
        return res
    })
}

// 轮播图片
const getSwiperImage = () => {
    return http({
        url: '/Index/carousel'
    }).then(res => res)
}
// 推荐直播列表
const getIndexPutList = () => {
    return http({
        url: '/Index/putlive'
    }).then(res => res)
}

export {
    getIndexList,
    getSwiperImage,
    getIndexPutList
}