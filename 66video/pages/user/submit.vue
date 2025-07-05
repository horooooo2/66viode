<template>
	<view class="submit">
		<view class="navbar">
			<view class="back" @click="onClickBack">取消</view>
			<tui-button link plain height="88rpx" width="auto">发帖</tui-button>
		</view>
		<view class="input">
			<tui-textarea placeholder="说说你想法吧~"></tui-textarea>
		</view>
		<view class="upload">
			<tui-upload :value="value" :serverUrl="serverUrl" @complete="result" @remove="remove" width="160"
				height="160" radius="20"></tui-upload>
		</view>
		<view class="sector">
			<view class="label">发帖板块</view>
			<view class="card-list">
				<view class="card-item" v-for="i in 5" :key="i" :class="{ active: isActive(i) }" @click="onClick(i)">
					板块名称</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imageData: [],
				//上传接口地址
				serverUrl: "https://api.thorui.cn/",
				value: [], //初始化图片
				activeIndex: 1,
			}
		},
		computed: {
			isActive() {
				return (i) => {
					return i === this.activeIndex
				}
			}
		},
		onLoad() {
			setTimeout(() => {
				this.value = ['https://thorui.cn/images/index/logo.png']
			}, 200)
		},
		methods: {
			result: function(e) {
				console.log(e)
				this.imageData = e.imgArr;
			},
			remove: function(e) {
				//移除图片
				console.log(e)
				let index = e.index
			},
			onClick(i) {
				this.activeIndex = i
			},
			onClickBack() {
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.submit {
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

			:deep() {
				.tui-dark-disabled-outline {
					color: #FF1A8C !important;
				}

				.tui-btn {
					color: #FF1A8C !important;
				}
			}
		}

		.input {
			padding: 48rpx 40rpx;
			box-sizing: border-box;

			:deep() {
				.tui-textarea__wrap {
					background-color: transparent !important;
					border: none !important;
					padding: 0 !important;
				}

				.uni-textarea-line,
				.uni-textarea-compute {
					font-size: 28rpx;
					color: #ddd;
				}

				.uni-textarea-textarea {
					color: #ddd;
				}

				.tui-placeholder {
					color: #999DA6;
				}
			}
		}

		.upload {
			padding: 0 40rpx;
			box-sizing: border-box;
			margin-bottom: 48rpx;

			:deep() {
				.tui-upload__unborder {
					background-color: rgba(255, 235, 219, 0.1) !important;
					border: 2rpx solid #FF1A8C !important;
				}

				.tui-upload-icon {
					color: #FF1A8C !important;
				}

				.tui-img-del {
					border-radius: 0 20rpx;
					top: 0;
					right: 0;
					background: rgba(0, 0, 0, 0.50) !important;
				}
			}
		}

		.sector {
			padding: 0 40rpx;
			box-sizing: border-box;

			.label {
				color: #666;
				font-size: 28rpx;
				font-weight: 400;
				margin-bottom: 32rpx;
			}
			.card-list {
				display: grid;
				grid-template-columns: repeat(3,1fr);
				gap: 16rpx;
				.card-item {
					height: 88rpx;
					border-radius: 20rpx;
					border: 2rpx solid transparent;
					font-size: 32rpx;
					background-color: #333;
					color: #ccc;
					display: flex;
					align-items: center;
					justify-content: center;
				}
				.active {
					border-color: #FF1A8C;
					background-color: rgba(255, 128, 25, 0.10);
					color: #FF1A8C;
				}
			}
		}
	}
</style>