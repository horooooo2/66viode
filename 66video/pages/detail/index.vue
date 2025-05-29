<template>
	<view class="detail">
        <view class="status_bar"></view>
		
        <view class="d_title"> 
            <text>详情666666666顺丰收到是是是是是顺丰收到是是是是是顺丰收到是是是是是顺丰收到是是是是是顺丰收到是是是是是顺丰收到</text>  
        </view>
		<view class="d_time"><text>吃瓜视频 </text>发布于<text>2025-05-15 {{store?.user?.userData?.name}}</text></view>
		<view class="d_cont">
			<rich-text :nodes="strings"></rich-text>
		</view>
		
		<Like />
		<Share />
		<Sponsor />
		<Critique />
	</view>
	
</template>

<script setup>
import { ref, defineEmits, defineProps, watchEffect,onMounted } from 'vue'
import Like from './components/like.vue'
import Share from './components/share.vue'
import Sponsor from './components/sponsor.vue'
import Critique from './components/critique.vue'
const strings = ref('<div><p>富文本数据......</p></div>');


onMounted(() => {

})

const setUser = ()=>{
	store.user.setUser({name:9999});
}


</script>
<style lang="scss" scoped>
.detail{
	padding: 20rpx;
    background: #111;
	.d_title{
		color: #fff;
		font-size: 28rpx;
	}
	.d_time{
		margin-top: 18rpx;
		color: #aaa;
		font-size: 23rpx;
	}
	.d_cont{
		padding: 20rpx 0;
		color: #fff;
		font-size: 24rpx;
	}
}


</style>