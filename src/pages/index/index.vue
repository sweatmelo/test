<template>
	<div class="home-contaniner">
		<!--录音模态框-->
		 <record-voice v-if="isVoicing"></record-voice> 
		<div class="home-chat">
			<!--head-->
			<div class="iconheadBox">
				<head-detail></head-detail>				
			</div>
			<div class="home-content">
			<scroll-view scroll-y="true" :style="{'height':isIphoneX ? 'calc(100vh - 270rpx)':'calc(100vh - 260rpx)'}" class="scrollWidth" :scroll-into-view="toView" @scrolltolower="toView = ''">

					<div class="chat-box" v-for="(chat,ind) in chatBoxData" :key="ind">
						<!--文字输入问题显示-->
						<div class="text-input-column column" v-if="chat.type == '1'">
							<div class="v_me">{{chat.text}}</div>
						</div>

						<div class="audioPage" v-if="chat.type == '2' ">
						<audio :src="chat.audioSrc" :author="chat.audioSinger" :name="chat.audioName" id="'audio'+ind " :poster="chat.audioPic" controls=true></audio> 
						</div>
						
						<div style="margin-top: 28rpx; margin-left: 8rpx" v-if="chat.type == '3'">
							<!--wenben-->
							<div class="dialogBox">
								
							<p class="titleAnswer">{{chat.textDesc}}</p>	
						</div>
						</div>
						<!--pic-->
						<div class="answerBox" style="margin-top: 56rpx;" v-if="chat.type == '4'">
							<div class="imgBox">
								<div class="img-column column">
									<image :src="chat.imgSrc[0]" mode="aspectFill"></image>
									<!--<p class="textEllipsisTwo" v-if="chat.flag==1">{{chat.textDesc}}</p>-->
									<p class="textEllipsisTwo"> {{chat.txt}}</p>
									<div class="btn" v-if="chat.isDetails" @click="toLinkImg(chat)">查看详情 ></div>
								</div>
								<div class="agreeBox">
									<div class="smallAgreeBox">
										<div class="zan" @click="handleType(chat,'yes')">
											<image src='/static/img/agreeNo.png' style="width:40rpx;height:40rpx" v-if="!chat.isAgree"></image>
											<image src='/static/img/agree.png' style="width:40rpx;height:40rpx" v-else></image>
											<span>赞</span>
										</div>
										<div class="cai" @click="handleType(chat,'no')">
											<image src='/static/img/disAgreeNo.png' style="width:40rpx;height:40rpx" v-if="!chat.isDisAgree"></image>
											<image src='/static/img/disAgree.png' style="width:40rpx;height:40rpx" v-else></image>
											<span>踩</span>
										</div>
									</div>
								</div>
							</div>
						</div>
						<!--video-->
						<div  style="margin-top: 56rpx;" v-if="chat.type == 5">
							<div class="videoBox">
								<div class="video-column "> 
									<div class="mengcen" @click.stop="videoTap(chat)" :style="{backgroundImage: 'url('+chat.videoImgSrc+')',backgroundSize: '100% 100%'}">
										<div>
											<image src="/static/img/play.png"></image>
										</div>
									</div>
								</div>
								<!--<div class="agreeBox" style="width:532rpx">
									 <div class="smallAgreeBox">
										<div class="zan" @click="handleType(chat,'yes')">
											<image src='/static/img/agreeNo.png' style="width:40rpx;height:40rpx" v-if="!chat.isAgree"></image>
											<image src='/static/img/agree.png' style="width:40rpx;height:40rpx" v-else></image>
											<span>赞</span>
										</div>
										<div class="cai" @click="handleType(chat,'no')">
											<image src='/static/img/disAgreeNo.png' style="width:40rpx;height:40rpx" v-if="!chat.isDisAgree"></image>
											<image src='/static/img/disAgree.png' style="width:40rpx;height:40rpx" v-else></image>
											<span>踩</span>
										</div>
									</div> 
								</div>-->
							</div>
						</div>
						 
						<!--点击品牌介绍显示对应一级的数据-->
						<!-- <div class="answerBox" style="margin-top: 56rpx;" v-if="chat.type == 6 && chat.listOne.length!=0">
							<div class="pinpaiOneBox">
								<span>
									<image src='/static/img/eye.png' class="eyeImg"></image>
								</span>
								<span>
									<image src='/static/img/fashWb.png' class="fashWbImg" ></image>
								</span>
								<span>
									<image src='/static/img/fashTop.png' class="fashTopImg"></image>
								</span>
								<div class="pinpaiOne-column column">
									<p>您可以选择：</p>
									<ul class="selectOneContent clearfix">
										<li v-for="(itemOne,index) in chat.listOne" :key="index" @click="sendTextInput(itemOne,7)">{{itemOne}}</li>
									</ul>
								</div>
							</div>
						</div> -->
						<!--点击品牌介绍显示对应二级的数据-->
						<!-- <div class="answerBox" style="margin-top: 56rpx;" v-if="chat.type == 7 && chat.select.length!=0">
							<div class="pinpaiOneBox">
								<span>
									<image src='/static/img/eye.png' class="eyeImg"></image>
								</span>
								<span>
									<image src='/static/img/fashWb.png' class="fashWbImg" ></image>
								</span>
								<span>
									<image src='/static/img/fashTop.png' class="fashTopImg"></image>
								</span>
								<div class="pinpaiOne-column column">
									<p>您可以选择：</p>
									<ul class="selectOneContent clearfix">
										<li v-for="(itemTwo,index) in chat.select" :key="index" @click="sendTextInput(itemTwo,8)">{{itemTwo}}</li>
									</ul>
								</div>
							</div>
						</div> -->
						<!--点击品牌介绍显示对应三级的数据-->
						<!-- <div class="answerBox" style="margin-top: 56rpx;" v-if="chat.type == 8 && chat.homeListQuestion.length!=0">
							<div class="pinpaiOneBox">
								<span>
									<image src='/static/img/eye.png' class="eyeImg"></image>
								</span>
								<span>
									<image src='/static/img/fashWb.png' class="fashWbImg" ></image>
								</span>
								<span>
									<image src='/static/img/fashTop.png' class="fashTopImg"></image>
								</span>
								<div class="pinpaiOne-column column">
									<p>您可以选择：</p>
									<ul class="selectOneContent clearfix">
										<li v-for="(itemThree,index) in chat.homeListQuestion" :key="index" @click="sendTextInput(itemThree,1)">{{itemThree}}</li>
									</ul>
								</div>
							</div>
						</div> -->
						<!--车型参数-->
						<!-- <div class="answerBox" style="margin-top: 56rpx;" v-if="chat.type==11">
							<div class="dialogBox" style="padding:10rpx 0 5rpx 0">
								<span>
									<image src='/static/img/eye.png' class="eyeImg"></image>
								</span>
								<span>
									<image src='/static/img/fashWb.png' class="fashWbImg" ></image>
								</span>
								<span>
									<image src='/static/img/fashTop.png' class="fashTopImg"></image>
								</span>
								<div class="centerAnswer">
									<div style="display: flex;flex-direction: row;margin-bottom: 20rpx;">
										<div class="canshuImg" style="width:70px;height:60px;background-color: #E5ECFF;margin-right: 40rpx;">
											<image src="/static/img/car1.png" style="width:70px;height:60px"></image>
										</div>
										<div>
											<p style="font-size: 28rpx;margin-bottom: 15rpx;color:#333333;line-height: 60px;">红旗HS7</p>
										</div>
									</div>
									<div class="mubanBox" v-for="(item,index) in chat.paramData" :key="index">
										<div class="paramTitle" style="color:rgba(102,102,102,1);width: 200rpx;margin-right: 20rpx;">{{item.keyVal}}</div>
										<div class="param" style="color:#333333;text-align:right;font-size:24rpx;flex:1;width:300rpx">{{item.val?item.val:'暂无数据'}}</div>
									</div>
									<div class="btn" @click="showMbDeatail(chat)" v-if="chat.isMore">查看更多 ></div>
								</div> -->
								<!--底部-->
								<!-- <div class="agreeBox">
									<div class="smallAgreeBox">
										<div class="zan" @click="handleType(chat,'yes')">
											<image src='/static/img/agreeNo.png' style="width:40rpx;height:40rpx" v-if="!chat.isAgree"></image>
											<image src='/static/img/agree.png' style="width:40rpx;height:40rpx" v-else></image>
											<span>赞</span>
										</div>
										<div class="cai" @click="handleType(chat,'no')">
											<image src='/static/img/disAgreeNo.png' style="width:40rpx;height:40rpx" v-if="!chat.isDisAgree"></image>
											<image src='/static/img/disAgree.png' style="width:40rpx;height:40rpx" v-else></image>
											<span>踩</span>
										</div>
									</div>
								</div>
							</div>
						</div> -->
						<!--亮点-->
						<!-- <div class="answerBox" style="margin-top: 56rpx;" v-if="chat.type==12">
							<div class="dialogBoxP0">
								<span>
									<image src='/static/img/eye.png' class="eyeImg"></image>
								</span>
								<span>
									<image src='/static/img/fashWb.png' class="fashWbImg" ></image>
								</span>
								<span>
									<image src='/static/img/fashTop.png' class="fashTopImg"></image>
								</span>
								<div class="centerAnswer koubei">
									<div style="display: flex;flex-direction: row;margin-bottom: 20rpx;">
										<div class="canshuImg" style="width:70px;height:60px;background-color: #E5ECFF;margin-right: 40rpx;">
											<image src="/static/img/car.png" style="width:70px;height:60px"></image>
										</div>
										<div>
											<p style="font-size: 28rpx;margin-bottom: 15rpx;color:#333333;line-height: 60px;">红旗HS7</p>
										</div>
									</div>
									<div style="margin: 0 10rpx 10rpx 0;display:inline-block;" v-for="(item,index) in chat.keyVal" :key="index">
										<div class="liangdianContent">{{item}}</div>
									</div>
									<div class="btn" @click="showMbDeatail(chat)" v-if="chat.isMore">查看更多 ></div>
								</div>
						
								<div class="agreeBox">
									<div class="smallAgreeBox">
										<div class="zan" @click="handleType(chat,'yes')">
											<image src='/static/img/agreeNo.png' style="width:40rpx;height:40rpx" v-if="!chat.isAgree"></image>
											<image src='/static/img/agree.png' style="width:40rpx;height:40rpx" v-else></image>
											<span>赞</span>
										</div>
										<div class="cai" @click="handleType(chat,'no')">
											<image src='/static/img/disAgreeNo.png' style="width:40rpx;height:40rpx" v-if="!chat.isDisAgree"></image>
											<image src='/static/img/disAgree.png' style="width:40rpx;height:40rpx" v-else></image>
											<span>踩</span>
										</div>
									</div>
								</div>
							</div>
						</div> -->
						<!--口碑-->
						<div class="answerBox" style="margin-top: 56rpx;" v-if="chat.type==13">
							<div class="dialogBox" style="padding:10rpx 0 5rpx 0">
								<span>
									<image src='/static/img/eye.png' class="eyeImg"></image>
								</span>
								<span>
									<image src='/static/img/fashWb.png' class="fashWbImg" ></image>
								</span>
								<span>
									<image src='/static/img/fashTop.png' class="fashTopImg"></image>
								</span>
								<div class="centerAnswer">
									<div style="display: flex;flex-direction: row;margin-bottom: 20rpx;">
										<div class="canshuImg" style="width:70px;height:60px;background-color: #E5ECFF;margin-right: 40rpx;">
											<image src="/static/img/car1.png" style="width:70px;height:60px"></image>
										</div>
										<div>
											<p style="font-size: 28rpx;margin-bottom: 15rpx;color:#333333;line-height: 60px;">红旗HS7</p>
										</div>
									</div>
									<div v-for="(item,index) in chat.paramData" :key="index" style="margin: 0 10rpx 10rpx 0;display:inline-block;">
										<p class="koubeiBoxContent" style="display: flex;flex-direction: row;">{{item}}</p>
									</div>
									<div class="btn" @click="showMbDeatail(chat)" v-if="chat.isMore">查看更多 ></div>
								</div>
								<!--底部-->
								<div class="agreeBox">
									<div class="smallAgreeBox">
										<div class="zan" @click="handleType(chat,'yes')">
											<image src='/static/img/agreeNo.png' style="width:40rpx;height:40rpx" v-if="!chat.isAgree"></image>
											<image src='/static/img/agree.png' style="width:40rpx;height:40rpx" v-else></image>
											<span>赞</span>
										</div>
										<div class="cai" @click="handleType(chat,'no')">
											<image src='/static/img/disAgreeNo.png' style="width:40rpx;height:40rpx" v-if="!chat.isDisAgree"></image>
											<image src='/static/img/disAgree.png' style="width:40rpx;height:40rpx" v-else></image>
											<span>踩</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div :id="'bottom' + chatBoxData.length"></div>
				
			</scroll-view>
			</div>
		</div>
		<div class="fotterBox">
		<foot-component @sendConent="sendConent" @sendTextInput="sendTextInput"  @recordStart="recordStart" @recordEnd="recordEnd" ></foot-component>
		</div>
		<!-- <div style="height: 60rpx;background-color: #F8FAFF;width: 100vw" v-if="isIphoneX"></div> -->
		<!--文字和图片答案的详情-->
	    <!--<text-detail :visible="textData.visible" @close="textData.visible = false" :textDetail="textData.textCon" :detailImg="textData.detailImg" :refText="textData.refText"></text-detail>
		<video-detail :videoVisible="videoShow" :videoSrc="videoCompentSrc" @close="videoShow = false"></video-detail>
		<mb-detail :modelVisible="mbVisible" @close="mbVisible = false" :modelData="modelData"></mb-detail> -->
	</div>
