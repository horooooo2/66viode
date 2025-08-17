<template>
  <view class="state">
    <view class="s_txt">连载中</view>
    <view class="s_count" @click="openList"
      >共{{ contList.length }}话
      <uni-icons type="right" size="12" color="#999"></uni-icons>
    </view>
  </view>
  <view class="d_list">
    <view class="d_list_wrap">
      <!-- <button
        class="d_list_item current"
        size="default"
        type="default"
      >
        第1话
      </button> -->
      <button
        class="d_list_item"
        size="default"
        type="default"
        v-for="val in contList"
        :key="val.id"
        @click="goContent(val)"
      >
        {{ val.title }}
      </button>
    </view>
  </view>
  <uni-popup ref="popup" safeArea background-color="#101010">
    <view class="list_popup_cont">
      <view class="title">目录</view>
      <view class="sort_wrap">
        <view
          >全部章节
          <text class="list_count">({{ contList.length }})</text></view
        >
        <view class="sort_box">
          <text
            :class="sortType == 'asc' ? 'active' : ''"
            @click="
              sortType = 'asc';
              getChapters();
            "
            >正序</text
          >
          <text space="ensp"> | </text>
          <text
            :class="sortType == 'desc' ? 'active' : ''"
            @click="
              sortType = 'desc';
              getChapters();
            "
            >倒叙</text
          >
        </view>
      </view>
      <uni-list class="list_wrap" :border="false">
        <!-- <uni-list-item  title="列表文字" clickable="true"  class="list_item" :border="false"></uni-list-item>
				<uni-list-item  title="列表文字" clickable="true" class="list_item" :border="false"></uni-list-item>
				<uni-list-item  title="列表文字" clickable="true" class="list_item" :border="false"></uni-list-item> -->

        <!-- <uni-list-item class="list_item" :border="false">
          <template v-slot:body>
            <view>
              <text class="list_text active">01 内容内容</text>
            </view>
          </template>
        </uni-list-item> -->

        <uni-list-item
          class="list_item"
          :border="false"
          v-for="(item, index) in contList"
          :key="item.id"
        >
          <template v-slot:body>
            <view class="list_cont" @click="goContent(item)">
              <text class="list_text">{{ index + 1 }} {{ item.title }}</text>
            </view>
          </template>
        </uni-list-item>
      </uni-list>
    </view>
  </uni-popup>
</template>

<script setup>
import {
  ref,
  reactive,
  defineEmits,
  defineProps,
  watchEffect,
  onMounted,
} from "vue";
import {
  apiGetImageChapters,
  apiGetNovelChapters,
} from "@/common/api/content.js";
const props = defineProps({
  detailData: {
    type: Object,
    default: () => ({}),
  },
});
const popup = ref(null);
const contList = ref([]);
const sortType = ref("asc"); // asc, desc

const openList = () => {
  popup.value.open("bottom");
};

const getChapters = async () => {
  let res = {};
  if (props.detailData.type === "image") {
    res = await apiGetImageChapters({
      id: props.detailData.id,
      order: sortType.value,
    });
    console.log("res=", res);
  } else if (props.detailData.type === "novel") {
    res = await apiGetNovelChapters({
      id: props.detailData.id,
      order: sortType.value,
    });
    console.log("res=", res);
  }
  if (res.code === 0) {
    contList.value = res?.data || [];
  } else {
    uni.showToast({
      title: res.msg || "获取章节失败",
      icon: "none",
    });
  }
};
const goContent = (item) => {
  uni.navigateTo({
    url: `/pages/detail/content?type=${props.detailData.type}&id=${props.detailData.id}&chapter_id=${item.id}`,
  });
  popup.value.close();
};
onMounted(async () => {
  getChapters();
});
</script>

<style lang="scss" scoped>
.state {
  margin-top: 40rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .s_txt {
    color: #ccc;
    font-size: 25rpx;
  }
  .s_count {
    font-size: 22rpx;
    color: #999;
  }
}

.d_list {
  padding: 20rpx;
  overflow: auto;
  max-width: 100%;
  display: flex;
  .d_list_wrap {
    display: flex;
  }
  .d_list_item {
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
      border-color: #ff1a8c;
      color: #ff1a8c;
    }
  }

  .btn-hover {
    border-color: #ff1a8c;
    color: #ff1a8c;
  }
}

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
		.uni-list-item__container{
			padding: 0;
		}
	}
	.list_cont{
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
</style>