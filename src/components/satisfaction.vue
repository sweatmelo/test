<template>
	<div class="agree_poa">
		<image src='/static/img/disAgreeNo.png' style="width:40rpx;height:40rpx;margin:20rpx 20rpx 0 0" v-if="!isDisAgree" @click="disAgree"></image>
		<image src='/static/img/disAgree.png' style="width:40rpx;height:40rpx;margin:20rpx 20rpx 0 0" v-else @click="disAgree"></image>
		<image src='/static/img/agreeNo.png' style="width:40rpx;height:40rpx" v-if="!isAgree" @click="agreeImg"></image>
		<image src='/static/img/agree.png' style="width:40rpx;height:40rpx" v-else @click="agreeImg"></image>
	</div>
</template>

<script>
	export default {
		props: ['isDisAgree', 'isAgree'],
		data() {},
		methods: {
			disAgree(data) {
				this.$emit('disAgree', isDisAgree)
			},
			agreeImg(data) {
				this.$emit('agreeImg', isAgree)
			}
		}
	}
</script>

<style>

</style>