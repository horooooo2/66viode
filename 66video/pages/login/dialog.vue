<template>
	<uni-popup ref="dialogRef" type="dialog" class="my_dialog">
		<uni-popup-dialog :type="'info'" cancelText="取消" confirmText="确认" title="人机身份验证" content="" :before-close="true"  @confirm="dialogConfirm" @close="dialogClose">
			<view class="dialog_wrap">
				<view class="dialog_tips">请按照提示操作</view>
				<view class="dialog_input">
					<uni-easyinput class="r_input"  v-model="code" :inputBorder="false"  :clearable="false"  trim  placeholder="请输入图形验证码" placeholderStyle="color: #777" ></uni-easyinput>
					<image class="code_img" mode="heightFix" src="/static/images/login/code.png"></image>
				</view>
				<view class="err_msg" v-if="false">验证码错误</view>
				
			</view>
		</uni-popup-dialog>
	</uni-popup>
</template>

<script setup> 
import {defineProps,defineEmits,watch,ref} from 'vue'
const props = defineProps({
	isShow:{
		type: Boolean,
		default: false,
	}
})
const emit = defineEmits(["update:isShow", "dialogConfirm"]);
const dialogRef = ref(null);
const code = ref('');
watch(
  () => props.isShow,
  (newValue) => {
	console.log('newValue==',newValue);
	if (newValue){
		dialogRef.value.open();
	}else{
		dialogRef.value.close();
	}
  }
);

const dialogClose=()=>{
	dialogRef.value.close();
	emit("update:isShow", false);
}
const dialogConfirm=()=>{
	emit("dialogConfirm", code);
}

</script>

<style lang="scss" scoped>
	.my_dialog{
		:deep(){
			.uni-popup-dialog{
				background: #202020;
				border-radius: 20rpx;
				color: #ddd;
			}
			.uni-popup__info{
				color: #fff;
				font-size: 28rpx;
			}
			.uni-dialog-button-group{
				border-top-color: #101010;
			}
			.uni-border-left{
				border-left-color: #101010;
			}
			.uni-dialog-button-text{
				color: #ddd;
				font-size: 24rpx;
			}
			.uni-dialog-button{
				height: 70rpx;
			}
			.uni-button-color{
				color: #FA3296;
			}
			.uni-easyinput__content{
				background-color: transparent !important;
				border-radius: 12rpx;
			} 
		}
		.dialog_tips{
			text-align: center;
			color: #f4f5f7;
			font-size: 24rpx;
		}
		.dialog_input{
			margin-top: 24rpx;
			padding: 10rpx;
			background: #333;
			height: 70rpx;
			border-radius: 15rpx;
			display: flex;
			align-items: center;
			.code_img{
				height: 100%;
			}
			.r_input{
				color: #ddd !important;
			}
		}
		.err_msg{
			margin: 10rpx 0rpx 0rpx 15rpx;
			font-size: 20rpx;
			color: #FA3296;
		}
	}
</style>