<template>
	<view class="share">
		<view class="share_t">
			<uni-icons type="redo" size="18" color="#BBBBBB"></uni-icons>
			<text space="ensp"> 分享到...</text>
		</view>
		<view class="share_item">
			<!-- QQ -->
			<view class="s_i" @click="shareToQQ">
				<view class="s_i_wrap">
					<image class="s_img" mode="heightFix" src="/static/images/detail/qq.png"></image>
				</view>
				<view class="s_i_txt">QQ</view>
			</view>
			
			<!-- 微信 -->
			<view class="s_i" @click="shareToWechat">
				<view class="s_i_wrap">
					<image class="s_img" mode="heightFix" src="/static/images/friends/wx.png"></image>
				</view>
				<view class="s_i_txt">微信</view>
			</view>
			
			<!-- 抖音 -->
			<view class="s_i" @click="shareToDouyin">
				<view class="s_i_wrap">
					<image class="s_img" mode="heightFix" src="/static/images/friends/dy.png"></image>
				</view>
				<view class="s_i_txt">抖音</view>
			</view>
			
			<!-- 闪聊 -->
			 <view class="s_i" @click="shareWhatsappChat">
				<view class="s_i_wrap">
					<image class="s_img" mode="heightFix" src="/static/images/friends/whatsapp.png"></image>
				</view>
				<view class="s_i_txt">whatsapp</view>
			</view>
			
			<!-- Telegram -->
			<view class="s_i" @click="shareToTelegram">
				<view class="s_i_wrap">
					<image class="s_img" mode="heightFix" src="/static/images/friends/tg.png"></image>
				</view>
				<view class="s_i_txt">Telegram</view>
			</view>
			
			<!-- 链接 -->
			<view class="s_i" @click="copyInviteLink">
				<view class="s_i_wrap">
					<image class="s_img" mode="heightFix" src="/static/images/friends/lj.png"></image>
				</view>
				<view class="s_i_txt">链接</view>
			</view>
			
			<!-- 海报 -->
			<!--<view class="s_i" @click="generatePoster">
				<view class="s_i_wrap">
					<image class="s_img" mode="heightFix" src="/static/images/friends/hb.png"></image>
				</view>
				<view class="s_i_txt">海报</view>
			</view> -->
		</view>
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
	computed,
	watch 
} from "vue";
import { apiShareRecord } from "@/common/api/content.js";
import UQRCode from 'uqrcodejs';
import { useUserStore } from '@/store/user'

const userStore = useUserStore()
const props = defineProps({
	detailData: {
		type: Object,
		default: () => ({}),
	},
});

// 分享数据配置
const detailTitle = ref('')

const shareData = computed(() => {
    return {
        desc: props.detailData?.description || `我正在66吃瓜网观看《${detailTitle.value}》，快来一起看！`,
        url: inviteUrl.value,
		title: detailTitle.value
    }
})

watch(
    () => props.detailData,
    (newVal) => {
        console.log('data属性:', props.detailData?.data)
        if (props.detailData?.data?.title) {
            detailTitle.value = props.detailData.data.title
        }
    },
    { immediate: true, deep: true }
)
// 邀请链接
const inviteUrl = computed(() => {
	const baseUrl = location.origin
	// const sharePath = `/#/pages/detail/article?id=${props.detailData?.id}`
	const sharePath = '/' + location.hash
	return baseUrl + sharePath
})

// 分享到Telegram
const shareToTelegram = () => {
	const text = encodeURIComponent(`${shareData.value.title}\n\n${shareData.value.desc}`)
	const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(shareData.value.url)}&text=${text}`
	
	// H5环境
	// #ifdef H5
	window.open(telegramUrl, '_blank')
	// #endif
	
	// APP环境
	// #ifdef APP
	plus.runtime.openURL(telegramUrl, (err) => {
		if (err) {
			uni.showToast({
				title: '打开Telegram失败',
				icon: 'none'
			})
			copyInviteLink() // 失败时复制链接
		}
	})
	// #endif
	
	// 记录分享
	recordShare('telegram')
}
// 分享到whatsapp
const shareWhatsappChat = () => {
	 const text = `${shareData.value.title}\n\n${shareData.value.desc}`
	    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text + ' ' + shareData.value.url)}`
	    
	    // H5环境
	    // #ifdef H5
	    window.open(whatsappUrl, '_blank')
	    // #endif
	    
	    // APP环境
	    // #ifdef APP
	    plus.runtime.openURL(whatsappUrl, (err) => {
	        if (err) {
	            uni.showToast({
	                title: '打开WhatsApp失败',
	                icon: 'none'
	            })
	            copyInviteLink() // 失败时复制链接
	        }
	    })
	    // #endif
	    
	    // 记录分享
	    recordShare('whatsapp')
}

