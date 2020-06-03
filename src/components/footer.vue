<template>
	<div class="footer">
		
		<div class="footer-voice flexRowAlign" v-if="footShow">
			<image src="/static/img/inputIcon.png" @click="showIcon"></image>
			<!--  <div class="voice flexRowJustify"><img src="/static/img/yuyin.png" alt="" @touchend="voiceInputEnd" @touchstart="voiceInputStart" @touchmove="voiceInputMove" ></div> -->
			  <div class="voice flexRowJustify" @touchend="voiceInputEnd" @touchstart="voiceInputStart" @touchmove="voiceInputMove" > 按住说话</div> 

		</div>
		<div class="footer-textarea flexRowAlign" v-if="!footShow">
			<image src="/static/img/voiceIcon.png" @click="toTxt"></image>
			<input v-model="textcontent" @confirm="sendTextInput($event,'textInput')" @blur="hideTxt" type="text"  cursor-spacing="15" confirm-type="send" placeholder="输入你想知道的问题" placeholder-style="color:#A6A6A6;font-size:28rpx;">
			<button @click="send">发送</button>
			
		</div>

	</div>
</template>

<script>
import { answerTextz,request } from "@/utils/wxRequest";
	let voiceing = {
		timeStamp: 0,
		clientY: 0,
		status: 'success'
	};
	const recorderManager = wx.getRecorderManager();
	const options = {
		duration: 30000,
		numberOfChannels: 1,
		sampleRate: 16000,
		format: 'wav',
		frameSize: 50
	};
	import { answerVoice } from "@/utils/wx-request";
	export default {
		onUnload() {
			recorderManager.stop();
		},
		data() {
			return {
				footShow:false,
				textcontent:'',
			}
		},

		mounted() {
			/*录音系统回调*/
			recorderManager.onStart(() => {
				let that = this;
				if(voiceing.status == "end") {
					recorderManager.stop();
				} else {
					voiceing.status = "success";
					wx.vibrateShort();
					that.$emit("recordStart");
				}
			});
			recorderManager.onStop((res) => {

				let that = this
				that.$emit("recordEnd")
				if(voiceing.status == 'cancel')
				return

				// answerTextz(res.tempFilePath).then(res=>{
				// 	console.log(res)
				// 	})
					request(res.tempFilePath).then(res =>{
						console.log(res)
					})
				
				//需要上传音频给后台，等待后台返回数据，返回的text将this.isSwitchToVoice = false;并将text显示到首页	
				// answerVoice(
				// 	'/aimind/indexMain/aiui/file', res.tempFilePath
				// ).then(res => {
				// 	//语音后获取答案
				// 	let voiceJsonData = JSON.parse(res.data);
				// 	let voiceData = voiceJsonData;
				// 	console.log(voiceData)
				// 	let tempSendArr = [];
				// 	let resData = {};
				// 	let text;
				// 	let answer;
				// 	voiceData.forEach(item => {
				// 		if(item.result_id == "0" || item.result_id == '1') {
				// 			tempSendArr.push(item);
				// 		}
				// 	})
				// 	tempSendArr.forEach(item => {
				// 		if(item.sub == 'iat'){
				// 			text = item.text ? item.text : '';
				// 		}
				// 		if(item.sub == 'tpp'){
				// 			answer = JSON.parse(item.content);
				// 		}
				// 		resData.text = text;
				// 		resData.answer = answer;
				// 	})
				// 	that.$emit('sendConent', resData)
				// })
			});
		},
		methods:{ 
			//控制显示图标
			showIcon() {
				this.footShow = false;
			},
			toTxt() {
				let that = this
				that.textcontent = ''
				that.footShow = true

			},
			sendTextInput(val) {
				let txt = val.mp.detail.value;
				if(txt == undefined || txt == "") {
					return;
				}
				let txtData = {
					text:txt,
					type:'textInput'
				}
				this.$emit("sendTextInput", txtData)
				this.textcontent = ''
				this.footShow = false
			},

			send() {
				if(this.textcontent == '')
				return 
				let that = this
				let txtData = {
					text: that.textcontent,
					type:'textInput'
				}
				that.$emit("sendTextInput", txtData)
				that.textcontent = ''
				

			},
			voiceInputStart(event) {
				this.$emit('voiceInputStart');
				voiceing.status = "start";
				recorderManager.start(options);
				voiceing.clientY = event.clientY;
				voiceing.timeStamp = new Date().getTime();
			},
			voiceInputEnd() {
				this.$emit("recordEnd")
				if((new Date().getTime()) - voiceing.timeStamp < 400) {
					voiceing.status = "end";
					recorderManager.stop();
					wx.showToast({
						title: '说话时间太短',
						duration: 1000,
						icon: 'none'
					});
				} else {
					if(voiceing.status == "start") {
						wx.showToast({
							title: '说话时间太短',
							duration: 1000,
							icon: 'none'
						});
						voiceing.status = "end";
					}
					recorderManager.stop();
				}
			},
			voiceInputMove(event) {
				if(voiceing.clientY - event.clientY > 50) {
					voiceing.status = 'cancel';
					 //wx.stopRecord()
					 recorderManager.stop()
					 let  that = this
					that.$emit("recordEnd")
					return 
				}
			},
			
		}
	}
</script>

<style lang="less" scoped>
	@import url("../../static/css/base.css");
	.footer {	
		height: 100%;
		width: 100%;
		//background-color: #ffff88;
		display:flex;
		justify-content:space-between;
		position: absolute;
		left: 0;
		top:0;
	}
	
	.footer-textarea input {
		margin-top: 8rpx;
		margin-left: 2vw;
		margin-right: 20rpx;
		width: 85%;
		height: 50%;
		background-color:rgba(3, 17, 17, 0.164);
		
		
	}
	
	.footer-textarea image {
		margin-top: 8rpx;
		margin-left: 2vw;
		margin-right: 20rpx;
		width: 100rpx;
		height: 71rpx;
	}
	.footer-textarea button {
		margin-top: 8rpx;
		margin-left: 2vw;
		width: 160rpx;
		height: 70rpx;
		background-color: rgb(0, 119, 255);
	    text-align: center;
		font-size: 20rpx;
		line-height: 70rpx;
		
		
	}

	.voice  {
		margin-top: 8rpx;
		margin-left: 8vw;
		width: 430rpx;
		height: 70rpx;
		font-size: 30rpx;
		text-align: center;
		line-height: 70rpx;
		background-color:rgba(6, 80, 80, 0.445);
		
	}
	
	.footer-voice image {
		margin-top: 8rpx;
		margin-left: 5vw;
		width: 75rpx;
		height: 75rpx;
	}
	
</style>



