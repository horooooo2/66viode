<template>
	<view class="list1">
		<view class="title">{{title}} <text class="count" space="ensp"> {{count}}</text></view>
		
		<view>
			<view class="list_item" v-for="val in (listActive == 'all' ? listData.slice(0,5) : listData)" :key="val.title" @click="toLink(val.module,val.id)">
				<view class="img_box">
					<image class="img_item" mode="aspectFill" :src="val.mobile_image || val.pc_image"></image>
				</view>
				<view class="list_cont">
					<view>
						<text class="list_title" v-highlight="keyword">{{val.title}}</text>
						<view class="list_jianjie">{{val.jianjie}}</view>
					</view>
					
					<!-- <view>
						<view class="list_type"> {{val.type}} </view>
						<view class="list_status">{{val.status}}</view>
					</view> -->
					
				</view>
			</view>
		</view>
		<view class="more" v-if="listData.length>0 && listActive==='all'" @click="emit('change','listActive',listData[0].module)">
			<uni-icons class="search_icons" type="search" size="24rpx" color="#804060"></uni-icons>
			<view>更多{{title}}</view>
		</view>
		
	</view>
	
</template>

<script setup>
	import {ref,reactive,defineProps,defineEmits,onMounted,watchEffect} from 'vue';
	const props = defineProps({
		keyword: {
			type: String,
			default: ''
		},
		title: {
			type: String,
			default: ''
		},
		count: {
			type: String,
			default: ''
		},
		listActive: {
			type: String,
			default: 'all'
		},
		listData:{
			type: Object,
			default: [
				{img:'/static/images/detail/img.png',name:'狐妖小红娘',jianjie:'简介简介简介简介简介简介简介简介简介简介',type:'剧情 小说',status:'连载中'},
				{img:'/static/images/detail/img.png',name:'狐妖小红娘',jianjie:'简介简介简介简介简介简介简介简介简介简介',type:'剧情 小说',status:'连载中'},
				{img:'/static/images/detail/img.png',name:'狐妖小红娘',jianjie:'简介简介简介简介简介简介简介简介简介简介',type:'剧情 小说',status:'连载中'},
			]
		}
	})
	const emit = defineEmits(["change"]);
	onMounted(()=>{
		console.log('props==',props.keyword)
	})
	const toLink = (type, id) => {
		let url = '';
		if (type === 'video' || type === 'image' || type === 'novel') {
			url = `/pages/detail/anime?id=${id}&type=${type}`;
		}  else if(type==='article'){
			url = `/pages/detail/article?id=${id}`;
		}

		if (!url) return;
		uni.navigateTo({
			url: url
		})
	}
	
</script>

<style lang="scss" scoped>
	.list1{
		margin-top: 30rpx;
		.title{
			font-size: 22rpx;
			padding-bottom: 6rpx;
		}
		.count{
			font-size: 22rpx;
			color: #999;
		}
		.list_item{
			display: flex;
			margin-top: 20rpx;
			.img_box{
				width: 20%;
				height: 220rpx;
				.img_item{
					width: 100%;
					height: 100%;
					border-radius: 18rpx;
				}
			}
			.list_cont{
				flex: 1;
				color: #fff;
				padding-left: 20rpx;
				font-size: 22rpx;
				display: flex;
				flex-flow: column;
				justify-content: space-around;
			}
			.list_title{
				font-size: 26rpx;
			}
			.list_jianjie{
				margin-top: 4rpx;
				color: #aaa;
			}
			.list_type{
				margin-top: 30rpx;
				color: #999;
			}
			.list_status{
				margin-top: 4rpx;
				color: #666;
			}
		}
		.more{
			display: flex;
			align-items: center;
			align-content: center;
			color: #804060;
			font-size: 22rpx;
			margin-top: 25rpx;
			.search_icons{
				margin-right: 15rpx;
				position: relative;
				top: 2rpx;
			}
		}
	}
	
</style>