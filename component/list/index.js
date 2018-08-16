Component({
    options: {
        multipleSlots: true
    },
    properties: {
        list: {
            type: Object
        }
    },
    data: {

		imgAudio: '/images/icon/flow_audio.png',
		imgVideo: '/images/icon/flow_video.png'

    },
	methods:{
		goToDetails(event) {
			console.log(event)
			wx.navigateTo({
				url: '/pages/details/details?id=' + event.currentTarget.dataset.id + '&userId=' + event.currentTarget.dataset.userid
			})
		}
	}
	
})