</template>

<script>
	import recordVoice from "@/components/recording"
	import recommendList from "@/components/recommendList"
	import footComponent from "@/components/footer"
	import textDetail from "@/components/textDetail"
    import videoDetail from "@/components/video"
	import satisfaction from "@/components/satisfaction"
	import { answerText } from "@/utils/wx-request";
	import {answerTextz} from "@/utils/wxRequest"
	import { formatNavigateTo } from "@/utils/index";
	import headDetail from "@/components/head"
	
	let currentAudioSrc = {};
	let audioContextSrc = {};
	let homeListData = [];
	let homeListOne = [];
	let homeListTwo;
	let homeListQuestion = [];
	export default {
		onLoad() {
			this.chatBoxData = [
				{type: 3,
				textDesc: '你好，很高兴见到你。你可以使用文本或者语音跟我对话~'
			}]
		},
		onUnload() {
			this.pageNum = 1;
			this.chatBoxData = [];
		},
		data() {
			return {
				
				isIphoneX: false,
				toView: 'bottom0',
				isVoicing: false, //控制正在说话的动画
				//agreeShow: true,
				videoShow: false, //控制视频可以
				textData: {
					visible: false, //控制显示文字答案弹窗
					textCon: '',
					detailImg: '',
					refText: true
				},
				chatBoxData: [],
				//studyListRequests: [],
				//askData: [],
				pageNum: 1,
				pageSize: 3,
				total: '',
				videoCompentSrc: '', //传给子组件的视频地址
				bottomRequests: [],
				//slectOneList: [],
				//modelData: [],
				map: {},
			}
		},
		mounted() {
			const that = this;
			wx.getSystemInfo({
				success: function(res) {
					if(res.model.search("iPhone X") != -1 || res.model.search("unknown<iPhone11,6>") != -1 || res.model.search("iPhone Xs") != -1 || res.model.search("iPhone Xs Max") != -1 || res.model.search("iPhone Xr") != -1) {
						that.isIphoneX = true;
					}
				}
			});
		},
		components: {
			recordVoice,
			recommendList,
			footComponent,
			videoDetail,
			headDetail,
		},
		methods: {
			/* 数据放入数组内，可用 */
			pushData(opt) {
				let that = this;
				that.chatBoxData.push(opt);
				that.$nextTick(() => {
					setTimeout(() => { //异步更新dom
						that.toView = 'bottom' + that.chatBoxData.length;
					}, 10);
				});
			},

//     txtAnswer(resData) {
//     let that = this
//     answerTextz(resData).then(res => {
//         if (res.data.code == '0') { 
//             let answerData = res.data.data
//             answerData.forEach(e => {
//                 if (e.sub == 'tpp') {
// 					let content = JSON.parse(e.content)
// 					console.log(content)
// 					let moreResults = content.intent.moreResults
//                     moreResults.forEach(e => {
//                         if (e.rc == 0 && (e.semantic.slots.hasOwnProperty('song') ||e.semantic.slots.hasOwnProperty('artist'))) { //搜索歌曲
//                             if (e.answer.text && e.answer.type != 'NULL') {
//                                 let tempObj = { //歌曲播放提示
//                                     type: 3,
//                                     textDesc: e.answer.text,
//                                 }
//                                 that.pushData(tempObj)
//                                 let audioObj = {
//                                     type: 2,
//                                     audioSinger: e.data.result[0].singerName, //歌手
//                                     audioSrc: e.data.result[0].playUrl, //播放地址
//                                     audioPic: e.data.result[0].picMin, //专辑图片
//                                     audioName: e.data.result[0].songName, //歌名
//                                 }
//                                 that.pushData(audioObj)
//                             } else {
//                                 let tempObj = {
//                                     type: 3,
//                                     textDesc: '抱歉我没有找到对应的结果呢！我会继续努力学习的呢'
//                                 }
//                                 that.pushData(tempObj)
//                             }
//                         } else if(e.rc == 0 && e.answer.type == 'NULL' && e.hasOwnProperty('semantic')){
// 			 						let tempObj1 = {
// 										type: 3,
// 										textDesc: '抱歉，没有找到你想要的答案，我会继续学习新技能的',
// 									 }
									
// 								that.pushData(tempObj1);
// 						} else if(e.rc == 3  && e.hasOwnProperty('semantic')){
// 			 						let tempObj1 = {
// 										type: 3,
// 										textDesc: content.intent.answer.text,
// 									 }
// 								that.pushData(tempObj1);
// 						}
//                     })

//                 }
//             })
//         }
//     })
// },
    txtAnswer(resData) {
    let that = this
    answerTextz(resData).then(res => {
        if (res.data.code == '0') { 
			let answerData = res.data.data
			console.log(answerData)
            answerData.forEach(e => {
                if (e.sub == 'tpp') {
					let content = JSON.parse(e.content)
					let intent = content.intent //变成了data字段
					console.log(intent)
					if(intent.rc == 0 && !intent.hasOwnProperty('semantic') ){ //瞎输的英文字符
						   let tempObj1 = {
										type: 3,
										textDesc: intent.answer.text,
									 }
							that.pushData(tempObj1)

					}
					if(intent.service == 'mapU'){
						console.log('111')
						this.map.latitude = intent.data.result[0].latitude
						this.map.longitude = intent.data.result[0].longitude
						this.map.address =  intent.data.result[0].address
						let map = JSON.stringify(this.map)
				       formatNavigateTo(
					    "/pages/map/main?map=" + map
				        )
					return
					}
				    if (intent.rc == 0 && (intent.semantic.slots.hasOwnProperty('song') ||intent.semantic.slots.hasOwnProperty('artist')
						|| intent.semantic.slots.hasOwnProperty('genre') || intent.semantic.slots.hasOwnProperty('tags') || intent.data.result.length >0 )) {
                            if (intent.answer.text && intent.type != 'NULL' ){
								 if(intent.semantic.slots.hasOwnProperty('presenter')){  //节目相声
									
									return
								}
								//歌曲音乐
                                let tempObj = { //歌曲播放提示
                                    type: 3,
                                    textDesc: intent.answer.text,
                                }
                                that.pushData(tempObj)
                                let audioObj = {
                                    type: 2,
                                    audioSinger: intent.data.result[0].singerName, //歌手
                                    audioSrc: intent.data.result[0].playUrl, //播放地址
                                    audioPic: intent.data.result[0].picMin, //专辑图片
                                    audioName: intent.data.result[0].songName, //歌名
								}
								that.pushData(audioObj)
								return
                            }  else if(intent.rc == 0 && intent.answer.type == 'NULL' && intent.hasOwnProperty('semantic')) {
								
                                let tempObj = {
                                    type: 3,
                                    textDesc: intent.answer.text 
                                }
                                that.pushData(tempObj)
                            }
						} else if( !intent.hasOwnProperty('data')){

							{  
			 						let tempObj1 = {
										type: 3,
										textDesc: '抱歉我没有找到对应的结果呢！我会继续努力学习的呢',
									 }
									    that.pushData(tempObj1)
						    }
						}  else if(intent.rc == 3  && intent.hasOwnProperty('semantic') ){
							 
			 						let tempObj1 = {
										type: 3,
										textDesc: intent.answer.text,
									 }
								that.pushData(tempObj1)
						} else if(intent.rc == 4 && intent.hasOwnProperty('error')) {	
								
							let tempObj1 = {
										type: 3,
										textDesc: '抱歉我没有找到对应的结果呢！我会继续努力学习的呢' ,
									 }
								that.pushData(tempObj1)
						} else{
							let tempObj1 = {
										type: 3,
										textDesc: intent.answer.text,
									 }
								that.pushData(tempObj1)
						}
				} 
            })
        }
    })
},

			voiceAnswer(content) {
				let that = this;
				if(content.intent.rc == 0) {
					let restult = content.intent.data.result;
					let presentType = content.intent.data.present_type;
					if(restult.length == 1) {
						//只有一个答案的情况下
						let paramFlag = restult[0].hasOwnProperty('param');
						if(restult[0].sentences == "" && restult[0].image.length == 0 && restult[0].video.length == 0 && !paramFlag) {
							//查看data数据中是否有结果，没结果查看answer
							if(content.intent.answer.text) {
								let tempObj = {
									type: 3,
									isDisAgree: 0,
									isAgree: 0,
									textDesc: content.intent.answer.text,
									sid: content.intent.sid
								}
								if((tempObj.textDesc).length > 60) {
									tempObj.isDetails = true; //显示详情
								} else {
									tempObj.isDetails = false;
								}
								that.pushData(tempObj);
							} else {
								let tempObj = {
									type: 0,
									isDisAgree: 0,
									isAgree: 0,
									text: '抱歉，没有找到对应的结果呢！我会继续努力学习的呢',
									sid: content.intent.sid
								}
								that.pushData(tempObj);
							}
						} else if(presentType == '文字展示') {
							let text = restult[0].sentences;
							let tempObj = {
								type: 3,
								isDisAgree: 0,
								isAgree: 0,
								textDesc: text,
								sid: content.intent.sid
							}
							if((tempObj.textDesc).length > 90) {
								tempObj.isDetails = true; //显示详情
							} else {
								tempObj.isDetails = false;
							}
							that.pushData(tempObj);
						} else if(presentType == '图文搭配') {
							let txtData = restult[0].sentences.replace('<br>', '');
							let tempObj = {
								type: 4,
								isDisAgree: 0,
								isAgree: 0,
								flag: 1, // 表示只有一个答案
								imgSrc: restult[0].image,
								data: [],
								textDesc: restult[0].sentences,
								txt: txtData,
								sid: content.intent.sid
							}
							tempObj.isDetails = true; //显示详情
							that.pushData(tempObj);
						} else if(presentType == '视频展示') {
							let tempObj = {
								type: 5,
								isDisAgree: 0,
								isAgree: 0,
								videoImgSrc: restult[0].image[0],
								videoSrc: restult[0].video,
								sid: content.intent.sid
							}
							that.pushData(tempObj);
						} else if(presentType == '车型参数') {
							let keyTemp = [];
							let val = '';
							let typeFlag;
							let dataTemp = [];
							let moreFlag = false;
							for(let key in restult[0].param) {
								let temValObj = {};
								temValObj.val = restult[0].param[key];
								temValObj.keyVal = key;
								if(temValObj.val.length > 9) {
									moreFlag = true;
									temValObj.val = temValObj.val.substring(0, 8) + '...'
								}
								keyTemp.push(temValObj);
							}
							if(keyTemp.length > 8) {
								moreFlag = true;
								dataTemp = keyTemp.slice(0, 8);
							} else {
								dataTemp = keyTemp;
							}
							let tempObj = {
								type: 11,
								isDisAgree: 0,
								isAgree: 0,
								paramData: dataTemp,
								isMore: moreFlag,
								arr: restult[0].param,
								sid: content.intent.sid
							}
							that.pushData(tempObj);
						} else if(presentType == '配置亮点') {
							let keyTemp = [];
							let val = '';
							let typeFlag;
							let dataTemp = [];
							let moreFlag = false;
							for(let key in restult[0].param) {
								let temValObj = {};
								temValObj.val = restult[0].param[key];
								temValObj.keyVal = key;
								keyTemp.push(temValObj.keyVal);
							}
							if(keyTemp.length > 15) {
								moreFlag = true;
								dataTemp = keyTemp.slice(0, 15);
							} else {
								dataTemp = keyTemp;
							}
							let tempObj = {
								type: 12,
								isDisAgree: 0,
								isAgree: 0,
								paramData: dataTemp,
								isMore: moreFlag,
								arr: restult[0].param,
								sid: content.intent.sid
							}
							that.pushData(tempObj);
						} else {
							//口碑查看
							let keyTemp = [];
							let val = '';
							let typeFlag;
							let moreFlag = false;
							let dataTemp = [];
							for(let key in restult[0].param) {
								let temValObj = {};
								temValObj.val = restult[0].param[key];
								temValObj.keyVal = key;
								keyTemp.push(temValObj.keyVal);
							}
							if(keyTemp.length > 15) {
								moreFlag = true;
								dataTemp = keyTemp.slice(0, 15);
							} else {
								dataTemp = keyTemp;
							}
							let tempObj = {
								type: 13,
								isDisAgree: 0,
								isAgree: 0,
								paramData: dataTemp,
								isMore: moreFlag,
								arr: restult[0].param,
								sid: content.intent.sid
							}
							that.pushData(tempObj);
						}
					} else {
						let moreData = restult;
						let tempImgArr = [];
						let tempTxt = [];
						moreData.forEach(item => {
							if(item.sentences.length != 0) {
								tempTxt.push(item.sentences)
							}
							if(item.image.length != 0) {
								tempImgArr.push(item)
							}
						})
						//多答案的情况
						if(presentType == '文字展示') {
							let text = tempTxt[0];
							let tempObj = {
								type: 3,
								isDisAgree: 0,
								isAgree: 0,
								flag: 2, // 表示只有多个答案
								data: moreData, //多答案的结果
								textDesc: text,
								sid: content.intent.sid
							}
							if((tempObj.textDesc).length > 80) {
								tempObj.isDetails = true; //显示详情
							} else {
								tempObj.isDetails = false;
							}
							//空调使用的答案是多答案，需要判断图片
							that.pushData(tempObj);
						} else if(presentType == '图文搭配') {
							let txtTemp = tempImgArr[0].sentences.replace(/<(?!img).*?>/g, "");
							let txtData = txtTemp.replace(/<(?!br).*?>/g, "");
							let tempObj = {
								type: 4,
								isDisAgree: 0,
								isAgree: 0,
								flag: 2, // 表示只有多个答案
								imgSrc: tempImgArr[0].image,
								textDesc: tempImgArr[0].sentences,
								data: moreData, //多答案的结果
								txt: txtData,
								sid: content.intent.sid
							}
							tempObj.isDetails = true; //显示详情
							//空调使用的答案是多答案，需要判断图片
							that.pushData(tempObj);
						} else if(presentType == '视频展示') {
							console.log('多视频展示')
						} else if(presentType == '车型参数') {
							console.log('多车型参数')
						} else if(presentType == '配置亮点') {
							console.log('多配置亮点')
						} else {
							//口碑查看
							console.log('口碑查看')
						}
					}
				} else if(content.intent.rc == 4) {
					let noText;
					if(content.intent.text == '抱歉，我还没有听清你的问题呢') {
						noText = '抱歉，我还没有听清你的问题呢';
						let tempObj = {
							type: 0,
							isDisAgree: 0,
							isAgree: 0,
							isDetails: 0,
							text: noText,
							sid: content.intent.sid
						}
						that.pushData(tempObj);
					} else {
						noText = "抱歉，没有找到你想要的答案，我会继续学习新技能的";
						let tempObj = {
							type: 3,
							isDisAgree: 0,
							isAgree: 0,
							isDetails: 0,
							textDesc: noText,
							sid: content.intent.sid
						}
						that.pushData(tempObj);
					}
				}
			},
			//回答问题的接口
			answerOperate(resData, type) {
				let that = this;
				// if(type == 6) {
				// 	//品牌介绍获取以及引导答案
				// 	homeListOne = [];
				// 	homeListQuestion = [];
				// 	homeListData.forEach(item => {
				// 		if(item.categoryName == resData) {
				// 			let oneData = item.examples;
				// 			let objTemp = {
				// 				listOne: []
				// 			};
				// 			oneData.forEach(itemData => {
				// 				objTemp.type = 6; //表示品牌介绍的一级引导
				// 				objTemp.listOne.push(itemData.example);
				// 				homeListOne.push(itemData);
				// 			})
				// 			homeListQuestion = item.question;
				// 			that.chatBoxData.push(objTemp);
				// 		}
				// 	})
				// } else if(type == 7) {
				// 	//品牌介绍获取二级引导答案
				// 	homeListOne.forEach(item => {
				// 		if(item.example == resData) {
				// 			if(item.select.length != 0) {
				// 				let objTemp = {
				// 					select: []
				// 				};
				// 				objTemp.type = 7;
				// 				objTemp.select = item.select;
				// 				that.chatBoxData.push(objTemp);
				// 			} else {}
				// 		}
				// 	})
				// } else if(type == 8) {
				// 	//品牌介绍获取三级引导答案
				// 	homeListTwo = resData;
				// 	if(homeListQuestion.length != 0) {
				// 		let objTemp = {
				// 			homeListQuestion: []
				// 		};
				// 		objTemp.type = 8;
				// 		objTemp.homeListQuestion = homeListQuestion;
				// 		that.chatBoxData.push(objTemp);
				// 	} else {
				// 		let txtData = "什么是" + resData;
				// 		that.txtAnswer(txtData);
				// 	}
				// } else if(type == 1) {
				// 	//品牌介绍获取答案
				// 	let txtData = homeListTwo + resData;
				// 	that.txtAnswer(txtData);
				// } else
				 if(type == 'voice') {
					that.voiceAnswer(resData);
				} else {
					//文本输入框获取答案
					that.txtAnswer(resData);
				}
			},
			/* 也是将数据放入数组中，区分了纯文本类型？ 可用 */
			enter(type, opt) {
				let obj = {};
				if(type == 1) {
					obj = {
						text: opt
					};
					obj.type = type;
				} else {
					obj = opt;
				}
				this.chatBoxData.push(obj);
				this.$nextTick(() => {
					setTimeout(() => {
						this.toView = 'bottom' + this.chatBoxData.length;
					}, 10);
				});

			},
			//输入框发送
			sendTextInput(val, type) {
				//				console.log(val)
				if(type == 0) {
					
				} else if(val.type == 'textInput') {
					if(val.text) {
						//这里的1代表问题 chatbox左侧输入内容
						this.enter(1, val.text);
						this.answerOperate(val.text, 'noVoice');
					}
				} else if(type == 'guess') {
					//猜你想问
					this.enter(1, val.text);
					this.answerOperate(val.text, 'noVoice');
				} else if(val.type == 6) {
					if(val.stadus == 1) {
						//通过点击品牌介绍获取一级引导问题
						this.enter(1, val.text);
						//根据该问题获取答案
						this.answerOperate(val.text, val.type);
					} else {
						wx.showToast({
							title: "该知识点还未开放",
							icon: "none"
						});
						return;
					}
				} else if(type == 7) {
					//通过点击品牌介绍一级获取二级引导问题
					this.enter(1, val);
					//根据该问题获取答案
					this.answerOperate(val, 7);
				} else if(type == 8) {
					//通过点击品牌介绍二级获取二级引导问题
					this.enter(1, val);
					//根据该问题获取答案
					this.answerOperate(val, 8);
				} else if(type == 1) {
					//通过点击品牌介绍三级获取答案
					this.enter(1, val);
					//根据该问题获取答案
					this.answerOperate(val, 1);
				} else {
					//热点标签的问题
					this.enter(1, val.text);
					this.answerOperate(val.text, 'noVoice');
				}
			},
			//语音发送
			// sendConent(val) {
			// 	answerTextz(val).then(res=>{
			// 		console.log(res.data)
			// 	})
			// 					console.log(val)
			// 	if(val.text == '' && val.answer.rc == 1) {
			// 		let tempObj = {};
			// 		tempObj.text = "抱歉，我还没有听清你的问题呢";
			// 		tempObj.type = 0;
			// 		this.pushData(tempObj);
			// 		this.enter(3, tempObj.text);
			// 	} else if(val.text != '' && val.answer.intent.rc == 4) {
			// 		this.enter(1, val.text);
			// 		val.answer.intent.text = "抱歉，没有找到你想要的答案，我会继续学习新技能的";
			// 		this.answerOperate(val.answer, 'voice');
			// 	} else if(val.text != '' && val.answer.intent.rc == 0) {
			// 		this.enter(1, val.text);
			// 		this.answerOperate(val.answer, 'voice');
			// 	}
			// },
			recordStart() {
				this.isVoicing = true;
			},
			recordEnd() {
				this.isVoicing = false;
				
			},
			toSkillPage() {
				//跳转到技能中心页面
				let studyListRequests = JSON.stringify(this.studyListRequests);
				formatNavigateTo(
					"/pages/skill/main?liftTitle=" + studyListRequests
				);
			},
			toTxt() {
				let that = this;
				that.textAreaValue = ''
				that.iconShow = false;
			},
			showMbDeatail(chat) {
				this.mbVisible = true;
				this.modelData = [];
				this.modelData.push(chat);
			},
			
			//点击详情显示文字弹窗
			showDeatail(chat) {
				this.textData.visible = true;
				this.textData.textCon = chat;
				this.textData.refText = true;

			},
			//图文详情页面
			toLinkImg(chat) {
				let paramData = JSON.stringify(chat);
				formatNavigateTo(
					"/pages/verticalText/main?param=" + paramData
				);
			},
			//点击视频显示详情
			videoTap(chat) {
				//控制显示视频弹窗
				this.videoShow = true;
				//将视频地址赋值给变量
				this.videoCompentSrc = chat.videoSrc[0];
			},
			// handleType(chat, type) {
			// 	//点踩
			// 	if(type == 'no') {
			// 		chat.isDisAgree = !chat.isDisAgree;
			// 		chat.isAgree = false;
			// 	} else {
			// 		chat.isAgree = !chat.isAgree;
			// 		chat.isDisAgree = false;
			// 	}
			// 	let flag = '';
			// 	if(chat.isAgree && chat.isDisAgree == false) {
			// 		flag = 1;

			// 	} else if(chat.isAgree == false && chat.isDisAgree) {
			// 		flag = 0;
			// 	}
			// 	this.$httpWX.post({
			// 		url: '/aimind/indexMain/aiui/isok',
			// 		data: {
			// 			isok: flag,
			// 			sid: chat.sid
			// 		}
			// 	}).then(res => {
			// 		//					console.log(res)
			// 	})
			// },
		
		}
	}
