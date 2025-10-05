<template>
	<view class="collect">
		<NavBar title="收藏记录">
			<template #right>
				<view style="font-size: 28rpx; color: #ddd" @click="toUpdate">管理</view>
			</template>
		</NavBar>
		<view class="collect-container">
			<view class="filter">
				<view class="panel" @click="$refs.typePopup.open('bottom')">
					<view class="left">频道：{{ typeSelectValue.name }}</view>
					<image class="arrow" src="/static/images/index/icon_close.png" mode="widthFix"></image>
				</view>
				<view class="panel" @click="$refs.timePopup.open('bottom')">
					<view class="left">日期：{{ selectTimeValue.name }}</view>
					<image class="arrow" src="/static/images/index/icon_close.png" mode="widthFix"></image>
				</view>
			</view>
			<Empty v-if="likeList.length === 0" :style="{marginTop: '20vh'}"></Empty>
			<view class="list" v-else>
				<view class="list-item" v-for="item in likeList" :key="item.id" @click="listItemClick(item)">
					<view v-if="isShowFooter" class="check">
						<image v-if="!item.isChecked" src="/static/images/setting/icon_checkbox.svg" mode="widthFix"></image>
						<image v-else-if="isAllChecked || item.isChecked" src="/static/images/setting/icon_checkbox_active.svg" mode="widthFix"></image>
					</view>
					<view class="cover">
						<image class="pic" mode="aspectFill" :src="item.mobile_image || item.pc_image" ></image>
						<view class="type">{{ typeRadioItems.find(type => type.value === item.content_type)?.name || '未知类型' }}</view>
					</view>
					<view class="right-panel">
						<view class="title">{{ item.title }}</view>
						<view class="time">
							<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12"
								fill="none">
								<path
									d="M8.2582 10.875H3.81537C3.11549 10.875 2.44627 10.2056 2.44627 9.59275V2.41149C2.44627 1.7986 3.11549 1.125 3.81537 1.125H8.2582C8.95809 1.125 9.56828 1.7986 9.56828 2.41149V9.59275C9.56828 10.2056 8.95809 10.875 8.2582 10.875ZM3.81537 1.77048C3.41257 1.77048 3.08337 2.05759 3.08337 2.41149V9.59275C3.08337 9.94548 3.41123 10.2338 3.81537 10.2338H8.2582C8.661 10.2338 8.9902 9.94665 8.9902 9.59275V2.41149C8.9902 2.05876 8.66234 1.77048 8.2582 1.77048H3.81537Z"
									fill="#777777" />
								<path
									d="M9.21527 8.40776H2.77766C2.64758 8.40776 2.54211 8.30229 2.54211 8.17221C2.54211 8.04213 2.63938 7.89034 2.76945 7.89034H9.20707C9.33715 7.89034 9.45082 8.04213 9.45082 8.17221C9.45082 8.30229 9.34535 8.40776 9.21527 8.40776ZM5.99208 9.81752C5.7331 9.81752 5.52217 9.60659 5.52217 9.3476C5.52217 9.08862 5.7331 8.87768 5.99208 8.87768C6.25107 8.87768 6.46201 9.08862 6.46201 9.3476C6.46201 9.60659 6.25107 9.81752 5.99208 9.81752Z"
									fill="#777777" />
							</svg>
							<text>{{ item.collect_time }}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view v-if="isShowFooter" class="footer">
			<view class="all-button" @click="checkAllFun">
				<image v-if="!isAllChecked" src="/static/images/setting/icon_checkbox.svg" mode="widthFix"></image>
				<image v-else src="/static/images/setting/icon_checkbox_active.svg" mode="widthFix"></image>
				<text class="tui-text">全选</text>
			</view>
			<view class="button" @click="deleteSelectedFun">删除</view>
		</view>
		<uni-popup ref="typePopup" class="typePopup" type="bottom" safe-area background-color="rgb(32, 32, 32)">
			<view class="sort-box">
				<view class="sort-title">频道</view>
				<div class="type-list">
					<tui-radio-group @change="typeRadioChange" v-model="typeSelectValue.value">
						<tui-label v-for="(item, index) in typeRadioItems" :key="index">
							<tui-list-cell>
								<view class="thorui-align__center sort-item">
									<view class="sort-label">{{ item.name }}</view>
									<tui-radio :checked="item.checked" :value="`${item.value}`" color="#D018F5"
										borderColor="#c5c9d1">
									</tui-radio>
								</view>
							</tui-list-cell>
						</tui-label>
					</tui-radio-group>
				</div>
			</view>
		</uni-popup>
		<uni-popup ref="timePopup" class="typePopup" type="bottom" safe-area background-color="rgb(32, 32, 32)">
			<view class="sort-box">
				<view class="sort-title">日期</view>
				<div class="type-list">
					<tui-radio-group @change="timeRadioChange" v-model="selectTimeValue.value">
						<tui-label v-for="(item, index) in timeRadioItems" :key="index">
							<tui-list-cell>
								<view class="thorui-align__center sort-item">
									<view class="sort-label">{{ item.name }}</view>
									<tui-radio :checked="item.checked" :value="`${item.value}`" color="#D018F5"
										borderColor="#c5c9d1">
									</tui-radio>
								</view>
							</tui-list-cell>
						</tui-label>
					</tui-radio-group>
				</div>
			</view>
		</uni-popup>
	</view>
