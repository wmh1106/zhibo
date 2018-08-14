import {
    createTopicApi
} from '../../../api/createTopic.js'



Page({

    data: {
        tempFilePaths: '',
        topicTitle: '',
        topicContent: '',
        time: ''
    },

    uploadFile(event) {
        wx.chooseImage({
            count: 1,
            success: (result) => {
                this.uploadImg(result.tempFilePaths[0])
            },
            fail(result) {
                console.log(result)
            }
        })
    },

    uploadImg(fileUrl) {
        wx.uploadFile({
            url: 'http://live.wxstores.cn/Api/Index/UploadFiles',
            filePath: fileUrl,
            header: {
                'content-type': 'multipart/form-data'
            },
            name: 'file',
            success: (res) => {
                let result = null
                if (res.statusCode === 200) {
                    result = JSON.parse(res.data)
                    console.log(result)
                    this.setData({
                        tempFilePaths: result.data
                    })
                }
            }
        })
    },

    goToTopicTitle() {
        wx.navigateTo({
            url: '../createTopicTitle/createTopicTitle?topicTitle=' + this.data.topicTitle
        })
    },

    goToTopicInfo() {
        wx.navigateTo({
            url: '../createTopicInfo/createTopicInfo?topicContent=' + this.data.topicContent
        })
    },

    bindTimeChange: function(e) {
        this.setData({
            time: e.detail.value
        })
    },

    createTopic() {

        let topicContent = wx.getStorageSync('topicContent')
        let topicTitle = wx.getStorageSync('topicTitle')
        let tempFilePaths = this.data.tempFilePaths
        let time = this.data.time

        if (topicContent && topicTitle && tempFilePaths && time) {
			createTopicApi({
				desc: topicContent,
				title: topicTitle,
				thumb: tempFilePaths,
				stime: time
			}).then((result) => {
				console.log(result)
			}).catch(()=>{
				
			})
        } else {
			wx.showToast({
				title:'资料填写不全',
				icon:'none'
			})
        }
    },



})