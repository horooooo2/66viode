<template>
	<view class="search">
		<view class="status_bar"></view>
		<uni-search-bar placeholder="搜索" v-model="searchTxt" cancelButton="always" bgColor="#202020" textColor="#fff" @input="search" @cancel="cancel" />
		<view class="wrap" v-if="navData.listActive == 'all'">
		    <navVue :navData="navData" :current="navData.list.findIndex(val => val.id === navData.listActive)" @change="navChange"/>
		    <emptyVue v-if="none" class="empty" />
		    <view v-else>
		        <div v-for="(keys) in Object.keys(navData.listData || {}) || []" :key="keys">
		            <list2Vue 
		                v-if="['video','article'].includes(keys) && navData.listData[keys] && navData.listData[keys].list && navData.listData[keys].list.length" 
		                :title="navData.list.filter(val => val.id === keys)[0].name"  
		                :listData="navData.listData[keys].list" 
		                :listActive="navData.listActive" 
		                :count="navData.listData[keys].total" 
		                :keyword="searchTxt" 
		                @change="navChange"
		            />
		            <list1Vue 
		                v-if="['image','novel'].includes(keys) && navData.listData[keys] && navData.listData[keys].list && navData.listData[keys].list.length" 
		                :title="navData.list.filter(val => val.id === keys)[0].name" 
		                :listData="navData.listData[keys].list" 
		                :listActive="navData.listActive" 
		                :count="navData.listData[keys].total" 
		                :keyword="searchTxt" 
		                @change="navChange"
		            />
		        </div>
		    </view>
		</view>
		<view class="wrap" v-else>
			<navVue :navData="navData" :current="navData.list.findIndex(val => val.id === navData.listActive)" @change="navChange"/>
			<emptyVue v-if="none" class="empty" />
			<view v-else>
				<div v-for="(keys) in Object.keys(navData.listData || {}) || []" :key="keys">
					<list2Vue v-if="['video','article'].includes(keys) && navData.listData[keys].length" :title="navData.list.filter(val => val.id === keys)[0].name"  :listData="navData.listData[keys]" :listActive="navData.listActive" :count="navData.listData[keys].length" :keyword="searchTxt" @change="navChange"/>
					<list1Vue v-if="['image','novel'].includes(keys) && navData.listData[keys].length" :title="navData.list.filter(val => val.id === keys)[0].name" :listData="navData.listData[keys]" :listActive="navData.listActive" :count="navData.listData[keys].length" :keyword="searchTxt" @change="navChange"/>
				</div>
			</view>
		</view>
	</view>
</template>

<script setup>
import {ref,reactive,onUnmounted} from 'vue';
import { onLoad } from '@dcloudio/uni-app'
import { apiSearchFun } from '@/common/api/content.js'
import emptyVue from './components/empty.vue';
import navVue from './components/nav.vue';
import list1Vue from './components/list1.vue';
import list2Vue from './components/list2.vue';
const none = ref(false);
const searchTxt = ref('');
let searchTimer = null; // 节流定时器
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
		// 清空搜索结果
		navData.listData = {};
		return;
	}
	console.log('value=',val);
	console.log('searchTxt.value=',searchTxt.value);

	searchTxt.value = val;
	
	// 清除之前的定时器
	if (searchTimer) {
		clearTimeout(searchTimer);
	}
	
	// 设置节流，500ms后执行搜索
	searchTimer = setTimeout(() => {
		SearchFun();
	}, 300);
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
	uni.navigateTo({
		url: '/pages/eat/index'
	})
}

const navChange=(type,val)=>{
	navData[type] = val;
	SearchFun();
}

// 组件销毁时清理定时器
onUnmounted(() => {
	if (searchTimer) {
		clearTimeout(searchTimer);
		searchTimer = null;
	}
})
// 组件销毁时清理定时器
onLoad((option) => {
	console.log(option)
	if(option.content) {
		search(option.content)
	}
})

</script>

<style lang="scss" scoped>
	.empty{
		margin-top: 200rpx;
	}
	.searching-tip {
		text-align: center;
		padding: 40rpx 0;
		color: #999;
		font-size: 28rpx;
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