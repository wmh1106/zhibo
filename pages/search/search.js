import {
	playListData
} from '../../api/playList.js'

import { formatTime } from '../../utils/util.js'

Page({
    
	data: {
		searchKey:'',
        searchData: []
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

	searchContent(){
		playListData().then((result) => {
			let res = []
			res = result.data.map(item => {
				return {
					...item,
					created: formatTime(item.created)
				}
			})
			this.setData({
				searchData: res
			})

		})
	}	
})