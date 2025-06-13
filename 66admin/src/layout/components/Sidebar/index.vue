<script setup>
import {} from "vue"
import SidebarMenu from "./SidebarMenu"

const logoHeight = 32
</script>

<template>
  <div class="">
    <div class="logo-container">
      <el-avatar
        :size="logoHeight"
        icon="UserFilled"
      />
      <h1 v-if="$store.getters.sidebarOpened" class="logo-title">
        Vue3后台系统
      </h1>
    </div>
    <el-scrollbar>
      <SidebarMenu />
    </el-scrollbar>
  </div>
</template>

<style lang="scss" scoped>
.logo-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0 22px;
  height: v-bind(logoheight) + "px";
  .logo-title {
    margin-left: 10px;
    line-height: 50px;
    font-weight: 600;
    font-size: 16px;
    color: #fff;
    white-space: nowrap;
  }
}
</style>