// 分享到QQ
const shareToQQ = () => {
	// H5环境
	// #ifdef H5
	const qqUrl = `https://connect.qq.com/widget/shareqq/index.html?url=${encodeURIComponent(shareData.value.url)}&title=${encodeURIComponent(shareData.value.title)}&desc=${encodeURIComponent(shareData.value.desc)}&pics=${encodeURIComponent(shareData.value.image)}`
	window.open(qqUrl, '_blank')
	// #endif
	
	// APP环境
	// #ifdef APP
	uni.share({
		provider: 'qq',
		type: 1,
		title: shareData.value.title,
		summary: shareData.value.desc,
		href: shareData.value.url,
		imageUrl: shareData.value.image,
		success: () => {
			uni.showToast({ title: '分享成功', icon: 'success' })
		},
		fail: (err) => {
			console.log('QQ分享失败:', err)
			uni.showToast({ title: '分享失败', icon: 'none' })
		}
	})
	// #endif
	
	recordShare('qq')
}

// 分享到微信
const shareToWechat = () => {
	// APP环境
	// #ifdef APP
	uni.share({
		provider: 'weixin',
		type: 1,
		title: shareData.value.title,
		summary: shareData.value.desc,
		href: shareData.value.url,
		imageUrl: shareData.value.image,
		success: () => {
			uni.showToast({ title: '分享成功', icon: 'success' })
		},
		fail: (err) => {
			console.log('微信分享失败:', err)
			uni.showToast({ title: '分享失败', icon: 'none' })
		}
	})
	// #endif
	
	// H5环境
	// #ifdef H5
	uni.showToast({
		title: '请使用微信打开分享',
		icon: 'none'
	})
	copyInviteLink()
	// #endif
	
	recordShare('wechat')
}

// 分享到抖音
const shareToDouyin = () => {
	// APP环境
	// #ifdef APP
	uni.share({
		provider: 'douyin',
		type: 1,
		title: shareData.value.title,
		summary: shareData.value.desc,
		href: shareData.value.url,
		imageUrl: shareData.value.image,
		success: () => {
			uni.showToast({ title: '分享成功', icon: 'success' })
		},
		fail: (err) => {
			console.log('抖音分享失败:', err)
			uni.showToast({ title: '分享失败', icon: 'none' })
		}
	})
	// #endif
	
	// H5环境
	// #ifdef H5
	uni.showToast({
		title: '请在抖音APP内分享',
		icon: 'none'
	})
	copyInviteLink()
	// #endif
	
	recordShare('douyin')
}

// 分享到闪聊
const shareToFlashChat = () => {
	// 这里根据闪聊的具体分享API实现
	uni.showToast({
		title: '闪聊分享功能',
		icon: 'none'
	})
	recordShare('flash_chat')
}

// 复制分享链接
const copyInviteLink = () => {
	uni.setClipboardData({
		data: '我正在66吃瓜网观看《'+detailTitle.value+'》，快来一起看！点击：' + inviteUrl.value,
		success: () => {
			uni.showToast({
				title: '复制成功',
				icon: 'success'
			});
			recordShare('copy_link')
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

// 生成海报
const generatePoster = () => {
	uni.showToast({
		title: '生成海报功能',
		icon: 'none'
	})
	// 这里可以实现海报生成逻辑
	recordShare('poster')
}

// 记录分享行为
const recordShare = async (platform) => {
	try {
		await apiShareRecord({
			content_id: props.detailData?.id,
			share_platform: platform,
			share_time: new Date().getTime()
		})
		console.log(`分享到${platform}记录成功`)
	} catch (error) {
		console.error('记录分享失败:', error)
	}
}
</script>

<style scoped>
/* 保持你原有的样式不变 */
.share {
	padding: 20rpx 30rpx;
}

.share_t {
	display: flex;
	align-items: center;
	margin-bottom: 30rpx;
	color: #BBBBBB;
	font-size: 28rpx;
}

.share_item {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
}

.s_i {
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-bottom: 30rpx;
	width: 20%;
}

.s_i_wrap {
	width: 80rpx;
	height: 80rpx;
	border-radius: 50%;
	background: #f8f8f8;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-bottom: 10rpx;
}

.s_img {
	height: 40rpx;
	width: auto;
}

.s_i_txt {
	font-size: 24rpx;
	color: #666;
}
</style>

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

</style>