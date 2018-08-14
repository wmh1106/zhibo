Page({
	data: {
		topicContent: ''
	},
	onLoad: function (options) {
		this.setData({
			topicContent:options.topicContent
		})
	},

	changeText(event) {
		this.setData({
			topicContent: event.detail.value
		})
	},

	createContent() {
		
		wx.setStorageSync('topicContent', this.data.topicContent)

		wx.navigateBack({
			data: 1
		})
	}
})

