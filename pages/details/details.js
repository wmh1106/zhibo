import {
	details
} from '../../api/details.js'
import {
	live
} from '../../api/live.js'

Page({
    data: {
		id:-1,
		// tab 索引
		currentTab: 0,
		// 主播 list
		list:[],
		// 其他信息
		info:{}
    },
    onLoad: function(options) {
		details(options.id).then(res=>{
			console.log(res)
			this.setData({
				list: res.datas,
				info: res.info,
				id:options.id
			})

		}).catch(error=>{
			console.log(error)
		})
    },
    onReady: function() {
		
    },
	clickTab(event){
		const current = parseInt(event.currentTarget.dataset.current)
		console.log(current)
		this.setData({
			currentTab: current
		})
	},
	handleLive(){
		live(this.data.id)
	},
    onShareAppMessage: function(event) {
		console.log(event)
    }
})