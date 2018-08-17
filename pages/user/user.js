Page({
    data: {
        imgUrl: {
            'iconHistory': '/images/icon/icon_history.png',
            'iconStreaming': '/images/icon/icon_streaming.png',
            'iconBindPhone': '/images/icon/icon_bind_phone.png',
            'iconPlugFlow': '/images/icon/icon_plug_flow.png',
            'iconBack': '/images/icon/icon_back.png'
        },
		userHeadImg: '/images/img/demo.jpg',
		nickName : '用户名称',
		mobile: ''
    },

    onLoad: function(options) {},


    onReady: function() {
		const userInfo = wx.getStorageSync('userInfo')
		this.setData({
			userHeadImg: userInfo.avatar_url,
			nickName: userInfo.nickname,
			mobile: userInfo.mobile
		})
    },

    goToLive: function() {
        wx.navigateTo({
            url: './live/live'
        })
    },
    goToHistory: function() {
        wx.navigateTo({
            url: './history/history'
        })
    },
    goToFlow: function() {
        wx.navigateTo({
            url: './flow/flow'
        })
    },
    goToPhone: function() {
		if (this.data.mobile) {
            wx.navigateTo({
				url: './changeBindPhone/changeBindPhone?phone=' + this.data.mobile
            })
        } else {
            wx.navigateTo({
                url: './phone/phone'
            })
        }

    }
})