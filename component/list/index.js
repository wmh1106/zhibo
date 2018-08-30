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

			console.log(this.data.list)

			console.log(event)

			const id = event.currentTarget.dataset.id
			const userid = event.currentTarget.dataset.userid
			wx.navigateTo({
				url: '/pages/details/details?id=' + id + '&userId=' + userid
			})
		}
	}
	
})