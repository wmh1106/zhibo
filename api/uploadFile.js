import {
    host
} from '../config.js'

import {
    wxPromise
} from '../utils/wxPromise.js'

const uploadImg = (fileUrl) => {

    const uploadFile = wxPromise(wx.uploadFile)

    return uploadFile({
        url: host + '/Index/UploadFiles',
        filePath: fileUrl,
        header: {
            'content-type': 'multipart/form-data',
            'accesstoken': wx.getStorageSync('access_token')
        },
        name: 'file'
    }).then(res => {
        if (res.statusCode.toString().startsWith('2')) {
            const result = JSON.parse(res.data)
            if (result.code === 0) {
                return result.data
            } else {
                wx.showToast({
                    title: result.msg,
                    icon: 'none',
                    duration: 2000
                })

                return result.msg
            }
        } else {
            wx.showToast({
                title: '上传失败',
                icon: 'none',
                duration: 2000
            })
            return new Error(res.errMsg)
        }
    })

}

export {
    uploadImg
}