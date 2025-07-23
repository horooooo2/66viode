<template>
	<tui-drawer class="sidebar" mode="left" :visible="visible" @close="close" zIndex="1000" maskZIndex="999"
		backgroundColor="#333">
		<view class="header">
			<view class="left-panel">
				<image class="back" src="/static/images/sidebar/icon_Back.png" mode="" @click="close"></image>
				<image class="logo" src="/static/images/sidebar/LOGO.png" mode=""></image>
			</view>
			<!-- <view class="button">
				<view class="login">登录</view>
				<view class="register">注册</view>
			</view> -->
			<Surplus></Surplus>
		</view>
		<view class="d-container">
			<view class="card">
				<image class="icon" src="/static/images/sidebar/sp.png" mode=""></image>
				<text>视频</text>
				<image class="arrow" src="/static/images/sidebar/icon-xiala.png" mode=""></image>
			</view>
			<view class="card">
				<image class="icon" src="/static/images/sidebar/dm.png" mode=""></image>
				<text>动漫</text>
				<image class="arrow" src="/static/images/sidebar/icon-xiala.png" mode=""></image>
			</view>
			<view class="card">
				<image class="icon" src="/static/images/sidebar/xs.png" mode=""></image>
				<text>小说</text>
				<image class="arrow" src="/static/images/sidebar/icon-xiala.png" mode=""></image>
			</view>
			<view class="model">
				<view class="card" @click="onClick('router', '/pages/friends/index')">
					<image class="icon" src="/static/images/sidebar/yqhy.png" mode=""></image>
					<text>邀请好友</text>
				</view>
				<view class="card" @click="onClick('router', '/pages/club/index')">
					<image class="icon" src="/static/images/sidebar/jlb.png" mode=""></image>
					<text>VIP俱乐部</text>
				</view>
				<view class="card" @click="onClick('router', '/pages/activity/index')">
					<image class="icon" src="/static/images/sidebar/hd.png" mode=""></image>
					<text>活动</text>
				</view>
			</view>
			<view class="card" @click="onClick('sponsor')">
				<image class="icon" src="/static/images/sidebar/zz.png" mode=""></image>
				<text>赞助</text>
				<image class="arrow" src="/static/images/sidebar/icon-xiala.png" mode=""></image>
			</view>
			<view class="card">
				<image class="icon" src="/static/images/sidebar/xskf.png" mode=""></image>
				<text>线上客服</text>
			</view>
			<view class="model">
				<view class="card">
					<image class="icon" src="/static/images/sidebar/xxtz.png" mode=""></image>
					<text>消息通知</text>
				</view>
				<view class="card" @click="onClick('router', '/pages/media/index')">
					<image class="icon" src="/static/images/sidebar/gfmt.png" mode=""></image>
					<text>官方媒体</text>
				</view>
			</view>
			<view class="card" @click="onClick('router', '/pages/version/index')">
				<image class="icon" src="/static/images/sidebar/yybb.png" mode=""></image>
				<text>应用版本</text>
			</view>
			<image class="banner" src="/static/images/sidebar/banner.png" mode=""></image>
			<view class="card" @click="onClick('language')">
				<image class="icon" src="/static/images/sidebar/jtze.png" mode=""></image>
				<text>简体中文</text>
			</view>
		</view>
	</tui-drawer>

	<Language ref="languageRef"></Language>

	<Sponsor ref="sponsorRef"></Sponsor>
</template>

<script>
	import Language from "@/components/Language/index.vue"
	import Sponsor from "@/components/Sponsor/index.vue"
	import Surplus from "@/components/Surplus/index.vue"
	export default {
		components: {
			Language,
			Sponsor,
			Surplus,
		},
		data() {
			return {
				visible: false
			}
		},
		methods: {
			onClick(flag, url) {
				switch (flag) {
					case 'language':
						this.$refs.languageRef && this.$refs.languageRef.open()
						break
					case 'sponsor':
						this.$refs.sponsorRef && this.$refs.sponsorRef.open()
						break
					case 'router':
						uni.navigateTo({
							url
						})
						break
				}
			},
			open() {
				this.visible = true
			},
			close() {
				this.visible = false
			},
		}
	}
</script>

<style lang="scss" scoped>
	.sidebar {
		::v-deep() {
			.tui-drawer-container {
				width: 620rpx;
				border-radius: 0 80rpx 80rpx 0;
				padding: 68rpx 36rpx;
				box-sizing: border-box;
			}
		}

		.header {
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: space-between;
			height: 60rpx;
			margin-bottom: 36rpx;

			.left-panel {
				display: flex;
				align-items: center;

				.back {
					width: 48rpx;
					height: 48rpx;
				}

				.logo {
					width: 102rpx;
					height: 28rpx;
				}
			}

			.button {
				width: 320rpx;
				display: grid;
				grid-template-columns: repeat(2, 1fr);
				gap: 24rpx;

				.login {
					border-radius: 80rpx;
					background: rgba(251, 95, 251, 0.20);
					color: #FFF;
					text-align: center;
					font-size: 26rpx;
					font-weight: 400;
					line-height: 60rpx;
				}

				.register {
					border-radius: 80rpx;
					background: var(--_, linear-gradient(0deg, #D018F5 0%, #FA3296 100%));
					color: #FFF;
					text-align: center;
					font-size: 26rpx;
					font-weight: 400;
					line-height: 60rpx;
				}
			}
		}

		.d-container {
			width: 100%;
			display: flex;
			flex-direction: column;
			gap: 16rpx;

			.card {
				width: 100%;
				height: 110rpx;
				padding: 0rpx 22rpx 0rpx 32rpx;
				box-sizing: border-box;
				display: flex;
				align-items: center;
				justify-content: space-between;
				border-radius: 20rpx;
				background: #202020;

				.icon {
					width: 56rpx;
					height: 56rpx;
					margin-right: 16rpx;
				}

				text {
					min-width: 0;
					flex: 1;
					color: #ddd;
					font-size: 30rpx;
					font-weight: 400;
				}

				.arrow {
					width: 32rpx;
					height: 32rpx;
				}
			}

			.model {
				border-radius: 20rpx;
				background: #202020;

				&.card {
					border-radius: 0;
				}
			}

			.banner {
				width: 100%;
				height: 160rpx;
			}
		}
	}
</style>