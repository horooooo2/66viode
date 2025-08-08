<template>
	<view class="phone">
		<NavBar title="换绑手机号"></NavBar>
		<view class="phone-container">
			<view class="label">新手机号</view>
			<!-- input class="input" type="text" placeholder="请输入新手机号" /> -->
			<uni-easyinput class="r_input"  v-model="params.mobile" :inputBorder="false"  :clearable="false"  trim  placeholder="请输入新手机号" placeholderStyle="color: #777" >
				<template #left>
					<view class="tui-icon tui-icon-mobile" ></view>
				</template>
			</uni-easyinput>
			<uni-easyinput class="r_input"  v-model="params.code" :inputBorder="false"  :clearable="false"  trim   placeholder="请输入验证码" placeholderStyle="color: #777" >
				<template #left>
					<view class="tui-icon tui-icon-yanzhengmamima" ></view>
				</template>
				<template #right>
					<view class="send_code" @click="sendCodeFun">{{codeData.isCounting ? `${codeData.countdownStr}s`:'发送验证码'}}</view>
				</template>
			</uni-easyinput>
			<view class="button" @click="submitForm">提交</view>
		</view>
	</view>
</template>

<script setup>
	import NavBar from '@/components/NavBar/index.vue'
	import { apiSendCode, apiBindMobile } from '@/common/api/user.js'
	import { reactive, onMounted, onUnmounted, watch } from 'vue'
	const params = reactive({
		mobile:'',
		code:'',
	})
	const codeData = reactive({
		countdown: 60,
		isCounting: false,
		countdownStr:'',
		timeKey:null,
	})
	onMounted(()=>{
		 let timestamp = uni.getStorageSync('storage_sms_code') || 0;
		 console.log('timestamp==',timestamp)
		 if (timestamp) {
			const now = Date.now();
			const diff = now - timestamp;
			const left = codeData.countdown * 1000 - diff;
			if (left > 0) {
			  const mod = left % 1000;
			  const leftCountdown = (left - mod) / 1000;
			  codeData.countdownStr = leftCountdown;
			  codeData.isCounting  = true;
			}
		  }
	})
	onUnmounted(()=>{
		clearTimeout(codeData.timeKey);
	})
	watch(()=>[codeData.countdownStr,codeData.isCounting],(newVal,oldVal)=>{
		if(newVal && codeData.isCounting){
			  codeData.timeKey = setTimeout(() => {
				  let nextCountdown = codeData.countdownStr - 1;
				  if (nextCountdown <= 0) {
						nextCountdown = codeData.countdown;
						codeData.isCounting  = false;
				  }
				  codeData.countdownStr = nextCountdown;
			  }, 1000);
		}
	})

		//获取验证码
	const sendCodeFun= async()=>{
		if( !params.mobile ){
			uni.showToast({
				title: '请输入手机号',
				icon:'none',
				duration: 2000
			});
			return;
		}
		if (codeData.isCounting){
			uni.showToast({
				title: `请${codeData.countdownStr}s后再试`,
				icon:'none',
				duration: 1000
			});
			return;
		}  
		const {code,msg} = await apiSendCode({mobile:params.mobile,type:"bind_mobile",loading:true});
		uni.showToast({ title: msg, icon:'none', duration: 2000 });
		if( code == 0 ){
			if (!codeData.isCounting) {
				uni.setStorageSync('storage_sms_code', Date.now());
				codeData.isCounting = true;
				codeData.countdownStr = codeData.countdown;
			}
		}
	}
	// 提交表单
	const submitForm = async () => {
		if (!params.mobile) {
			uni.showToast({
				title: '请输入手机号',
				icon: 'none',
				duration: 2000
			});
			return;
		}
		if (!params.code) {
			uni.showToast({
				title: '请输入验证码',
				icon: 'none',
				duration: 2000
			});
			return;
		}
		const { code, msg } = await apiBindMobile({...params,loading:true});
		uni.showToast({ title: msg, icon: 'none', duration: 2000 });
		if (code == 0) {
			// 提交成功
			uni.navigateBack()
		}
	}

</script>

<style lang="scss" scoped>
	@font-face {
		font-family: CustomFont;
		src: url('@/common/styles/iconfont.ttf');
	}
	.tui-icon {
		font-family: 'CustomFont' !important;
		font-style: normal;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		display: block;
		padding-left: 7px;
		font-size: 42rpx;
	}
	.tui-icon-mobile:before {
		content: '\e6bd';
	}
	.tui-icon-yanzhengmamima:before {
	  content: "\e6ba";
	}
	.phone {
		width: 100%;
		background-color: #101010;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		&-container {
			width: 100%;
			padding: 16rpx 32rpx;
			box-sizing: border-box;
			.send_code{
				padding-right: 18rpx;
				font-size: 24rpx;
			}
			.label {
				color: #999;
				font-size: 28rpx;
				margin-bottom: 16rpx;
			}
			.input {
				width: 100%;
				height: 96rpx;
				background-color: #202020;
				border-radius: 20rpx;
				padding: 32rpx 16rpx 32rpx 24rpx;
				box-sizing: border-box;
				:deep() {
					.uni-input-placeholder {
						color: #555;
						font-size: 32rpx;
					}
					.uni-input-input {
						color: #ccc;
						font-size: 32rpx;
					}
				}
			}
			.button {
				width: 100%;
				height: 88rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				border-radius: 12rpx;
				background: linear-gradient(270deg, #D018F5 0%, #FA3296 100%);
				color: #fff;
				font-size: 34rpx;
				margin-top: 80rpx;
			}
		}
	}
</style>