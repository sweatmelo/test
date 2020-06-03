let md5 = require('md5-node');
const URL = 'https://openapi.xfyun.cn/v2/aiui'
const APPID = '5ec777cd'
const API_KEY = '9b2092171fa9c2bac40025784016bef0'
const AUTH_ID = '4445f41e175bf2f3c699edf706884767'
const SCENE = 'main'
export function answerTextz( data) {
const DATA_TYPE = 'text'
const RESULT_LEVEL = 'complete'

	let param = "{\"result_level\":\""+RESULT_LEVEL+"\",\"auth_id\":\""+AUTH_ID+"\",\"data_type\":\""+DATA_TYPE+"\",\"scene\":\""+SCENE+"\"}"
    let paramBase64 = new Buffer(param).toString('base64');
	let X_CurTime = Math.floor(Date.now()/1000);
    let checkSum = md5(API_KEY +X_CurTime +paramBase64);
	console.log(checkSum)
	
	return new Promise((resolve, reject) => {
		wx.request({
			url: URL,
			method: 'POST',
			data: data,
            header: {
                'X-CurTime': X_CurTime ,
                'X-Param': paramBase64,
                'X-Appid': APPID,
                'X-CheckSum': checkSum,
            },
			success: function(res) {
				resolve(res)
			},
			fail: function(res) {
				reject(res)
			}
		})
	})

}

export function answerVoicez( data) {
	const DATA_TYPE = 'audio'
	const RESULT_LEVEL = 'complete'
	const SAMPLE_RATE = '16000'
	
		let param = "{\"result_level\":\""+RESULT_LEVEL+"\",\"auth_id\":\""+AUTH_ID+"\",\"data_type\":\""+DATA_TYPE+"\",\"scene\":\""+SCENE+"\"}"
		let paramBase64 = new Buffer(param).toString('base64');
		let X_CurTime = Math.floor(Date.now()/1000);
		let checkSum = md5(API_KEY +X_CurTime +paramBase64);
		console.log(checkSum)
		
		return new Promise((resolve, reject) => {
			wx.request({
				url: URL,
				method: 'POST',
				data: data,
				header: {
					'X-CurTime': X_CurTime ,
					'X-Param': paramBase64,
					'X-Appid': APPID,
					'X-CheckSum': checkSum,
				},
				success: function(res) {
					resolve(res)
				},
				fail: function(res) {
					reject(res)
				}
			})
		})
	
	}

export function request( data) {
	return new Promise((resolve, reject) => {
		wx.request({
			url:'http://172.31.198.24:10090/wechat-aiui/aiui/file',
			method: 'POST',
			data: data,
			header: {
				'content-type': 'multipart/form-data',
			},
			success: function(res) {
				resolve(res)
			},
			fail: function(res) {
				reject(res)
			}
		})
	})
}

