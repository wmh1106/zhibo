// 时间戳 => 时间 2016年01月16日 14:37:22
const formatTime = num => {
	let date = new Date(num*1000)
	let year = date.getFullYear()
	let month = date.getMonth() + 1
	let day = date.getDate()
	let hour = date.getHours()
	let minute = date.getMinutes()
	let second = date.getSeconds()

	return `${formatNumber(year)}/${formatNumber(month)}/${formatNumber(day)} ${formatNumber(hour)}:${formatNumber(minute)}`
}

const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0'+n
}

// 比较时间
const compare = num => {
	let settingTime = num * 1000
	let nowTime = new Date().getTime()
	// 小于30分
	let second = 1000
	let minute = second * 60
	let hour = minute * 60
	if (settingTime - nowTime < minute * 30){
		return '即将开始'
	}else{
		return formatTime(num)
	}
}


export { formatTime, compare}