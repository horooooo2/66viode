<template>
	<view class="search">
		<uni-search-bar placeholder="搜索" v-model="searchTxt" cancelButton="always" bgColor="#202020" textColor="#fff" @input="search" @cancel="cancel" />
		
		<view class="wrap">
			<navVue :navData="navData" @change="navChange"/>
			<emptyVue v-if="none" class="empty" />
			<view v-else>
				<div v-for="(keys) in Object.keys(navData.listData || {}) || []" :key="keys">
					<list2Vue v-if="['video','article'].includes(keys) && navData.listData[keys].length" :title="navData.list.filter(val => val.id === keys)[0].name"  :listData="navData.listData[keys]"  :count="navData.listData[keys].length" :keyword="searchTxt"/>
					<list1Vue v-if="['image','novel'].includes(keys) && navData.listData[keys].length" :title="navData.list.filter(val => val.id === keys)[0].name" :listData="navData.listData[keys]" :count="navData.listData[keys].length" :keyword="searchTxt"/>
				</div>
			</view>
		</view>
	</view>
</template>

<script setup>
import {ref,reactive} from 'vue';
import { apiSearchFun } from '@/common/api/content.js'
import emptyVue from './components/empty.vue';
import navVue from './components/nav.vue';
import list1Vue from './components/list1.vue';
import list2Vue from './components/list2.vue';
const none = ref(false);
const searchTxt = ref('');
const navData = reactive({
	page: 1,
	limit:20,
	list:[
		{name:'全部',id:'all'},
		{name:'吃瓜文章',id:'article'},
		{name:'影视',id:'video'},
		{name:'漫画',id:'image'},
		{name:'小说',id:'novel'},
	],
	listActive: 'all',
	typeList:[
		{name:'时间',id:'new'},
		{name:'热度',id:'hot'}
	],
	typeActive: 'new',
	timeList:[
		{name:'全部',id:'all'},
		{name:'近1天',id:'day'},
		{name:'近1周',id:'week'},
		{name:'近2周',id:'2week'},
		{name:'近1月',id:'month'},
		// {name:'近2月',id:'2month'},
		// {name:'近3月',id:'3month'},
	],
	timeActive: 'all',
	listData: {},
})

const search=(val) =>{	
	if(val==''){
		none.value = true;
		return;
	}
	console.log('value=',val);
	console.log('searchTxt.value=',searchTxt.value);

	searchTxt.value = val;
	SearchFun();
}

const SearchFun=()=>{
	if(searchTxt.value.trim()==''){
		none.value = true;
		return;
	}

	apiSearchFun({
		keyword: searchTxt.value.trim(),
		page: navData.page,
		limit: navData.limit,
		type: navData.listActive,
		order: navData.typeActive,
		date: navData.timeActive,
		loading:true
	}).then(res=>{
		console.log('res==',res);
		if(res.code==0){
			navData.listData = {};
			if(res.data.total==0 && navData.listActive != 'all' || (
				navData.listActive == 'all' && res.data.image.length==0 && res.data.novel.length==0 && res.data.video.length==0 && res.data.article.length==0
			)){
				none.value = true;
				navData.listData = {};
			}else{
				none.value = false;
				if(navData.listActive == 'all'){
					navData.listData = res.data;
				}else{
					console.log('res.data.items==',res.data.items);
					
					navData.listData[navData.listActive] = res.data.items;
				}
				
			}
		}else{
			none.value = true;
			navData.listData = {};
		}
	}).catch(err=>{
		console.log('err==',err);
		none.value = true;
		navData.listData = {};
	})
}
const cancel=()=>{
	uni.navigateBack();
}

const navChange=(type,val)=>{
	navData[type] = val;
	SearchFun();
}

</script>

<style lang="scss" scoped>
	.empty{
		margin-top: 200rpx;
	}
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