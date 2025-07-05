<template>
	<view class="nav">
		<view class="nav_wrap">
			<view class="nav_list">
				<tui-tab sliderHeight="0" backgroundColor="transparent" color="#BBB" selectedColor="#FF1A8C" bold :tabs="tabs"
					scroll @change="changeTab"></tui-tab>
				<!-- <view class="nav_item" :class="val.id == navData?.listActive ? 'nav_active':''" v-for="val in (navData?.list || [])" :key="val.name" @click="changeNav('listActive',val)">{{val.name}}</view> -->
			</view>
			<view class="filter" :class="isFilter?'openfilter':''"  @click="openFilter">
				<text>筛选</text>
				<uni-icons class="arrow" type="down" size="24rpx" color="#FF1A8C"></uni-icons>
			</view>
		</view>
		<view class="filter_box" v-if="isFilter">
			<view class="nav_types">
				<view class="type_item" :class="val.id == navData?.typeActive ? 'type_active':''" v-for="val in (navData?.typeList || [])" :key="val.name" @click="changeNav('typeActive',val)">{{val.name}}</view>
			</view>
			<view class="nav_types">
				<view class="type_item" :class="val.id == navData?.timeActive ? 'type_active':''" v-for="val in (navData?.timeList || [])" :key="val.name" @click="changeNav('timeActive',val)">{{val.name}}</view>
			</view>
			
		</view>
	</view>
</template>

<script setup>
	import {ref,reactive,defineProps,defineEmits,onMounted,computed} from 'vue';
	const currentTab = ref(0);
	const props = defineProps({
	  navData: {
	    type: Object,
	    default: null
	  }
	})
	const tabs = computed(()=>{
		return props.navData?.list?.map(val=>val.name);
	});
	const changeTab=(e) =>{
		currentTab.value = e.index
		changeNav('listActive',props.navData?.list[e.index]);
	}
	const emit = defineEmits(["change"]);
	const isFilter = ref(false);
	const openFilter=()=>{
		isFilter.value = !isFilter.value;
	}
	const changeNav = (type,val)=>{
		console.log('type=',type);
		console.log('val=',val.id);
		emit('change',type,val.id);
	}

</script>

<style lang="scss" scoped>
	.nav{
		margin-top: 20rpx;
		position: relative;
		.nav_wrap{
			display: flex;
		}
		.nav_list{
			width: 87%;
			overflow: auto;
			white-space: nowrap;
			.nav_item{
				display: inline-block;
				padding: 6rpx 8rpx 30rpx 8rpx;
				margin-right: 40rpx;
				font-size: 25rpx;
				color: #999;
			}
			.nav_item:last-child{
				margin-right: 10rpx;
			}
			.nav_active{
				color: #FF1A8C;
				position: relative;
			}
			.nav_active::after{
				content: '';
				position: absolute;
				right: 0;
				left: 0;
				margin:  0 auto;
				bottom: 16rpx;
				width: 20rpx;
				height: 4rpx;
				background: #FF1A8C;
				border-radius: 10rpx;
			}
		}
		.filter{
			flex: 1;
			text-align: right;
			font-size: 21rpx;
			color: #ccc;
			display: flex;
			align-items: center;
			justify-content: center;
			.arrow{
				margin-left: 4rpx;
				position: relative;
				top: 4rpx;
			}
		}
		.openfilter{
			color: #FF1A8C;
			.arrow{
				display: inline-block;
				transform: rotate(180deg);
				top: 3rpx;
			}
		}
		.filter_box{
			position: absolute;
			z-index: 99;
			width: 100%;
			padding: 10rpx 0rpx 30rpx 0rpx;
			background: rgba(0, 0, 0, 0.5);
			backdrop-filter: blur(20rpx);
			.nav_types{
				width: 99%;
				overflow: auto;
				white-space: nowrap;
				margin-top: 20rpx;
				padding-bottom: 15rpx;
			}
			.type_item{
				display: inline-block;
				padding: 10rpx 35rpx;
				margin-right: 30rpx;
				font-size: 22rpx;
				color: #999;
				border-radius: 25rpx;
			}
			.type_active{
				color: #FF1A8C;
				background: rgba(42, 45, 44, 0.4);
			}
		}
	}
</style>