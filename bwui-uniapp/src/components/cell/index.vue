<template>
  <view class="bw-cell" :class="{ 'bw-cell--clickable': clickable }" @tap="handleClick">
    <view class="bw-cell__title">
      <text class="bw-cell__label">{{ title }}</text>
      <text v-if="label" class="bw-cell__desc">{{ label }}</text>
    </view>
    <view class="bw-cell__value"><slot>{{ value }}</slot></view>
    <view v-if="isLink" class="bw-cell__arrow">›</view>
  </view>
</template>

<script setup>
const props = defineProps({
  title: { type: String, default: '' },
  value: { type: String, default: '' },
  label: { type: String, default: '' },
  isLink: { type: Boolean, default: false },
  clickable: { type: Boolean, default: false }
});
const emit = defineEmits(['click']);
const handleClick = () => {
  if (props.clickable || props.isLink) emit('click');
};
</script>

<style scoped lang="scss">
.bw-cell {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  background: #fff;
  border-bottom: 1px solid #ebedf0;
  &--clickable {
    cursor: pointer;
    &:active { background: #f7f8fa; }
  }
  &__title { flex: 1; display: flex; flex-direction: column; }
  &__label { font-size: 14px; color: #323233; }
  &__desc { font-size: 12px; color: #969799; margin-top: 4px; }
  &__value { font-size: 14px; color: #646566; margin-left: 8px; }
  &__arrow { font-size: 20px; color: #969799; margin-left: 8px; }
}
</style>
