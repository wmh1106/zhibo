import {
    getSwiperImage,
    getIndexPutList
} from '../../api/indexList.js'

import {
	isShowRegister
} from '../../api/login.js'

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
	onLoad(){
		getIndexPutList().then(res => {
			this.setData({
				putlist: res
			})
		})

		getSwiperImage().then(res => {
			this.setData({
				imgUrls: res
			})
		})
	},
	onShow(){
		// 判断是否登录
		isShowRegister().then(res => {
			if(!res){
				wx.navigateTo({
					url: '/pages/login/login'
				})
			}
		})
	},
    onPullDownRefresh() {
        getIndexPutList().then(res => {
            this.setData({
                putlist: res
            })
        })

        getSwiperImage().then(res => {
            this.setData({
                imgUrls: res
            })
        })

    },
    goToSearchPage() {
        wx.navigateTo({
            url: '/pages/search/search'
        })
    },
    goToList(event) {
        const type = event.currentTarget.dataset.type
        wx.navigateTo({
            url: './list/list?order=' + type
        })
    },
    goToDetails(event) {
        const id = event.currentTarget.dataset.id
        const userid = event.currentTarget.dataset.userid
        wx.navigateTo({
            url: '/pages/details/details?id=' + id + '&userId=' + userid
        })
    },
})