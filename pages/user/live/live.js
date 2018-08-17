import {
    likeListData
} from '../../../api/live.js'


Page({
    data: {
        list: []
    },
    onReady() {
        likeListData().then((result) => {
            console.log()

            this.setData({
                list: result.data
            })
        })
    },
    goToRoom() {
		// 跳转未完成
    }
})