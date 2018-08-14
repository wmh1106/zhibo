import {HTTP} from '../../utils/HTTP.js'

const http = new HTTP()

Page({
    data: {
        imgUrls: [],
		putlist:[],
        autoplay: false,
        interval: 5000,
        duration: 1000
    },
	onReady(){
		this.getSwiperImage()
		this.getIndexPutList()
	},


    goToSearchPage() {
        wx.navigateTo({
            url: './search/search'
        })
    },
	goToList(event){
		console.log(event.currentTarget.dataset.type)
		wx.navigateTo({
			url: './list/list?order=' + event.currentTarget.dataset.type
		})
	},

	getSwiperImage(){
		http.request({
			url:'/Index/carousel',
			success:(res)=>{
				console.log(res)
				this.setData({
					imgUrls : res
				})
			}
		})
	},
	getIndexPutList(){
		http.request({
			url: '/Index/putlive',
			success: (res) => {
				console.log(res)
				this.setData({
					putlist: res
				})
			}
		})
	}
})