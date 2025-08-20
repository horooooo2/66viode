<template>
	<view class="like">
		<view class="like_item" :class="isLiked ? 'liek_item_actvie' : '' " @click="toogleLike">
			<uni-icons type="heart" size="16" :color="isLiked?'#FF1A8C':'#BBBBBB'"></uni-icons>
			<text>{{detailData.data.like_count || '0'}}喜欢</text>
		</view>
		<view class="like_item">
			<uni-icons type="eye" size="16" color="#BBBBBB"></uni-icons>
			<text>{{detailData.data.view_count || '0'}} {{ detailData.type == 'video'? '观看':'阅读' }}</text>
		</view>
		<view class="like_item">
			<uni-icons type="chat" size="16" color="#BBBBBB"></uni-icons>
			<text>{{detailData.data.comment_count || '0'}}评论</text>
		</view>
	</view>
</template>

<script setup>
import { ref, reactive, defineEmits, defineProps, watchEffect, onMounted, computed } from 'vue'
import {
  apiGetLikeList,apiAddLike,apiRemoveLike
} from "@/common/api/content.js";
import { useUserStore } from '@/store/user'

const userStore = useUserStore()

const emmits = defineEmits(['getDetail']);
const props = defineProps({
	detailData: {
		type: Object,
		default: () => ({})
	}
})

const likeList = ref([]);

onMounted(() => {
	getLikeList();
})

const isLiked = computed(() => {
	if (!userStore.isLogin) return false;
	if (!props.detailData.data || !props.detailData.data.id) return false;
	return likeList.value.some(val=>val.content_id == props.detailData.data.id) || false;
});


const getLikeList = async()=>{
	if(!userStore.isLogin) return;
	let res = await apiGetLikeList({
		content_type: props.detailData.type || '',
		page: 1,
		limit: 999,
	});
	if (res.code === 0) {
		likeList.value = res?.data?.list || [];
	} else {
		uni.showToast({
			title: res.msg || "获取喜欢列表失败",
			icon: "none"
		});
	}
}

const toogleLike = async () => {
	if(!userStore.isLogin) {
		goLogin();
		uni.showToast({
			title: '请先登录',
			icon: 'none'
		});
		return;
	};
	console.log('isLiked=', isLiked.value);
	
	if (isLiked.value) {
		// 取消点赞
		const ids = likeList.value.filter(val => val.content_id == props.detailData.data.id).map(val => val.id);
		const res = await apiRemoveLike({
			ids: ids.join(','),
		});
		if (res.code === 0) {
			emmits('getDetail');
			getLikeList();
		} else {
			uni.showToast({
				title: res.msg || "取消点赞失败",
				icon: "none"
			});
		}
	} else {
		// 点赞
		const res = await apiAddLike({
			content_id: props.detailData.data.id,
			content_type: props.detailData.type || ''
		});
		if (res.code === 0) {
			emmits('getDetail');
			getLikeList();
		} else {
			uni.showToast({
				title: res.msg || "点赞失败",
				icon: "none"
			});
		}
	}
};

const goLogin = () => {
  uni.navigateTo({
	url: '/pages/login/index'
  });
};

</script>

<style lang="scss"scoped>
	.like{
		margin-top: 20rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 24rpx;
		.like_item{
			width: 32%;
			height: 60rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: 10rpx;
			background: #202020;
			color: #BBBBBB;
			.uni-icons{
				margin-right: 6rpx;
				height: 17px;
			}
			
		}
		.liek_item_actvie{
			color: #FF1A8C;
		}
	}
	
</style>