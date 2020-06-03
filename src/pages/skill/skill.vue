<template>
	<div class="skillBox">
		<!--技能中心界面-->
		<div class="container">
			<div class="j-left">
				<ul>
					<li :class="{'active':id == item.id}" v-for="(item,index) in skillList" :key="index" @touchstart="showRightData(item)">{{item.titleName}}</li>
				</ul>
			</div>
			<div class="rightBox">
				<div class="rightTopDes flexCloum">
					<div class="topTitle">
						<div class="title">{{title}}</div>
						<div class="des">{{des}}</div>
					</div>
				</div>
				<scroll-view scroll-y="true" class="j-right" @scroll="rightScroll" v-if="categroys.length!=0">
					<ul>
						<li  v-for="(tip,index) in categroys" :key="index">
							<div>
								<p class="askTitle"><span class="askPoint"></span>想按{{tip.categoryName}}查询<span class="speack">您可以说</span></p>
								<div class="chatListRight">
									<div class="chat flexCloum" v-for="(item,ind) in tip.examples" :key="ind">
										<div class="list">{{item.example}}</div>
									</div>
								</div>
							</div>
						</li>
					</ul>
				</scroll-view>
				<div class="noData" v-else>
					<p>暂无没有数据</p>
					<image src="/static/img/practice.png" style="width:300rpx;height:165rpx;"></image>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	//https://autopre.openspeech.cn/aimind/indexMain/example/all右侧的接口需要传参数{"titleId":"2"}
	let isScrolling = false;
	let touchstartclientY = 0;
	export default {
		onLoad(options) {
			let that = this;
			let param = JSON.parse(options.liftTitle);
			that.skillList = param;		
			that.imgSrc = that.skillList[0].titleImg;
			that.title = that.skillList[0].titleName?that.skillList[0].titleName:'暂无描述';
			that.des = that.skillList[0].titleDesc?that.skillList[0].titleDesc:'暂无描述';
			that.id = that.skillList[0].id;
			that.$httpWX.post({
				url: '/aimind/indexMain/example/all',
				data: {"titleId":param[0].id}
			}).then(res => {
				that.categroys = res.data;
			})
		},
		data() {
			return {
				id: 4,
				activeLi:'',
				imgSrc: '',
				title: '',
				des: '',
				skillList: [],
				categroys:[]
			}
		},
		onUnload() {
			this.categroys = [{
				examples: []
			}];
			this.skillList = [];
		},
		methods: {
			touchStart(event) {
				isScrolling = false;
				touchstartclientY = event.clientY;
			},
			rightScroll(event) {
				isScrolling = true;
			},
			showRightData(item){
				this.id = item.id;
				console.log(item.id);
				this.imgSrc = item.titleImg;
				this.des = item.titleDesc;
				this.title = item.titleName;
				if(this.activeLi == item.id){
					//如果多次点击同个li就不请求接口
					return;
				}else{
					this.$httpWX.post({
						url: '/aimind/indexMain/example/all',
						data: {"titleId":item.id}
					}).then(res => {
//						console.log(res)
						this.categroys = res.data;
					})
					this.activeLi = item.id;
				}				
			}
		}
	}
</script>

<style scoped="scoped">
	@import url("../../../static/css/base.css");
	.container {
		display: flex;
		flex-direction: row;
		align-items: center;
		background-color: #F8FAFF;
	}
	
	.j-left {
		height: calc(100vh);
		width:168rpx;
		background:rgba(255,255,255,1);
		box-shadow:0px 0px 14px 0px rgba(20,100,255,0.1);
		border-radius:0px 6px 6px 0px;
	}
	
	.j-left ul {
		list-style: none;
	}
	
	.j-left li {
		height: 88rpx;
		line-height: 88rpx;
		width: 168rpx;
		text-align: center;
		box-sizing: border-box;
		font-size: 24rpx;
		font-family: PingFangSC-Regular,PingFang SC;
		font-weight: 400;
		color: #666666;
	}
	
	.j-left li.active {
		color: #4570FF;
		font-weight:500;
		background: url('https://autopre.openspeech.cn/aimind/static/aimind/bckImg/slideBg1.png');
	}
	
	.rightBox,
	.j-right {
		flex: 1;
		height: calc(100vh);
	}
	.rightBox{
		position: relative;
		margin-left: 24rpx;
	}
	.rightTopDes{
		padding: 24rpx;
		margin-bottom: 36rpx;
		background: rgba(255,255,255,1);
		box-shadow: 0 0 28rpx 0 rgba(20,100,255,0.06);
		border-radius: 12rpx 0 0 12rpx;

	}
	.topTitle .title{
		height: 32rpx;
		font-size: 22rpx;
		margin-bottom: 8rpx;
		font-family: PingFangSC-Regular,PingFang SC;
		font-weight: 400;
		color: rgba(51,51,51,1);
		line-height: 32rpx;
	}
	.topTitle .des{
		font-size: 22rpx;
		font-family: PingFangSC-Light,PingFang SC;
		font-weight: 300;
		color: rgba(51,51,51,1);
		line-height: 32rpx;
	}
	.j-right {
		height: calc(100vh);
	}
	
	.j-right ul {
		list-style: none;
		margin-right: 24rpx;
	}
	
	.j-right li {
		margin-bottom: 36rpx;
	}
	.j-right li .askTitle {
		display: flex;
		flex-direction: row;
		align-items: center;
		height: 80rpx;
		padding-left: 36rpx;
		background: rgba(69,112,255,1);
		border-radius: 12rpx 12rpx 0 0;
		font-size: 28rpx;
		font-family: PingFangSC-Regular,PingFang SC;
		font-weight: 400;
		color: #FFFFFF;
		line-height: 80rpx;
	}
	.j-right li .askTitle .askPoint{
		display: block;
		width: 8rpx;
		height: 8rpx;
		border-radius: 50%;
		margin-right: 24rpx;
		background: rgba(255,202,72,1);
	}
	.j-right li .askTitle .speack{
		font-size:22rpx;
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:#E9E9E9;
		line-height:32rpx;
	}
	.rightBox .chatListRight{
		margin-top: -9rpx;
		background: rgba(255,255,255,1);
		padding: 10rpx 10rpx 20rpx 36rpx;
		box-shadow: 0 0 28rpx 0 rgba(20,100,255,0.1);
		border-radius: 12rpx 0 12rpx 12rpx;
	}
	.chat .list {
		height:35px;
		font-size:14px;
		font-family:PingFangSC-Medium,PingFang SC;
		font-weight:500;
		color:rgba(51,51,51,1);
		line-height:35px;
	}
	.chat .list:last-child{
		margin-bottom: 0rpx;
	}
	.noData{
		position: absolute;
		top:50%;
		left:50%;
		height:210rpx;
		width:300rpx;
		text-align: center;
		margin-top: -105rpx;
		margin-left: -150rpx;
	}
</style>