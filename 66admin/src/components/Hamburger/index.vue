<script setup>
import { computed } from "vue"
import { useStore } from "vuex"

const store = useStore()
function toggleClick() {
  store.commit("app/triggerSidebarOpened")
}

const icon = computed(() =>
  store.getters.sidebarOpened ? "hamburger-opened" : "hamburger-closed"
)
</script>

<template>
  <div class="hamburger-container" @click="toggleClick">
    <svg-icon id="guide-hamburger" class="hamburger" :icon="icon" />
  </div>
</template>

<style lang="scss" scoped>
  .hamburger-container {
  padding: 0 16px;
  .hamburger {
    display: inline-block;
    width: 20px;
    height: 20px;
    vertical-align: middle;
  }
}
</style>
