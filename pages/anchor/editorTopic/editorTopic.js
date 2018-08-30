
import {
	uploadImg
} from '../../../api/uploadFile.js'

import {
	topicCreate
} from '../../../api/createTopic.js'

Page({
	data: {
		stime: '',
		sday:'',
		headimgurl: '',
		desc: '',
		title: '',
		bg: ''
	},
	onLoad(options){
		this.setData({
			headimgurl: options.headimgurl,
			desc: options.desc,
			title: options.title,
			bg: options.bg,
			stime: options.stime,
			sday: options.sday
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

	goToInfo(event) {
		const name = event.currentTarget.dataset.name
		wx.navigateTo({
			url: '../editorInfo/editorInfo?name=' + name
		})
	},
	bindDayChange: function (e) {
		console.log(e)
		this.setData({
			sday: e.detail.value
		})
	},

	bindTimeChange: function (e) {
		console.log(e)
		this.setData({
			stime: e.detail.value
		})
	},

	saveTopic() {
		const option = {
			topicContent: this.data.topicContent,
			topicTitle: this.data.topicTitle,
			tempFilePaths: this.data.tempFilePaths,
			stime: this.data.stime
		}

		if (this.data.desc && this.data.title && this.data.bg && this.data.stime && this.data.sday) {
			this._apiCreateTopic({
				title: this.data.title,
				desc: this.data.desc,
				thumb: this.data.bg,
				stime: this.data.sday +' '+this.data.stime
			})
		} else {
			wx.showToast({
				title: '资料填写不全',
				icon: 'none'
			})
		}
	},

	_apiCreateTopic(data) {
		topicCreate(data).then(res => {
			wx.switchTab({
				url: '/pages/anchor/anchor'
			})
		}).catch(error => { })
	},

	_apiUploadImg(fileUrl) {

		uploadImg(fileUrl).then(res => {
			this.setData({
				bg: res
			})
		}).catch(error => {
			console.log(error)
		})

	},

})