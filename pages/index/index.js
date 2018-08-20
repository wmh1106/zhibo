import {
    http
} from '../../utils/http2.js'

Page({
    data: {
        // 推荐直播列表
        putlist: [],
        // 轮播
        autoplay: false,
        interval: 5000,
        duration: 1000,
        imgUrls: []
    },
    onReady() {
        this._getSwiperImage()
        this._getIndexPutList()
    },
    onPullDownRefresh(res) {
        this._getSwiperImage()
        this._getIndexPutList()
    },
    goToSearchPage() {
        wx.navigateTo({
            url: '/pages/search/search'
        })
    },
    goToList(event) {
        wx.navigateTo({
            url: './list/list?order=' + event.currentTarget.dataset.type
        })
    },
    goToDetails(event) {
        wx.navigateTo({
            url: '/pages/details/details?id=' + event.currentTarget.dataset.id + '&userId=' + event.currentTarget.dataset.userid
        })
    },
    // 轮播图片
    _getSwiperImage() {
        http({
            url: '/Index/carousel'
        }).then(res => {
            this.setData({
                imgUrls: res
            })
        })
    },
    // 推荐直播列表
    _getIndexPutList() {
        http({
                url: '/Index/putlive'
            })
            .then(res => {
                this.setData({
                    putlist: res
                })
            })
    }
})