// wx.request 再次封装
import {
    host
} from '../config.js'

const tips = {
	'-1':'抱歉，出现一个错误',
	'10000':'系统繁忙',
	'10010':'验证码超过有效期',
	'10011':'验证码错误',
	'10012':'手机号已被绑定',
	'10013':'两次输入的密码不一致',
	'10014':'用户不存在',
	'10015':'密码不能为空',
	'10016':'验证失败',
	'10020':  '已关注'
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
					if (tips[data.code]){
						this._showError(data.code)
					}else{
						this._showError('-1')
					}
					
                }
            },
            fail:  (error)=> {
				let errorCode = -1;
				this._showError(errorCode)
            }
        })
    }

	_showError(errorCode){
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