import {
	getCode, bindPhone
} from '../../../api/phone.js'

Page({
    data: {
        codeText: '获取验证码',
        isShowCountDown: false,
        countDown: 120,
        phoneInfo: {
            number: '',
            code: ''
        }
    },

    handlePhoneNumber(event) {
        this.setData({
            phoneInfo: {
                ...this.data.phoneInfo,
                number: event.detail.value
            }
        })
    },
	handlePhoneCode(event){
		this.setData({
			phoneInfo: {
				...this.data.phoneInfo,
				code: event.detail.value
			}
		})
	},

	handleBindPhone() {
		this._apiBindPhone(this.data.phoneInfo.number, this.data.phoneInfo.code)
    },

    handleGetCode() {
		this._apiGetCode()
    },

    _apiGetCode() {

		if (this.data.isShowCountDown) return false

		this.setData({
			isShowCountDown: true
		})

		let tiemr = setInterval(() => {
			let count = this.data.countDown
			count -= 1
			if (count <= 0) {
				clearInterval(tiemr)
				this.setData({
					isShowCountDown: false,
					countDown: 120
				})
				return;
			}
			this.setData({
				countDown: count
			})
		}, 1000)
		
        getCode(this.data.phoneInfo.number)
            .then(res => {
				
            }).catch(error => {

            })

    },

	_apiBindPhone(phoneNumber,code) {
		if (phoneNumber && code ){
			bindPhone(phoneNumber, code)
		}else{
			wx.showToast({
				title: '手机号或验证码为空',
				icon: 'none',
				duration: 2000
			})
		}
		
    }
})