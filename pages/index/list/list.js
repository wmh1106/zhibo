import {
	HTTP
} from '../../../utils/HTTP.js'

const http = new HTTP()

Page({
    data: {
        navigationBarTitleText: '',
		type : '',
		list:null
    },
    onLoad(options) {
        console.log(options.order)
        if (options.order === 'put') {
            this.setData({
                navigationBarTitleText: '推荐列表',
				type: 'put'
            })
			
        } else if (options.order === 'new') {
            this.setData({
				navigationBarTitleText: '最新列表',
				type: 'new'
            })
        } else if (options.order === 'hot') {
            this.setData({
				navigationBarTitleText: '热点列表',
				type: 'hot'
            })
        }
        wx.setNavigationBarTitle({
            title: this.data.navigationBarTitleText
        })
    },
	onReady(){
		this.getListPut(this.data.type)
	},

	getListPut(type){
		http.request({
			url: '/Article/index',
			data:{
				order:type
			},
			success:(res)=>{
				console.log(res)
				this.setData({
					list:res.data
				})
			}
		})
	}
})