<template>
	<view class="friends">
		<view class="status_bar"></view>
		<NavBar></NavBar>
		<view class="container">
			<view class="card">
				<image class="title" src="/static/images/friends/title-yqfx.png" mode=""></image>
				<view class="icon-list">
					<view class="icon-item">
						<image class="icon-img" src="/static/images/friends/qq.png" mode=""></image>
						<text>QQ</text>
					</view>
					<view class="icon-item">
						<image class="icon-img" src="/static/images/friends/wx.png" mode=""></image>
						<text>微信</text>
					</view>
					<view class="icon-item">
						<image class="icon-img" src="/static/images/friends/dy.png" mode=""></image>
						<text>抖音</text>
					</view>
					<view class="icon-item">
						<image class="icon-img" src="/static/images/friends/sl.png" mode=""></image>
						<text>闪聊</text>
					</view>
					<view class="icon-item">
						<image class="icon-img" src="/static/images/friends/lj.png" mode=""></image>
						<text>链接</text>
					</view>
					<view class="icon-item">
						<image class="icon-img" src="/static/images/friends/hb.png" mode=""></image>
						<text>海报</text>
					</view>
				</view>
				<view class="content">
					<image class="left-img" src="/static/images/friends/left.png" mode="widthFix"></image>
					<image class="right-img" src="/static/images/friends/right.png" mode="widthFix"></image>
					<view class="label">邀请还有注册，最高奖励 30000 积分！</view>
					<view class="text">快来看看积分可以兑换哪些物品吧～</view>
				</view>
				<image class="button" src="/static/images/friends/button-ljyq.png" @click="transShowCode()"></image>
			</view>
			<view class="card">
				<image class="title" src="/static/images/friends/title-wdcj.png" mode=""></image>
				<view class="table">
					<view class="table-header">
						<view class="table-item" style="border-top-left-radius: 30rpx;">邀请注册人数</view>
						<view class="table-item" style="border-top-right-radius: 30rpx;">每人奖励积分</view>
					</view>
					<view class="table-content">
						<view class="table-td" v-for="(item, index) in rewardRules" :key="index">
							<view class="tr">≥{{ item.invite_count }}</view>
							<view class="tr">{{ item.reward_points }}</view>
						</view>
					</view>
				</view>
			</view>
			<view class="card">
				<image class="title" src="/static/images/friends/title-yqgz.png" mode=""></image>
				<view class="textarea">{{ ruleDesc }}</view>
			</view>
		</view>

		<tui-popup class="yq-popup" :show="transShow" style="background-color: rgba(0,0,0,0.8);">
			<view class="popup-main">
				<image class="close" src="/static/images/friends/icon_Close.png" mode="" @click="transShow = false">
				</image>
				<view class="popup-content">
					<view id="canvas_download">
						<view class="qrcode-container">
							<canvas v-if="transShow" canvas-id="qrcodeCanvas" class="qrcode-canvas"></canvas>
						</view>
						<image class="popup-cover" src="/static/images/friends/img.jpg" mode="widthFix"></image>
					</view>
					<view class="text">
						<text>链接已生成 或复制链接给好友</text>
						<text @click="copyInviteLink()" style="color: #F35FB8;">复制</text>
					</view>
				</view>
				<image class="popup-button" @click="generateCompleteViewImage()"
					src="/static/images/friends/button-ljfx.png" mode="widthFix"></image>
			</view>
		</tui-popup>
		<canvas canvas-id="shareCanvas" id="shareCanvas"
			style="position: absolute; top: -9999px; left: -9999px; width: 640px; height: 800px;"></canvas>
		<canvas canvas-id="haibaoCanvas"
			style="position: fixed; top: -9999px; left: -9999px; width: 300px; height: 400px;"></canvas>
		<view class="haibao">
			<img class="tempFileCode" :src="tempFilePathCode" alt="" />
		</view>
	</view>
</template>

