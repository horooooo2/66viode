<template>
	<view class="search">
		<uni-search-bar placeholder="搜索" v-model="searchTxt" cancelButton="always" bgColor="#202020" textColor="#fff" @confirm="search" @cancel="cancel" />
		
		<view class="wrap">
			<navVue :navData="navData" @change="navChange"/>
			<emptyVue v-if="none" />
			<view>
				<list2Vue :title="'视频'"  :count="'15'" :keyword="searchTxt"/>
				<list1Vue :title="'小说'"  :count="'15'" :keyword="searchTxt"/>
			</view>
		</view>
	</view>
</template>

<script setup>
import {ref,reactive} from 'vue';
import emptyVue from './components/empty.vue';
import navVue from './components/nav.vue';
import list1Vue from './components/list1.vue';
import list2Vue from './components/list2.vue';
const none = ref(false);
const searchTxt = ref('');
const navData = reactive({
	list:[
		{name:'全部',id:1},
		{name:'类型1',id:2},
		{name:'类型2',id:3},
		{name:'类型类型类型类型3',id:4},
		{name:'类型4444',id:5},
	],
	listActive: 1,
	typeList:[
		{name:'最热',id:11},
		{name:'最新',id:12},
		{name:'好评',id:13},
	],
	typeActive: 11,
	timeList:[
		{name:'全部',id:21},
		{name:'近1天',id:22},
		{name:'近1周',id:23},
		{name:'近2周',id:24},
		{name:'近1月',id:25},
		{name:'近2月',id:26},
		{name:'近3月',id:27},
	],
	timeActive: 21,
})

const search=(res) =>{
	uni.showToast({
		title: '搜索：' + res.value,
		icon: 'none'
	})
}
const cancel=()=>{
	uni.navigateBack();
}

const navChange=(type,val)=>{
	navData[type] = val;
}

</script>

<style lang="scss" scoped>
	.search{
		background: #111;
		color: #fff;
		min-height: 100vh;
		display: flex;
		flex-flow: column;
		:deep(){
			.uni-searchbar__box{
				border-radius: 25px !important;
			}
			.uni-searchbar__cancel{
				color: #fff;
			}
		}
		.wrap{
			padding: 0 20rpx 30rpx 20rpx;
			flex: 1;
		}
	}
</style>