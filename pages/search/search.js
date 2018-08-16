import {
	searchList
} from '../../api/searchList.js'

Page({
    
	data: {
		searchKey:'',
		page:1,
        list: [],
		dataOver:false
    },

    clearText() {
		this.setData({
			searchKey:''
		})
    },

	goToBack(){
		wx.navigateBack({
			delta:1
		})
	},

	goToDetails(event){
		wx.navigateTo({
			url: '/pages/details/details?id=' + event.currentTarget.dataset.id
		})
	},

	handleValue(event){

		console.log(event.detail)
		this.setData({
			searchKey : event.detail.value
		})
	},

	searchContent(){
		this._apiSearchList(this.data.searchKey, this.data.page)
	},
	
	onReachBottom(res) {
		this._apiSearchList(this.data.searchKey, this.data.page)
	},

	_apiSearchList(type, page) {

		if (this.data.dataOver) return null

		wx.showLoading({
			title: '数据加载中...',
			mask: true
		})

		searchList(type, page).then(res => {
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