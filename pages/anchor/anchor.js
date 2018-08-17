import {
    getMyList
} from '../../api/myList.js'

// import {} from "../index/index.js"

import {
    getLiveSetting
} from '../../api/liveSetting.js'

Page({

    data: {
        myList: [],

        live_bg: '',
        live_desc: '',
        live_title: '',
        live_url: '',
        live_header: '',
		fans:''
    },
    onLoad() {
        this._apiGetMyList()
        this._apiGetLiveSetting()
    },
    onReady() {

    },

    goToCreatTopic() {
        wx.navigateTo({
            url: './createTopic/createTopic'
        })
    },
	goToSetting(){
		wx.navigateTo({
			url: './editorAnchor/editorAnchor'
		})
	},
	goToSearch(){
		wx.navigateTo({
			url: '../search/search'
		})
	},
	goToAnchorDetails(){
		wx.navigateTo({
			url: './anchorDetails/anchorDetails'
		})
	},

    _apiGetMyList() {
        getMyList().then(res => {
            this.setData({
                myList: res.data
            })
        }).catch(error => {})
    },
    _apiGetLiveSetting() {
        getLiveSetting().then(res => {
            wx.setStorageSync('live_bg', res.live_bg)
            wx.setStorageSync('live_desc', res.live_desc)
            wx.setStorageSync('live_title', res.live_title)
            wx.setStorageSync('live_url', res.live_url)
			wx.setStorageSync('live_header', res.headimgurl)

            if (res.live_desc && res.live_title) {
                this.setData({
					live_bg: res.live_bg,
                    live_desc: res.live_desc,
                    live_title: res.live_title,
                    live_url: res.live_url,
					live_header: res.headimgurl,
					fans: res.fans
                })
            } else {
                wx.reLaunch({
                    url: "./editorAnchor/editorAnchor"
                })
            }
        })
    }
})