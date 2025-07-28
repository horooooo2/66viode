<template>
	<view class="prize">
		<view class="card" v-for="i in 6" :key="i">
			<view class="prize-item">
				<view class="box-card" :class="{ 'active-card': i === 1 }">
					<image class="icon-check" :src="iconUrl(i)" mode="widthFix"></image>
					<text>{{ i === 1 ? '已领取' : '未领取'}}</text>
				</view>
				<image class="dot" :src="dotUrl(i)" mode=""></image>
				<view class="coin-num" :class="{ point: i === 2 }">{{ i }}00</view>
			</view>
			<view v-if="isLaster(i)" class="line" :class="{ 'active-line': i === 1 }"></view>
		</view>
	</view>
</template>

<script>
	export default {
		computed: {
			isLaster() {
				return (i) => {
					return 6 - i
				}
			},
			iconUrl() {
				return (i) => {
					return i === 1 ? '/static/images/activity/icon_Check.png' : '/static/images/activity/image131.png'
				}
			},
			dotUrl() {
				return (i) => {
					return i === 1 || i === 2 ? '/static/images/activity/Ellipse 3.png' : '/static/images/activity/Ellipse 5.png'
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.prize {
		width: 100%;
		padding: 28rpx 20rpx;
		box-sizing: border-box;
		border-radius: 20rpx;
		background: #202020;
		display: flex;
		overflow-x: scroll;
		scrollbar-width: none;

		::-webkit-scrollbar {
			display: none;
		}

		.card {
			position: relative;
		}

		.line {
			position: absolute;
			top: 96rpx;
			left: 30rpx;
			width: 142rpx;
			height: 4rpx;
			background: #FFE6FF;
			z-index: 0;
		}

		.active-line {
			background: linear-gradient(90deg, #FF19B2 0.17%, #FF1966 101.4%);
		}

		.prize-item {
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 12rpx;
			margin-right: 60rpx;

			&:last-child {
				margin-right: 0;
			}

			.box-card {
				width: 76rpx;
				height: 76rpx;
				border-radius: 20rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				background: linear-gradient(270deg, #D018F5 0%, #FA3296 100%);

				.icon-check {
					width: 32rpx;
					display: block;
					margin-bottom: 4rpx;
				}

				text {
					color: #ccc;
					text-align: center;
					font-size: 20rpx;
					font-weight: 400;
					line-height: 24rpx;
				}
			}

			.active-card {
				background: #444;
			}

			.dot {
				position: relative;
				width: 20rpx;
				height: 20rpx;
				z-index: 9;
			}

			.coin-num {
				color: #ddd;
				text-align: center;
				font-size: 20rpx;
				font-weight: 400;
				line-height: 24rpx;
			}

			.point {
				color: #F0B643;
			}
		}
	}
</style>