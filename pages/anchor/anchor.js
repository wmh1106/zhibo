import {
	searchList
} from '../../api/searchList.js'


Page({
	
    data: {
		myList : []
    },

	onReady(){
		searchList().then((result)=>{
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