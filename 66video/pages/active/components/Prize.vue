<template>
	<view class="prize">
		<view class="prize-item" v-for="i in 6" :key="i" :style="{ 'background-image': `url(${prizeBgStyle(i)})`}" @click="missionClaim(i)">
			<view class="coin-num" :class="[i === 1 ? 'claimed-num' : i === 2 || i === 3 ? 'claiming-num' : 'unclaimed-num']">999</view>
			<view v-if="i === 3" class="progress">
				<view class="progress-bar" :style="{ width: '30%' }"></view>
			</view>
			<view v-if="i === 1 || i === 2 || i === 3" class="text" :class="{ 'unclaimed-text': i === 2, 'claiming-text': i === 3 }">{{ i === 1 ? '已领取' : i === 2 ? '领取' : '积攒中' }}</view>
		</view>
	</view>
</template>

<script>
	import { apiMissionClaim } from '@/common/api/active.js'
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
			prizeBgStyle() {
				return (index) => {
					return index === 1 ? '/static/images/activity/claimed-bg.png' : index === 2 || index === 3 ? '/static/images/activity/claiming-bg.png' : '/static/images/activity/unclaimed-bg.png'
				}
			},
		},
		methods: {
			missionClaim(item) {
				console.log(item)
				return
				// return apiMissionClaim({
				// 	active_id: this.prizeData.id,
				// 	stage: item.stage
				// }).then((res) => {
				// 	uni.showToast({
				// 		title: res.msg,
				// 		icon: 'none',
				// 		duration: 2000
				// 	});
				// });
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