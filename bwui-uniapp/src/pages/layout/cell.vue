<template>
  <view class="page">
    <Cell title="单元格" value="内容" />
    <Cell title="单元格" value="内容" is-link />
    <Cell title="带图标" value="内容" left-icon="location" is-link />
    <Cell title="带图片" thumb="https://via.placeholder.com/60" value="内容" />
    <Cell title="带标签" value="内容" is-link>
      <template #extra>
        <Tag type="primary">标签</Tag>
      </template>
    </Cell>
  </view>
</template>

<script setup lang="ts">
import Cell from '@/components/layout/cell/index.vue';
import Tag from '@/components/view/tag/index.vue';
</script>

<style lang="scss" scoped>
.page {
  padding: 0;
}
</style>
