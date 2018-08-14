import {
    playListData
} from '../../api/playList.js'

import { formatTime } from '../../utils/util.js'

Page({
	
    data: {
		myList : []
    },

	onReady(){
		playListData().then((result)=>{
			let res = []
			res = result.data.map(item => {
				return {
					...item,
					created: formatTime(item.created)
				}
			})
			this.setData({
				myList: res
			})

		})
	},

    goToCreatTopic() {
        wx.navigateTo({
            url: './createTopic/createTopic'
        })
    }
})