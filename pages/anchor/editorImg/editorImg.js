import {
	uploadImg
} from '../../../api/uploadFile.js'

const tips = {
	'live_bg': '直播间背景',
	'live_header': '主播头像'
}

Page({

	data:{
		imgUrl:'',
		name:''
	},

	onLoad(options){

		const name = options.name

		wx.setNavigationBarTitle({
			title: tips[name]
		})

		this.setData({
			name:name,
			imgUrl: wx.getStorageSync(name)
		})

	},
	
	saveImg() {
		wx.setStorageSync(this.data.name, this.data.imgUrl)

		wx.navigateBack({
			data: 1
		})
	},

	uploadFile(event) {
		wx.chooseImage({
			count: 1,
			success: (result) => {
				this._apiUploadImg(result.tempFilePaths[0])
			},
			fail(result) {
				console.log(result)
			}
		})
	},

	_apiUploadImg(fileUrl) {

		uploadImg(fileUrl).then(res => {
			console.log(res)
			this.setData({
				imgUrl: res
			})
		}).catch(error => {
			console.log(error)
		})

	},
})