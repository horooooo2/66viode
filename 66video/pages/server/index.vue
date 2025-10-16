<template>
	<view class="address">
		<NavBar title="用户服务协议" fallbackUrl='/pages/points/index'></NavBar>
	</view>
</template>

<script>
	import NavBar from '@/components/NavBar/index.vue'
	export default {
		components: {
			NavBar
		},
		data() {
			return {
			}
		},
		onShow() {
			
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	.address {
		width: 100%;
		background-color: #101010;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}
</style>