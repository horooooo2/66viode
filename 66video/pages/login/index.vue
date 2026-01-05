<template>
	<view class="page_bg">
		<view class="status_bar"></view>
		<!-- <button @click="back">返回</button> -->
		<uni-icons class="close" @click="back" type="closeempty" size="18" color="#fff"></uni-icons>
		
		<view class="title">黑料</view>
		<view class="no18">
			<image class="no18_img" mode="widthFix" src="/static/images/login/no18.png"></image>
			未满18岁禁止打开
		</view>
		<view class="login_title">{{ isType == 'Register' ?'注册账户':'账户登录' }}</view>
		
		<component :is="isType" />
		
		<view class="changeType" @click="changeType">
			{{ isType == registerType ?'已有账号？立即登录':'没有账号？立即注册' }}
			<uni-icons class="right_arrow" type="right" size="14" color="#DB7FDB"></uni-icons>
		</view>
		
		<view class="_kf" @click="toService">
			<uni-icons type="headphones" size="16" color="#777"></uni-icons>
			联系我们
		</view>
	</view>
</template>

<script >
	// import {reactive, defineAsyncComponent,markRaw} from 'vue';
	// import { onLoad } from '@dcloudio/uni-app'
	
	// onLoad(options) {
	// 	console.log(options.type)
	// }
	
	// const currentComponents = reactive({
	//       1: markRaw(
	//         defineAsyncComponent(() => import("./login.vue"))
	//       ),
	//       2: markRaw(
	//         defineAsyncComponent(() => import("./register.vue"))
	//       ),
	//     });
	
	
	import Login from './login.vue'
	import Register from './register.vue'
	import RegisterEmail from './registerEmail.vue'
	export default{
		components: { Login, Register, RegisterEmail },
		data(){
			return {
				isType: 'Login',
				registerType: 'Register'
			}
		},
		onLoad(options) {
			if(uni.getStorageSync('registerType') == 'email') {
				this.registerType = 'RegisterEmail'
			}
			console.log(options.type)
			this.isType = options.type == 2 ? this.registerType : 'Login';
		},
		methods:{
			toService(){
				window.open(uni.getStorageSync('serviceUrl') || '')
			},
			back(){
				// uni.navigateBack();
				// uni.navigateTo({
				// 	url: '/pages/home/index'
				// });
				uni.navigateTo({
					url: '/pages/eat/index'
				});
			},
			changeType(){
				// uni.navigateTo({
				// 	url: '/pages/login/index?type=2'
				// });
				this.isType = this.isType == this.registerType ? 'login': this.registerType
			},
		}
	}
	
</script>

<style lang="scss" scoped>
	.page_bg{
		position: relative;
		background:  linear-gradient(to bottom, transparent, #111 500rpx),  linear-gradient(to right, #cd12d9 20%, #a83535);
            /* radial-gradient(90% 300px at left top ,#D81EE4, transparent), */
            /* radial-gradient(60% 300px at right top ,#ff5050, transparent); */
		/* backdrop-filter: blur(8px); */
        backdrop-filter: saturate(50%) blur(8px);
		height: auto;
		min-height: 100vh;
		.close{
			position: absolute;
			left: 40rpx;
			top: 70rpx;
		}
		.title{
			font-size: 90rpx;
			font-weight: 600;
			padding-top: 150rpx;
			text-align: center;
			color: #fff;
		}
		.no18{
			margin-top: 30rpx;
			font-size: 22rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			color: #D8C7DA;
			.no18_img{
				width: 32rpx;
				margin-right: 10rpx;
			}
		}
		.login_title{
			padding-top: 60rpx;
			text-align: center;
			color: #FF1A8C;
			position: relative;
			&::after{
				content: '';
				position: absolute;
				left: 0;
				right: 0;
				margin: 0 auto;
				bottom: -20rpx;
				width: 30rpx;
				height: 4rpx;
				border-radius: 10rpx;
				background: #FF1A8C;
			}
		}
		.changeType{
			margin-top: 40rpx;
			padding: 10rpx 0;
			text-align: center;
			color: #DB7FDB;
			font-size: 24rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			.right_arrow{
				margin-left: 5rpx;
				position: relative;
				top: 3rpx;
			}
		}
		._kf{
			margin-top: 90rpx;
			padding: 10rpx 0;
			padding-bottom: 30rpx;
			font-size: 22rpx;
			color: #777;
			text-align: center;
		}
	}
	
</style>