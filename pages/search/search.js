import {
	searchList
} from '../../api/searchList.js'

Page({
    
	data: {
		searchKey:'',
		page:1,
        list: []
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

	handleValue(event){
		this.setData({
			searchKey : event.detail.value
		})
	},

	searchContent(){
		searchList(this.data.searchKey, this.data.page).then((result) => {
			console.log(result)
			this.setData({
				list: result.data
			})

		})
	}	
})