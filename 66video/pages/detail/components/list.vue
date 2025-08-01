<template>
	<view class="state">
		<view class="s_txt">连载中</view>
		<view class="s_count" @click="openList">共1000话 
			<uni-icons type="right" size="12" color="#999"></uni-icons>
		</view>
	</view>
	<view class="d_list">
		<view class="d_list_wrap">
			<button class="d_list_item current" size="default" type="default" @click="openList">第1话</button>
			<button class="d_list_item" size="default" type="default" >第2话</button>
			<button class="d_list_item" size="default" type="default" >第3话</button>
			<button class="d_list_item" size="default" type="default" >第3话</button>
			<button class="d_list_item" size="default" type="default" >第3话</button>
			<button class="d_list_item" size="default" type="default" >第3话</button>
			<button class="d_list_item" size="default" type="default" >第3话</button>
			<button class="d_list_item" size="default" type="default" >第3话</button>
			<button class="d_list_item" size="default" type="default" >第3话</button>
		</view>
		
		
	</view>
	<uni-popup ref="popup" safeArea  background-color="#101010" >
		<view class="list_popup_cont" >
			<view class="title">目录</view>
			<view class="sort_wrap">
					<view>全部章节 <text class="list_count">(399)</text></view>
					<view class="sort_box">
						<text class="actvie">正序</text>
						<text space="ensp"> | </text>
						<text>倒叙</text>
					</view>
			</view>
			<uni-list class="list_wrap" :border="false">
				<!-- <uni-list-item  title="列表文字" clickable="true"  class="list_item" :border="false"></uni-list-item>
				<uni-list-item  title="列表文字" clickable="true" class="list_item" :border="false"></uni-list-item>
				<uni-list-item  title="列表文字" clickable="true" class="list_item" :border="false"></uni-list-item> -->
				
				 <uni-list-item class="list_item"  :border="false">
					 <template v-slot:body>
						<view >
							<text  class="list_text actvie">01 内容内容</text>
						</view>
					</template>
				 </uni-list-item>
				 
				 <uni-list-item class="list_item" :border="false">
					 <template v-slot:body>
						<view >
							<text class="list_text">02 内容内容</text>
						</view>
					</template>
				 </uni-list-item>
				 <uni-list-item class="list_item" :border="false">
				 					 <template v-slot:body>
				 						<view >
				 							<text class="list_text">02 内容内容</text>
				 						</view>
				 					</template>
				 </uni-list-item>
				 <uni-list-item class="list_item" :border="false">
				 					 <template v-slot:body>
				 						<view >
				 							<text class="list_text">02 内容内容</text>
				 						</view>
				 					</template>
				 </uni-list-item>
				 <uni-list-item class="list_item" :border="false">
				 					 <template v-slot:body>
				 						<view >
				 							<text class="list_text">02 内容内容</text>
				 						</view>
				 					</template>
				 </uni-list-item>
				 <uni-list-item class="list_item" :border="false">
				 					 <template v-slot:body>
				 						<view >
				 							<text class="list_text">02 内容内容</text>
				 						</view>
				 					</template>
				 </uni-list-item>
				 <uni-list-item class="list_item" :border="false">
				 					 <template v-slot:body>
				 						<view >
				 							<text class="list_text">02 内容内容</text>
				 						</view>
				 					</template>
				 </uni-list-item>
				 <uni-list-item class="list_item" :border="false">
				 					 <template v-slot:body>
				 						<view >
				 							<text class="list_text">02 内容内容</text>
				 						</view>
				 					</template>
				 </uni-list-item>
				 <uni-list-item class="list_item" :border="false">
				 					 <template v-slot:body>
				 						<view >
				 							<text class="list_text">02 内容内容</text>
				 						</view>
				 					</template>
				 </uni-list-item>
				 <uni-list-item class="list_item" :border="false">
				 					 <template v-slot:body>
				 						<view >
				 							<text class="list_text">02 内容内容</text>
				 						</view>
				 					</template>
				 </uni-list-item>
				 <uni-list-item class="list_item" :border="false">
				 					 <template v-slot:body>
				 						<view >
				 							<text class="list_text">02 内容内容</text>
				 						</view>
				 					</template>
				 </uni-list-item>
				 <uni-list-item class="list_item" :border="false">
				 					 <template v-slot:body>
				 						<view >
				 							<text class="list_text">02 内容内容</text>
				 						</view>
				 					</template>
				 </uni-list-item>
				 <uni-list-item class="list_item" :border="false">
				 					 <template v-slot:body>
				 						<view >
				 							<text class="list_text">02 内容内容</text>
				 						</view>
				 					</template>
				 </uni-list-item>
				 <uni-list-item class="list_item" :border="false">
				 					 <template v-slot:body>
				 						<view >
				 							<text class="list_text">02 内容内容</text>
				 						</view>
				 					</template>
				 </uni-list-item>
				 <uni-list-item class="list_item" :border="false">
				 					 <template v-slot:body>
				 						<view >
				 							<text class="list_text">02 内容内容</text>
				 						</view>
				 					</template>
				 </uni-list-item>
				 <uni-list-item class="list_item" :border="false">
				 					 <template v-slot:body>
				 						<view >
				 							<text class="list_text">02 内容内容</text>
				 						</view>
				 					</template>
				 </uni-list-item>
				 <uni-list-item class="list_item" :border="false">
				 					 <template v-slot:body>
				 						<view >
				 							<text class="list_text">02 内容内容</text>
				 						</view>
				 					</template>
				 </uni-list-item>
				 <uni-list-item class="list_item" :border="false">
				 					 <template v-slot:body>
				 						<view >
				 							<text class="list_text">02 内容内容</text>
				 						</view>
				 					</template>
				 </uni-list-item>
				 <uni-list-item class="list_item" :border="false">
				 					 <template v-slot:body>
				 						<view >
				 							<text class="list_text">02 内容内容</text>
				 						</view>
				 					</template>
				 </uni-list-item>
				 <uni-list-item class="list_item" :border="false">
				 					 <template v-slot:body>
				 						<view >
				 							<text class="list_text">02 内容内容</text>
				 						</view>
				 					</template>
				 </uni-list-item>
				
			</uni-list>
		</view>
	</uni-popup>
	
