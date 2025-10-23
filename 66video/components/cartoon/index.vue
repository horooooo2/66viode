<template>
	<tui-drawer class="language" mode="left" :visible="visible" @close="close" zIndex="1000" maskZIndex="999"
		backgroundColor="#333">
		<view class="header">
			<image class="back" src="/static/images/sidebar/icon_Back.png" mode="" @click="close"></image>
			<text>动漫</text>
		</view>
		<view class="d-container">
			<view class="list">
				<view class="list-item" v-for="val in listData" :key="val.id" @click="goDetail(val)">
					<view class="flag">
						{{val.category_info.name}}
					</view>
					<image class="poster" :src="val.pc_image" mode=""></image>
					<view class="title">{{val.title}}</view>
				</view>
			</view>
		</view>
	</tui-drawer>
</template>

<script>
	import {
		apiGetImageList,
	} from '@/common/api/content.js'
	export default {
		data() {
			return {
				visible: false,
				listData: []
			}
		},
		created(){ 
			this.loadData()
		},
		methods: {
			async loadData() {
				try {
					const res = await apiGetImageList();
					if (res.code === 0) this.listData = res.data.list;
				} catch (error) {
					console.error('请求失败:', error);
				}
			},
			open() {
				this.visible = true
			},
			close() {
				this.visible = false
			},
			goDetail(item) {
				uni.navigateTo({
					url: `/pages/detail/anime?id=${item.id}&type=image`
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.language {
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
			overflow: hidden;

			.card {
				width: 100%;
				height: 300rpx;
				padding: 0rpx 26rpx 0rpx 32rpx;
				box-sizing: border-box;
				margin-top: 20px;
				image{
					width: 460rpx;
					height: 200rpx;
				}
				
				text {
					min-width: 0;
					flex: 1;
					color: #ddd;
					font-size: 30rpx;
					font-weight: 400;
				}

				.icon {
					width: 40rpx;
					height: 40rpx;
				}
			}
			.list {
				display: grid;
				grid-template-columns: repeat(2, 1fr);
				gap: 32rpx 16rpx;
				padding: 32rpx 30rpx;
				box-sizing: border-box;
				.list-item {
					position: relative;
					width: 100%;
					border-radius: 16rpx;
			
					.flag {
						position: absolute;
						top: 8rpx;
						left: 8rpx;
						border-radius: 68rpx;
						background: linear-gradient(295deg, #FA4664 15.68%, #FB6755 84.32%);
						z-index: 1;
						color: #fff;
						font-size: 20rpx;
						font-weight: 400;
						padding: 4rpx 8rpx;
					}
			
					.poster {
						width: 100%;
						height: 150px;
						border-radius: 8px;
					}
			
					.title {
						font-size: 26rpx;
						font-weight: 400;
						color: #eee;
						margin-top: 16rpx;
					}
				}
			}
		}
	}
</style>