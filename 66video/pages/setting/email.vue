<template>
	<view class="email">
		<view class="status_bar"></view>
		<NavBar title="邮箱"></NavBar>
		<view class="email-container">
			<view class="label">邮箱</view>
			<input class="input" v-model="email" type="text" placeholder="请输入邮箱" />
			<view class="button" @click="submitForm">提交</view>
		</view>
	</view>
</template>

<script setup>
	import NavBar from '@/components/NavBar/index.vue'
	import { apiChangeEmail } from '@/common/api/user.js'
	import { ref } from 'vue'
	const email = ref('');
	const submitForm = async () => {
		if (!email.value) {
			uni.showToast({
				title: '请输入邮箱',
				icon: 'none'
			})
			return
		}
		if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email.value)) {
			uni.showToast({
				title: '请输入正确的邮箱格式',
				icon: 'none'
			})
			return
		}
		const {code,msg} = await apiChangeEmail({
			email: email.value,
			loading:true
		})
		uni.showToast({ title: msg, icon:'none', duration: 2000 });
		if (code === 0) {
			uni.navigateBack();
		}
	}
</script>

<style lang="scss" scoped>
	.email {
		width: 100%;
		background-color: #101010;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		&-container {
			width: 100%;
			padding: 16rpx 32rpx;
			box-sizing: border-box;
			.label {
				color: #999;
				font-size: 28rpx;
				margin-bottom: 16rpx;
			}
			.input {
				width: 100%;
				height: 96rpx;
				background-color: #202020;
				border-radius: 20rpx;
				padding: 32rpx 16rpx 32rpx 24rpx;
				box-sizing: border-box;
				:deep() {
					.uni-input-placeholder {
						color: #555;
						font-size: 32rpx;
					}
					.uni-input-input {
						color: #ccc;
						font-size: 32rpx;
					}
				}
			}
			.button {
				width: 100%;
				height: 88rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				border-radius: 12rpx;
				background: linear-gradient(270deg, #D018F5 0%, #FA3296 100%);
				color: #fff;
				font-size: 34rpx;
				margin-top: 80rpx;
			}
		}
	}
</style>