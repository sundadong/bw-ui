<template>
  <view class="bw-tag" :class="[`bw-tag--${type}`, `bw-tag--${size}`, { 'bw-tag--plain': plain }, { 'bw-tag--round': round }]">
    <slot></slot>
    <view v-if="closeable" class="bw-tag__close" @tap="handleClose">×</view>
  </view>
</template>

<script setup>
defineProps({
  type: { type: String, default: 'default' },
  size: { type: String, default: 'medium' },
  plain: Boolean,
  round: Boolean,
  closeable: Boolean
});
const emit = defineEmits(['close']);
const handleClose = () => emit('close');
</script>

<style scoped lang="scss">
.bw-tag {
  display: inline-flex;
  align-items: center;
  padding: 0 8px;
  font-size: 12px;
  border-radius: 2px;
  margin-right: 8px;
  margin-bottom: 8px;
  &--default { background: #f7f8fa; color: #646566; }
  &--primary { background: #e6f4ff; color: #1989fa; &.bw-tag--plain { background: transparent; border: 1px solid #1989fa; } }
  &--success { background: #f6ffed; color: #07c160; }
  &--warning { background: #fffbe6; color: #ff976a; }
  &--danger { background: #fff2f0; color: #ee0a24; }
  &--small { height: 22px; font-size: 10px; }
  &--medium { height: 28px; }
  &--large { height: 34px; font-size: 14px; }
  &--round { border-radius: 999px; }
  &__close { margin-left: 4px; font-size: 14px; opacity: 0.7; cursor: pointer; }
}
</style>
