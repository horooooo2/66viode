<template>
	<view class="content_page">
		<view class="leftIcon">
			<uni-icons type="left" size="22" color="#fff" @click="goBack"></uni-icons>
			<view class="title">{{ contentData.data?.chapter_title || '' }}</view>
			<uni-icons class="fx_icon" type="redo" size="22" color="#fff"></uni-icons>
		</view>
		<view class="content">
			<view class="font" v-html="contentData.data?.content"></view>
		</view>
		<view class="c_bottom">
			<uni-icons type="back" size="22" color="#fff" @click="prev"></uni-icons>
			<uni-icons type="bars" size="22" color="#fff" @click="openList"></uni-icons>
			<uni-icons type="forward" size="22" color="#fff" @click="next"></uni-icons>
		</view>
		<uni-popup ref="popup" class="c_list_popup" safeArea background-color="#101010">
			<view class="list_popup_cont">
				<view class="title">目录</view>
				<view class="sort_wrap">
					<view>全部章节 <text class="list_count">({{ contList.length }})</text></view>
					<view class="sort_box">
						<text :class="sortType == 'asc' ? 'active' : ''" @click="
						sortType = 'asc';
						">正序</text>
						<text space="ensp"> | </text>
						<text :class="sortType == 'desc' ? 'active' : ''" @click="
						sortType = 'desc';
						">倒叙</text>
					</view>
				</view>
				<uni-list class="list_wrap" :border="false">
					<uni-list-item class="list_item" :border="false" v-for="(item,index) in sortContList"
						:key="item.id">
						<template v-slot:body>
							<view class="list_cont" @click="() => changeChapter(item.id)">
								<text class="list_text"
									:class="item.id == contentData.chapter_id?'active' : ''">{{ index + 1 }}
									{{ item.title }}</text>
							</view>
						</template>
					</uni-list-item>
				</uni-list>
			</view>
		</uni-popup>
	</view>
</template>

<script setup>
	import {
		ref,
		reactive,
		defineEmits,
		defineProps,
		watchEffect,
		onMounted,
		computed
	} from 'vue'
	import {
		apiGetImageContent,
		apiGetNovelContent,
		apiGetImageChapters,
		apiGetNovelChapters
	} from "@/common/api/content.js";
	import {
		onLoad
	} from '@dcloudio/uni-app'

	const contentData = reactive({
		id: '',
		type: '', // image, novel
		chapter_id: '', // 章节ID
		data: null
	})

	const popup = ref(null);
	const contList = ref([]);
	const sortType = ref("asc"); // asc, desc

	const sortContList = computed(() => {
		if (sortType.value === 'asc') {
			return contList.value;
		} else {
			return [...contList.value].reverse();
		}
	})

	const openList = () => {
		popup.value.open("bottom");
	};
	const processedContent = computed(() => {
		if (!props.content) return ''

		// 方法1：使用正则替换给图片添加样式
		return props.content.replace(/<img([^>]*)>/g, (match, attributes) => {
			return `<img${attributes} style="width:100%;max-width:100%;height:auto;display:block;">`
		})

		// 或者方法2：添加 class
		// return props.content.replace(/<img([^>]*)>/g, '<img$1 class="rich-text-img">')
	})
	const getChapters = async () => {
		let res = {};
		if (contentData.type === "image") {
			res = await apiGetImageChapters({
				id: contentData.id,
				order: sortType.value,
			});
			console.log("res=", res);
		} else if (contentData.type === "novel") {
			res = await apiGetNovelChapters({
				id: contentData.id,
				order: sortType.value,
			});
			console.log("res=", res);
		}
		if (res.code === 0) {
			contList.value = res.data || [];
		} else {
			uni.showToast({
				title: res.msg || "获取章节失败",
				icon: "none",
			});
		}
	};

	onMounted(() => {

	})

	onLoad((options) => {
		console.log('onload options=', options);
		if (options.id) {
			contentData.id = options.id;
			contentData.type = options.type || '';
			contentData.chapter_id = options.chapter_id || '';
			getContent();
			getChapters();
		}
	})

	const getContent = async () => {
		let res = {};
		if (contentData.type === 'image') {
			res = await apiGetImageContent({
				id: contentData.id,
				chapter_id: contentData.chapter_id,
				loading: true
			});
		} else if (contentData.type === 'novel') {
			res = await apiGetNovelContent({
				id: contentData.id,
				chapter_id: contentData.chapter_id,
				loading: true
			});
		}
		if (res.code === 0 && res.data) {
			contentData.data = res.data;
		}
	}
	const changeChapter = (chapter_id) => {
		console.log('chapter_id=', chapter_id);

		contentData.chapter_id = chapter_id;
		getContent();
		popup.value.close();
	}

	const prev = () => {
		console.log('contentData.value=', contentData);
		console.log('contList.value=', contList.value);

		let index = contList.value.findIndex(item => item.id == contentData.chapter_id);
		if (index > 0) {
			let prevItem = contList.value[index - 1];
			console.log('index=', index);
			console.log('prevItem=', prevItem);
			contentData.chapter_id = prevItem.id;
			getContent();
			// uni.navigateTo({
			// 	url: `/pages/detail/content?type=${contentData.type}&id=${contentData.id}&chapter_id=${prevItem.id}`,
			// });
		} else {
			uni.showToast({
				title: '已经是第一章了',
				icon: 'none'
			})
		}
	}
	const next = () => {
		console.log('contentData.value=', contentData);
		console.log('contList.value=', contList.value);

		let index = contList.value.findIndex(item => item.id == contentData.chapter_id);
		console.log('index11=', index);
		if (index < contList.value.length - 1) {
			let nextItem = contList.value[index + 1];
			console.log('index22=', index);
			console.log('nextItem=', nextItem);

			contentData.chapter_id = nextItem.id;
			getContent();
			// uni.navigateTo({
			// 	url: `/pages/detail/content?type=${contentData.type}&id=${contentData.id}&chapter_id=${nextItem.id}`,
			// });
		} else {
			uni.showToast({
				title: '已经是最后一章了',
				icon: 'none'
			})
		}
	}

	const goBack = () => {
		uni.navigateBack();
	}
