<template>
	<view class="setting">
		<view class="status_bar"></view>
		<NavBar title="消息通知"></NavBar>
		<view class="message-list">
			<view 
				class="message-item" 
				v-for="item in messageList" 
				:key="item.id"
				:class="{ unread: !item.is_read }"
				@click="showMessageDetail(item)"
			>
				<view class="message-header">
					<text class="message-type" :class="getTypeClass(item.notice_type)">
						{{ getTypeText(item.notice_type) }}
					</text>
					<view v-if="!item.is_read" class="unread-dot"></view>
				</view>
				<view class="message-content">
					<text class="message-text">{{ getPlainText(item.title) }}</text>
				</view>
				<view class="message-footer">
					<text class="message-time">{{ formatTime(item.publish_time) }}</text>
				</view>
			</view>
		</view>

		<!-- 消息详情弹窗 -->
		<uni-popup ref="detailPopup" type="center" background-color="rgba(0,0,0,0.5)">
			<view class="detail-popup">
				<view class="popup-header">
					<text class="popup-title">{{ currentMessage.title }}</text>
				</view>
				<scroll-view class="popup-content" scroll-y>
					<rich-text style="color: #fff;white-space: normal;" :nodes="currentMessage.content"></rich-text>
				</scroll-view>
				<view class="popup-footer">
					<text class="popup-time">{{ formatTime(currentMessage.publish_time) }}</text>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import NavBar from '@/components/NavBar/index.vue'
	import {
		apiNoticeList
	} from "@/common/api/user.js";
	export default {
		components: {
			NavBar
		},
		data() {
			return {
				messageList: [],
				currentMessage: {
					title: '',
					content: '',
					publish_time: ''
				}
			}
		},
		onShow() {
			this.getNoticeList();
		},
		methods: {
			toLink(url) {
				uni.navigateTo({
					url
				})
			},
			async getNoticeList() {
				try {
					const { data } = await apiNoticeList();
					console.log('消息列表:', data)
					if (data && data.list) {
						this.messageList = data.list;
					}
				} catch (error) {
					console.error('获取消息列表失败:', error)
				}
			},
			
			// 显示消息详情
			showMessageDetail(item) {
				this.currentMessage = {
					title: item.title,
					content: item.content,
					publish_time: item.publish_time
				}
				this.$refs.detailPopup.open();
			},
			
			// 关闭详情弹窗
			closeDetail() {
				this.$refs.detailPopup.close();
			},
			
			// 根据 notice_type 返回对应的样式类名
			getTypeClass(type) {
				const typeMap = {
					1: 'message-type1', // 系统
					2: 'message-type2'  // 活动
				}
				return typeMap[type] || 'message-type1'
			},
			
			// 根据 notice_type 返回对应的文本
			getTypeText(type) {
				const textMap = {
					1: '系统',
					2: '活动'
				}
				return textMap[type] || '通知'
			},
			
			// 去除 HTML 标签，获取纯文本内容
			getPlainText(html) {
				if (!html) return ''
				return html.replace(/<[^>]+>/g, '').trim()
			},
			
			// 格式化时间，只显示日期
			formatTime(time) {
				if (!time) return ''
				return time.split(' ')[0] // 只取日期部分
			}
		}
	}
</script>

<style lang="scss" scoped>
	.setting {
		width: 100%;
		background-color: #101010;
		min-height: 100vh;
		display: flex;
		flex-direction: column;

		.message-list {
			padding: 30rpx;
		}

		.message-item {
			border-radius: 12rpx;
			padding: 30rpx;
			margin-bottom: 20rpx;
		}

		.message-header {
			margin-bottom: 20rpx;
		}

		.message-type {
			font-size: 28rpx;
			color: #fff;
			font-weight: 500;
			border-radius: 10px;
			background: var(--_, linear-gradient(270deg, #D018F5 0%, #FA3296 100%));
			padding: 10rpx 20rpx;
		}

		.message-type2 {
			font-size: 28rpx;
			color: #fff;
			font-weight: 500;
			border-radius: 10px;
			background: var(--Orange, #F29644);
			padding: 10rpx 20rpx;
		}

		.message-content {
			margin-bottom: 20rpx;
		}

		.message-text {
			font-size: 30rpx;
			color: #DDD;
			line-height: 1.5;
		}

		.message-footer {
			text-align: right;
		}

		.message-time {
			font-size: 24rpx;
			color: #999;
		}
		.popup-header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 30rpx;
			border-bottom: 1rpx solid #f0f0f0;
		}
		
		.popup-title {
			font-size: 32rpx;
			font-weight: bold;
			color: #fff;
			flex: 1;
		}
		
		.popup-close {
			font-size: 40rpx;
			color: #999;
			width: 60rpx;
			height: 60rpx;
			text-align: center;
			line-height: 60rpx;
		}
		
		.popup-content {
			max-height: 60vh;
			padding: 30rpx;
		}
		
		.popup-footer {
			padding: 20rpx 30rpx;
			border-top: 1rpx solid #f0f0f0;
			text-align: right;
		}
		
		.popup-time {
			font-size: 24rpx;
			color: #999;
		}
	}
</style>