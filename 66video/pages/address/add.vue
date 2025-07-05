<template>
	<view class="address-add">
		<view class="navbar">
			<view class="back" @click="onClickBack">取消</view>
			<view class="nav-title">添加收货地址</view>
			<tui-button link plain height="88rpx" width="auto">完成</tui-button>
		</view>
		
		<view class="add-container">
			<view class="form-card">
				<view class="form-label">联系人</view>
				<view class="form-box">
					<input class="input" type="text" placeholder="请输入联系人" />
					<view class="radio-box">
						<view class="radio-item" :class="{ 'active-left': sex === 1 }" @click="sex = 1">先生</view>
						<view class="radio-item" :class="{ 'active-right': sex === 2 }" @click="sex = 2">女士</view>
					</view>
				</view>
			</view>
			<view class="form-card">
				<view class="form-label">手机号</view>
				<view class="form-box">
					<input class="input" type="text" placeholder="+86 手机号" />
				</view>
			</view>
			<view class="form-card">
				<view class="form-label">地址</view>
				<view class="form-box">
					<input class="input" type="text" placeholder="请输入详细地址" />
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				sex: 1
			}
		},
		methods: {
			onClickBack() {
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.address-add {
		width: 100%;
		background-color: #101010;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		
		.navbar {
			display: flex;
			align-items: center;
			justify-content: space-between;
			width: 100%;
			height: 88rpx;
			padding: 20rpx 32rpx;
			box-sizing: border-box;
		
			.back {
				color: #ccc;
				font-size: 32rpx;
				font-weight: 400;
			}
			
			.nav-title {
				color: #DDD;
				text-align: center;
				font-size: 36rpx;
				font-weight: 500;
				line-height: 48rpx;
			}
		
			:deep() {
				.tui-dark-disabled-outline {
					color: #FF1A8C !important;
				}
		
				.tui-btn {
					color: #FF1A8C !important;
				}
			}
		}
		
		.add-container {
			width: 100%;
			min-height: 0;
			flex: 1;
			padding: 16rpx 32rpx;
			box-sizing: border-box;
			
			.form-card {
				width: 100%;
				margin-bottom: 32rpx;
				
				.form-label {
					color: #999;
					font-size: 28rpx;
					font-weight: 400;
					line-height: 28rpx;
					margin-bottom: 16rpx;
				}
				
				.form-box {
					display: flex;
					align-items: center;
					justify-content: space-between;
					gap: 58rpx;
					
					.input {
						min-width: 0;
						flex: 1;
						height: 96rpx;
						padding: 32rpx;
						box-sizing: border-box;
						border-radius: 20rpx;
						background: #202020;
						
						.uni-input-placeholder {
							color: #555;
							font-size: 32rpx;
						}
						
						:deep() {
							.uni-input-input {
								color: #ccc;
								font-size: 32rpx;
							}
						}
					}
					
					.radio-box {
						width: 216rpx;
						display: flex;
						border-radius: 20rpx;
						background: #202020;
						
						.radio-item {
							flex: 1;
							height: 88rpx;
							display: flex;
							align-items: center;
							justify-content: center;
							border: 2rpx solid transparent;
							box-sizing: border-box;
							color: #FFF;
							font-size: 28rpx;
							font-weight: 400;
						}
						
						.active-left {
							border-color: #FF1A8C;
							border-radius: 20rpx 0 0 20rpx;
							color: #FF1A8C;
						}
						
						.active-right {
							border-color: #FF1A8C;
							border-radius: 0 20rpx 20rpx 0;
							color: #FF1A8C;
						}
					}
				}
			}
		}
	}
</style>