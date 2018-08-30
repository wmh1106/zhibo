import {
	isShowRegister
} from '../../api/login.js'

import {
    getMyList
} from '../../api/myList.js'

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
        fans: ''
    },
	onShow() {
		// 判断是否登录
		isShowRegister().then(res => {
			if (!res) {
				wx.navigateTo({
					url: '/pages/login/login'
				})
			}else{
				this._apiGetMyList()
				this._apiGetLiveSetting()
			}
		})
	},
    goToCreatTopic() {
        wx.navigateTo({
            url: './createTopic/createTopic'
        })
    },
    goToSetting() {
        wx.navigateTo({
            url: './editorAnchor/editorAnchor'
        })
    },
    goToSearch() {
        wx.navigateTo({
            url: '../search/search'
        })
    },
    goToAnchorDetails(event) {
        const id = event.currentTarget.dataset.id
        const time = event.currentTarget.dataset.time
        const bg = event.currentTarget.dataset.bg
        wx.navigateTo({
            url: `./anchorDetails/anchorDetails?id=${id}&bg=${bg}&time=${time}`
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
                wx.showModal({
                    title: '新建主播',
                    content: '您不是主播，是否进入主播设置',
                    success: function(res) {
                        if (res.confirm) {
                            wx.navigateTo({
                                url: "./editorAnchor/editorAnchor"
                            })
                        } else if (res.cancel) {
                            wx.switchTab({
                                url: "/pages/index/index"
                            })
                        }
                    }
                })
            }
        })
    }
})