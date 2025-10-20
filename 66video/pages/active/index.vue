<template>
	<view class="activity">
		<view class="banner">
			<view class="banner-main">
				<view class="top-panel">
					<view class="label">今日活跃度 <text>{{ activeObj.current_activity }}</text></view>
					<view class="right-panel" @click="onClickPopup('prize')">
						<text>{{ activeCurrentItem.active_name }}</text>
						<image class="arrow" src="/static/images/activity/icon_close.png"></image>
					</view>
				</view>
				<Prize :prizeList="activeCurrentItem.reward_config" :prizeData="activeCurrentItem"></Prize>
			</view>
		</view>
		<view class="container">
			<view class="tabs">
				<view class="tabs-item" v-for="(item, index) in taskGroupList" :key="index"
					:class="{ active: index === groupTabIndex }" @click="onChangeGroup(item.id, index)">
					{{ item.group_name }}
				</view>
			</view>
			<view class="search-panel">
				<view class="search-left" @click="onClickPopup('tag')">
					<text>标签：{{ tagCurrentItem.tag_name || '全部' }}</text>
					<image class="arrow" src="/static/images/activity/icon_close.png"></image>
				</view>
				<view class="buttons">
					<image src="/static/images/activity/shuaxin.png" @click="getData()" mode="widthFix"></image>
					<image src="/static/images/activity/jilu.png" mode="widthFix" @click="onClickPopup('rule')"></image>
					<!-- <image src="/static/images/activity/lishi.png" mode="widthFix" @click="toLink('/pages/task/index')"></image> -->
				</view>
			</view>
			<view v-if="isEmpty" class="empty-box">
				<image class="empty-img" src="/static/images/search/empty2.png" mode="widthFix"></image>
				<view class="empty-text">
					敬请期待
				</view>
			</view>
			<view v-else class="list">
				<view class="list-item" v-for="(item, index) in taskList" :key="index">
					<view class="item-panel">
						<view class="panel-left">
							<image class="icon-cover" :src="item.task_image"></image>
							<view class="left-content">
								<view class="title">{{ item.task_name }}</view>
								<view>{{ item.task_desc }}</view>
							</view>
						</view>
						<view class="button" @click="missionRewards(item)">签到</view>
					</view>
					<view class="item-progress">
						<view class="progress-box">
							<tui-progress :percent="item.progress.current_count" radius="24rpx" :width="24"
								activeColor="linear-gradient(0deg, #D018F5 0%, #FA3296 100%)"
								backgroundColor="#777"></tui-progress>
						</view>
						<view class="statics">
							<view class="box-num">
								<image src="/static/images/activity/jifen.png"></image>
								<text>{{ item.activity_score }}</text>
							</view>
							<view class="box-num">
								<image src="/static/images/activity/image133.png"></image>
								<text>{{ item.task_reward }}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<RulePopup ref="ruleRef"></RulePopup>

		<PrizePopup ref="prizeRef" :activeObj="activeObj" @change="onChangePrize"></PrizePopup>

		<TagPopup ref="tagRef" :tagList="tagList" @change="onChangeTag"></TagPopup>

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
	import {
		apiTaskActive,
		apiTaskGroup,
		apiTaskTag,
		apiMissionRewards,
		apiTaskList
	} from '@/common/api/active.js'
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
		computed: {
			isEmpty() {
				return this.taskList.length === 0;
			}
		},
		data() {
			return {
				activeObj: {},
				activeCurrentItem: {},
				groupTabIndex: 0,
				groupId: "",
				taskGroupList: [],
				tagList: [],
				tagCurrentItem: {},
				taskList: [],
			}
		},
		onLoad() {
			this.getTaskActive();
			this.getData();
		},
		methods: {
			async getData() {
				this.taskList = []
				try {
					// 确保串行执行顺序
					await this.getTaskGroup();
					await this.getTaskGroupTag();
					await this.getTaskList();
				} catch (error) {
					console.error('数据加载失败:', error);
					uni.showToast({
						title: '数据加载失败',
						icon: 'none',
						duration: 2000
					});
				}
			},
			// 获取任务分组
			getTaskGroup() {
				return apiTaskGroup().then((res) => {
					if (res.code === 0) {
						this.taskGroupList = res.data || [];
						// 确保有数据再设置groupId
						if (this.taskGroupList.length > 0) {
							this.groupId = this.taskGroupList[0].id;
						} else {
							throw new Error('任务分组为空');
						}
					} else {
						throw new Error(res.msg || '获取任务分组失败');
					}
				});
			},
			// 获取分组下标签 - 依赖groupId
			getTaskGroupTag() {
				// 前置校验
				if (!this.groupId) {
					throw new Error('未获取到有效的分组ID');
				}

				return apiTaskTag({
					group_id: this.groupId
				}).then((res) => {
					if (res.code === 0) {
						this.tagList = res.data || [];
					} else {
						throw new Error(res.msg || '获取分组标签失败');
					}
				});
			},
			missionRewards(item) {
				return apiMissionRewards({
					task_id: item.id
				}).then((res) => {
					uni.showToast({
						title: res.msg,
						icon: 'none',
						duration: 2000
					});
					this.getTaskActive();
				});
			},
			// 获取任务列表 - 依赖groupId和tagId
			getTaskList() {
				if (!this.groupId) {
					throw new Error('未获取到有效的分组ID');
				}

				const params = {
					group_id: this.groupId,
					tag_id: this.tagCurrentItem?.id || ''
				};

				return apiTaskList(params).then(res => {
					if (res.code === 0) {
						this.taskList = res.data || [];
					} else {
						throw new Error(res.msg || '获取任务列表失败');
					}
				});
			},
			// 获取任务活跃
			getTaskActive() {
				apiTaskActive().then(res => {
					this.activeObj = res.data
					this.activeCurrentItem = this.activeObj.actives?.[0]
				})
			},
			// 任务活跃奖励
			onChangePrize(prizeItem) {
				this.activeCurrentItem = prizeItem
			},
			// 切换任务分组下的任务标签
			onChangeTag(item) {
				this.tagCurrentItem = item
				this.getTaskList();
			},
			// 切换任务分组
			onChangeGroup(id, index) {
				this.groupId = id
				this.groupTabIndex = index
				this.getTaskList();
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
				overflow-x: scroll;
				scrollbar-width: none;

				::-webkit-scrollbar {
					display: none;
				}

				.tabs-item {
					white-space: nowrap;
					color: #bbb;
					font-size: 28rpx;
					line-height: 36rpx;
				}

				.active {
					color: #D018F5;
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