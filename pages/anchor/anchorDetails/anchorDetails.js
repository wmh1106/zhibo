import {
    topicDetails
} from '../../../api/createTopic.js'

Page({

    data: {
        id: -1,
		time:'',
		bg:'',
		topicInfo:null
    },

    onLoad(option) {
        this.setData({
            id: option.id,
			time:option.time,
			bg:option.bg
        })
		this._topicDetails(this.data.id)
    },

    goToEditorAnchor(event) {
		const headimgurl = event.currentTarget.dataset.headimgurl
		const desc = event.currentTarget.dataset.desc
		const title = event.currentTarget.dataset.title
		const bg = event.currentTarget.dataset.bg

        wx.navigateTo({
			url: `/pages/anchor/editorTopic/editorTopic?headimgurl=${headimgurl}&desc=${desc}&title=${title}&bg=${bg}`
        })
    },

	_topicDetails(id){
		topicDetails(id).then(res=>{
			this.setData({
				topicInfo : res.info
			})
		})
	}
})