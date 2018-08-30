import {
	login
} from '../../api/login.js'

Page({
	data: {
	},
	getUserInfoHandle(e) {
		wx.showLoading({
			title: '请求中',
			mask:true
		})
		login().then(res => {
			wx.navigateBack({
				delta: 1
			})
		}).catch(err => {
			console.error(err)
		})
	}
})
