<template>
	<tui-drawer class="sponsor" mode="left" :visible="visible" @close="close" zIndex="1000" maskZIndex="999"
		backgroundColor="#333">
		<view class="header">
			<image class="back" src="/static/images/sidebar/icon_Back.png" mode="" @click="close"></image>
			<text>赞助</text>
		</view>
		<view class="d-container">
			<view class="card" v-for="(item, index) in dataList" :key="index" @click="onClick(item.link)">
				<image class="icon" :src="item.icon" mode=""></image>
				<text>{{ item.name }}</text>
			</view>
		</view>
	</tui-drawer>
</template>

<script>
	import { apiSponsor } from '@/common/api/content.js'
	export default {
		data() {
			return {
				visible: false,
				dataList: []
			}
		},
		methods: {
			open() {
				this.getSponsorData();
				this.visible = true
			},
			close() {
				this.visible = false
			},
			async getSponsorData() {
				let res = await apiSponsor()
				if (res.code === 0 && res.data) {
					this.dataList = res.data
				}
			},
			onClick(url) {
				location.href = url
			}
		}
	}
</script>

<style lang="scss" scoped>
	.sponsor {
		::v-deep() {
			.tui-drawer-container {
				width: 620rpx;
				border-radius: 0 80rpx 80rpx 0;
				padding: 68rpx 30rpx;
				box-sizing: border-box;
			}
		}

		.header {
			width: 100%;
			display: flex;
			align-items: center;
			height: 60rpx;
			margin-bottom: 36rpx;

			.back {
				width: 48rpx;
				height: 48rpx;
			}

			text {
				font-size: 36rpx;
				color: #ccc;
				font-weight: 500;
			}
		}

		.d-container {
			width: 100%;
			border-radius: 20rpx;
			background: #202020;
			padding: 24rpx 20rpx;
			box-sizing: border-box;
			display: grid;
			grid-template-columns: repeat(4, 1fr);
			gap: 36rpx 40rpx;

			.card {
				display: flex;
				flex-direction: column;
				align-items: center;
				gap: 12rpx;

				.icon {
					width: 96rpx;
					height: 96rpx;
				}

				text {
					color: #fff;
					font-size: 24rpx;
					font-weight: 400;
				}
			}
		}
	}
</style>