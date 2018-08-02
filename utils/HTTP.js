import {
    host
} from '../config.js'

class HTTP {

    constructor() {
    }

    request({
        url,
        method = "GET",
        header = {},
        data,
        success,
        error,
        fail
    }) {



        wx.request({
            url: host + url,
            data: data,
            method: method,
            header: {
                ...header
            },
            success: function (res) {
                console.log(res)
                const {
                    statusCode,
                    data,
                    errMsg
                } = res
                if (statusCode === 200) {
                    success && success(data)
                } else {
                    error && error(errMsg)
                }
            },
            fail: function (error) {
                fail && fail(error)
            }
        })

    }
}


export { HTTP }