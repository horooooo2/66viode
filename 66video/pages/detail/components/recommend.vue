<template>
	<view class="recommend_title">
		猜你喜欢
	</view>
	<view class="recommend">
		<view class="recommend_item" v-for="(item, index) in guessList" :key="index">
			<image class="recommend_img" mode="aspectFill" :src="item.pc_image"></image>
			<view class="recommend_count">
				<uni-icons type="eye" size="12" color="#fff"></uni-icons>
				<text>{{ item.view_count }}</text>
			</view>
			<view class="recommend_name">{{ item.title }}</view>
		</view>
	</view>

</template>

<script setup>
	import { ref, defineProps, onMounted } from 'vue'
	import { apiGuess } from '@/common/api/content.js'
	const props = defineProps({
		detailData: {
			type: Object,
			default: () => ({})
		}
	})
	
	const guessList = ref([])
	
	onMounted(() => {
		getGuess();
	})
	
	const getGuess = async () => {
		let res = await apiGuess({ module: props.detailData.type, limit: 3 })
		if (res.code === 0 && res.data) {
			guessList.value = res.data
		}
	}
</script>

<style lang="scss" scoped>
	.recommend_title {
		margin-top: 40rpx;
		color: #fff;
		font-size: 24rpx;
	}

	.recommend {
		margin-top: 22rpx;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 20rpx;
		// justify-content: space-around;

		.recommend_item {
			width: 100%;
			position: relative;

		}

		.recommend_img {
			width: 100%;
			height: 300rpx;
			border-radius: 18rpx;
		}

		.recommend_count {
			position: absolute;
			left: 10rpx;
			bottom: 50rpx;
			font-size: 20rpx;
		}

		.recommend_name {
			font-size: 22rpx;
			padding: 0rpx 4rpx;
			text-overflow: ellipsis;
			overflow: hidden;
			white-space: nowrap;
		}
	}
</style>