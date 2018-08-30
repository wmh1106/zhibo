import {
	getCode, bindPhone
} from '../../../api/phone.js'

const re = /^[1][3,4,5,7,8][0-9]{9}$/

Page({
    data: {
        codeText: '获取验证码',
        isShowCountDown: false,
        countDown: 120,
        phoneInfo: {
            number: '',
            code: '',
			codeId:-1
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
		this._apiBindPhone(this.data.phoneInfo.number, this.data.phoneInfo.code, this.data.phoneInfo.codeId)
    },

    handleGetCode() {
		this._apiGetCode(this.data.phoneInfo.number)
    },

	_apiGetCode(phoneNumber) {

		if (!re.test(phoneNumber)) {
			wx.showToast({
				title: '手机号不正确',
				icon: 'none',
				duration: 2000
			})
			return false
		}

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
		
		getCode(phoneNumber)
            .then(res => {
				console.log(res)
				this.setData({
					phoneInfo: {
						...this.data.phoneInfo,
						codeId: res
					}
				})
            }).catch(error=>{
				console.log(error)
			})
    },

	_apiBindPhone(phoneNumber, code, codeId) {
		
		if (!re.test(phoneNumber)) {
			wx.showToast({
				title: '手机号不正确',
				icon: 'none',
				duration: 2000
			})
			return false
		}

		if (phoneNumber && code){
			bindPhone(phoneNumber, code, codeId).then(res=>{
				const userInfo = wx.getStorageSync('userInfo')
				wx.setStorageSync('userInfo', {
					...userInfo,
					'mobile': this.data.phoneInfo.number
				})
				wx.switchTab({
					url:'/pages/user/user'
				})
			})
		}else{
			wx.showToast({
				title: '手机号或验证码为空',
				icon: 'none',
				duration: 2000
			})
		}
    }
})