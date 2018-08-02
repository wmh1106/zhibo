export const host = 'http://live.wxstores.cn/Api';

export const config = {
    version: '3.6',
    service: {
        // 登陆
        initLoginUrl: host + '/Users/authLogin',
        // 登陆信息保存
        saveWxInfoUrl: host + '/Users/saveWxInfo',
    }

}
