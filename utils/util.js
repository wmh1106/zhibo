// 时间戳 => 时间
const formatTime = num => {
	let date = new Date(num*1000)
	let year = date.getFullYear()
	let month = date.getMonth() + 1
	let day = date.getDate()
	let hour = date.getHours()
	let minute = date.getMinutes()
	let second = date.getSeconds()

	return `${formatNumber(year)}年${formatNumber(month)}月${formatNumber(day)}日 ${formatNumber(hour)}:${formatNumber(minute)}:${formatNumber(second)}`
}

const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0'+n
}

export { formatTime}