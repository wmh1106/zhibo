import {
	uploadImg
} from '../../../api/uploadFile.js'

import {
	topicCreate
} from '../../../api/createTopic.js'


Page({

	data: {
		tempFilePaths: '',
		topicTitle: '',
		topicContent: '',
		sDay:'',
		stime: '',
		startDay:''
	},
	onLoad(){
		this.setData({
			startDay: this._startDay()
		})
		
		wx.setStorageSync('topic_title', '')
		wx.setStorageSync('topic_content', '')
	},
	onShow() {
		this.setData({
			topicTitle: wx.getStorageSync('topic_title'),
			topicContent: wx.getStorageSync('topic_content'),
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
		this.setData({
			sDay: e.detail.value
		})
	},
	bindTimeChange: function (e) {
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

		if (this.data.topicContent && this.data.topicTitle && this.data.tempFilePaths && this.data.sDay && this.data.stime) {
			this._apiCreateTopic({
				title: this.data.topicTitle,
				desc: this.data.topicContent,
				thumb: this.data.tempFilePaths,
				stime: this.data.sDay +' '+this.data.stime
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
				tempFilePaths: res
			})
		}).catch(error => {
			console.log(error)
		})
	},
	_startDay(){
		const timer = new Date()
		const year = timer.getFullYear()
		const month = timer.getMonth()+1
		const day = timer.getDay()

		return `${year}-${month}-${day}`
	}
})