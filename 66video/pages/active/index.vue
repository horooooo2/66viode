<template>
	<div>
		aaa
		<button @click="goLogin">登录</button>
		<button @click="zc">注册</button>
		<button @click="xq">详情</button>
		<button @click="xqxs">详情小说动漫</button>
		<button @click="search">搜索</button>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				
			}
		},
		methods:{
			goLogin(){
				uni.navigateTo({
					url: '/pages/login/index'
				});
			},
			zc(){
				uni.navigateTo({
					url: '/pages/login/index?type=2'
				});
			},
			xq(){
				uni.navigateTo({
					url: '/pages/detail/index'
				});
			},
			xqxs(){
				uni.navigateTo({
					url: '/pages/detail/anime'
				});
			},
			search(){
				uni.navigateTo({
					url: '/pages/search/index'
				});
			},
		}
	}
</script>

<style>
</style>