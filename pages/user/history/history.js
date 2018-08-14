import {
	historyListData
} from '../../../api/history.js'

import { formatTime} from '../../../utils/util.js'

Page({
	data: {
		imgUrl: {
			flow_audio: '/images/icon/flow_audio.png',
			flow_viedeo: '/images/icon/flow_viedeo.png'
		},
		list: []
	},
	onReady() {
		historyListData().then((result) => {
			let res = []
			res = result.data.map(item=>{
				return {
					...item,
					created: formatTime(item.created)
				}
			})
			this.setData({
				list: res
			})
		})
	},
	goToRoom() {
		// 跳转未完成
	}
})
