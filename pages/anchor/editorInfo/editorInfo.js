const tips = {
    'live_title': '直播间标题',
	'live_desc': '直播间介绍',
	'live_url': '直播间链接'
}



Page({
    data: {
		content:'',
		name : ''
    },

    onLoad: function(options) {

		const name = options.name

        wx.setNavigationBarTitle({
			title: tips[name]
        })
		
		this.setData({
			name: name,
			content: wx.getStorageSync(name)
		})
    },

	changeText(event) {
		this.setData({
			content: event.detail.value
		})
	},
	saveInfo() {
		wx.setStorageSync(this.data.name, this.data.content)

		wx.navigateBack({
			data: 1
		})
	}
})