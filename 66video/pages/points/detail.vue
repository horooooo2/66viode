<template>
	<view class="point-detail">
		<NavBar :isTitle="false" fallbackUrl='/pages/points/index'></NavBar>
		<view class="detail-container">
			<view class="cover">
				<image :src="dataItem.cover_image" mode=""></image>
			</view>
			<view class="jifen">
				<image class="icon" src="/static/images/points/icon_jf.png" mode=""></image>
				<text>{{ dataItem.price }}</text>
			</view>
			<view class="title">{{ dataItem.name }}</view>
			<view class="kucun">库存：{{ dataItem.stock }}</view>
			<view class="desc-box" v-html="dataItem.description"></view>
			<view class="button" @click="onClickOrder">申请兑换</view>
		</view>

		<tui-drawer class="address-drawer" :visible="visible" backgroundColor="#202020" mode="bottom"
			:maskClosable="false">
			<view class="d-title">
				<text>确认订单</text>
				<image class="close" @click="visible = false" src="/static/images/icon_nav_news_white.png" mode="">
				</image>
			</view>
			<view class="d-container">
				<view v-if="isAddressEmpty" class="address-add" @click="toLink('/pages/address/index')">添加收货地址</view>
				<view v-else class="address-card">
					<image class="icon-address" src="/static/images/points/icon-address.png" mode=""></image>
					<view class="address-content">
						<view class="userinfo">
							<view class="username">{{ addressItem.name }}</view>
							<view class="phone">{{ addressItem.phone }}</view>
						</view>
						<view class="dizhi">{{ addressItem.address }}</view>
					</view>
					<image class="address-check" src="/static/images/icon_right.png" mode=""
						@click="toLink('/pages/address/index')">
					</image>
				</view>
				<view class="goods-card">
					<view class="goods-cover">
						<image :src="dataItem.cover_image" mode=""></image>
					</view>
					<view class="right-panel">
						<view class="goods-title">{{ dataItem.name }}</view>
						<view class="goods-num">
							<tui-numberbox :value="count" :min="1" :max="dataItem.stock"
								@change="onChange"></tui-numberbox>
						</view>
					</view>
				</view>
				<view v-if="dataItem.type == 2" class="goods-phone">
					<input v-model="recharge_phone" type="number" placeholder="充值手机号" class="input" />
				</view>
				<view class="goods-money">
					<view>商品合计</view>
					<image class="icon-jifen" src="/static/images/points/icon_jf.png" mode=""></image>
					<text>{{ money }}</text>
				</view>
				<button class="d-button" @click="onClickSubmit">去结算</button>
			</view>
		</tui-drawer>
	</view>
</template>

