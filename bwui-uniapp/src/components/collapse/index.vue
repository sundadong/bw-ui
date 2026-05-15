<template>
  <view class="bw-collapse">
    <view v-for="(item, index) in items" :key="index" class="bw-collapse__item" :class="{ 'bw-collapse__item--opened': isOpened(index) }">
      <view class="bw-collapse__title" @tap="toggle(index)">
        <text>{{ item.title }}</text>
        <text class="bw-collapse__arrow">›</text>
      </view>
      <view class="bw-collapse__content" :class="{ 'bw-collapse__content--opened': isOpened(index) }">
        <view class="bw-collapse__wrapper">
          <slot :name="`content-${index}`">{{ item.content }}</slot>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  modelValue: { type: [Array, Number], default: () => [] },
  items: { type: Array, default: () => [] },
  accordion: { type: Boolean, default: false }
});

const emit = defineEmits(['update:modelValue', 'change']);

const openedIndexes = ref(Array.isArray(props.modelValue) ? [...props.modelValue] : []);

const isOpened = (index) => openedIndexes.value.includes(index);

const toggle = (index) => {
  if (props.accordion) {
    if (openedIndexes.value.includes(index)) {
      openedIndexes.value = [];
    } else {
      openedIndexes.value = [index];
    }
    emit('update:modelValue', index);
  } else {
    const idx = openedIndexes.value.indexOf(index);
    if (idx > -1) {
      openedIndexes.value.splice(idx, 1);
    } else {
      openedIndexes.value.push(index);
    }
    emit('update:modelValue', [...openedIndexes.value]);
  }
  emit('change', index);
};
</script>

<style scoped lang="scss">
.bw-collapse {
  &__item {
    border-bottom: 1px solid #ebedf0;
    &:last-child { border-bottom: none; }
    &--opened .bw-collapse__arrow { transform: rotate(90deg); }
  }
  &__title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 16px;
    font-size: 14px;
    color: #323233;
    background: #fff;
  }
  &__arrow { transition: transform 0.3s; font-size: 16px; color: #c8c9cc; }
  &__content {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s;
    &--opened { max-height: 500px; }
  }
  &__wrapper { padding: 12px 16px; font-size: 14px; color: #646566; }
}
</style>
