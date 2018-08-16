import {HTTP} from '../../utils/HTTP.js'

const http = new HTTP()

Page({
    data: {
		// 推荐直播列表
		putlist:[],
		// 轮播
        autoplay: false,
        interval: 5000,
        duration: 1000,
		imgUrls: []
    },
	onReady(){
		this.getSwiperImage()
		this.getIndexPutList()
	},
	onPullDownRefresh(res){
		this.getSwiperImage()
		this.getIndexPutList()
	},
    goToSearchPage() {
        wx.navigateTo({
            url: '/pages/search/search'
        })
    },
	goToList(event){
		wx.navigateTo({
			url: './list/list?order=' + event.currentTarget.dataset.type
		})
	},
	goToDetails(event){
		wx.navigateTo({
			url: '/pages/details/details?id=' + event.currentTarget.dataset.id + '&userId=' + event.currentTarget.dataset.userid
		})
	},
	// 轮播图片
	getSwiperImage(){
		http.request({
			url:'/Index/carousel',
			success:(res)=>{
				this.setData({
					imgUrls : res
				})
			}
		})
	},
	// 推荐直播列表
	getIndexPutList(){
		http.request({
			url: '/Index/putlive',
			success: (res) => {
				this.setData({
					putlist: res
				})
			}
		})
	}
})