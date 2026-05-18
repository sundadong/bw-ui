<template>
  <div class="demo-page">
    <bw-navbar
      :title="title"
      :left-arrow="true"
      @click-left="handleBack"
    />

    <div class="demo-content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import BwNavbar from '../components/navbar/index.vue'

interface Props {
  title: string
}

defineProps<Props>()

const router = useRouter()

const handleBack = () => {
  router.back()
}
</script>

<style lang="less" scoped>
.demo-page {
  min-height: 100vh;
  background-color: #f7f8fa;
}

.demo-content {
  padding: 16px;
}
</style>
