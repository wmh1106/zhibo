
Page({

    /**
     * 页面的初始数据
     */
    data: {
        imgUrl: {
            'iconHistory': '/images/icon/icon_history.png',
            'iconStreaming': '/images/icon/icon_streaming.png',
            'iconBindPhone': '/images/icon/icon_bind_phone.png',
            'iconPlugFlow': '/images/icon/icon_plug_flow.png',
            'iconBack': '/images/icon/icon_back.png'
        },
		userHeadImg: '/images/img/demo.jpg',
		nickName : '用户名称'
    },

    onLoad: function(options) {},


    onReady: function() {
		wx.getStorage({
			key: 'userInfo',
			success:  (res)=>{
				this.setData({
					userHeadImg:res.data.avatarUrl,
					nickName : res.data.nickName
				})
				
			} 
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
        if ('有手机号') {
            wx.navigateTo({
                url: './changeBindPhone/changeBindPhone?phone=' + 15000766043
            })
        } else if ('没有手机号') {
            wx.navigateTo({
                url: './phone/phone'
            })
        }

    }
})