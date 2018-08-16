import {
	getIndexList
} from '../../../api/indexList.js'

Page({
    data: {
        navigationBarTitleText: '',
		type: '',
		page: 1,
		list:[],
		dataOver:false
    },
    onLoad(options) {
		// 判断 3个 列表
		switch (options.order){
			case 'put':
				this.setData({
					navigationBarTitleText: '推荐列表',
					type: 'put'
				})
				break
			case 'new':
				this.setData({
					navigationBarTitleText: '最新列表',
					type: 'new'
				})
				break
			case 'hot':
				this.setData({
					navigationBarTitleText: '热点列表',
					type: 'hot'
				})
				break
		}
        
        wx.setNavigationBarTitle({
            title: this.data.navigationBarTitleText
        })
    },

	onReady(){
		this._apiList(this.data.type, this.data.page)
	},

	onReachBottom(res) {
		this._apiList(this.data.type, this.data.page)
	},

	_apiList(type,page){

		if ( this.data.dataOver ) return null

		wx.showLoading({
			title: '数据加载中...',
			mask: true,
			success() { }
		})
		
		getIndexList(type, page).then(res=>{
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
		}).catch(error=>{
			wx.hideLoading()
		})
	}
})