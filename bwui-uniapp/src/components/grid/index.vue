<template>
  <view class="bw-grid" :class="{ 'bw-grid--border': border }">
    <view
      v-for="(item, index) in columns"
      :key="index"
      class="bw-grid__item"
      :class="{ 'bw-grid__item--border': border }"
      :style="itemStyle"
      @tap="handleClick(index)"
    >
      <view class="bw-grid__content">
        <view v-if="item.icon" class="bw-grid__icon">{{ item.icon }}</view>
        <image v-else-if="item.image" :src="item.image" class="bw-grid__image" />
        <view v-if="item.title" class="bw-grid__title">{{ item.title }}</view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  columns: { type: Array, default: () => [] },
  columnNum: { type: Number, default: 4 },
  border: { type: Boolean, default: true },
  center: { type: Boolean, default: true },
  square: { type: Boolean, default: false }
});

const emit = defineEmits(['click']);

const itemStyle = computed(() => ({
  width: `${100 / props.columnNum}%`
}));

const handleClick = (index) => {
  emit('click', index);
};
</script>

<style scoped lang="scss">
.bw-grid {
  display: flex;
  flex-wrap: wrap;
  &--border { border-top: 1px solid #ebedf0; border-left: 1px solid #ebedf0; }
  &__item {
    padding: 20px 0;
    &--border { border-right: 1px solid #ebedf0; border-bottom: 1px solid #ebedf0; }
  }
  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  &__icon { font-size: 28px; margin-bottom: 8px; }
  &__image { width: 28px; height: 28px; margin-bottom: 8px; }
  &__title { font-size: 12px; color: #646566; text-align: center; }
}
</style>
