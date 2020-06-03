/* //const host = 'https://autopre.openspeech.cn'
//const host1 = 'http://aquadev.iflytekauto.cn'
//const imgUrl = 'https://autopre.openspeech.cn/file/' 图片地址
function request(url, method, data, header = {}) {
	//wx.showLoading({
	//  title: '加载中' // 数据请求前loading
	//})
	return new Promise((resolve, reject) => {
		wx.request({
			url: host + url,
			method: method,
			data: data,
			headers: {
				'content-type': 'application/json' // 默认值
			},
			success: function(res) {
				//      wx.hideLoading()
				resolve(res.data)
			},
			fail: function(res) {
				//      wx.hideLoading()
				// reject(false)
			},
			complete: function() {
				//      wx.hideLoading()
			}
		})
	})
}

function request1(url, method, data, header = {}) {
	//wx.showLoading({
	//  title: '加载中' // 数据请求前loading
	//})
	return new Promise((resolve, reject) => {
		wx.request({
			url: host1 + url,
			method: method,
			data: data,
			headers: {
				'content-type': 'application/json' // 默认值
			},
			success: function(res) {
				//      wx.hideLoading()
				resolve(res.data)
			},
			fail: function(res) {
				//      wx.hideLoading()
				// reject(false)
			},
			complete: function() {
				//      wx.hideLoading()
			}
		})
	})
}

export function answerText(url, data) {
	return new Promise((resolve, reject) => {
		wx.request({
			url: host + url,
			method: 'post',
			data: data,
			header: {
				'content-type': 'application/json', // 默认值
				'data_type': 'text',
				'auth_id': 'qcdsv1kdxfqwerishdjanxhd234fhdqa'
			},
			success: function(res) {
				resolve(res.data)
			},
			fail: function(res) {
				reject(res)
			}
		})
	})

}

export function answerVoice(url, data) {
	return new Promise((resolve, reject) => {
		wx.uploadFile({
			url: host + url,
			filePath: data,
			name: 'file',
			formData: {
				'text': '123'
			},
			header: {
				'content-type': 'multipart/form-data',
				'data_type': 'audio',
				'auth_id': 'qcdsv1kdxfqwerishdjanxhd234fhdqa'
			},
			success: function(res) {
				resolve(res)
			},
			fail() {
				wx.showToast({
					title: "语音输入接口错误",
					icon: 'none'
				});
			}
		})
	})
}

function get(obj) {
	return request(obj.url, 'GET', obj.data)
}

function post(obj) {
	return request(obj.url, 'POST', obj.data)
}

function postaudio(obj) {
	return request1(obj.url, 'GET', obj.data)
}
export default {
	request,
	get,
	post,
	host,
	postaudio,
} */