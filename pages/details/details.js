import {
	details
} from '../../api/details.js'
import {
	live
} from '../../api/live.js'
import {
	historyAdd
} from '../../api/history.js'

import WxParse from '../../utils/wxParse/wxParse.js'

Page({
    data: {
		id:-1,
		userId:-1,
		// tab 索引
		currentTab: 0,
		// 主播 list
		list:[],
		// 其他信息
		info:{},
		live:false
    },
    onLoad: function(options) {
		this._apiDetails(options.id)
		this._apiHistoryAdd(options.userId)
		this.setData({
			id: options.id,
			userId: options.userId,
		})
    },
    onReady: function() {
		
    },
	clickTab(event){
		const current = parseInt(event.currentTarget.dataset.current)
		this.setData({
			currentTab: current
		})
	},
	handleLive(){
		this._apiLiveAdd(this.data.userId)
	},
    onShareAppMessage: function(event) {
		console.log(event)
    },
	
	_apiLiveAdd(userId){
		live(userId).then(res => {
			wx.showToast({
				title: '关注成功',
				icon: 'none',
				duration: 1000
			})
		}).catch(error => {
			console.log(error)
		})
	},
	_apiDetails(id){
		const _this = this
		details(id).then(res => {
			console.log(res.info.content)

			const anchorInfo = '<div>我是HTML代码</div>'

			WxParse.wxParse('anchorInfo', 'html', res.info.content, _this, 5)

			this.setData({
				list: res.datas,
				info: res.info,
				id: id,
				live: res.live ? true : false
			})
		}).catch(error => {
			console.log(error)
		})
	},
	_apiHistoryAdd(id){
		historyAdd(id).then(res=>{
			console.log(res)
		}).catch(error=>{
			console.log(error)
		})
	}
})