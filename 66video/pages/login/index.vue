<template>
	<view class="page_bg">
		<button @click="back">返回</button>
		页面  {{isType}}
		
		<component :is="isType" />
		
		 <!-- <button @click="changeType">{{ isType == 'Register' ? '去登录' : '去注册' }}</button> -->
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
	export default{
		components: { Login, Register },
		data(){
			return {
				isType: 'Login'
			}
		},
		onLoad(options) {
			console.log(options.type)
			this.isType = options.type == 2 ? 'Register' : 'Login';
		},
		methods:{
			back(){
				uni.navigateBack();
			},
			changeType(){
				// uni.navigateTo({
				// 	url: '/pages/login/index?type=2'
				// });
				this.isType = this.isType == 'Register' ? 'login': 'Register'
			},
		}
	}
	
</script>

<style>
	.page_bg{
		/* background:  linear-gradient(to bottom, transparent, #111 300px), radial-gradient(80% 100% at 10% 50%, #cd12d9, #a83535); */
		
		
		background:  linear-gradient(to bottom, transparent, #111 300px),  linear-gradient(to right, #cd12d9 20%, #a83535);
            /* radial-gradient(90% 300px at left top ,#D81EE4, transparent), */
            /* radial-gradient(60% 300px at right top ,#ff5050, transparent); */
		/* backdrop-filter: blur(8px); */
		
        backdrop-filter: saturate(50%) blur(8px);
			
		min-height: 50vh;
	}
	
</style>