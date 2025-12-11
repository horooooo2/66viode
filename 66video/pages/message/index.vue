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
				@click="readDetail(item)"
	        >
	            <!-- 左侧标签 -->
	            <view class="message-left">
	                <view class="message-type" :class="getTypeClass(item.notice_type)">
	                    {{ getTypeText(item.notice_type) }}
	                </view>
	            </view>
	            
	            <!-- 右侧内容区域 -->
	            <view class="message-right">
	                <view class="message-content">
	                    <text class="message-text">{{ getPlainText(item.content) }}</text>
	                </view>
	                <view class="message-footer">
	                    <text class="message-time">{{ formatTime(item.publish_time) }}</text>
						<text style="margin-left: 20rpx;color: #FF1A8C;font-size: 22rpx;" v-if="!item.is_read">未读</text>
						<text style="margin-left: 20rpx;color: #666;font-size: 22rpx;" v-else>已读</text>
	                </view>
	            </view>
	        </view>
	    </view>
	</view>
</template>

<script>
	import NavBar from '@/components/NavBar/index.vue'
	import {
		apiNoticeList,
		apiNoticeRead
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
			async readDetail(item) {
				try {
					let params = {
						id: item.id
					}
					const { data } = await apiNoticeRead(params);
					console.log(data)
				} catch (error) {
					console.error(error)
				}
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
        background: #1A1A1A;
        border-radius: 16rpx;
        padding: 30rpx;
        margin-bottom: 20rpx;
        display: flex;
        align-items: flex-start;
        gap: 24rpx;
    }

    // 左侧标签区域
    .message-left {
        flex-shrink: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 16rpx;
    }

    .message-type {
        font-size: 24rpx;
        color: #fff;
        font-weight: 500;
        border-radius: 10rpx;
        background: linear-gradient(270deg, #D018F5 0%, #FA3296 100%);
		width: 100rpx;
		height: 100rpx;
		text-align: center;
		line-height: 100rpx;
        white-space: nowrap;
        
        // 第二种类型样式
        &.message-type2 {
            background: var(--Orange, #F29644);
        }
    }

    // 右侧内容区域
    .message-right {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 12rpx;
        min-width: 0; // 防止内容溢出
    }

    .message-content {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 16rpx;
    }

    .message-text {
        font-size: 30rpx;
        color: #DDD;
        line-height: 1.5;
        flex: 1;
        // 文字超出显示省略号
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    // 未读红点
    .unread-dot {
        width: 16rpx;
        height: 16rpx;
        background: #FF4757;
        border-radius: 50%;
        flex-shrink: 0;
        margin-top: 8rpx;
    }

    .message-footer {
        text-align: left;
    }

    .message-time {
        font-size: 24rpx;
        color: #999;
    }
}
</style>