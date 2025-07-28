<template>
	<view class="login_box"> 
		<uni-easyinput class="r_input"  prefixIcon="person" v-model="params.username" :inputBorder="false"  :clearable="false"  trim  placeholder="请输入账号" placeholderStyle="color: #777" ></uni-easyinput>
		<uni-easyinput class="r_input" type="password"  prefixIcon="locked"  v-model="params.password" :inputBorder="false"  :clearable="false"  trim  placeholder="请输入密码" placeholderStyle="color: #777" ></uni-easyinput>
		<view class="server" @click="changeCheck"> 
			<checkbox  :checked="checkRef"  backgroundColor="transparent" borderColor="#ddd" activeBackgroundColor="#FA3296" activeBorderColor="#FA3296" color="#fff" style="transform:scale(0.7)" />
			<view>记住账号</view>
		</view>
		<button class="r_submit" @click="submitFun" :class="isOK ? 'isOK':''">登录</button>
	</view>
	<!-- <DialogVue v-model:isShow="isShow" @dialogConfirm="dialogConfirm"/> -->
	
	
</template>

<script setup>
	import { computed,reactive,ref } from 'vue';
	import {apiLogin} from '@/common/api/user.js'
	// import DialogVue from './dialog.vue';
	
	const checkRef = ref(false);
	const isShow = ref(false);
	const params = reactive({
		username: '',
		password:'',
	})
	const isOK = computed(()=>{
		return params.username && params.password
	});
	const changeCheck = ()=>{
		checkRef.value = !checkRef.value 
	}
	const submitFun=()=>{
		// isShow.value = true;
		apiLogin({...params}).then(res=>{
			console.log('res==',res);
		})
	}
	
	// const dialogConfirm = (code)=>{
	// 	console.log('code ==',code)
	// }

</script>

<style lang="scss" scoped> 
.login_box{
	margin-top: 40rpx;
	padding: 40rpx;
	.r_input{
		color: #ddd !important;
		margin-bottom: 20rpx;
		:deep(){
			.uni-easyinput__content{
				background-color: #202020 !important;
				border-radius: 12rpx;
			} 
			.content-clear-icon{
				padding: 0 7px;
			}
			.uni-easyinput__content-input{
				height: 80rpx;
			}
			.content-clear-icon{
				color: #ddd !important;
			}
			.uniui-eye-filled::before{
				// content: '\66c';
			}
		}
	}
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
	.isOK{
		opacity: 1;
	}
	.server{
		margin-top: 25rpx;
		font-size: 22rpx;
		color: #666;
		display: flex;
		align-items: center;
		:deep(){
			.uni-checkbox-input{
				border-radius: 50%;
			}
		}
	}
}


</style>