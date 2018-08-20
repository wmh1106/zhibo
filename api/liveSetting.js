import {
    http
} from "../utils/http2.js"

// 获取直播间设置
const getLiveSetting = () => {
    return http({
        url: '/Users/toGetLive',
        header: {
            accesstoken: wx.getStorageSync('access_token')
        },
    }).then(res => res)
}
// 修改（保存）直播间配置  
const saveLiveSetting = ({
    live_title,
    live_desc,
    live_bg,
    live_url,
    live_header
}) => {

    return http({
        url: '/Users/toSetLive',
        header: {
            accesstoken: wx.getStorageSync('access_token')
        },
        data: {
            live_title,
            live_desc,
            live_bg,
            live_url,
            live_header
        }
    }).then(res => res)
}

export {
    getLiveSetting,
    saveLiveSetting
}