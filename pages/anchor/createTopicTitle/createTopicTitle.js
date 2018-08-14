Page({

    data: {
        topicTitle: ''
    },

    onLoad: function(options) {
		this.setData({
			topicTitle: options.topicTitle
		})
    },

	changeText(event){
		this.setData({
			topicTitle: event.detail.value
		})
	},

    createTitle() {
		wx.setStorageSync('topicTitle', this.data.topicTitle)

        wx.navigateBack({
            data: 1
        })
    }

})