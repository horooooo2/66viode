<template>
	<view class="d_box" v-if="detailData.id  && detailData.data">
		<view class="d_bg" :style="{background: `url(${detailData.data.pc_image || detailData.data.mobile_image}) no-repeat 100%`}"></view>
		<view class="leftIcon">
			<uni-icons type="left" size="26" color="#fff" @click="goBack()"></uni-icons>
		</view>
		<view class="anime_detail">
			<view class="video-box" v-if="detailData.type === 'video'">
				<videoDom :detailData="detailData" />
				<view class="video-title">{{detailData.data.title || ''}}</view>
				<view class="video-label">
					<!-- <view class="video-label-info">11.2W 观看 一年前</view> -->
					<view class="video-label-info">{{ detailData?.data?.updated_at?.split(" ")?.[0] }}</view>
					<view class="video-label-item">
						<view class="text" v-for="val in detailData.data.hash_tags" :key="val">#{{ val }}</view>
					</view>
				</view>
			</view>
			<view v-if="detailData.type !== 'video'">
				<view class="d_cont"> 
					<view class="d_img">
						<image class="d_img_item" mode="aspectFill" :src="detailData.data.pc_image || detailData.data.mobile_image"></image>
					</view>
					<view class="d_works">
						<view class="d_name">{{ detailData.data.title }}</view>
						<view class="d_time">
							<text>SVIP</text>
							<text>推荐阅读 </text>
							<text>更新于 {{ detailData.data?.updated_at?.split(" ")?.[0] || '未知时间' }}</text>
						</view>
						<view class="d_profile">{{ detailData.data.description || '暂无简介' }}</view>
					</view>
				</view>
				<view class="labels">
					<text class="labels_i">#纯爱</text>
					<text class="labels_i">#纯爱</text>
					<text class="labels_i">#纯爱</text>
				</view>
			</view>
		
			<Like :detailData="detailData" @getDetail="getDetail" />
			<List :detailData="detailData" v-if="detailData.type !== 'video'" />
			<Recommend :detailData="detailData" />
			<Share />
			<Sponsor />
			<Critique :detailData="detailData"/>
		</view>
	</view>
		
</template>

<script setup>
import { ref, reactive, defineEmits, defineProps, watchEffect,onMounted } from 'vue'
import videoDom from '../video/index.vue'
import Like from './components/like.vue'
import Share from './components/share.vue'
import Sponsor from './components/sponsor.vue'
import Critique from './components/critique.vue'
import List from './components/list.vue'
import Recommend from './components/recommend.vue'
import { onLoad } from '@dcloudio/uni-app'
import { apiGetImageDetail,apiGetImageChapters,apiGetNovelDetail,apiGetNovelChapters,apiGetVideoDetail } from '@/common/api/content.js'

const detailData = reactive({
	id: '',
	type: '', // video, image, novel
	data: null
})
onMounted(() => {

})

onLoad((options)=>{
	console.log('onload options=',options);
	if(options.id){
		detailData.id = options.id;
		detailData.type = options.type || '';
		getDetail();
	}
})


const getDetail = async () => {
	let res = {};
	if(detailData.type === 'video'){
		res = await apiGetVideoDetail({id: detailData.id, loading: true});
	} else if(detailData.type === 'image'){
		res = await apiGetImageDetail({id: detailData.id, loading: true});
	} else if(detailData.type === 'novel'){
		res = await apiGetNovelDetail({id: detailData.id, loading: true});
	}
	if(res.code === 0 && res.data){
		detailData.data = res.data;
	}
}


const goBack=()=>{
	uni.navigateBack();
}


</script>
<style lang="scss" scoped>
.d_box{
	background: #111;
}
.d_bg{
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 450rpx;
	filter: blur(29px);
}
.leftIcon{
	// position: fixed;
	// top: 0;
	// left: 0;
	// z-index: 9;
	position: relative;
	z-index: 9;
	width: 100%;
	height: 90rpx;
	padding-left: 20rpx;
	display: flex;
	align-items: center;
	color: #fff;
}
.anime_detail{
	position: relative;
	padding: 20rpx 20rpx 20rpx 20rpx;
	color: #fff;
	.d_cont{
		display: flex;
		.d_img{
			flex: 1;
			height: 340rpx;
			.d_img_item{
				width: 100%;
				height: 100%;
				border-radius: 18rpx;
			}
		}
		.d_works{
			width: 68%;
			color: #fff;
			padding-left: 20rpx;
			.d_name{
				margin-top: 30rpx;
				font-size: 34rpx;
				text-overflow: ellipsis;
				overflow: hidden;
				white-space: nowrap;
			}
			.d_time{
				margin-top: 40rpx;
				font-size: 21rpx;
				color: #fff;
			}
			.d_profile{
				margin-top: 25rpx;
				font-size: 24rpx;
				color: #fff;
			}
		}
	}
	
	.labels{
		margin-top: 20rpx;
		color: #999;
		font-size: 21rpx;
		.labels_i{
			margin-right: 20rpx;
		}
	}
}

.video-box {
	width: 100%;
	.video-title {
		margin-top: 15rpx;
		font-size: 28rpx;
		line-height: 40rpx;
		color: #ddd;
	}
	.video-label {
		margin-top: 20rpx;
		display: flex;
		align-items: center;
		&-info {
			position: relative;
			top: 1rpx;
			font-size: 24rpx;
			color: #999;
			font-weight: 400;
			
		}
		&-item {
			display: flex;
			align-items: center;
			color: #DB7FDB;
			font-size: 24rpx;
			font-weight: 400;
			margin-left: 10rpx;
			gap: 8px;
			// .text {
			// 	margin-right: 8rpx;
			// }
		}
	}
}



</style>