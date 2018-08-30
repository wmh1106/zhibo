import WxParse from './wxParse/wxParse.js'

Component({
    properties: {
        info: {
			type:String,
			value:'',
			observer: function (newVal, oldVal, changedPath) {
				this._change(newVal)
			}
		}
    },
    methods: {
		_change(newVal){
			WxParse.wxParse('anchorInfo', 'html', newVal, this, 5)
		}
    }
})