import {
    likeListData
} from '../../../api/live.js'


Page({
    data: {
		list: [],
		page: 1,
		dataOver: false
    },
    onReady() {
		this._apiLiveList(this.data.page)
    },
    goToRoom(event) {
		const id = event.currentTarget.dataset.id
		const user_id = event.currentTarget.dataset.user_id
		wx.navigateTo({
			url: `/pages/details/details?id=${id}&userId=${user_id}`
		})	
    },

	onReachBottom(res) {
		this._apiLiveList(this.data.page)
	},
	_apiLiveList(page) {
		if (this.data.dataOver) {
			wx.showToast({
				title: '没有数据了，亲！',
				icon: 'none',
				duration: 2000
			})
			return null
		}
		wx.showLoading({
			title: '数据加载中...',
			mask: true
		})
		likeListData(page).then(res => {
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