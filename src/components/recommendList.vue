<template>
	<div class="answer-recommen">
		<scroll-view scroll-x="true" :scroll-into-view="bottomScrollToLeft">
			<span id="left"></span>
			<ul :animation="animationBottom" style="transform: translateX(100vw)">
				<li v-for="(request,index) in bottomRequests" :key="index" @click="sendTextInput(request,3)">{{request.mark}}</li>
			</ul>
		</scroll-view>
	</div>
</template>

<script>
	const animate = wx.createAnimation({
		duration: 1000,
		timingFunction: 'ease',
	});
	export default {
		props: ['bottomRequests'],
		data() {
			return {
				bottomScrollToLeft: "",
				animationBottom: {},
			}
		},
		watch: {
			bottomRequests(newV, oleV) {
				if(newV.length === 0) {
					this.initBottomAnimate("100vw", 0);
					this.bottomScrollToLeft = "left";
					return;
				}
				this.initBottomAnimate(0, 1000);
				this.bottomScrollToLeft = "";
			}
		},
		mounted() {
			this.initBottomAnimate(0, 1000);
		},

		methods: {
			sendTextInput(req) {
				let val = {
					text: req.mark,
					type:3
				}
				this.$emit("sendTextInput",val);
			},
			initBottomAnimate(number, time) {
				animate.translate(number).step({
					duration: time
				});
				this.animationBottom = animate.export();
			}
		}
	}
</script>

<style scoped>
	@import url("../../static/css/base.css");
	.answer-recommen {
		height: 80rpx;
		padding: 5rpx 10rpx;
		background-color: #FFFFFF;
		/*margin-bottom: 38rpx;*/
		margin-bottom: 20rpx;
	}
	
	.answer-recommen ul {
		white-space: nowrap;
		width: auto;
	}
	.answer-recommen li {
		padding: 0rpx 30rpx;
		border-radius: 36rpx;
		display: inline-block;
		margin:10rpx 0 10rpx 16rpx;		
		height:32px;
		background:#f5f6fc;
		border-radius:16px;
		font-size:12px;
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:#444444;
		line-height:32px;
	}
	
	.answer-recommen li:first-child {
		margin-left: 14rpx;
	}
	
	.answer-recommen li:last-child {
		margin-right: 30rpx;
	}
</style>