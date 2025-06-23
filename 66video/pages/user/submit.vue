<template>
	<view class="submit">
		<view class="navbar">
			<view class="back">取消</view>
			<tui-button link plain height="88rpx" width="auto">发帖</tui-button>
		</view>
		<view class="input">
			<input type="textarea" />
		</view>
		<view class="upload">
			<tui-upload :value="value" :serverUrl="serverUrl" @complete="result" @remove="remove"></tui-upload>
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
				value: [] //初始化图片
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
			padding: 0 40rpx;
			box-sizing: border-box;
		}
		.upload {
			padding: 0 40rpx;
			box-sizing: border-box;
		}
	}
</style>