/**
 * 将小程序的API封装成支持Promise的API
 * @params fn {Function} 小程序原始API，如wx.login
 */
const wxPromise = (fn) => {
    return (obj = {}) => {
        return new Promise((resolve, reject) => {
            obj.success = function(res) {
                return resolve(res)
            }

            obj.fail = function(res) {
				return reject(res)
            }

            fn(obj)
        })
    }
}

export {
    wxPromise
}