<template>
	<view class="info">
		<NavBar title="个人资料"></NavBar>
		<view class="info-container">
			<view class="card" @click="toLink('/pages/user/avatar')">
				<view class="label">头像</view>
				<view class="right">
					<image class="avatar" mode="widthFix"
						:src="userInfo.value.avatar || '/static/images/mine/avatar.png'" />
					<image class="arrow" src="/static/images/setting/icon_arrow.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="card" @click="toLink('/pages/user/nickname')">
				<view class="label">昵称</view>
				<view class="right">
					<text>{{userInfo.value.nickname}}</text>
					<image class="arrow" src="/static/images/setting/icon_arrow.png" mode="widthFix"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {apiGetUserInfo} from '@/common/api/user.js'
	
	import NavBar from '@/components/NavBar/index.vue'
	import { reactive } from 'vue'
	import { onShow } from '@dcloudio/uni-app'
	
	const userInfo = reactive({
		avatar: '',
		nickname: ''
	});

	// 获取用户数据的函数
	const getUserInfo = async () => {
	    const {code, msg, data} = await apiGetUserInfo();
	    userInfo.value = data;
		console.log(userInfo.value)
	};

	onShow(() => {
		console.log('进入 onShow - 路由变化监听');
	});
	getUserInfo()
	const toLink = (url) => {
		uni.navigateTo({
			url
		})
	}
</script>

<style lang="scss" scoped>
	.info {
		width: 100%;
		background-color: #101010;
		min-height: 100vh;
		display: flex;
		flex-direction: column;

		&-container {
			width: 100%;
			padding: 16rpx 32rpx;
			box-sizing: border-box;

			.card {
				width: 100%;
				padding: 28rpx 24rpx 28rpx 32rpx;
				box-sizing: border-box;
				background: #333;
				border-radius: 20rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-bottom: 24rpx;

				.label {
					color: #ddd;
					font-size: 32rpx;
				}

				.right {
					display: flex;
					align-items: center;

					.arrow {
						width: 32rpx;
						height: 32rpx;
					}
					text {
						font-size: 32rpx;
						color: #A5A9B2;
						margin-right: 8rpx;
					}
					.avatar {
						width: 128rpx;
						height: 128rpx;
						border-radius: 50%;
						overflow: hidden;
						margin-right: 36rpx;
					}
				}

			}

			.card-list {
				width: 100%;
				background-color: #202020;
				border-radius: 12rpx;
				padding: 0 24rpx 0 32rpx;
				box-sizing: border-box;


			}
		}
	}
</style>