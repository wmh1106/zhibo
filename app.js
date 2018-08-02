var _getCurrentPage = function() {
    var pages = getCurrentPages();
    return pages[pages.length - 1];
}

var op_id = '';

App({
	onLaunch: function () {

	},
	onError: function (msg) {
		console.log('生命周期onError：' + msg)
	}
})