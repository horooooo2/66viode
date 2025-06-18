<template>
	<view class="search">
		<uni-search-bar placeholder="自定义背景色" bgColor="#202020" textColor="#fff" @confirm="search" />
	</view>
</template>

<script setup>
	
const search=(res) =>{
	uni.showToast({
		title: '搜索：' + res.value,
		icon: 'none'
	})
}

</script>

<style lang="scss" scoped>
	.search{
		background: #111;
		color: #fff;
		:deep(){
			.uni-searchbar__cancel{
				color: #fff;
			}
		}
	}
</style>