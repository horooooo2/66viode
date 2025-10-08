<template>
	<view class="sponsor">
		<view class="sponsor_t">
			赞助
		</view>
		<view class="sponsor_item">
			<view class="s_i" v-for="(item, index) in dataList" :key="index" @click="onClick(item.link)">
				<image class="s_img" mode="heightFix" :src="item.icon"></image>
				<view class="s_i_txt">{{ item.name }}</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { ref, onMounted } from 'vue'
	import { apiSponsor } from '@/common/api/content.js'
	
	const dataList = ref([])
	
	onMounted(() => {
		getSponsorData();
	})
	
	const getSponsorData = async () => {
		let res = await apiSponsor()
		if (res.code === 0 && res.data) {
			dataList.value = res.data
		}
	}
	
	const onClick = (url) => {
		location.href = url
	}
</script>

<style lang="scss"scoped>
	.sponsor{
		margin-top: 30rpx;
		color: #fff;
		.sponsor_t{
			font-size: 24rpx;
		}
		.sponsor_item{
			margin-top: 30rpx;
			padding: 10rpx 10rpx 10rpx 10rpx;
			background: #191919;
			border-radius: 12rpx;
			display: flex;
			// justify-content: space-between;
			flex-wrap: wrap;
			gap: 40rpx;
			.s_i{
				width: 120rpx;
				padding: 10rpx 2rpx;
				display: flex;
				flex-flow: column;
				justify-content: center;
				align-items: center;
			}
			.s_img{
				width: 70rpx;
				height: 70rpx;
			}
			.s_i_txt{
				font-size: 22rpx;
				margin-top: 8rpx;
				text-align: center;
			}
		}
	}
	
</style>