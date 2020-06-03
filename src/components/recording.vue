<template>
	<div class="joy-voice-modal">
		<!--v-if="isVoicing"-->
		<div class="j-content">
			<p>上滑取消&nbsp;松开发送</p>
			<!--<p style="font-size: 18rpx;margin:8rpx 0 16rpx;" >语音解析科大讯飞提供</p>-->
			<div class="j_img">
				<img src="/static/img/voice/1.png" class="a1">
				<!--voiceing.imgSrc-->
				<img src="/static/img/voice/2.png" class="a2">
				<img src="/static/img/voice/3.png" class="a3">
				<img src="/static/img/voice/4.png" class="a4">
				<img src="/static/img/voice/5.png" class="a5">
				<img src="/static/img/voice/6.png" class="a6">
			</div>
		</div>
	</div>
</template>

<script>
	export default {}
</script>

<style scoped>
	.joy-voice-modal {
		position: fixed;
		z-index: 100;
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}
	
	.joy-voice-modal div.j-content {
		width: 246rpx;
		height: 246rpx;
		border-radius: 20rpx;
		background-color: rgba(0, 0, 0, 0.7);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	
	.joy-voice-modal div.j-content p {
		color: #fff;
		font-size: 22rpx;
		/*margin-bottom: 36rpx;*/
	}
	
	.joy-voice-modal div.j-content .j_img {
		width: 100rpx;
		height: 100rpx;
		position: relative;
	}
	
	.joy-voice-modal div.j-content .j_img img {
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
	}
	
	.a1,
	.a2,
	.a3,
	.a4,
	.a5,
	.a6 {
		-webkit-animation-delay: 200ms;
		animation-delay: 200ms;
	}
	
	.a1 {
		-webkit-animation: transOpact1 2.5s ease-in-out infinite;
		animation: transOpact1 2.5s ease-in-out infinite;
	}
	
	.a2 {
		-webkit-animation: transOpact2 2.5s ease-in-out infinite;
		animation: transOpact2 2.5s ease-in-out infinite;
	}
	
	.a3 {
		-webkit-animation: transOpact3 2.5s ease-in-out infinite;
		animation: transOpact3 2.5s ease-in-out infinite;
	}
	
	.a4 {
		-webkit-animation: transOpact4 2.5s ease-in-out infinite;
		animation: transOpact4 2.5s ease-in-out infinite;
	}
	
	.a5 {
		-webkit-animation: transOpact5 2.5s ease-in-out infinite;
		animation: transOpact5 2.5s ease-in-out infinite;
	}
	
	.a6 {
		-webkit-animation: transOpact6 2.5s ease-in-out infinite;
		animation: transOpact6 2.5s ease-in-out infinite;
	}
	
	@keyframes transOpact1 {
		
		0% {
			opacity: 1;
		}
		20% {
			opacity: 0;
		}
		40% {
			opacity: 0;
		}
		60% {
			opacity: 0;
		}
		80% {
			opacity: 0;
		}
		100% {
			opacity: 0;
		}
	}
	
	@keyframes transOpact2 {
		0% {
			opacity: 0;
		}
		20% {
			opacity: 1;
		}
		40% {
			opacity: 0;
		}
		60% {
			opacity: 0;
		}
		80% {
			opacity: 0;
		}
		100% {
			opacity: 0;
		}
	}
	
	@keyframes transOpact3 {
		0% {
			opacity: 0;
		}
		20% {
			opacity: 0;
		}
		40% {
			opacity: 1;
		}
		60% {
			opacity: 0;
		}
		80% {
			opacity: 0;
		}
		100% {
			opacity: 0;
		}
	}
	
	@keyframes transOpact4 {
		0% {
			opacity: 0;
		}
		20% {
			opacity: 0;
		}
		40% {
			opacity: 0;
		}
		60% {
			opacity: 1;
		}
		80% {
			opacity: 0;
		}
		100% {
			opacity: 0;
		}
	}
	
	@keyframes transOpact5 {
		0% {
			opacity: 0;
		}
		20% {
			opacity: 0;
		}
		40% {
			opacity: 0;
		}
		60% {
			opacity: 0;
		}
		80% {
			opacity: 1;
		}
		100% {
			opacity: 0;
		}
	}
	
	@keyframes transOpact6 {
		0% {
			opacity: 0;
		}
		20% {
			opacity: 0;
		}
		40% {
			opacity: 0;
		}
		60% {
			opacity: 0;
		}
		80% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
</style>