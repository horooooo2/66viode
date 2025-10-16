<template>
	<view class="surplus" @click="toPath('/pages/points/index')">
		<text>{{ userInfo.points }}</text>
		<image class="icon-add" src="/static/images/icon-add.png" mode=""></image>
	</view>
</template>

<script setup>
import { computed } from 'vue';
import { useUserStore } from '@/store/user'
const userStore = useUserStore()

const userInfo = computed(() => userStore.userData || {})
const toPath = (path) => {
  uni.navigateTo({
    url: path
  })
}
</script>


<style lang="scss" scoped>
	.surplus {
		width: 208rpx;
		padding: 16rpx 18rpx;
		display: flex;
		align-items: center;
		gap: 46rpx;
		border-radius: 32rpx;
		border: 2rpx solid #DE21D4;
		background: #1C1C1C;
		box-sizing: border-box;

		.icon-add {
			width: 28rpx;
			height: 28rpx;
		}

		text {
			min-width: 0;
			flex: 1;
			font-size: 26rpx;
			color: #fff;
			font-weight: 700;
		}
	}
</style>