<template>
	<view class="activity">
		<view class="banner">
			<view class="banner-main">
				<view class="top-panel">
					<view class="label">今日活跃度 <text>200</text></view>
					<view class="right-panel" @click="onClickPopup('prize')">
						<text>每日活跃</text>
						<image class="arrow" src="/static/images/activity/icon_close.png"></image>
					</view>
				</view>
				<Prize></Prize>
			</view>
		</view>
		<view class="container">
			<view class="tabs">
				<view class="tabs-item" v-for="i in 3" :key="i" :class="{ active: i === tabIndex }" @click="onChange(i)">任务分组
				</view>
			</view>
			<view class="search-panel">
				<view class="search-left" @click="onClickPopup('tag')">
					<text>标签：全部</text>
					<image class="arrow" src="/static/images/activity/icon_close.png"></image>
				</view>
				<view class="buttons">
					<image src="/static/images/activity/shuaxin.png" mode="widthFix"></image>
					<image src="/static/images/activity/jilu.png" mode="widthFix" @click="onClickPopup('rule')"></image>
					<image src="/static/images/activity/lishi.png" mode="widthFix" @click="toLink('/pages/task/index')"></image>
				</view>
			</view>
			<view v-if="isEmpty" class="list">
				<view class="list-item" v-for="i in 5" :key="i">
					<view class="item-panel">
						<view class="panel-left">
							<image class="icon-cover" src="/static/images/activity/1.png"></image>
							<view class="left-content">
								<view class="title">邀请好友</view>
								<view>任务描述</view>
							</view>
						</view>
						<view class="button">签到</view>
					</view>
					<view class="item-progress">
						<view class="progress-box">
							<tui-progress :percent="60" radius="24rpx" :width="24"
								activeColor="linear-gradient(0deg, #D018F5 0%, #FA3296 100%)" backgroundColor="#777"></tui-progress>
						</view>
						<view class="statics">
							<view class="box-num">
								<image src="/static/images/activity/jifen.png"></image>
								<text>10</text>
							</view>
							<view class="box-num">
								<image src="/static/images/activity/image133.png"></image>
								<text>10</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view v-else class="empty-box">
				<image class="empty-img" src="/static/images/search/empty.png" mode="widthFix"></image>
				<view class="empty-text">
					开启时间
					yyyy.mm.dd hh:mm
					敬请期待
				</view>
			</view>
		</view>

		<RulePopup ref="ruleRef"></RulePopup>

		<PrizePopup ref="prizeRef"></PrizePopup>

		<TagPopup ref="tagRef"></TagPopup>
		<custom-tabbar :current="3" @change="handleTabChange"></custom-tabbar>
		
	</view>
</template>

