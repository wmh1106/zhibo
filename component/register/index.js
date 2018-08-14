import {
    login,
	isShowRegister
} from '../../api/login.js'

Component({

    data: {
        showRegister: true
    },

    ready() {
		isShowRegister().then(res=>{
			let showRegister = res.every(e => e === true)
			this.setData({
				showRegister: showRegister
			})
		}).catch(error=>{
			console.log(error)
			this.setData({
				showRegister: true
			})
		})
    },
	
    methods: {
        getUserInfo(e) {
            login().then(res => {
                if (res.fail) {
                    this.setData({
                        showRegister: true
                    })
                } else if (res.code === 0) {
                    this.setData({
                        showRegister: false
                    })
                }
            })
        }
    }
})