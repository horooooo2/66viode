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

			<!-- 图片区域（不变） -->
			<view class="upload-box">
				<view class="upload-label">上传图片</view>
				<view class="upload-content">
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

			<!-- 视频区域（增加上传中 + 取消按钮） -->
			<view class="upload-box">
				<view class="upload-label">上传视频</view>

				<!-- 上传中显示（提交过程中） -->
				<view class="uploading-box" v-if="isUploadingVideo">
					<text class="uploading-text">视频上传中...</text>
					<view class="cancel-btn" @click="cancelVideoUpload">取消上传<br />并终止提交</view>
				</view>

				<!-- 已选视频（本地预览） -->
				<view class="video-wrapper" v-else-if="video_url">
					<video :src="video_url" controls initial-time="0" loop="false" muted="false"
						class="preview-video"></video>
					<view class="delete-btn" @click="removeVideo">×</view>
				</view>

				<!-- 未选视频，点击选择 -->
				<view class="upload-content" v-else @click="onUploadVideo">
					<image src="/static/images/mine/upload-video.png" mode="widthFix" class="upload-cover"></image>
				</view>
			</view>

			<!-- 封面、分类（不变） -->
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

	// 请确认这个 BASE_URL 和你 http 文件里的一致
	const BASE_URL = 'https://66cg.6980.cc/api.php'

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

				// 控制提交与上传
				isSubmitting: false,       // 整体提交状态（防重复）
				isUploadingVideo: false,   // 视频在提交阶段正在上传
				videoUploadTask: null,     // uni.uploadFile 返回的任务（用于 abort）
				isCancelSubmit: false      // 标识用户是否主动取消本次提交
			}
		},
		computed: {
			isActive() {
				return (index) => {
					return index === this.activeIndex
				}
			},
			isDisabled() {
				if (this.isSubmitting) return true;
				const hasCategoryId = this.category_id && this.category_id.toString().trim() !== '';
				const hasTitle = this.title && this.title.trim() !== '';
				const hasContent = this.content && this.content.trim() !== '';
				return !(hasCategoryId && hasTitle && hasContent);
			}
		},
		onLoad() {},
		onShow() {
			this.fetchCategories();
		},
		methods: {
			// ---------- 提交（主要改动点：视频使用 uni.uploadFile 上传以支持 abort） ----------
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
				this.isCancelSubmit = false;
				// uni.showLoading({
				// 	title: '发布中...',
				// 	mask: true
				// });

				try {
					let coverImageUrl = '';
					let videoUrl = '';
					let imageUrls = [];

					// 上传封面图片（使用现有封装）
					if (this.cover_image) {
						const { code, data, msg } = await uploadImage(this.cover_image);
						if (code === 0) {
							coverImageUrl = data.url;
						} else {
							uni.showToast({ title: `封面上传失败: ${msg}`, icon: 'none' });
							return;
						}
					}

					// ---------- 视频上传（页面层使用 uni.uploadFile，使其可取消） ----------
					if (this.video_url) {
						this.isUploadingVideo = true;

						// promise wrapper，便于 await 上传结果
						const videoPromise = new Promise((resolve, reject) => {
							// 发起上传（使用完整 URL：BASE_URL + '/post/uploadVideo'）
							const task = uni.uploadFile({
								url: BASE_URL + '/post/uploadVideo',
								filePath: this.video_url,
								name: 'file',
								header: {
									'Token': uni.getStorageSync('storage_user_data')?.token || ''
								},
								success: (uploadRes) => {
									let parsed = null;
									try {
										parsed = JSON.parse(uploadRes.data);
									} catch (e) {
										reject('上传结果解析失败');
										return;
									}
									resolve(parsed);
								},
								fail: (err) => {
									// err.errMsg 里若包含 abort 则是主动取消
									reject(err);
								}
							});

							// 暴露 task 以支持 cancel
							this.videoUploadTask = task;
						});

						// 等待上传结果
						try {
							const res = await videoPromise;

							// 上传完成后，判断用户是否已取消（安全检查）
							if (this.isCancelSubmit) {
								// 用户在等待过程中取消了提交，直接退出
								return;
							}

							// 解析结果
							if (res && res.code === 0) {
								videoUrl = res.data.url;
							} else {
								uni.showToast({ title: `视频上传失败: ${res?.msg || '未知错误'}`, icon: 'none' });
								return;
							}
						} catch (err) {
							// 处理被 abort 或其他错误
							const errMsg = typeof err === 'string' ? err : (err && (err.errMsg || err.message)) || '';
							const isAbort = (errMsg && errMsg.toLowerCase().includes('abort')) || this.isCancelSubmit;

							if (isAbort) {
								// 用户主动取消上传 —— 终止本次提交（按你的需求）
								uni.showToast({ title: '已取消上传并终止提交', icon: 'none' });
								return;
							} else {
								console.error('视频上传异常:', err);
								uni.showToast({ title: '视频上传失败', icon: 'none' });
								return;
							}
						} finally {
							this.isUploadingVideo = false;
							this.videoUploadTask = null;
						}
					}

					// ---------- 图片数组上传（保持原样） ----------
					if (this.image_url.length > 0) {
						for (let i = 0; i < this.image_url.length; i++) {
							if (this.isCancelSubmit) return;
							const { code, data, msg } = await uploadImage(this.image_url[i]);
							if (code === 0) {
								imageUrls.push(data.url);
							} else {
								uni.showToast({ title: `图片上传失败: ${msg}`, icon: 'none' });
								return;
							}
						}
					}

					// 若用户已取消则中断
					if (this.isCancelSubmit) return;

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
					const { code, data, msg } = await saveArticleApi(postData);

					if (code === 0) {
						uni.showToast({ title: '发布成功', icon: 'success' });
						setTimeout(() => {
							uni.navigateTo({ url: 'pages/user/index' });
						}, 1500);
					} else {
						uni.showToast({ title: `发布失败: ${msg}`, icon: 'none' });
					}
				} catch (error) {
					console.error('发布失败:', error);
					if (!this.isCancelSubmit) {
						uni.showToast({ title: '发布失败，请重试', icon: 'none' });
					}
				} finally {
					this.isSubmitting = false;
					this.isUploadingVideo = false;
					this.videoUploadTask = null;
					// uni.hideLoading();
				}
			},

			// 取消上传（用户点击）
			cancelVideoUpload() {
				this.isCancelSubmit = true;

				// 如果存在上传任务则中断
				if (this.videoUploadTask && typeof this.videoUploadTask.abort === 'function') {
					try {
						this.videoUploadTask.abort();
					} catch (e) { /* ignore */ }
				}

				// 清理状态并退出提交
				this.isUploadingVideo = false;
				this.videoUploadTask = null;
				this.isSubmitting = false;
				uni.hideLoading();

				uni.showToast({ title: '已取消上传并终止提交', icon: 'none' });
			},

			// 设置封面（不变）
			async onUploadSingleImg() {
				try {
					const imagePath = await chooseImage();
					this.cover_image = imagePath;
				} catch (error) {
					uni.showToast({ title: '选择图片失败', icon: 'error' });
				}
			},

			// 选择本地视频（不立即上传，上传在 submit 阶段进行）
			async onUploadVideo() {
				try {
					const videoPath = await chooseVideo();
					this.video_url = videoPath;
				} catch (error) {
					uni.showToast({ title: '选择视频失败', icon: 'error' });
				}
			},

			// 上传图片（不变）
			async onUploadMultipleImg() {
				try {
					const imagePath = await chooseImage();
					this.image_url.push(imagePath);
				} catch (error) {
					uni.showToast({ title: '选择图片失败', icon: 'error' });
				}
			},

			// 删除图片（不变）
			removeImage(index) {
				this.image_url.splice(index, 1);
			},

			// 预览图片（不变）
			previewImage(index) {
				uni.previewImage({ current: index, urls: this.image_url });
			},

			// 删除本地选中视频（在未提交或上传前可用）
			removeVideo() {
				// 如果正在上传，先取消上传
				if (this.isUploadingVideo && this.videoUploadTask && typeof this.videoUploadTask.abort === 'function') {
					try { this.videoUploadTask.abort(); } catch (e) {}
				}
				this.isUploadingVideo = false;
				this.videoUploadTask = null;
				this.video_url = '';
			},

			// 切换分类（不变）
			onClickCategories(id, index) {
				this.category_id = id;
				this.activeIndex = index;
			},

			// 获取分类（不变）
			fetchCategories() {
				apiGetArticleCategories().then((res) => {
					if (res.code === 0) {
						this.categories = res.data;
						if (this.categories.length > 0 && !this.category_id) {
							this.category_id = this.categories[0].id;
							this.activeIndex = 0;
						}
					}
				});
			},

			// 返回（如果正在上传则先取消）
			onClickBack() {
				if (this.isUploadingVideo) {
					this.cancelVideoUpload();
					return;
				}
				uni.navigateTo({ url: '/pages/user/index' });
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
				
				.uploading-box {
					width: 160rpx;
					height: 160rpx;
					border-radius: 20rpx;
					overflow: hidden;
					border: 1rpx solid #FF1A8C;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: space-around;
					
					.uploading-text {
						font-size: 20rpx;
						color: #ccc;
					}
					
					.cancel-btn {
						background: #FF1A8C;
						font-size: 20rpx;
						color: #fff;
						border-radius: 4rpx;
						padding: 4rpx 8rpx;
						text-align: center;
					}
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
	:deep(.image-wrapper) {
	    line-height: 8 !important;
	}
</style>