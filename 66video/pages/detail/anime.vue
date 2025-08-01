<template>
	<view class="d_box">
		<view class="d_bg"></view>
		<view class="leftIcon">
			<!-- <svg t="1748358950839" fill="currentColor" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1460" width="26" height="26"><path d="M723.4 851L382.7 510.2 723.1 169c14.6-14.6 14.6-38.5 0-53.1-14.6-14.6-38.4-14.6-53 0L306.8 480c-1.4 1-2.7 2.2-3.9 3.4-7.4 7.4-11 17.1-10.9 26.8-0.1 9.7 3.6 19.5 10.9 26.8 1.4 1.4 2.8 2.6 4.3 3.7L670.4 904c14.6 14.6 38.4 14.6 53 0 14.6-14.5 14.6-38.4 0-53z" p-id="1461"></path></svg> -->
			<uni-icons type="left" size="26" color="#fff" @click="goBack()"></uni-icons>
		</view>
		<view class="anime_detail">
			<view class="video-box">
				<videoDom />
				<view class="video-title">标题，爱是自由意志的沦陷，你无法通过意志控制自己不要去爱。主观的感受却是客观存在，不以不以不...</view>
				<view class="video-label">
					<view class="video-label-info">11.2W 观看 一年前</view>
					<view class="video-label-item">
						<view class="text">#真挚</view>
						<view class="text">#真挚</view>
						<view class="text">#真挚</view>
					</view>
				</view>
			</view>
			<view class="d_cont"> 
				<view class="d_img">
					<image class="d_img_item" mode="aspectFill" src="/static/images/detail/img.png"></image>
				</view>
				<view class="d_works">
					<view class="d_name">名称</view>
					<view class="d_time">
						<text>SVIP</text>
						<text>推荐阅读 </text>
						<text>更新于 2025-05-10</text>
					</view>
					<view class="d_profile">忘掉安全感，到你所害怕的地方生活。摧毁你的名声，作一个名声狼藉，却内心真城的人。</view>
				</view>
			</view>
			<view class="labels">
				<text class="labels_i">#纯爱</text>
				<text class="labels_i">#纯爱</text>
				<text class="labels_i">#纯爱</text>
			</view>
		
			<Like />
			<List />
			<Recommend />
			<Share />
			<Sponsor />
			<Critique />
		</view>
	</view>
		
</template>

<script setup>
import { ref, defineEmits, defineProps, watchEffect,onMounted } from 'vue'
import videoDom from '../video/index.vue'
import Like from './components/like.vue'
import Share from './components/share.vue'
import Sponsor from './components/sponsor.vue'
import Critique from './components/critique.vue'
import List from './components/list.vue'
import Recommend from './components/recommend.vue'
const strings = ref('<div><p>富文本数据......</p></div>');


onMounted(() => {

})

const setUser = ()=>{
	store.user.setUser({name:9999});
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
	height: 242px;
	background: url(/static/images/detail/img.png) no-repeat 100%;
	filter: blur(20px);

}
.leftIcon{
	position: fixed;
	top: 0;
	left: 0;
	z-index: 9;
	width: 100%;
	height: 80rpx;
	padding-left: 20rpx;
	display: flex;
	align-items: center;
	color: #fff;
}
.anime_detail{
	position: relative;
	padding: 120rpx 20rpx 20rpx 20rpx;
	color: #fff;
	.d_cont{
		display: flex;
		.d_img{
			width: 32%;
			height: 340rpx;
			.d_img_item{
				width: 100%;
				height: 100%;
				border-radius: 18rpx;
			}
		}
		.d_works{
			flex: 1;
			color: #fff;
			padding-left: 20rpx;
			.d_name{
				margin-top: 30rpx;
				font-size: 32rpx;
			}
			.d_time{
				margin-top: 40rpx;
				font-size: 21rpx;
				color: #ccc;
			}
			.d_profile{
				margin-top: 25rpx;
				font-size: 25rpx;
				color: #ccc;
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
		font-size: 28rpx;
		line-height: 40rpx;
		color: #ddd;
	}
	.video-label {
		margin-top: 16rpx;
		display: flex;
		align-items: center;
		&-info {
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
			gap: 8px;
		}
	}
}



</style>