<template>
	<view class="critique">
		<view class="critique_t">
			评论 <text>{{ commentList.length }}</text>
		</view>
		<view class="critique_cont">
			<view class="c_item" v-for="(item, index) in commentList" :key="index">
				<view class="c_name">{{ item.user.nickname }}</view>
				<view class="c_cont">{{ item.content }}</view>
				<view class="c_time">{{ item.created_at }} 评论</view>
			</view>
			<!-- <view class="c_item">
				<view class="c_name">ss名字</view>
				<view class="c_cont">内容内容内容</view>
				<view class="c_time">2025年5月10日 12:55 评论</view>
			</view> -->
		</view>
		<view class="c_send">
			<input class="uni-input" @input="onKeyInput" placeholder="说点什么吧..." />
		</view>
		<view class="c_btn">
			<button class="btn share_btn">分享你的作品</button>
			<button class="btn send_btn">发送评论</button>
			<!-- <button class="btn send_btn">登录</button> -->
		</view>
	</view>
</template>

<script setup>
import { ref, reactive, defineEmits, defineProps,onMounted } from 'vue'
import {
  apiGetComments
} from "@/common/api/content.js";
const props = defineProps({
  detailData: {
	type: Object,
	default: () => ({})
  }
})
const commentList = ref([]);
const onKeyInput = (e) => {
  console.log("输入内容：", e.target.value);
};
const getComments = async () => {
	let params = {
		content_id: props.detailData.id,
		content_type: props.detailData.type || '',
		page: 1,
		size: 10,
	}
  const res = await apiGetComments(params);
  if (res.code === 0) {
	commentList.value = res?.data?.list || [];
  } else {
	uni.showToast({
	  title: res.msg || "获取评论失败",
	  icon: "none",
	});
  }
};

onMounted(() => {
  getComments();
});

</script>

<style lang="scss"scoped>
	.critique{
		margin-top: 20rpx;
		padding: 20rpx;
		background: #191919;
		color: #fff;
		border-top-left-radius: 12rpx;
		border-top-right-radius: 12rpx;
		.critique_t{
			font-size: 24rpx;
			margin-bottom: 10rpx;
		}
		.critique_cont{
			max-height: 600rpx;
			overflow: auto;
		}
		.c_item{
			padding: 20rpx 0;
			border-bottom: 1px solid #202020;
			.c_name{
				font-size: 23rpx;
				color: #FF1A8C;
			}
			.c_cont{
				margin-top: 10rpx;
				font-size: 24rpx;
			}
			.c_time{
				margin-top: 20rpx;
				font-size: 18rpx;
				color: #888888;
			}
		}
		.c_send{
			margin-top: 40rpx;
			border-radius: 36rpx;
			background: #101010;
			padding: 20rpx;
			input{
				font-size: 24rpx;
			}
		}
		.c_btn{
			margin-top: 40rpx;
			display: flex;
			justify-content: space-between;
			.share_btn{
				width: 45%;
				border-radius: 16rpx;
				color: #FF1A8C;
				font-size: 25rpx;
				border: 1px solid #FF1A8C;
				background: transparent;
			}
			.send_btn{
				width: 45%;
				font-size: 25rpx;
				border-radius: 16rpx;
				color: #fff;
				background: linear-gradient(270deg, #D018F5 0%, #FA3296 100%);
			}
		}
	}
	
</style>