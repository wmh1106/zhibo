import {
    details
} from '../../api/details.js'

import {
    wxPromise
} from '../../utils/wxPromise.js'

import {
    live,
    liveDel
} from '../../api/live.js'

import {
    historyAdd
} from '../../api/history.js'

const showToast = wxPromise(wx.showToast)

Page({
    data: {
        id: -1,
        userId: -1,
        // tab 索引
        currentTab: 0,
        // 主播 list
        list: [],

        // 其他信息
        info: {},

        live: false
    },
    onLoad: function(options) {
        this._apiDetails(options.id)
        this._apiHistoryAdd(options.userId)
        this.setData({
            id: options.id,
            userId: options.userId,
        })
    },

    clickTab(event) {
        const current = parseInt(event.currentTarget.dataset.current)
        this.setData({
            currentTab: current
        })
    },

    handleLive() {
        console.log(this.data.live)
        if (this.data.live) {
            this._apiLiveDel(this.data.userId)
        } else {
            this._apiLiveAdd(this.data.userId)
        }
        this.setData({
            live: !this.data.live
        })

    },

    onShareAppMessage: function(event) {
        console.log(event)
    },

    _apiLiveAdd(userId) {
        live(userId).then(res => {
            showToast({
                title: '关注成功',
                icon: 'none',
                duration: 1000
            })
        }).catch(error => {
            console.log(error)
        })
    },

    _apiLiveDel(userId) {
        liveDel(userId).then(res => {
            showToast({
                title: '取消成功',
                icon: 'none',
                duration: 1000
            })
        }).catch(error => {
            console.log(error)
        })
    },
    _apiDetails(id) {
        const _this = this
        details(id).then(res => {

            this.setData({
                list: res.datas,
                info: res.info,
                id: id,
				live: res.isColl ? true : false
            })
        }).catch(error => {
            console.log(error)
        })
    },
    _apiHistoryAdd(id) {
        historyAdd(id).then(res => {
            console.log(res)
        }).catch(error => {
            console.log(error)
        })
    }
})