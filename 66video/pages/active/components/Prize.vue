<template>
	<view class="prize">
		<view class="prize-item" v-for="(item, index) in prizeList" :key="index"
			:style="{ 'background-image': `url(${prizeBgStyle(item.user_status)})`}" @click="missionClaim(item)">
			<view class="coin-num" :class="coinClass(item.user_status)">{{ item.active_target }}</view>
			<view v-if="item.user_status === -1" class="progress">
				<view class="progress-bar" :style="{ width: progressPercent(item) + '%' }"></view>
			</view>
			<view class="text" :class="{ 'unclaimed-text': item.user_status === 1 }">
				{{ statusText(item.user_status) }}
			</view>
		</view>
	</view>
</template>

<script>
	import {
		apiMissionClaim
	} from '@/common/api/active.js'
	export default {
		props: {
			prizeList: {
				type: Array,
				default: []
			},
			prizeData: {
				type: Object,
				default: {}
			}
		},
		computed: {
			// 背景图根据状态返回
			prizeBgStyle() {
				return (status) => {
					switch (status) {
						case 1:
							return '/static/images/activity/claimed-bg.png' // 已领取
						case 0:
							return '/static/images/activity/claiming-bg.png' // 可领取
						case -1:
							return '/static/images/activity/claiming-bg.png'
						default:
							return ''
							// return '/static/images/activity/unclaimed-bg.png'
					}
				}
			}
		},
		methods: {
			coinClass(status) {
				switch (status) {
					case 1:
						return 'claimed-num'
					case 0:
						return 'claiming-num'
					case -1:
					default:
						return 'claiming-num'
				}
			},
			statusText(status) {
				switch (status) {
					case 1:
						return '已领取'
					case 0:
						return '领取'
					case -1:
						return '积攒中'
					default:
						return ''
				}
			},
			progressPercent(item) {
				let percent = (item.active_point / item.active_target) * 100
				return percent > 100 ? 100 : percent
			},
			missionClaim(item) {
				if (item.user_status !== 1) return
				return apiMissionClaim({
					active_id: this.prizeData.id,
					stage: item.stage
				}).then((res) => {
					uni.showToast({
						title: res.msg,
						icon: 'none',
						duration: 2000
					});
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	.prize {
		width: 100%;
		padding: 20rpx;
		box-sizing: border-box;
		border-radius: 20rpx;
		background: #202020;
		display: flex;
		gap: 12rpx;
		overflow-x: scroll;
		scrollbar-width: none;

		::-webkit-scrollbar {
			display: none;
		}

		.prize-item {
			flex-shrink: 0;
			position: relative;
			width: 104rpx;
			height: 134rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			background-repeat: no-repeat;
			background-size: 100% 100%;

			.coin-num {
				font-size: 36rpx;
				font-weight: 900;
				padding-top: 6rpx;
			}

			.unclaimed-num {
				color: #fff;
				padding-top: 66rpx;
			}

			.claiming-num {
				color: #FF302B;
			}

			.claimed-num {
				color: #8B8B8B;
			}

			.text {
				font-size: 24rpx;
				font-weight: 400;
				margin-top: 40rpx;
				color: #fff;
			}

			.unclaimed-text {
				color: #FDDD5C;
			}

			.claiming-text {
				margin-top: 35rpx;
			}

			.progress {
				width: 68rpx;
				height: 8rpx;
				background-color: #D1C3AC;
				border-radius: 20rpx;
			}

			.progress-bar {
				height: 8rpx;
				background-color: #FF4141;
				border-radius: 20rpx;
			}
		}
	}
</style>