<script>
	import NavBar from '@/components/NavBar/index.vue'
	import {
		apiGetInviteRules
	} from '@/common/api/goods.js'
	import UQRCode from 'uqrcodejs';
	export default {
		components: {
			NavBar
		},
		data() {
			return {
				rewardRules: [],
				ruleDesc: '',
				invite_url: '',
				transShow: false,
				generatedImagePath: '',
				tempFilePathCode: '',
			}
		},
		onLoad() {
			this.getInviteRules()
		},
		methods: {
			// 保存整个div内容为图片
			saveViewAsImage() {
				return new Promise((resolve, reject) => {
					// 获取div的尺寸和样式信息
					const query = uni.createSelectorQuery().in(this);
					query.select('.haibao').boundingClientRect(data => {
						if (!data) {
							reject(new Error('未找到元素'));
							return;
						}

						const ctx = uni.createCanvasContext('haibaoCanvas', this);
						const canvasWidth = data.width;
						const canvasHeight = data.height;

						console.log('div尺寸:', canvasWidth, canvasHeight);

						// 1. 绘制白色背景
						ctx.setFillStyle('#FFFFFF');
						ctx.fillRect(0, 0, canvasWidth, canvasHeight);

						// 2. 绘制div的背景图（如果有）
						// 这里需要你提供背景图的路径，比如从div的样式中获取
						const backgroundImage = '/static/images/friends/img.png'; // 替换为你的背景图路径
						ctx.drawImage(backgroundImage, 0, 0, canvasWidth, canvasHeight);

						// 3. 绘制二维码图片
						if (this.tempFilePathCode) {
							// 计算二维码位置（比如居中或特定位置）
							const qrSize = 100;
							const qrX = (canvasWidth - qrSize) / 8;
							const qrY = canvasHeight - qrSize - 20;
							ctx.drawImage(this.tempFilePathCode, qrX, qrY, qrSize, qrSize);
						}

						// 4. 绘制其他文字内容（根据你的需求添加）
						ctx.setFillStyle('#000000');
						ctx.setFontSize(16);
						ctx.setTextAlign('center');
						ctx.fillText('邀请好友', canvasWidth / 2, 50);

						// 绘制完成
						ctx.draw(true, () => {
							setTimeout(() => {
								uni.canvasToTempFilePath({
									canvasId: 'haibaoCanvas',
									destWidth: canvasWidth,
									destHeight: canvasHeight,
									fileType: 'png',
									quality: 1,
									success: (res) => {
										if (res.tempFilePath) {
											console.log('完整海报生成成功:', res
												.tempFilePath);
											resolve(res.tempFilePath);

											// #ifdef H5
											this.downloadBase64ImageH5(
												res.tempFilePath);
											// #endif

											// #ifdef APP-PLUS || APP-VUE
											this.saveBase64Image(
												res.tempFilePath);
											// #endif
										} else {
											reject(new Error('图片路径为空'));
										}
									},
									fail: (err) => {
										reject(err);
									}
								}, this);
							}, 1000);
						});
					}).exec();
				});
			},
			// H5 环境下载方法
			downloadBase64ImageH5(base64Data) {
				try {
					// 创建下载链接
					const link = document.createElement('a');
					link.href = base64Data;
					link.download = '66吃瓜分享海报' + '.png';

					// 触发下载
					document.body.appendChild(link);
					link.click();
					document.body.removeChild(link);

					uni.showToast({
						title: '下载成功',
						icon: 'success'
					});
				} catch (error) {
					console.error('H5下载失败:', error);
					uni.showToast({
						title: '下载失败',
						icon: 'none'
					});
				}
			},
			saveBase64Image(base64Data) {
				// 直接上传或保存到相册
				uni.saveImageToPhotosAlbum({
				    filePath: base64Data,
				    success: () => {
				        uni.showToast({
				            title: '保存成功',
				            icon: 'success'
				        });
				    }
				});
			},
			generateCompleteViewImage() {
				return new Promise((resolve, reject) => {
					// 1. 先获取背景图片信息
					uni.canvasToTempFilePath({
						canvasId: 'qrcodeCanvas',
						success: (qrRes) => {
							this.tempFilePathCode = qrRes.tempFilePath
							if (this.tempFilePathCode) {
								this.saveViewAsImage()
							}
							if (!qrRes.tempFilePath) {
								uni.hideLoading();
								uni.showToast({
									title: '二维码生成失败',
									icon: 'none'
								});
								reject(new Error('二维码图片生成失败'));
								return;
							}
						},
						fail: (err) => {
							uni.hideLoading();
							console.error('获取二维码失败:', err);
							uni.showToast({
								title: '二维码生成失败',
								icon: 'none'
							});
							reject(err);
						}
					}, this);
				});
			},

			// 新增方法：动态设置canvas尺寸
			setCanvasSize(width, height) {
				// 通过选择器设置canvas的样式尺寸
				const query = uni.createSelectorQuery().in(this);
				query.select('#shareCanvas').fields({
					node: true,
					size: true
				}, (res) => {
					if (res && res.node) {
						const canvas = res.node;
						canvas.width = width;
						canvas.height = height;
					}
				}).exec();
			},
			transShowCode() {
				this.transShow = true
				setTimeout(() => {
					this.generateQRCode();
				}, 150);
			},
			generateQRCode() {
				try {
					// 确保正确导入UQRCode

					// 创建二维码实例
					const qrcode = new UQRCode();

					// 设置二维码内容
					qrcode.data = this.invite_url;

					// 设置二维码大小
					qrcode.size = 130;

					// 设置二维码级别
					qrcode.errorCorrectLevel = UQRCode.errorCorrectLevel.H;

					// 生成二维码
					qrcode.make();

					// 获取canvas上下文
					const ctx = uni.createCanvasContext('qrcodeCanvas', this);

					// 关键步骤1：先清空canvas
					ctx.clearRect(0, 0, 130, 130);

					// 关键步骤2：设置白色背景
					ctx.setFillStyle('#FFFFFF');
					ctx.fillRect(0, 0, 130, 130);

					// 将二维码绘制到canvas
					qrcode.canvasContext = ctx;
					qrcode.drawCanvas();

					// 关键步骤3：使用 ctx.draw(true) 保留绘制
					ctx.draw(true, () => {
						console.log('二维码绘制完成');
					});

				} catch (error) {
					console.error('生成二维码失败:', error);
					uni.showToast({
						title: '生成失败: ' + error.message,
						icon: 'none'
					});
				}
			},
			copyLink(linkToCopy) {
				uni.setClipboardData({
					data: linkToCopy,
					success: () => {
						uni.showToast({
							title: '复制成功',
							icon: 'success'
						});
					},
					fail: (err) => {
						console.error('复制失败:', err);
						uni.showToast({
							title: '复制失败',
							icon: 'none'
						});
					}
				});
			},
			copyInviteLink() {
				this.copyLink(this.invite_url);
			},
			async getInviteRules() {
				let {
					code,
					msg,
					data
				} = await apiGetInviteRules()
				if (code == 0) {
					this.rewardRules = data.reward_rules
					this.invite_url = location.origin + '/#/pages/login/index?type=2&invite_code=' + data.invite_code
					this.ruleDesc = data.rule_description
				} else {
					uni.showToast({
						title: msg,
						icon: 'none',
						duration: 2000
					});
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.friends {
		width: 100%;
		background-color: #101010;
		min-height: 100vh;
		background-image: url("/static/images/friends/img_bg.png");
		background-repeat: no-repeat;
		background-size: 100%;
		overflow: auto;

		.container {
			min-height: 0;
			flex: 1;
			padding: 584rpx 32rpx 32rpx;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			gap: 32rpx;

			.card {
				position: relative;
				width: 100%;
				border-radius: 20rpx;
				background-color: #202020;
				background-image: url("/static/images/friends/bg.png");
				background-repeat: no-repeat;
				background-size: 100%;
				padding: 140rpx 40rpx 24rpx;
				box-sizing: border-box;

				.title {
					position: absolute;
					top: -8rpx;
					left: 50%;
					transform: translateX(-50%);
					width: 322rpx;
					height: 64rpx;
				}

				.icon-list {
					width: 570rpx;
					height: 100rpx;
					margin: 0 auto;
					display: grid;
					grid-template-columns: repeat(6, 1fr);
					gap: 42rpx;
					margin-bottom: 32rpx;

					.icon-item {
						display: flex;
						flex-direction: column;
						align-items: center;
						gap: 16rpx;

						.icon-img {
							width: 60rpx;
							height: 60rpx;
						}

						text {
							color: #ccc;
							font-size: 22rpx;
							font-weight: 400;
							line-height: 24rpx;
						}
					}
				}

				.content {
					position: relative;
					width: 100%;
					height: 160rpx;
					padding: 36rpx 0 44rpx;
					border-radius: 20rpx;
					background: #101010;
					display: flex;
					flex-direction: column;
					align-items: center;
					gap: 16rpx;
					margin-bottom: 36rpx;

					.left-img {
						position: absolute;
						left: 0;
						bottom: 0;
						width: 86rpx;
					}

					.right-img {
						position: absolute;
						right: 0;
						bottom: 0;
						width: 84rpx;
					}

					.label {
						color: #FF1A8C;
						font-size: 26rpx;
						font-weight: 400;
						line-height: 32rpx;
					}

					.text {
						color: #ddd;
						font-size: 26rpx;
						font-weight: 400;
						line-height: 32rpx;
					}
				}

				.button {
					width: 574rpx;
					height: 88rpx;
					margin: 0 auto;
					display: block;
				}

				.table {
					width: 100%;
					margin-bottom: 30rpx;

					.table-header {
						display: grid;
						grid-template-columns: repeat(2, 1fr);
						gap: 2rpx;

						.table-item {
							height: 76rpx;
							background: linear-gradient(90deg, #FF19B2 0.17%, #FF1966 101.4%);
							color: #FFF;
							text-align: center;
							font-size: 28rpx;
							font-weight: 500;
							line-height: 76rpx;
						}
					}

					.table-content {
						width: 100%;

						.table-td {
							display: grid;
							grid-template-columns: repeat(2, 1fr);
							gap: 2rpx;
							margin-top: 1rpx;

							.tr {
								height: 76rpx;
								background: #4C3434;
								color: #FFF;
								text-align: center;
								font-size: 28rpx;
								font-weight: 500;
								line-height: 76rpx;
							}

							&:last-child {
								.tr:first-child {
									border-bottom-left-radius: 30rpx;
								}

								.tr:last-child {
									border-bottom-right-radius: 30rpx;
								}
							}
						}
					}
				}

				.textarea {
					width: 100%;
					color: #aaa;
					font-size: 26rpx;
					font-weight: 400;
					line-height: 42rpx;
					text-align: justify;
					margin-bottom: 56rpx;
				}
			}
		}

		.yq-popup {

			.popup-main {
				position: relative;
				width: 686rpx;
				margin: 0 auto;
				display: flex;
				flex-direction: column;
				align-items: center;

				.close {
					position: absolute;
					top: -14rpx;
					right: -14rpx;
					width: 48rpx;
					height: 48rpx;
					z-index: 999999;
				}

				.popup-content {
					width: 100%;
					padding: 26rpx 24rpx;
					box-sizing: border-box;
					border-radius: 20rpx;
					background: #28272A;
					display: flex;
					flex-direction: column;
					gap: 18rpx;
					position: relative;

					.popup-cover {
						width: 100%;
					}

					.qrcode-container {
						position: absolute;
						left: 30rpx;
						bottom: 90rpx;
						width: 240rpx;
						height: 240rpx;
						z-index: 9999;
					}

					.text {
						color: #ccc;
						font-size: 24rpx;
						font-weight: 400;
						display: flex;
						align-items: center;
						justify-content: space-between;
					}
				}

				.popup-button {
					width: 574rpx;
					margin-top: 48rpx;
				}
			}
		}
	}
</style>
<style>
	.container {
		padding: 20px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.input {
		width: 100%;
		height: 40px;
		border: 1px solid #ddd;
		border-radius: 4px;
		padding: 0 10px;
		margin-bottom: 15px;
	}

	.btn {
		background-color: #007AFF;
		color: white;
		padding: 10px 20px;
		border-radius: 4px;
		margin-bottom: 20px;
	}

	.qrcode-container {
		margin-top: 20px;
	}

	.qrcode-canvas {
		width: 130px;
		height: 130px;
	}

	.haibao {
		width: 320px;
		height: 400px;
		background: url('/static/images/friends/img.jpg');
		background-size: 100% 100%;
		position: absolute;
		z-index: -1;
		opacity: 0;
		bottom: 0;
	}

	.tempFileCode {
		width: 120px;
		position: absolute;
		left: 5px;
		bottom: 5px;
		z-index: 999;
	}
</style>