<script>
	import NavBar from '@/components/NavBar/index.vue'
	import {
		apiGoodsDetails,
		apiAddressList,
		apiCreateOrder
	} from '@/common/api/goods.js'
	export default {
		components: {
			NavBar
		},
		data() {
			return {
				visible: false,
				dataItem: {},
				addressItem: {},
				isAddressEmpty: true,
				count: 1,
				recharge_phone: ''
			}
		},
		computed: {
			money() {
				const total = this.count * this.dataItem.price;
				return parseFloat(total.toFixed(2));
			}
		},
		onLoad(options) {
			this.getData(options.id)
		},
		methods: {
			onClickSubmit() {
				if (this.dataItem.type === 1 && !this.addressItem.id) {
					uni.showToast({
						title: '请填写收货地址',
						icon: 'none',
						duration: 2000
					});
					return;
				}
				if (this.dataItem.type === 2 && !this.recharge_phone) {
					uni.showToast({
						title: '充值手机号不能为空',
						icon: 'none',
						duration: 2000
					});
					return;
				}
				apiCreateOrder({
					goods_id: this.dataItem.id,
					count: this.count,
					address_id: this.addressItem.id,
					recharge_phone: this.recharge_phone,
					order_remark: '',
				}).then((res) => {
					uni.showToast({
						title: res.msg,
						icon: 'none',
						duration: 2000
					});
					if (res.code == 0) {
						this.visible = false
					}
				})
			},
			onChange(e) {
				this.count = e.value
			},
			async getData(id) {
				const {
					code,
					msg,
					data
				} = await apiGoodsDetails({
					id
				})
				if (code === 0) {
					this.dataItem = data
				} else {
					uni.showToast({
						title: msg,
						icon: 'none',
						duration: 2000
					});
				}
			},
			getAddressList() {
				apiAddressList().then((res) => {
					if (res.code === 0) {
						if (!res.data && !res.data.length) {
							this.isAddressEmpty = true
						} else {
							this.isAddressEmpty = false
							let listData = res.data || []
							this.addressItem = listData.find((item) => item.is_default === 1)
						}
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none',
							duration: 2000
						});
					}
				})
			},
			onClickOrder() {
				this.getAddressList();
				this.visible = true;
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
	.point-detail {
		width: 100%;
		background-color: #101010;
		min-height: 100vh;
		background-image: url("/static/images/index/bg.png");
		background-position: top center;
		background-repeat: no-repeat;
		background-size: cover;
		display: flex;
		flex-direction: column;

		.detail-container {
			min-height: 0;
			flex: 1;
			display: flex;
			flex-direction: column;
			align-items: center;
			width: 100%;
			padding: 16rpx 32rpx;
			box-sizing: border-box;

			.cover {
				width: 266rpx;
				height: 266rpx;
				border-radius: 20rpx;
				background: rgba(255, 255, 255, 0.10);
				margin-bottom: 32rpx;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.jifen {
				display: flex;
				align-items: center;
				color: #FEA71F;
				font-size: 40rpx;
				font-weight: 700;
				line-height: 40rpx;
				gap: 8rpx;

				.icon {
					width: 40rpx;
					height: 40rpx;
				}
			}

			.title {
				width: 80%;
				color: #ddd;
				text-align: center;
				font-size: 40rpx;
				font-weight: 500;
				line-height: 48rpx;
				margin: 16rpx 0;
			}

			.kucun {
				color: #777;
				font-size: 26rpx;
				font-weight: 400;
				line-height: 32rpx;
			}

			.desc-box {
				width: 100%;
				margin-top: 44rpx;
				display: flex;
				color: #fff;
				flex-direction: column;
				gap: 40rpx;

				.desc-item {
					width: 100%;
					display: flex;
					flex-direction: column;
					gap: 16rpx;

					.desc-title {
						color: #ccc;
						font-size: 30rpx;
						font-weight: 500;
						line-height: 40rpx;
					}

					p {
						color: #aaa;
						text-align: justify;
						font-size: 26rpx;
						font-weight: 400;
						line-height: 32rpx;
					}
				}
			}

			.button {
				position: fixed;
				left: 16px;
				right: 16px;
				bottom: 22px;
				// width: 100%;
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

		.address-drawer {
			:deep() {
				.tui-drawer-mask {
					background-color: rgba(16, 16, 16, 0.7);
				}

				.tui-drawer-container {
					min-height: 760rpx !important;
					border-radius: 32rpx 32rpx 0 0;
					padding: 42rpx 32rpx 20rpx;
					box-sizing: border-box;
				}
			}

			.d-title {
				position: relative;
				width: 100%;
				color: #ddd;
				text-align: center;
				font-size: 32rpx;
				font-weight: 500;
				line-height: 48rpx;
				margin-bottom: 44rpx;

				.close {
					position: absolute;
					top: 0;
					right: 0;
					width: 48rpx;
					height: 48rpx;
				}
			}

			.d-container {
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
					margin-bottom: 24rpx;
				}

				.address-card {
					width: 100%;
					padding: 20rpx 32rpx;
					box-sizing: border-box;
					border-radius: 16rpx;
					background: #101010;
					display: flex;
					align-items: center;
					justify-content: space-between;
					margin-bottom: 22rpx;

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
						width: 48rpx;
						height: 48rpx;
						margin-left: 52rpx;
					}
				}

				.goods-card {
					width: 100%;
					border-radius: 20rpx;
					background: #101010;
					display: flex;
					align-items: center;
					padding: 22rpx 28rpx;
					box-sizing: border-box;
					margin-bottom: 20rpx;

					.goods-cover {
						width: 136rpx;
						height: 136rpx;
						border-radius: 10rpx;
						background: rgba(255, 255, 255, 0.10);
						margin-right: 20rpx;

						image {
							width: 100%;
							height: 100%;
						}
					}

					.right-panel {
						height: 136rpx;
						display: flex;
						flex-direction: column;
						justify-content: space-between;

						.goods-title {
							color: #ccc;
							font-size: 28rpx;
							font-weight: 500;
							line-height: 48rpx;
						}
					}
				}
				
				.goods-phone {
					width: 100%;
					margin-bottom: 36rpx;
					.input {
						width: 100%;
						height: 96rpx;
						padding: 32rpx;
						box-sizing: border-box;
						border-radius: 20rpx;
						background: #101010;
					
						.uni-input-placeholder {
							color: #555;
							font-size: 32rpx;
						}
					
						:deep() {
							.uni-input-input {
								color: #ccc;
								font-size: 32rpx;
							}
						}
					}
				}

				.goods-money {
					display: flex;
					align-items: center;
					justify-content: flex-end;
					gap: 8rpx;
					color: #ccc;
					font-size: 28rpx;
					font-weight: 400;
					line-height: 40rpx;
					margin-bottom: 30rpx;

					.icon-jifen {
						width: 40rpx;
						height: 40rpx;
					}

					text {
						color: #FEA71F;
						font-size: 40rpx;
						font-weight: 700;
						line-height: 40rpx;
					}
				}

				.d-button {
					width: 100%;
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
		}
	}
</style>