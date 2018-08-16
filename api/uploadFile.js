import {
	host
} from '../config.js'

const uploadImg = (fileUrl) => {
	return new Promise((resolve,reject)=>{
		wx.uploadFile({
			url: host + '/Index/UploadFiles',
			filePath: fileUrl,
			header: {
				'content-type': 'multipart/form-data',
				'accesstoken': wx.getStorageSync('access_token')
			},
			name: 'file',
			success: (res) => {
				if (res.statusCode.toString().startsWith('2')) {
					const result = JSON.parse(res.data)
					if (result.code === 0){
						return resolve(result.data)
					}else{
						wx.showToast({
							title: result.msg,
							icon: 'none',
							duration: 2000
						})

						return reject(result.msg)
					}
				}else{
					wx.showToast({
						title: '上传失败',
						icon: 'none',
						duration: 2000
					})
					return reject(res.errMsg)
				}
			}
		})
	})
	
}

export { uploadImg }