</script>

<style lang="less" scoped>
	@import url("../../../static/css/base.css");
	.home-contaniner {
		height: 100vh;
		position: relative;
		background: #F8FAFF;
		//background: #78FA55;
	}

     .iconheadBox {
		position: relative;
		height: 8vh;
	}

	.home-content{
		position: relative;
		 height: 82vh;
		
	}

	.home-chat{
		position: relative;
		 height: 90vh;
		/* border: 1px solid rgba(4, 4, 20, 0.356);  */
		
	}
	.fotterBox {
		border: 1px solid rgba(4, 4, 20, 0.356); 
		position: relative;
		width: 100%;
		height: 10vh;
		//background-color: #FFFFFF;
		background-color: #F8FAFF;
	}
	/*飞鱼形象*/
	
	.scrollWidth{
		margin-top: 6rpx;
	}
	
	.headImg {
		width: 234rpx;
		height: 112rpx;
		background: url('https://autopre.openspeech.cn/aimind/static/aimind/bckImg/headbck1.png') no-repeat;
	}
	
	.topImg {
		width: 124rpx;
		height: 124rpx;
		margin: 24rpx 24rpx 0 42rpx;
	}
	
	.helloText {
		position: absolute;
		left: 192rpx;
		font-size: 40rpx;
		font-family: "PingFangSC-Medium,PingFang SC;";
		font-weight: 500;
		color: rgba(51, 51, 51, 1);
		line-height: 48rpx;
		top: 68rpx;
	}

	
	.text-input-column,
	.voice-input-column {
		overflow: hidden;
		margin-top: 30rpx;
		margin-bottom:35rpx;
	}
	
	.text-input-column div.v_me,
	.voice-input-column div.v_me {
		//overflow: hidden;
		float: right;
		padding: 20rpx 36rpx 20rpx 36rpx;
		margin-right: 10rpx;
		max-width: 580rpx;
		box-sizing: border-box;
		border-radius: 15px 6px 15px 15px;
		line-height: 34rpx;
		font-size: 28rpx;
		color: #FFFFFF;
		//background-color: #4BA4F3;
		background-color: rgb(69, 72, 77);
		box-shadow: 0 4rpx 16rpx 0 rgba(149, 150, 156, 0.24);
	}
	
	.dialogBox,
	.imgBox,
	.pinpaiOneBox,
	.videoBox {
		border-radius: 0 15rpx 15rpx 15rpx;
		position: relative;
		width: 532rpx;
		min-height: 156rpx;
		//background: rgba(255, 255, 255, 1);
		//background: #4BA4F3;
		background-color: rgba(69, 72, 77, 0.918);
		//box-shadow: 0 4rpx 16rpx 0 rgba(20, 100, 255, 0.24);
		//background: rgb(19, 216, 45);
		//box-shadow: -12rpx 4rpx 16rpx 0px rgba(69, 112, 255, 0.08);
		margin-bottom: 50rpx;
		color: #FFFFFF;
	}
	
	.dialogBox {
		min-height: 0rpx;
		padding: 20rpx 0;
		font-size: 27rpx;
		p{
		   text-indent: 15rpx;
		   padding-left: 10rpx;
		   padding-right: 10rpx;
		}
	}

	
	.dialogBoxP0 {
		border-radius: 0 38rpx 38rpx 38rpx;
		position: relative;
		width: 532rpx;
		min-height: 312rpx;
		background: rgba(255, 255, 255, 1);
		box-shadow: -12rpx 4rpx 16rpx 0px rgba(69, 112, 255, 0.08);
		min-height: 0rpx;
		padding: 20rpx 0;
	}
	
	.eyeImg {
		width: 10rpx;
		height: 10rpx;
		position: absolute;
		right: 24rpx;
		top: 20rpx;
	}
	
	.fashWbImg {
		width: 16rpx;
		height: 44rpx;
		position: absolute;
		left: -16rpx;
		top: 0;
	}
	
	.fashTopImg {
		width: 48rpx;
		height: 20rpx;
		position: absolute;
		right: 28rpx;
		top: -16rpx;
	}
	
	.centerAnswer {
		padding: 10px 18px 40px 18px;
	}
	
	.koubeiImg {
		width: 80px;
		height: 80px;
		background: rgba(249, 250, 252, 1);
	}
	/*点赞*/
	
	.agreeBox {
		border-radius: 0 0 40rpx 0;
		position: absolute;
		bottom: 0;
		width: 532rpx;
		height: 72rpx;
		background: linear-gradient(270deg, rgba(0, 0, 0, 0.03) 0%, rgba(0, 0, 0, 0) 100%);
	}
	
	.koubeiRight {
		flex: 1;
		padding-left: 32rpx;
	}
	
	.look {
		color: #4BA4F3;
		line-height: 60rpx;
		float: right;
		font-size: 24rpx;
	}
	
	.smallAgreeBox {
		font-size: 28rpx;
		color: #333;
		float: right;
		margin-right: 24rpx;
		line-height: 72rpx;
		display: flex;
		flex-direction: row;
	}
	
	.zan,
	.cai {
		width: 100rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	/*wenben*/
	
	.textEllipsis,
	.textEllipsisTwo {
		font-size: 28rpx;
		line-height: 55rpx;
		text-align: justify;
		text-justify: newspaper;
		word-break: break-all;
		text-overflow: -o-ellipsis-lastline;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 5;
		line-clamp: 5;
		font-family: PingFangSC-Regular, PingFang SC;
		-webkit-box-orient: vertical;
	}
	
	.textEllipsisTwo {
		-webkit-line-clamp: 2;
		line-clamp: 2;
	}
	
	.textEllipsisOne {
		font-size: 28rpx;
		line-height: 30rpx;
		text-align: justify;
		text-justify: newspaper;
		word-break: break-all;
		padding: 0 10rpx;
		overflow: hidden;
		font-family: PingFangSC-Regular, PingFang SC;
	}
	
	.btn {
		color: #2a5caa;
		font-size: 28rpx;
		line-height: 30rpx;
		text-align: right;
		margin: 20rpx 20rpx 0 0;
	}
	/*pic*/
	
	.imgBox
	 {
		border-radius: 38rpx;
	} 
	
	.img-column,
	.video-column {
		width: 532rpx;
		margin-top: 0rpx;
		padding-bottom: 20rpx;
		background-color: #fff;
		font-size: 28rpx;
		border-radius: 38rpx;
		min-height: 356rpx
	}
	
	/* .video-column {
		 min-height: 356rpx
	}  */
	
	.img-column {
		min-height: 550rpx;
	}
	
	.pinpaiOneBox {
		width: 582rpx;
		min-height: 174rpx;
	}
	
	.pinpaiOne-column {
		width: 582rpx;
		min-height: 174rpx;
		display: inline-block;
		padding: 36rpx 36rpx 0 36rpx;
	}
	
	.img-column image {
		width: 532rpx;
		height: 300rpx;
		margin-bottom: 12rpx;
		border-radius: 38rpx 38rpx 0 0;
	}
	
	.img-column p {
		padding: 0 20rpx 0 20rpx;
	}
	
	.pinpaiOne-column p {
		height: 50rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: rgba(51, 51, 51, 1);
		margin-bottom: 24rpx;
		line-height: 50rpx;
	}
	
	.pinpaiOne-column li {
		float: left;
		background: #f5f8fc;
		border-radius: 34rpx;
		text-align: center;
		color: #2C74B4;
		margin: 0 24rpx 24rpx 0;
		width: 77px;
		height: 30px;
		line-height: 30px;
		font-size: 12px;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
	}
	
	.mengcen {
		width: 532rpx;
		height: 300rpx;
		border-radius: 38rpx 38rpx 0 0;
		position: absolute;
		top: 0;
		left: 0;
		background: url('https://autopre.openspeech.cn/aimind/static/aimind/bckImg/videoBg1.png');
	}
	
	.mengcen div {
		width: 532rpx;
		height: 300rpx;
		border-radius: 38rpx 38rpx 0 0;
		background-color: rgba(0, 0, 0, 0.58);
		position: absolute;
		top: 0;
		left: 0
	}
	
	.mengcen div image {
		width: 78rpx;
		height: 78rpx;
		position: absolute;
		top: 50%;
		left: 50%;
		margin-top: -39rpx;
		margin-left: -39rpx;
	}
	
	.contenNo {
		font-size: 28rpx;
		line-height: 30rpx;
		text-align: justify;
		padding: 0 10rpx;
		font-family: PingFangSC-Regular, PingFang SC;
	}
	
	.mubanBox {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		height: 34rpx;
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		line-height: 34rpx;
	}
	
	.liangdian,
	.koubeiBox {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}
	
	.liangdianContent,
	.koubeiBoxContent {
		margin-right: 10rpx;
		padding: 10rpx 15rpx;
		background: #f3f6ff;
		color: #666;
		font-size: 24rpx;
	}
	.audioPage{
     position: relative;
	 margin-top: 25rpx 0 0 10rpx;
  }
</style>

