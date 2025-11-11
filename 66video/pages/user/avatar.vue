<template>
	<view class="avatar">
		<view class="status_bar"></view>
		<view class="navbar">
			<view class="cancel" @click="onBack">取消</view>
			<view class="title">头像</view>
			<view class="submit" @click="onSubmit">完成</view>
		</view>
		<!-- <view class="avatar-container">
			<image 
				class="img" 
				:class="{ selected: selectedAvatar === '/static/images/avatar/img1.png' }"
				src="/static/images/avatar/img1.png" 
				mode="widthFix"
				@click="selectAvatar('/static/images/avatar/img1.png')"
			></image>
			<image 
				class="img" 
				:class="{ selected: selectedAvatar === '/static/images/avatar/img2.png' }"
				src="/static/images/avatar/img2.png" 
				mode="widthFix"
				@click="selectAvatar('/static/images/avatar/img2.png')"
			></image>
			<image 
				class="img" 
				:class="{ selected: selectedAvatar === '/static/images/avatar/img3.png' }"
				src="/static/images/avatar/img3.png" 
				mode="widthFix"
				@click="selectAvatar('/static/images/avatar/img3.png')"
			></image>
			<image 
				class="img" 
				:class="{ selected: selectedAvatar === '/static/images/avatar/img4.png' }"
				src="/static/images/avatar/img4.png" 
				mode="widthFix"
				@click="selectAvatar('/static/images/avatar/img4.png')"
			></image>
			<image 
				class="img" 
				:class="{ selected: selectedAvatar === '/static/images/avatar/img5.png' }"
				src="/static/images/avatar/img5.png" 
				mode="widthFix"
				@click="selectAvatar('/static/images/avatar/img5.png')"
			></image>
			<image 
				class="img" 
				:class="{ selected: selectedAvatar === '/static/images/avatar/img6.png' }"
				src="/static/images/avatar/img6.png" 
				mode="widthFix"
				@click="selectAvatar('/static/images/avatar/img6.png')"
			></image>
			<image 
				class="img" 
				:class="{ selected: selectedAvatar === '/static/images/avatar/img7.png' }"
				src="/static/images/avatar/img7.png" 
				mode="widthFix"
				@click="selectAvatar('/static/images/avatar/img7.png')"
			></image>
			<image 
				class="img" 
				:class="{ selected: selectedAvatar === '/static/images/avatar/img8.png' }"
				src="/static/images/avatar/img8.png" 
				mode="widthFix"
				@click="selectAvatar('/static/images/avatar/img8.png')"
			></image>
			<image 
				class="img" 
				:class="{ selected: selectedAvatar === '/static/images/avatar/img9.png' }"
				src="/static/images/avatar/img9.png" 
				mode="widthFix"
				@click="selectAvatar('/static/images/avatar/img9.png')"
			></image>
			<image 
				class="img" 
				:class="{ selected: selectedAvatar === '/static/images/avatar/img10.png' }"
				src="/static/images/avatar/img10.png" 
				mode="widthFix"
				@click="selectAvatar('/static/images/avatar/img10.png')"
			></image>
			<image 
				class="img" 
				:class="{ selected: selectedAvatar === '/static/images/avatar/img11.png' }"
				src="/static/images/avatar/img11.png" 
				mode="widthFix"
				@click="selectAvatar('/static/images/avatar/img11.png')"
			></image>
			<image 
				class="img" 
				:class="{ selected: selectedAvatar === '/static/images/avatar/img12.png' }"
				src="/static/images/avatar/img12.png" 
				mode="widthFix"
				@click="selectAvatar('/static/images/avatar/img12.png')"
			></image>
			<image 
				class="img" 
				:class="{ selected: selectedAvatar === '/static/images/avatar/img13.png' }"
				src="/static/images/avatar/img13.png" 
				mode="widthFix"
				@click="selectAvatar('/static/images/avatar/img13.png')"
			></image>
			<image 
				class="img" 
				:class="{ selected: selectedAvatar === '/static/images/avatar/img14.png' }"
				src="/static/images/avatar/img14.png" 
				mode="widthFix"
				@click="selectAvatar('/static/images/avatar/img14.png')"
			></image>
			<image 
				class="img" 
				:class="{ selected: selectedAvatar === '/static/images/avatar/img15.png' }"
				src="/static/images/avatar/img15.png" 
				mode="widthFix"
				@click="selectAvatar('/static/images/avatar/img15.png')"
			></image>
		</view> -->
		
		<!-- 上传自定义头像功能 -->
		<view class="upload-section">
			<view class="upload-title">上传自定义头像</view>
			<view class="upload-container">
				<view class="upload-btn" @click="chooseCustomAvatar">
					<image v-if="customAvatar" :src="customAvatar" class="custom-avatar-preview" mode="aspectFill"></image>
					<view v-else class="upload-placeholder">
						<text class="upload-icon">+</text>
						<text class="upload-text">选择图片</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { ref } from 'vue'
	import { apiUpdateProfile, uploadAvatarImage, chooseImage,apiGetUserInfo } from '@/common/api/user.js'
	
	// 响应式数据
	const selectedAvatar = ref('')
	const customAvatar = ref('')
	const isUploading = ref(false)
	
	// 选择预设头像
	const selectAvatar = (avatarPath) => {
		selectedAvatar.value = avatarPath
		customAvatar.value = '' // 清空自定义头像
	}
	
	// 选择自定义头像
	const chooseCustomAvatar = async () => {
		try {
			const imagePath = await chooseImage()
			customAvatar.value = imagePath
			selectedAvatar.value = '' // 清空预设头像选择
		} catch (error) {
			uni.showToast({
				title: '选择图片失败',
				icon: 'error'
			})
		}
	}
	
	// 完成按钮点击事件
	const onSubmit = async () => {
		if (!selectedAvatar.value && !customAvatar.value) {
			uni.showToast({
				title: '请选择头像',
				icon: 'error'
			})
			return
		}
		
		isUploading.value = true
		
		try {
			let avatarUrl = ''
			
			if (customAvatar.value) {
				// 上传自定义头像
				let {code,data,msg} = await uploadAvatarImage(customAvatar.value);
				uni.showToast({ title: msg, icon: 'none' });
				if (code == 0) {
					avatarUrl = data.avatar;
				}else{
					return;
				}
			} else {
				// 使用预设头像
				avatarUrl = selectedAvatar.value
			}
			
			// 更新用户头像
			let {code,msg} =  await apiUpdateProfile({
				avatar: avatarUrl
			})
			uni.showToast({ title: msg, icon: 'none' });
			if( code != 0 ){
				return;
			}
		
			const {code:dataCode,data} = await apiGetUserInfo();
			if (dataCode == 0) {
				uni.setStorageSync('storage_user_data', data);	
				// 延迟返回上一页
				setTimeout(() => {
					uni.navigateBack()
				}, 1500)
			} else {
				uni.showToast({ title: '更新失败，请稍后再试', icon: 'none' });
			}
		} catch (error) {
			uni.hideLoading()
			uni.showToast({
				title: error.message || error || '更新失败',
				icon: 'error'
			})
		} finally {
			isUploading.value = false
		}
	}
	
	const onBack = () => {
		uni.navigateTo({
		  url: '/pages/user/index'
		})
	}
