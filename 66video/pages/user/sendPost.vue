<template>
	<view class="post-page">
		<view class="nav">
			<text class="nav-cancel" @tap="onCancel">取消</text>
			<text class="nav-publish" @tap="onPublish">发帖</text>
		</view>

		<!-- 文本输入 -->
		<textarea class="content-input" v-model="form.content" placeholder="说说你想法吧~" placeholder-class="content-ph"
			maxlength="500" auto-height cursor-spacing="20" />

		<!-- 上传图片 -->
		<view class="section">
			<tui-upload :value="value" :serverUrl="serverUrl" @complete="result" @remove="remove" width="166"
				height="166"></tui-upload>
		</view>

		<!-- 发帖板块 -->
		<view class="section">
			<view class="section-title">发帖板块</view>
			<view class="tag-list">
				<view v-for="(item, index) in categories" :key="item.id" class="tag"
					:class="{ active: form.categoryId === item.id }" @tap="selectCategory(item.id)">
					{{ item.name }}
				</view>
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

				form: {
					content: '',
					categoryId: 1
				},

				files: [],

				categories: [{
						id: 1,
						name: '选中样式'
					},
					{
						id: 2,
						name: '板块名称'
					},
					{
						id: 3,
						name: '板块名称'
					},
					{
						id: 4,
						name: '板块名称'
					},
					{
						id: 5,
						name: '板块名称'
					}
				]
			}
		},
		onLoad() {
			setTimeout(() => {
				this.value = ['https://thorui.cn/images/index/logo.png', 'https://thorui.cn/images/index/logo.png',
					'https://thorui.cn/images/index/logo.png', 'https://thorui.cn/images/index/logo.png'
				]
			}, 200)
		},
		methods: {
			// 计算每格宽高，保证一行 4 个
			result: function(e) {
				console.log(e)
				this.imageData = e.imgArr;
			},
			remove: function(e) {
				//移除图片
				console.log(e)
				let index = e.index
			},
			onCancel() {
				uni.navigateBack({
					delta: 1
				})
			},
			onPublish() {
				if (!this.form.content && this.files.length === 0) {
					return uni.showToast({
						title: '写点内容或选择图片吧',
						icon: 'none'
					})
				}
				uni.showLoading({
					title: '发布中...'
				})
				setTimeout(() => {
					uni.hideLoading()
					uni.showToast({
						title: '已发布',
						icon: 'success'
					})
				}, 800)
			},
			selectCategory(id) {
				this.form.categoryId = id
			},
		}
	}
</script>

<style scoped>
	::v-deep.tui-image-item {
		margin-right: 12rpx;
		margin-bottom: 12rpx;
	}

	::v-deep.tui-image-item:nth-child(4n) {
		margin-right: 0;
	}

	.post-page {
		min-height: 100vh;
		background: #0c0c0c;
		color: #eaeaea;
		padding: 0 24rpx;
		box-sizing: border-box;
	}

	.nav {
		height: 88rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.nav-cancel {
		font-size: 32rpx;
		color: #ccc;
	}

	.nav-publish {
		font-size: 32rpx;
		color: #FF1A8C;
	}

	.content-input {
		width: 100%;
		min-height: 220rpx;
		padding: 20rpx 0;
		font-size: 30rpx;
		line-height: 1.6;
		color: #f5f5f5;
		background: transparent;
	}

	.content-ph {
		color: #9aa0a6;
	}

	.section {
		margin-top: 30rpx;
	}

	.section-title {
		font-size: 30rpx;
		color: #666;
		margin: 30rpx 0 20rpx;
	}

	.tag-list {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 16rpx;
	}

	.tag {
		text-align: center;
		width: 100%;
		height: 88rpx;
		line-height: 88rpx;
		background: #333;
		border: 2rpx solid #333;
		color: #CCC;
		border-radius: 20rpx;
		font-size: 32rpx;
	}

	.tag.active {
		background: transparent;
		color: #FF1A8C;
		border: 2rpx solid #FF1A8C;
	}
</style>