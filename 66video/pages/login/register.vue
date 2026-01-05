<template>
	<view class="register_box"> 
		<uni-easyinput class="r_input"  prefixIcon="person" v-model="params.username" :inputBorder="false"  :clearable="false"  trim  placeholder="请输入账号" placeholderStyle="color: #777" ></uni-easyinput>
		<uni-easyinput class="r_input"  prefixIcon="locked" type="password"  v-model="params.password" :inputBorder="false"  :clearable="false"  trim  placeholder="请输入密码" placeholderStyle="color: #777" ></uni-easyinput>
		<uni-easyinput class="r_input"  prefixIcon="locked" type="password"  v-model="params.confirm_password" :inputBorder="false"  :clearable="false"  trim  placeholder="确认密码" placeholderStyle="color: #777" ></uni-easyinput>
		<uni-easyinput class="r_input"  v-model="params.mobile" :inputBorder="false"  :clearable="false"  trim  placeholder="请输入手机号" placeholderStyle="color: #777" >
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
		<uni-easyinput class="r_input"  v-model="params.invite_code" :inputBorder="false"  :clearable="false"  trim  placeholder="请输入邀请码(选填)" placeholderStyle="color: #777" >
			<template #left>
				<view class="tui-icon tui-icon-tuijianma" ></view>
			</template>
		</uni-easyinput>
		
		<button class="r_submit" @click="submitFun" :class="isOK ? 'isOK':''">注册</button>
		
		
		<view class="server"> 
			<checkbox-group @change="changeCheck">
				<checkbox :checked="checkVal" backgroundColor="transparent" borderColor="#ddd" activeBackgroundColor="#FA3296" activeBorderColor="#FA3296" color="#fff" style="transform:scale(0.7)" />
			</checkbox-group>
			<view @click="changeCheck">我确认我已年满18岁并接受 </view>
			<view class="protocol" @click="goServer">《用户服务协议》</view>
		</view>
		
		<!-- <DialogVue v-model:isShow="isShow" @dialogConfirm="dialogConfirm"/> -->
	</view>

</template>

<script setup>
	import { computed,reactive,ref,onMounted,watch,onUnmounted } from 'vue';
	import {apiSendCode,apiRegister} from '@/common/api/user.js'
	import { onLoad } from '@dcloudio/uni-app'
	import { useUserStore } from '@/store/user'
	
	const userStore = useUserStore()
	// import DialogVue from './dialog.vue';
	const checkVal = ref(false);
	const isShow = ref(false);
	const params = reactive({
		username: '',
		password:'',
		confirm_password:'',
		mobile:'',
		code:'',
		invite_code:'',
	})
	const codeData = reactive({
		countdown: 60,
		isCounting: false,
		countdownStr:'',
		timeKey:null,
	})
	// 获取URL参数中的邀请码
    onLoad((options) => {
        console.log('URL参数:', options)
        if (options.invite_code) {
            params.invite_code = options.invite_code
            console.log('获取到的邀请码:', options.invite_code)
        }
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
	const isOK = computed(()=>{
		return params.username && params.password && params.confirm_password && params.mobile && params.code
	});
	const changeCheck = ()=>{
		checkVal.value = !checkVal.value 
	}
	const goServer = ()=>{
		uni.navigateTo({
			url: '/pages/server/index'
		});
	}
	
	const submitFun= async()=>{

		console.log('checkVal.value==',checkVal.value);
		if(!isOK.value) return;
		// isShow.value = true;
		if(params.password != params.confirm_password) return uni.showToast({ title: '密码和确认密码不一致', icon:'none' });
		if(!checkVal.value) return uni.showToast({ title: '请确认接受并勾选用户服务协议', icon:'none' });
		
		const {code,msg,data} = await apiRegister({...params,loading:true});
		uni.showToast({ title: msg, icon:'none', duration: 2000 });
		console.log('data===',data);
		if(code == 0){
			userStore.setUser(data)
			uni.setStorageSync('storage_user_data', data);	
			uni.navigateTo({
				url: '/pages/eat/index'
			});
		}
		
		
	}
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
		uni.showLoading({ title: '', mask: true });
		const {code,msg} = await apiSendCode({mobile:params.mobile});
		uni.hideLoading();
		uni.showToast({ title: msg, icon:'none', duration: 2000 });
		if( code == 0 ){
			if (!codeData.isCounting) {
				uni.setStorageSync('storage_sms_code', Date.now());
				codeData.isCounting = true;
				codeData.countdownStr = codeData.countdown;
			}
		}
	}
	
	
	// const dialogConfirm = (code)=>{
	// 	console.log('code ==',code)
	// }

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

.tui-icon-tuijianma:before {
  content: "\e72f";
}

.register_box{
	margin-top: 40rpx;
	padding: 40rpx;
	.r_submit{
		margin-top: 60rpx;
		border-radius: 14rpx;
		height: 76rpx;
		line-height: 76rpx;
		color: #fff;
		font-size: 24rpx;
		background: linear-gradient(270deg, #D018F5 0%, #FA3296 100%);
		opacity: 0.3;
	}
	.send_code{
		padding-right: 18rpx;
		font-size: 24rpx;
	}
	.isOK{
		opacity: 1;
	}
	.server{
		margin-top: 40rpx;
		font-size: 22rpx;
		color: #666;
		display: flex;
		align-items: center;
		justify-content: center;
		.protocol{
			color: #FA3296;
		}
		:deep(){
			.uni-checkbox-input{
				border-radius: 50%;
			}
		}
	}
}


</style>