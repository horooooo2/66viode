<template>
	<view class="address">
		<view class="status_bar"></view>
		<NavBar title="选择收货地址" fallbackUrl='/pages/points/index'></NavBar>
		<view class="address-container">
			<view class="address-label">我的收货地址</view>
			<view class="address-add" @click="toLink('/pages/address/add')">添加收货地址</view>
			<view class="address-list">
				<template v-for="(item,index) in listData" :key="index">
					<tui-swipe-action :actions="actions" backgroundColor="transparent"
						@click="(e) => handlerButton(e, item, index)">
						<template v-slot:content>
							<view class="address-card">
								<image class="icon-address" src="/static/images/points/icon-address.png" mode="">
								</image>
								<view class="address-content">
									<view class="userinfo">
										<view class="username">{{ item.name }}</view>
										<view class="phone">{{ item.phone }}</view>
									</view>
									<view class="dizhi">{{ item.address }}</view>
								</view>
								<view class="address-check" @click="onClickSet(item)">
									<image v-if="item.is_default == 0" class="icon-check"
										src="/static/images/setting/icon_checkbox.svg" mode="">
									</image>
									<image v-if="item.is_default == 1" class="icon-check"
										src="/static/images/setting/icon_checkbox_active.svg" mode="">
									</image>
								</view>
							</view>
						</template>
					</tui-swipe-action>
				</template>
			</view>
		</view>
		<!-- <view class="button" @click="toLink('/pages/address/add')">新增</view> -->
	</view>
</template>

<script>
	import NavBar from '@/components/NavBar/index.vue'
	import {
		apiAddressList, apiDelAddress, apiSetAddress
	} from '@/common/api/goods.js'
	export default {
		components: {
			NavBar
		},
		data() {
			return {
				actions: [{
						name: '删除',
						color: '#fff',
						fontsize: 30, //单位rpx
						width: 70, //单位px
						background: '#FD3B31'
					},
					{
						name: '修改',
						color: '#fff',
						fontsize: 30,
						width: 70,
						background: '#5677fc'
					},
				],

				listData: [],
			}
		},
		onShow() {
			this.getList()
		},
		methods: {
			getList() {
				apiAddressList().then(res => {
					if (res.code === 0) {
						this.listData = res.data || []
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none',
							duration: 2000
						});
					}
				})
			},
			// 接收事件对象、当前item和index
			handlerButton(e, item, index) {
				const menuTxt = ['删除', '修改'][e.index];
				if (menuTxt === '删除') {
					apiDelAddress({ id: item.id }).then((res) => {
						uni.showToast({
							title: res.msg,
							icon: 'none',
							duration: 2000
						});
						if (res.code == 0) {
							this.getList()
						}
					})
				} else if (menuTxt === '修改') {
					uni.navigateTo({
						url: `/pages/address/add?id=${item.id}`
					})
				}
			},
			// 设置默认地址
			onClickSet(item) {
				if (item.is_default === 1) {
					uni.showToast({
						title: '当前地址已是默认地址',
						icon: 'none',
						duration: 2000
					});
					return
				}
				console.log(item, '13')
				apiSetAddress({ id: item.id }).then((res) => {
					uni.showToast({
						title: res.msg,
						icon: 'none',
						duration: 2000
					});
					if (res.code == 0) {
						this.getList()
					}
				})
			},
			toLink(url) {
				uni.navigateTo({
					url
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.address {
		width: 100%;
		background-color: #101010;
		min-height: 100vh;
		display: flex;
		flex-direction: column;

		.address-container {
			width: 100%;
			min-height: 0;
			flex: 1;
			padding: 32rpx 32rpx 140rpx;
			box-sizing: border-box;

			.address-label {
				color: #999;
				font-size: 28rpx;
				font-weight: 400;
				line-height: 28rpx;
				margin-bottom: 24rpx;
			}

			.address-add {
				border-radius: 16rpx;
				border: 2rpx dashed #FF1A8C;
				background: #101010;
				width: 100%;
				height: 160rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				color: #ccc;
				font-size: 28rpx;
				font-weight: 500;
				line-height: 48rpx;
				margin-bottom: 26rpx;
			}

			.address-list {
				display: flex;
				flex-direction: column;
				gap: 40rpx;

				.address-card {
					width: 100%;
					padding: 20rpx 32rpx;
					box-sizing: border-box;
					border-radius: 16rpx;
					background: #202020;
					display: flex;
					align-items: center;
					justify-content: space-between;

					.icon-address {
						width: 76rpx;
						height: 76rpx;
						flex-shrink: 0;
						margin-right: 24rpx;
					}

					.address-content {
						min-width: 0;
						flex: 1;

						.userinfo {
							display: flex;
							align-items: center;
							gap: 20rpx;
							color: #ccc;
							line-height: 28rpx;
							margin-bottom: 16rpx;

							.username {
								font-size: 34rpx;
								font-weight: 500;
							}

							.phone {
								font-size: 26rpx;
								font-weight: 400;
							}
						}

						.dizhi {
							color: #aaa;
							font-size: 26rpx;
							font-weight: 400;
							line-height: 40rpx;
						}
					}

					.address-check {
						width: 40rpx;
						height: 40rpx;
						margin-left: 46rpx;

						image {
							width: 100%;
							height: 100%;
						}
					}
				}
			}
		}

		.button {
			position: fixed;
			bottom: 20rpx;
			left: 50%;
			transform: translateX(-50%);
			width: 686rpx;
			height: 88rpx;
			border-radius: 20rpx;
			background: linear-gradient(270deg, #D018F5 0%, #FA3296 100%);
			color: #fff;
			text-align: center;
			font-size: 34rpx;
			font-weight: 400;
			line-height: 88rpx;
		}
	}
</style>