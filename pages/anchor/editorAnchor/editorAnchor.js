import { saveLiveSetting } from '../../../api/liveSetting.js'

Page({
    data: {
        live_bg: '',
        live_desc: '',
        live_title: '',
        live_url: '',
        live_header: ''
    },

    onShow() {
        this.setData({
            live_bg: wx.getStorageSync('live_bg'),
            live_desc: wx.getStorageSync('live_desc'),
            live_title: wx.getStorageSync('live_title'),
            live_url: wx.getStorageSync('live_url'),
            live_header: wx.getStorageSync('live_header')
        })
    },

    goToInfo(event) {
        const name = event.currentTarget.dataset.name
        wx.navigateTo({
            url: '../editorInfo/editorInfo?name=' + name
        })
    },
    goToUploadImg(event) {
        const name = event.currentTarget.dataset.name
        wx.navigateTo({
            url: '../editorImg/editorImg?name=' + name
        })
    },

    createAnchor() {
        if (
            this.data.live_bg &&
            this.data.live_desc &&
            this.data.live_title &&
            this.data.live_url &&
            this.data.live_header) {
			
			this._apiSaveLive({
				live_bg: this.data.live_bg,
				live_desc: this.data.live_desc,
				live_title: this.data.live_title,
				live_url : this.data.live_url,
				live_header: this.data.live_header
			}).then(res=>{
				wx.switchTab({
					url: '/pages/anchor/anchor'
				})
			})

			

        }else{
			wx.showToast({
				title: '信息填写不全',
				icon: 'none',
				duration: 2000
			})
		}
        
    },

	_apiSaveLive(option){

		saveLiveSetting(option).then(res=>{
			wx.switchTab({
				url: '/pages/anchor/anchor'
			})
		}).catch(error=>{
			console.log(error)
		})
	}
})