</script>

<style lang="scss" scoped>
	.avatar {
		width: 100%;
		background-color: #101010;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		.navbar {
			position: relative;
			width: 100%;
			height: 88rpx;
			padding: 20rpx 32rpx;
			box-sizing: border-box;
			.cancel {
				position: absolute;
				top: 50%;
				left: 32rpx;
				transform: translateY(-50%);
				color: #ccc;
				font-size: 32rpx;
			}
			.title {
				color: #ccc;
				font-size: 36rpx;
				font-weight: 500;
				line-height: 48rpx;
				text-align: center;
			}
			.submit {
				position: absolute;
				top: 50%;
				right: 32rpx;
				transform: translateY(-50%);
				width: 120rpx;
				height: 64rpx;
				background: linear-gradient(0deg, #D018F5 0%, #FA3296 100%);
				border-radius: 50rpx;
				font-size: 28rpx;
				color: #fff;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
		&-container {
			width: 100%;
			padding: 56rpx 68rpx;
			box-sizing: border-box;
			display: grid;
			grid-template-columns: repeat(4, 1fr);
			gap: 60rpx 40rpx;
			.img {
				width: 124rpx;
				border-radius: 50%;
				border: 4rpx solid transparent;
				transition: all 0.3s ease;
				cursor: pointer;
				
				&.selected {
					border-color: #FA3296;
					transform: scale(1.1);
				}
			}
		}
	}
	
	.upload-section {
		width: 100%;
		padding: 40rpx 68rpx 80rpx;
		box-sizing: border-box;
		
		.upload-title {
			color: #ccc;
			font-size: 28rpx;
			text-align: center;
			margin-bottom: 40rpx;
		}
		
		.upload-container {
			display: flex;
			justify-content: center;
			
			.upload-btn {
				width: 200rpx;
				height: 200rpx;
				border-radius: 50%;
				border: 2rpx dashed #666;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				position: relative;
				cursor: pointer;
				transition: all 0.3s ease;
				
				&:hover {
					border-color: #FA3296;
				}
				
				.custom-avatar-preview {
					width: 100%;
					height: 100%;
					border-radius: 50%;
				}
				
				.upload-placeholder {
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					
					.upload-icon {
						font-size: 60rpx;
						color: #666;
						line-height: 1;
						margin-bottom: 10rpx;
					}
					
					.upload-text {
						font-size: 24rpx;
						color: #666;
					}
				}
			}
		}
	}
</style>