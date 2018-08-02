Page({
    data: {
        radio: [{
                name: "流畅",
                value: "流畅",
            checked: false
            },
            {
                name: "标清",
                value: "标清",
                checked: false
            },
            {
                name: "高清",
                value: "高清",
                checked: false
            },
            {
                name: "超清",
                value: "超清",
                checked: true
            }
        ]
    },
    changeType(event){
        const changeType = event.detail.value
        const radio = [...this.data.radio]
        const changeRadio = radio.map(item=>{
            if (item.value === changeType){
                item.checked = true
            }else{
                item.checked = false
            }
            return item
        })
        this.setData({
            radio: [...changeRadio]
        })
    },
    formSubmit(event){
        console.log(event.detail )
    }
})