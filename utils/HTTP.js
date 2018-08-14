// wx.request 再次封装
import {
    host
} from '../config.js'

const tips = {
	'-1':'抱歉，出现一个错误'
}

class HTTP {
    request({
        url,
        method = "GET",
        header = null,
        data,
        success,
    } = opation) {
        wx.request({
            url: host + url,
            data: data,
            method: method,
            header: {
                ...header
            },
            success:  (res)=> {
				console.log('HTTP,CLASS',res)
				// 先判断小程序返回的状态
                const {
                    statusCode,
                    data,
                    errMsg,
					header
                } = res

				if (statusCode.toString().startsWith('2') && data.code === 0) {
					success && success(data.data)
                } else {
					let errorCode = -1;
					this.__showError(errorCode)

                }
            },
            fail:  (error)=> {
				let errorCode = -1;
				this.__showError(errorCode)
            }
        })
    }

	__showError(errorCode){
		if (!errorCode){
			errorCode = -1
		}
		wx.showToast({
			title: tips[errorCode],
			icon:'none',
			duration:2000
		})
	}
}

export { HTTP }