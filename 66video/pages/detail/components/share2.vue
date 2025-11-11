<template>
	<view class="share">
		<view class="share_t">
			<uni-icons type="redo" size="18" color="#BBBBBB"></uni-icons>
			<text space="ensp"> 分享到...</text>
		</view>
		<view class="share_item" @click="transShowCode()">
			<view class="s_i" @click="shareFun('weixin')">
				<view class="s_i_wrap">
					<image class="s_img" mode="heightFix" src="/static/images/detail/qq.png"></image>
				</view>
				<view class="s_i_txt">QQ</view>
			</view>
			<view class="s_i">
				<view class="s_i_wrap">
					<image class="s_img" mode="heightFix" src="/static/images/friends/wx.png"></image>
				</view>
				<view class="s_i_txt">微信</view>
			</view>
			<view class="s_i">
				<view class="s_i_wrap">
					<image class="s_img" mode="heightFix" src="/static/images/friends/dy.png"></image>
				</view>
				<view class="s_i_txt">抖音</view>
			</view>
			<view class="s_i">
				<view class="s_i_wrap">
					<image class="s_img" mode="heightFix" src="/static/images/friends/sl.png"></image>
				</view>
				<view class="s_i_txt">闪聊</view>
			</view>
			<view class="s_i">
				<view class="s_i_wrap">
					<image class="s_img" mode="heightFix" src="/static/images/friends/lj.png"></image>
				</view>
				<view class="s_i_txt">链接</view>
			</view>
			<view class="s_i">
				<view class="s_i_wrap">
					<image class="s_img" mode="heightFix" src="/static/images/friends/hb.png"></image>
				</view>
				<view class="s_i_txt">海报</view>
			</view>
		</view>
		<tui-popup class="yq-popup" :show="transShow" style="background-color: rgba(0, 0, 0, 0.8)">
			<view class="popup-main">
				<image class="close" src="/static/images/friends/icon_Close.png" mode="" @click="transShow = false">
				</image>
				<view class="popup-content">
					<view class="qrcode-container">
						<canvas v-if="transShow" canvas-id="qrcodeCanvas" class="qrcode-canvas"></canvas>
					</view>
					<image class="popup-cover" :src="detailData.data.mobile_image || detailData.data.pc_image" mode="widthFix"></image>
					<text>链接已生成 或复制链接给好友</text>
				</view>
				<image @click="copyInviteLink()" class="popup-button" src="/static/images/friends/button-ljfx.png"
					mode="widthFix"></image>
			</view>
		</tui-popup>
	</view>
</template>

<script setup>
import {
	ref,
	reactive,
	defineEmits,
	defineProps,
	watchEffect,
	onMounted,
	computed
} from "vue";
import { apiShareRecord } from "@/common/api/content.js";
import {
	apiGetInviteRules
} from '@/common/api/goods.js'
import UQRCode from 'uqrcodejs';
import { useUserStore } from '@/store/user'

const userStore = useUserStore()
const props = defineProps({
	detailData: {
		type: Object,
		default: () => ({}),
	},
});
const transShow = ref(false);
const invite_url = ref('');

const inviteUrl = computed(() => {
	return (invite_url.value || window.location.origin) + '/#/pages/login/index?type=2&invite_code=' + (userStore.userData?.points || '');
});
const transShowCode = () => {
	transShow.value = true;
	getInviteRules();
};

const shareFun = (type) => {
	console.log("props.detailData=", props.detailData);

	apiShareRecord({
		content_type: props.detailData.type,
		content_id: props.detailData.id,
	}).then((res) => {
		console.log("res==", res);

		if (res.code === 0) {
			// uni.showToast({
			// 	title: '分享成功',
			// 	icon: 'none',
			// 	duration: 2000
			// });
		} else {
		}
	});
};
//生成二维码
const generateQRCode = () => {
	try {
		// 确保正确导入UQRCode

		// 创建二维码实例
		const qrcode = new UQRCode();

		// 设置二维码内容
		qrcode.data = inviteUrl.value;

		// 设置二维码大小
		qrcode.size = 130;

		// 设置二维码级别
		qrcode.errorCorrectLevel = UQRCode.errorCorrectLevel.H;

		// 生成二维码
		qrcode.make();

		// 获取canvas上下文
		const ctx = uni.createCanvasContext('qrcodeCanvas', this);

		// 关键步骤1：先清空canvas
		ctx.clearRect(0, 0, 130, 130);

		// 关键步骤2：设置白色背景
		ctx.setFillStyle('#FFFFFF');
		ctx.fillRect(0, 0, 130, 130);

		// 将二维码绘制到canvas
		qrcode.canvasContext = ctx;
		qrcode.drawCanvas();

		// 关键步骤3：使用 ctx.draw(true) 保留绘制
		ctx.draw(true, () => {
			console.log('二维码绘制完成');
		});

	} catch (error) {
		console.error('生成二维码失败:', error);
		uni.showToast({
			title: '生成失败: ' + error.message,
			icon: 'none'
		});
	}
}
//复制分享链接
const copyInviteLink = () => {
	uni.setClipboardData({
		data:  inviteUrl.value,
		success: () => {
			uni.showToast({
				title: '复制成功',
				icon: 'success'
			});
		},
		fail: (err) => {
			console.error('复制失败:', err);
			uni.showToast({
				title: '复制失败',
				icon: 'none'
			});
		}
	});
}
const getInviteRules = async () => {
	let {
		code,
		msg,
		data
	} = await apiGetInviteRules()
	console.log(code, msg, data)
	if (code == 0) {
		invite_url.value = data.invite_url;
		generateQRCode();
	} else {
		uni.showToast({
			title: msg,
			icon: 'none',
			duration: 2000
		});
	}
}
</script>

<style lang="scss" scoped>
.share {
	margin-top: 30rpx;
	padding: 20rpx;
	background: #191919;
	color: #ddd;
	border-radius: 12rpx;

	.share_t {
		display: flex;
		align-items: center;
		font-size: 24rpx;
	}

	.share_item {
		margin-top: 30rpx;
		display: flex;

		.s_i {
			width: 100rpx;
			padding: 0 6rpx;
			display: flex;
			flex-flow: column;
			justify-content: center;
			align-items: center;
		}

		.s_i_wrap {
			border-radius: 50%;
			width: 70rpx;
			height: 70rpx;
			background: #262626;
			display: flex;
			justify-content: center;
			align-items: center;

			.s_img {
				width: 60rpx;
				height: 60rpx;
			}
		}

		.s_i_txt {
			font-size: 22rpx;
			margin-top: 8rpx;
			text-align: center;
		}
	}
}

.yq-popup {

	.popup-main {
		position: relative;
		width: 686rpx;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		align-items: center;

		.close {
			position: absolute;
			top: -14rpx;
			right: -14rpx;
			width: 48rpx;
			height: 48rpx;
			z-index: 999999;
		}

		.popup-content {
			width: 100%;
			padding: 26rpx 24rpx;
			box-sizing: border-box;
			border-radius: 20rpx;
			background: #28272A;
			display: flex;
			flex-direction: column;
			gap: 18rpx;
			position: relative;

			.popup-cover {
				width: 100%;
			}

			.qrcode-container {
				position: absolute;
				left: 30rpx;
				bottom: 90rpx;
				width: 240rpx;
				height: 240rpx;
				z-index: 9999;
			}

			text {
				color: #ccc;
				font-size: 24rpx;
				font-weight: 400;
			}
		}

		.popup-button {
			width: 574rpx;
			margin-top: 48rpx;
		}
	}
}
</style>