<template>
	<view class="submit">
		<view class="status_bar"></view>
		<view class="navbar">
			<view class="back" @click="onClickBack">取消</view>
			<tui-button link plain height="88rpx" width="auto" :disabled="isDisabled" @click="submit">发帖</tui-button>
		</view>
		<view class="content">
			<view class="input-box">
				<input v-model="title" type="text" placeholder="请输入标题" class="input" />
			</view>
			<view class="input-box">
				<textarea v-model="content" placeholder="说说你想法吧~" class="input-textarea" />
			</view>
			<view class="upload-box">
				<view class="upload-label">上传图片</view>
				<view class="upload-content">
					<!-- 已上传图片预览 -->
					<view class="upload-imgs" v-if="image_url.length">
						<view v-for="(img, index) in image_url" :key="index" class="image-wrapper">
							<image :src="img" mode="widthFix" class="preview-image" @click="previewImage(index)" />
							<view class="delete-btn" @click.stop="removeImage(index)">×</view>
						</view>
					</view>
					<image v-if="image_url.length < 9" class="upload-cover" src="/static/images/mine/upload-image.png"
						@click="onUploadMultipleImg" mode="widthFix"></image>
				</view>
			</view>
			<view class="upload-box">
				<view class="upload-label">上传视频</view>
				<view class="video-wrapper" v-if="video_url">
					<video :src="video_url" controls autoplay="false" initial-time="0" loop="false" muted="false"
						class="preview-video"></video>
					<view class="delete-btn" @click="removeVideo">×</view>
				</view>
				<view class="upload-content" v-else @click="onUploadVideo">
					<image src="/static/images/mine/upload-video.png" mode="widthFix" class="upload-cover"></image>
				</view>
			</view>
			<view class="upload-box">
				<view class="upload-label">设置封面</view>
				<view class="upload-content" @click="onUploadSingleImg">
					<image v-if="cover_image" :src="cover_image" mode="widthFix" class="upload-cover"></image>
					<image v-else src="/static/images/mine/upload-image.png" mode="widthFix" class="upload-cover">
					</image>
				</view>
			</view>
			<view class="category-box">
				<view class="category-label">发帖板块</view>
				<view class="category-list">
					<view class="category-item" v-for="(item, index) in categories" :key="index"
						:class="{ active: isActive(index) }" @click="onClickCategories(item.id, index)">{{ item.name }}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		apiGetArticleCategories
	} from "@/common/api/content.js";
	import {
		chooseImage,
		chooseVideo,
		uploadImage,
		uploadVideo,
		saveArticleApi
	} from '@/common/api/user.js'

	export default {
		data() {
			return {
				disabled: true,
				activeIndex: 0,
				category_id: "",
				categories: [],
				title: "",
				content: "",
				cover_image: '',
				image_url: [],
				video_url: '',
				isSubmitting: false // 防止重复提交
			}
		},
		computed: {
			isActive() {
				return (index) => {
					return index === this.activeIndex
				}
			},
			isDisabled() {
				// 如果正在提交中，禁用按钮
				if (this.isSubmitting) return true;
				
				// 检查分类ID不为空
				const hasCategoryId = this.category_id && this.category_id.toString().trim() !== '';
				// 检查标题不为空且有实际内容
				const hasTitle = this.title && this.title.trim() !== '';
				// 检查内容不为空且有实际内容
				const hasContent = this.content && this.content.trim() !== '';
				
				// 注意：根据业务需求，视频、封面图、图片可能不是必填项
				// 如果这些都是必填的，可以取消下面的注释
				/*
				// 检查视频URL不为空
				const hasVideo = this.video_url && this.video_url.trim() !== '';
				// 检查封面图不为空
				const hasCoverImage = this.cover_image && this.cover_image.trim() !== '';
				// 检查图片数组有内容
				const hasImages = Array.isArray(this.image_url) && this.image_url.length > 0;
				*/
				
				// 目前只要求分类、标题、内容为必填，其他可选
				// 如果所有都是必填，请使用上面的注释代码
				return !(hasCategoryId && hasTitle && hasContent);
			}
		},
		onLoad() {},
		onShow() {
			this.fetchCategories();
		},
		methods: {
			async submit() {
				// 防止重复提交
				if (this.isSubmitting) return;
				
				// 再次验证必填项
				if (!this.category_id || !this.title.trim() || !this.content.trim()) {
					uni.showToast({
						title: '请填写完整信息',
						icon: 'none'
					});
					return;
				}
				
				this.isSubmitting = true;
				uni.showLoading({
					title: '发布中...',
					mask: true
				});
				
				try {
					let coverImageUrl = '';
					let videoUrl = '';
					let imageUrls = [];
					
					// 上传封面图片
					if (this.cover_image) {
						const {code, data, msg} = await uploadImage(this.cover_image);
						if (code === 0) {
							coverImageUrl = data.url;
						} else {
							uni.showToast({
								title: `封面上传失败: ${msg}`,
								icon: 'none'
							});
							return;
						}
					}
					
					// 上传视频
					if (this.video_url) {
						const {code, data, msg} = await uploadVideo(this.video_url);
						if (code === 0) {
							videoUrl = data.url ;
						} else {
							uni.showToast({
								title: `视频上传失败: ${msg}`,
								icon: 'none'
							});
							return;
						}
					}
					
					// 循环上传图片数组
					if (this.image_url.length > 0) {
						for (let i = 0; i < this.image_url.length; i++) {
							const {code, data, msg} = await uploadImage(this.image_url[i]);
							if (code === 0) {
								imageUrls.push(data.url);
							} else {
								uni.showToast({
									title: `图片上传失败: ${msg}`,
									icon: 'none'
								});
								return;
							}
						}
					}
					
					// 准备提交数据
					const postData = {
						title: this.title.trim(),
						content: this.content.trim(),
						category_id: this.category_id,
						cover_image: coverImageUrl,
						image_url: imageUrls,
						video_url: videoUrl
					};
					
					// 调用保存接口
					const {code, data, msg} = await saveArticleApi(postData);
					
					if (code === 0) {
						uni.showToast({
							title: '发布成功',
							icon: 'success'
						});
						
						// 延迟返回上一页
						setTimeout(() => {
							uni.navigateBack();
						}, 1500);
					} else {
						uni.showToast({
							title: `发布失败: ${msg}`,
							icon: 'none'
						});
					}
				} catch (error) {
					console.error('发布失败:', error);
					uni.showToast({
						title: '发布失败，请重试',
						icon: 'none'
					});
				} finally {
					this.isSubmitting = false;
					uni.hideLoading();
				}
			},
			
			// 设置封面
			async onUploadSingleImg() {
				try {
					const imagePath = await chooseImage()
					this.cover_image = imagePath
				} catch (error) {
					console.log(error)
					uni.showToast({
						title: '选择图片失败',
						icon: 'error'
					})
				}
			},

			// 上传视频
			async onUploadVideo() {
				try {
					const videoPath = await chooseVideo()
					this.video_url = videoPath
				} catch (error) {
					console.log(error)
					uni.showToast({
						title: '选择视频失败',
						icon: 'error'
					})
				}
			},

			// 上传图片
			async onUploadMultipleImg() {
				try {
					const imagePath = await chooseImage()
					this.image_url.push(imagePath)
				} catch (error) {
					uni.showToast({
						title: '选择图片失败',
						icon: 'error'
					})
				}
			},
			
			// 删除图片
			removeImage(index) {
				this.image_url.splice(index, 1);
			},

			// 预览图片
			previewImage(index) {
				uni.previewImage({
					current: index,
					urls: this.image_url
				});
			},

			removeVideo() {
				this.video_url = '';
			},

			// 切换分类
			onClickCategories(id, index) {
				this.category_id = id;
				this.activeIndex = index;
			},

			// 分类数据
			fetchCategories() {
				apiGetArticleCategories().then((res) => {
					if (res.code === 0) {
						this.categories = res.data;
						// 默认选择第一个分类
						if (this.categories.length > 0 && !this.category_id) {
							this.category_id = this.categories[0].id;
							this.activeIndex = 0;
						}
					}
				});
			},

			onClickBack() {
				uni.navigateBack()
			},
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

		.content {
			width: 100%;
			min-height: 0;
			flex: 1;
			overflow-y: auto;
			padding: 24rpx 14rpx;
			box-sizing: border-box;

			.input-box {
				width: 100%;
				margin-bottom: 20rpx;

				.input {
					width: 100%;
					height: 80rpx;
					padding: 16rpx;
					border-radius: 8rpx;
					background-color: #191919;
					line-height: 64rpx;
					font-size: 28rpx;
					color: #fff;
				}

				.uni-input-placeholder,
				.uni-textarea-placeholder {
					color: #999DA6;
					font-size: 28rpx;
				}

				.input-textarea {
					width: 100%;
					padding: 16rpx;
					border-radius: 8rpx;
					background-color: #191919;
					line-height: 56rpx;
					font-size: 28rpx;
					color: #fff;
				}
			}

			.upload-box {
				width: 100%;
				margin-bottom: 30rpx;

				.upload-label {
					font-size: 28rpx;
					line-height: 32rpx;
					font-weight: 400;
					color: #666;
					margin-bottom: 10rpx;
				}

				.upload-content {
					width: 100%;
					display: flex;
					flex-wrap: wrap;
					gap: 16rpx;

					.upload-cover {
						flex-shrink: 0;
						width: 160rpx;
						height: 160rpx;
						border-radius: 20rpx;
						overflow: hidden;
					}

					.upload-imgs {
						display: flex;
						flex-wrap: wrap;
						gap: 16rpx;

						.image-wrapper {
							flex-shrink: 0;
							position: relative;
							width: 160rpx;
							height: 160rpx;
							border-radius: 20rpx;
							overflow: hidden;

							.preview-image {
								width: 100%;
								height: 100%;
							}

							.delete-btn {
								position: absolute;
								top: 0;
								right: 0;
								background-color: rgba(0, 0, 0, 0.5);
								width: 32rpx;
								height: 32rpx;
								border-radius: 0 20rpx 0 20rpx;
								line-height: 28rpx;
								text-align: center;
								color: #fff;
								font-size: 28rpx;
							}
						}
					}
				}
				
				.video-wrapper {
					position: relative;
					width: 160rpx;
					height: 160rpx;
					border-radius: 20rpx;
					overflow: hidden;
					
					.preview-video {
						width: 160rpx;
						height: 160rpx;
					}
					
					.delete-btn {
						position: absolute;
						top: 0;
						right: 0;
						background-color: rgba(0, 0, 0, 0.5);
						width: 32rpx;
						height: 32rpx;
						border-radius: 0 20rpx 0 20rpx;
						line-height: 28rpx;
						text-align: center;
						color: #fff;
						font-size: 28rpx;
					}
				}
			}

			.category-box {
				width: 100%;

				.category-label {
					font-size: 28rpx;
					line-height: 32rpx;
					font-weight: 400;
					color: #666;
					margin-bottom: 32rpx;
				}

				.category-list {
					width: 100%;
					display: grid;
					grid-template-columns: repeat(3, 1fr);
					gap: 16rpx;

					.category-item {
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
	}
</style>