</template>

<script>
import NavBar from '@/components/NavBar/index.vue'
import {
	apiGetLikeList, apiRemoveLike
} from "@/common/api/content.js";
import Empty from "@/pages/search/components/empty.vue"
export default {
	components: {
		NavBar,
		Empty
	},
	data() {
		return {
			isShowFooter: false,
			isAllChecked: false,
			//选中的类型
			typeSelectValue: {
				name: '全部',
				value: 'all'
			},
			typeRadioItems: [
				{
					name: '全部',
					value: 'all',
					checked: true
				},
				{
					name: '视频',
					value: 'video',
					checked: false
				},
				{
					name: '吃瓜',
					value: 'article',
					checked: false
				},
				{
					name: '漫画',
					value: 'image',
					checked: false
				},
				{
					name: '小说',
					value: 'novel',
					checked: false
				}
			],
			selectTimeValue: {
				name: '所有时间',
				value: 'all'
			},
			timeRadioItems: [
				{
					name: '所有时间',
					value: 'all',
					checked: true
				},
				{
					name: '今日',
					value: 'today',
					checked: false
				},
				{
					name: '本周',
					value: 'week',
					checked: false
				},
				{
					name: '近1月',
					value: 'month',
					checked: false
				},
			],
			likeList: []
		}
	},
	created() {
		this.getList();
	},
	methods: {
		toUpdate() {
			this.isShowFooter = !this.isShowFooter
		},
		typeRadioChange(e) {
			console.log('e=', e);
			if (e.detail.value === this.typeSelectValue.value) {
				return;
			}
			this.typeSelectValue = {
				name: this.typeRadioItems.find(item => item.value == e.detail.value)?.name || '全部',
				value: e.detail.value
			};
			this.$refs.typePopup.close();
			this.getList();
		},
		timeRadioChange(e) {
			console.log('e=', e);
			
			if (e.detail.value === this.selectTimeValue.value) {
				return;
			}
			this.selectTimeValue = {
				name: this.timeRadioItems.find(item => item.value == e.detail.value)?.name || '所有时间',
				value: e.detail.value
			};
			this.$refs.timePopup.close();
			this.getList();
		},
		async getList() {

			let res = await apiGetLikeList({
				content_type: this.typeSelectValue.value === 'all' ? '' : this.typeSelectValue.value,
				date: this.selectTimeValue.value === 'all' ? '' : this.selectTimeValue.value,
				page: 1,
				limit: 999,
				loading: true
			});
			if (res.code === 0) {
				this.likeList = res?.data?.list.map(val=>({...val, isChecked: false})) || [];
			} else {
				uni.showToast({
					title: res.msg || "获取收藏列表失败",
					icon: "none"
				});
			}
		},
		checkAllFun() {
			this.isAllChecked = !this.isAllChecked;
			this.likeList = [...this.likeList].map(val => {
				val.isChecked = this.isAllChecked;
				return val;
			});
		},
		listItemClick(item) {
			if (this.isShowFooter) {
				this.likeList = this.likeList.map(val => {
					if (val.id === item.id) {
						val.isChecked = !val.isChecked;
					}
					return val;
				});
				let checkedCount = this.likeList.filter(val => val.isChecked).length;
				if( checkedCount == 0 || checkedCount < this.likeList.length ){
					this.isAllChecked = false;
				}
				else if(  checkedCount === this.likeList.length ){
					this.isAllChecked = true;
				}
				
			} else {
				//跳转详情
				let url = '';
				if (item.content_type === 'video' || item.content_type === 'image' || item.content_type === 'novel') {
					url = `/pages/detail/anime?id=${item.content_id}&type=${item.content_type}`;
				}  else if(item.content_type==='article'){
					url = `/pages/detail/article?id=${item.content_id}`;
				}
				uni.navigateTo({
					url
				});
			}
		},
		deleteSelectedFun() {
			// let selectedIds = this.likeList.filter(val => val.isChecked).map(val => val.id);
			let selectedIds = this.likeList.filter(val => val.isChecked).map(val => { return {type:val.content_type,id:val.id} });
			console.log('selectedIds=', selectedIds);
			if (selectedIds.length === 0) {
				uni.showToast({
					title: '请先选择要删除的收藏',
					icon: 'none'
				});
				return;
			}
			uni.showModal({
				title: '提示',
				content: `确定删除选中的${selectedIds.length}个收藏吗？`,
				success: async (res) => {
					if (res.confirm) {
						let delRes = await apiRemoveLike({
							// ids: selectedIds.join(','),
							data_list: selectedIds,
							loading: true
						});
						if (delRes.code === 0) {
							uni.showToast({
								title: '删除成功',
								icon: 'success'
							});
							this.isShowFooter = false;
							this.isAllChecked = false;
							this.getList();
						} else {
							uni.showToast({
								title: delRes.msg || '删除失败',
								icon: 'none'
							});
						}
					}
				}
			});
		}
	},
}
</script>