</script>

<style lang="scss" scoped>
	.content_page {
		background: #111;
		min-height: 100vh;
	}

	.leftIcon {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 9;
		width: 100%;
		height: 80rpx;
		padding-left: 15rpx;
		display: flex;
		align-items: center;
		color: #fff;
		font-size: 24rpx;
		background: #111;

		.title {
			margin-left: 20rpx;
			color: #fff;
		}

		.fx_icon {
			position: absolute;
			right: 20rpx;
		}
	}

	.c_bottom {
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 9;
		width: 100%;
		height: 80rpx;
		display: flex;
		justify-content: space-around;
		align-items: center;
		color: #fff;
		background: rgba(0, 0, 0, 0.8);

		.uni-icons {
			padding: 0 20rpx;
		}
	}

	.content {
	    padding: 80rpx 20rpx;
	    background: #111;
	    color: #fff;
	    width: 100%;
	}
	
	/* 使用深度选择器穿透 v-html */
	::v-deep .font img {
	    width: 100% !important;
	    max-width: 100% !important;
	    height: auto !important;
	    display: block !important;
	}

	.c_list_popup {
		.list_popup_cont {
			height: 80vh;
			color: #ccc;
			display: flex;
			flex-flow: column;

			.title {
				padding-top: 30rpx;
				text-align: center;
				font-size: 28rpx;
			}

			.sort_wrap {
				margin-top: 10rpx;
				display: flex;
				justify-content: space-between;
				padding: 20rpx 20rpx;
				font-size: 24rpx;

				.list_count {
					font-size: 22rpx;
				}

				.sort_box {
					color: #999;
					display: flex;
					align-items: center;
					font-size: 22rpx;
				}
			}

			.list_wrap {
				flex: 1;
				overflow: auto;
				background: transparent;

				.list_item {
					background: transparent !important;
				}

				:deep() {
					.uni-list-item__container {
						padding: 0;
					}
				}

				.list_cont {
					width: 100%;
					padding: 12px 15px;
					margin-right: 20rpx;
				}

				.list_text {
					font-size: 24rpx;
				}
			}

			.active {
				color: #ff1a8c;
			}
		}
	}
</style>