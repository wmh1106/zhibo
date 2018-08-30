


Page({
    
    data: {
		
		headimgurl:'',
		desc: '',
		title: '',
		bg: ''
    },
   
    onLoad: function(options) {
		console.log(options)
		this.setData({
			headimgurl: options.headimgurl,
			desc: options.desc,
			title: options.title,
			bg: options.bg
		})
    },
    onReady: function() {

    },


})