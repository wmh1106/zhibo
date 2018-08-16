import {
	historyList
} from '../../../api/history.js'

Page({
	data: {
		imgUrl: {
			flow_audio: '/images/icon/flow_audio.png',
			flow_viedeo: '/images/icon/flow_viedeo.png'
		},
		list: [],
		page: 1,
		dataOver:false
	},
	onReady() {
		this._apiHistoryList(this.data.page)
	},
	onReachBottom(res) {
		this._apiHistoryList(this.data.page)
	},
	_apiHistoryList(page){

		if (this.data.dataOver) return null

		wx.showLoading({
			title: '数据加载中...',
			mask: true
		})

		historyList(page).then(res => {
			// 处理页码
			let pageNumber = res.current_page + 1

			if (pageNumber > res.last_page) {
				this.setData({
					dataOver: true
				})
				pageNumber = res.current_page
			}

			this.setData({
				list: res.data.concat(this.data.list),
				page: pageNumber
			})

			wx.hideLoading()
		}).catch(error => {
			wx.hideLoading()
		})
	}
})