<script>
	import NavBar from '@/components/NavBar/index.vue'
	import Surplus from '@/components/Surplus/index.vue'
	import Prize from "./components/Prize.vue"
	import RulePopup from "./components/RulePopup.vue"
	import PrizePopup from "./components/PrizePopup.vue"
	import TagPopup from "./components/TagPopup.vue"
	import CustomTabbar from '@/components/custom-tabbar.vue'
	export default {
		components: {
			NavBar,
			Surplus,
			Prize,
			RulePopup,
			PrizePopup,
			TagPopup,
			CustomTabbar
		},
		data() {
			return {
				tabIndex: 1,
				isEmpty: false,
			}
		},
		methods: {
			onChange(i) {
				this.tabIndex = i
			},
			toLink(url) {
				uni.navigateTo({
					url
				})
			},
			onClickPopup(flag) {
				switch (flag) {
					case 'rule':
						this.$refs.ruleRef && this.$refs.ruleRef.open();
						break;
					case 'prize':
						this.$refs.prizeRef && this.$refs.prizeRef.open();
						break;
					case 'tag':
						this.$refs.tagRef && this.$refs.tagRef.open();
						break;
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.activity {
		width: 100%;
		background-color: #101010;
		min-height: 100vh;
		background-image: url("/static/images/activity/bg.png");
		background-repeat: no-repeat;
		background-size: 100%;
		display: flex;
		flex-direction: column;

		.banner {
			width: 100%;
			padding: 24rpx 32rpx;
			box-sizing: border-box;
			margin-bottom: 34rpx;

			.banner-main {
				padding: 24rpx;
				box-sizing: border-box;
				border-radius: 20rpx;
				background: #333;

				.top-panel {
					width: 100%;
					display: flex;
					align-items: center;
					justify-content: space-between;
					margin-bottom: 20rpx;

					.label {
						color: #DDD;
						font-size: 28rpx;
						font-weight: 500;
						line-height: 32rpx;
						display: flex;
						align-items: center;
						gap: 12rpx;

						text {
							color: #DBB02B;
							font-size: 32rpx;
							font-weight: 700;
							line-height: 32rpx;
						}
					}

					.right-panel {
						flex-shrink: 0;
						width: 224rpx;
						height: 60rpx;
						padding: 12rpx 32rpx;
						box-sizing: border-box;
						display: flex;
						align-items: center;
						justify-content: space-between;
						gap: 8rpx;
						border-radius: 12rpx;
						background: #202020;

						text {
							color: #bbb;
							font-size: 24rpx;
							font-weight: 400;
						}

						.arrow {
							width: 28rpx;
							height: 28rpx;
						}
					}
				}
			}
		}

		.container {
			position: relative;
			width: 100%;
			min-height: 0;
			flex: 1;
			padding: 6rpx 32rpx 32rpx;
			box-sizing: border-box;
			border-radius: 40rpx 40rpx 0px 0px;
			background: #202020;

			.tabs {
				width: 100%;
				height: 80rpx;
				display: flex;
				align-items: center;
				padding: 0 32rpx;
				box-sizing: border-box;
				gap: 48rpx;
				margin-bottom: 16rpx;

				.tabs-item {
					color: #bbb;
					font-size: 28rpx;
					font-weight: 400;
					line-height: 36rpx;
				}

				.active {
					font-size: 36rpx;
					font-weight: 500;
					background: linear-gradient(270deg, #D018F5 0%, #FA3296 100%);
					background-clip: text;
					-webkit-background-clip: text;
					-webkit-text-fill-color: transparent;
				}
			}

			.search-panel {
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-bottom: 40rpx;

				.search-left {
					flex-shrink: 0;
					width: 224rpx;
					height: 68rpx;
					padding: 12rpx 32rpx;
					box-sizing: border-box;
					border-radius: 12rpx;
					background: #333;
					display: flex;
					align-items: center;
					gap: 8rpx;

					text {
						color: #bbb;
						font-size: 24rpx;
						font-weight: 400;
						line-height: 28rpx;
					}

					.arrow {
						width: 28rpx;
						height: 28rpx;
					}
				}

				.buttons {
					min-width: 0;
					flex: 1;
					display: flex;
					align-items: center;
					justify-content: flex-end;
					gap: 24rpx;

					image {
						width: 52rpx;
					}
				}
			}

			.list {
				width: 100%;
				display: flex;
				flex-direction: column;
				gap: 24rpx;

				.list-item {
					width: 100%;
					border-radius: 20rpx;
					background: #333;
					padding: 20rpx 30rpx;
					box-sizing: border-box;

					.item-panel {
						display: flex;
						align-items: center;
						justify-content: space-between;
						gap: 48rpx;
						margin-bottom: 34rpx;

						.panel-left {
							min-width: 0;
							flex: 1;
							display: flex;
							align-items: center;
							gap: 22rpx;

							.icon-cover {
								width: 68rpx;
								height: 68rpx;
							}

							.left-content {
								display: flex;
								flex-direction: column;
								gap: 16rpx;
								color: #ddd;
								font-size: 22rpx;

								.title {
									font-size: 28rpx;
								}
							}
						}

						.button {
							width: 144rpx;
							height: 56rpx;
							border-radius: 80rpx;
							background: linear-gradient(270deg, #D018F5 0%, #FA3296 100%);
							display: flex;
							align-items: center;
							justify-content: center;
							color: #fff;
							font-size: 24rpx;
						}
					}

					.item-progress {
						display: flex;
						align-items: center;
						justify-content: space-between;
						gap: 100rpx;

						.progress-box {
							min-width: 0;
							flex: 1;
						}

						.statics {
							flex-shrink: 0;
							display: flex;
							align-items: center;
							gap: 16rpx;

							.box-num {
								display: flex;
								align-items: center;
								gap: 8rpx;

								image {
									width: 24rpx;
									height: 24rpx;
								}

								text {
									color: #ddd;
									font-size: 20rpx;
									font-weight: 700;
								}
							}
						}
					}
				}
			}
			.empty-box {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				width: 380rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				.empty-img {
					width: 380rpx;
				}
				.empty-text {
					width: 248rpx;
					margin: 0 auto;
					font-size: 28rpx;
					color: #ccc;
					text-align: center;
				}
			}
		}
	}
</style>