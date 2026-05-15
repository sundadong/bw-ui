<template>
  <view class="bw-sidebar" :class="{ 'bw-sidebar--border': border }">
    <view
      v-for="(item, index) in items"
      :key="index"
      class="bw-sidebar__item"
      :class="{ 'bw-sidebar__item--active': index === activeIndex }"
      @tap="handleClick(index)"
    >
      <view class="bw-sidebar__content">
        <view v-if="item.dot" class="bw-sidebar__dot"></view>
        <view v-if="item.badge" class="bw-sidebar__badge">{{ item.badge > 99 ? '99+' : item.badge }}</view>
        <text>{{ item.title }}</text>
      </view>
    </view>
  </view>
</template>

<script setup>
const props = defineProps({
  modelValue: { type: Number, default: 0 },
  items: { type: Array, default: () => [] },
  border: { type: Boolean, default: true }
});

const emit = defineEmits(['update:modelValue', 'change']);

const activeIndex = computed(() => props.modelValue);

const handleClick = (index) => {
  emit('update:modelValue', index);
  emit('change', index);
};
</script>

<script>
import { computed } from 'vue';
export default { name: 'BwSidebar' }
</script>

<style scoped lang="scss">
.bw-sidebar {
  width: 85px;
  background: #f7f8fa;
  &--border { border-right: 1px solid #ebedf0; }
  &__item {
    padding: 12px 16px;
    font-size: 14px;
    color: #646566;
    background: #f7f8fa;
    cursor: pointer;
    &--active {
      background: #fff;
      color: #1989fa;
      font-weight: 500;
    }
  }
  &__content { display: flex; align-items: center; justify-content: center; position: relative; }
  &__dot { position: absolute; top: -4px; right: -8px; width: 8px; height: 8px; background: #ee0a24; border-radius: 50%; }
  &__badge { position: absolute; top: -4px; right: -8px; min-width: 16px; height: 16px; padding: 0 4px; background: #ee0a24; color: #fff; font-size: 10px; border-radius: 8px; display: flex; align-items: center; justify-content: center; }
}
</style>
