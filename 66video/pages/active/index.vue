<template>
	<div>
		aaa
		<button @click="goLogin">登录</button>
		<button @click="zc">注册</button>
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
			}
		}
	}
</script>

<style>
</style>