</template>

<script setup>
	import { ref, defineEmits, defineProps, watchEffect,onMounted } from 'vue'
	const popup = ref(null);
	const openList = ()=>{
		popup.value.open('bottom')
	}
	
	
</script>

<style lang="scss" scoped>
	.state{
		margin-top: 40rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.s_txt{
			color: #ccc;
			font-size: 25rpx;
		}
		.s_count{
			font-size: 22rpx;
			color: #999;
		}
	}
	

	.d_list{
		padding: 20rpx;
		overflow: auto;
		max-width: 100%;
		display: flex;
		.d_list_wrap{
			display: flex;
		}
		.d_list_item{
			border: 1px solid transparent;
			color: #ccc;
			width: 200rpx;
			height: 78rpx;
			line-height: 25rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			background: #202020;
			font-size: 22rpx;
			padding: 0rpx 4rpx;
			margin-right: 20rpx;
			&.current {
				border-color: #FF1A8C;
				color: #FF1A8C;
			}
		}
		
		
		
		.btn-hover{
			border-color: #FF1A8C;
			color: #FF1A8C;
		}
	}
	
	
	
	
	
	.list_popup_cont{
		height: 80vh;
		color: #ccc;
		display: flex;
		flex-flow: column;
		.title{
			padding-top: 30rpx;
			text-align: center;
			font-size: 28rpx;
		}
		.sort_wrap{
			margin-top: 10rpx;
			display: flex;
			justify-content: space-between;
			padding: 20rpx 20rpx;
			font-size: 24rpx;
			.list_count{
				font-size: 22rpx;
			}
			.sort_box{
				color: #999;
				display: flex;
				align-items: center;
				font-size: 22rpx;
			}
		}
		.list_wrap{
			flex: 1;
			overflow: auto;
			background: transparent;
			.list_item{
				background: transparent !important;
			}
			.list_text{
				font-size: 24rpx;
			}
		}
		.actvie{
			color: #FF1A8C;
		}
	}
	
</style>