<style lang="scss" scoped>
.collect {
	width: 100%;
	background-color: #101010;
	min-height: 100vh;
	display: flex;
	flex-direction: column;

	&-container {
		width: 100%;
		padding: 16rpx 32rpx;
		box-sizing: border-box;

		.filter {
			width: 100%;
			display: flex;
			gap: 20rpx;
			margin-bottom: 28rpx;

			.panel {
				flex: 1;
				padding: 12rpx 20rpx;
				height: 68rpx;
				box-sizing: border-box;
				border-radius: 12rpx;
				background: rgba(255, 255, 255, 0.05);
				display: flex;
				align-items: center;
				justify-content: space-between;

				.left {
					color: #bbb;
					font-size: 24rpx;
					flex: 1;
				}

				.arrow {
					flex-shrink: 0;
					width: 28rpx;
					height: 28rpx;
					margin-left: 10rpx;
				}
			}
		}

		.list {
			display: flex;
			flex-direction: column;
			gap: 32rpx;

			.list-item {
				width: 100%;
				height: 144rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				gap: 24rpx;

				.check {
					flex-shrink: 0;
					width: 32rpx;
					height: 32rpx;

					image {
						width: 100%;
						height: 100%;
						display: block;
					}
				}

				.cover {
					flex-shrink: 0;
					position: relative;
					width: 256rpx;
					height: 100%;
					border-radius: 20rpx;
					overflow: hidden;

					.pic {
						width: 100%;
						height: 100%;
						display: block;
					}

					.type {
						position: absolute;
						top: 0;
						left: 0;
						padding: 4rpx 8rpx;
						box-sizing: border-box;
						border-radius: 20rpx 0 12rpx 0;
						background: rgba(0, 0, 0, 0.6);
						font-size: 20rpx;
						color: #db7fdb;
					}
				}

				.right-panel {
					flex: 1;
					display: flex;
					flex-direction: column;
					gap: 24rpx;

					.title {
						color: #ddd;
						font-size: 26rpx;
						line-height: 32rpx;
						display: -webkit-box;
						/* 弹性伸缩盒子模型 */
						-webkit-line-clamp: 3;
						/* 限制最多显示2行 */
						-webkit-box-orient: vertical;
						/* 垂直排列子元素 */
						overflow: hidden;
					}

					.time {
						display: flex;
						align-items: center;
						gap: 8rpx;
						color: #666;
						font-size: 24rpx;
					}
				}
			}
		}
	}

	.footer {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 100rpx;
		background-color: #202020;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 14rpx 32rpx;
		box-sizing: border-box;

		.all-button {
			display: flex;
			align-items: center;

			image {
				width: 32rpx;
				height: 32rpx;
				margin-right: 20rpx;
			}

			text {
				color: #ddd;
				font-size: 26rpx;
			}
		}

		.button {
			width: 168rpx;
			height: 72rpx;
			border-radius: 20rpx;
			background: #eb5050;
			line-height: 72rpx;
			color: #fff;
			font-size: 32rpx;
			text-align: center;
		}
	}
}

.sort-box {
	padding: 28rpx 40rpx 40rpx;
	box-sizing: border-box;

	.sort-title {
		color: #ddd;
		font-size: 32rpx;
		font-weight: 500;
		line-height: 48rpx;
		margin-bottom: 10rpx;
		text-align: center;
	}

	:deep() {
		.tui-list-cell {
			background-color: transparent !important;
			height: 108rpx;
		}

		.tui-cell__line {
			border-bottom: none;
		}
	}

	.sort-item {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;

		.sort-label {
			color: #ccc;
			font-size: 28rpx;
		}
	}
}

.type-list {
	height: 400rpx;
	overflow-y: auto;
}

.typePopup {
	z-index: 99999;
}
</style>