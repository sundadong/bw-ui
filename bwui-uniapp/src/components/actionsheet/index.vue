<template>
  <transition name="bw-actionsheet">
    <view v-if="modelValue" class="bw-actionsheet" @tap="handleClose">
      <view class="bw-actionsheet__content" @tap.stop>
        <view v-if="title" class="bw-actionsheet__header">
          <text>{{ title }}</text>
        </view>
        <view class="bw-actionsheet__items">
          <view
            v-for="(item, index) in actions"
            :key="index"
            class="bw-actionsheet__item"
            :class="{ 'bw-actionsheet__item--disabled': item.disabled }"
            @tap="handleSelect(item, index)"
          >
            <text v-if="item.name">{{ item.name }}</text>
            <slot v-else></slot>
          </view>
        </view>
        <view v-if="cancel" class="bw-actionsheet__cancel" @tap="handleClose">
          取消
        </view>
      </view>
    </view>
  </transition>
</template>

<script setup>
defineProps({
  modelValue: { type: Boolean, default: false },
  title: { type: String, default: '' },
  actions: { type: Array, default: () => [] },
  cancel: { type: Boolean, default: true }
});

const emit = defineEmits(['update:modelValue', 'select', 'close']);

const handleSelect = (item, index) => {
  if (item.disabled) return;
  emit('select', item, index);
  emit('update:modelValue', false);
};

const handleClose = () => {
  emit('update:modelValue', false);
  emit('close');
};
</script>

<style scoped lang="scss">
.bw-actionsheet {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.6);

  &__content {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: #fff;
    border-radius: 12px 12px 0 0;
  }

  &__header {
    padding: 16px;
    text-align: center;
    font-size: 14px;
    color: #646566;
    border-bottom: 1px solid #ebedf0;
  }

  &__items { padding: 8px 0; }

  &__item {
    padding: 16px;
    text-align: center;
    font-size: 16px;
    color: #323233;
    &:active { background: #f7f8fa; }
    &--disabled { color: #c8c9cc; cursor: not-allowed; }
  }

  &__cancel {
    margin: 8px 0;
    padding: 16px;
    text-align: center;
    font-size: 16px;
    color: #323233;
    background: #fff;
    border-top: 8px solid #f7f8fa;
    &:active { background: #f7f8fa; }
  }
}

.bw-actionsheet-enter-active, .bw-actionsheet-leave-active { transition: opacity 0.2s; }
.bw-actionsheet-enter-from, .bw-actionsheet-leave-to { opacity: 0; }
</style>
