<template>
  <view class="bw-search" :class="{ 'bw-search--focus': focused }">
    <view class="bw-search__content">
      <view class="bw-search__label" v-if="label">{{ label }}</view>
      <view class="bw-search__field">
        <view class="bw-search__icon">🔍</view>
        <input
          class="bw-search__input"
          :value="modelValue"
          :placeholder="placeholder"
          :disabled="disabled"
          :focus="focus"
          @focus="handleFocus"
          @blur="handleBlur"
          @input="handleInput"
          @confirm="handleConfirm"
        />
        <view v-if="modelValue && clearable" class="bw-search__clear" @tap="handleClear">✕</view>
      </view>
    </view>
    <view v-if="showAction" class="bw-search__action" @tap="handleCancel">{{ actionText }}</view>
  </view>
</template>

<script setup>
const props = defineProps({
  modelValue: { type: String, default: '' },
  label: { type: String, default: '' },
  placeholder: { type: String, default: '搜索' },
  disabled: { type: Boolean, default: false },
  clearable: { type: Boolean, default: true },
  focus: { type: Boolean, default: false },
  showAction: { type: Boolean, default: false },
  actionText: { type: String, default: '取消' }
});

const emit = defineEmits(['update:modelValue', 'focus', 'blur', 'search', 'clear', 'cancel']);

const focused = ref(false);

const handleFocus = (e) => { focused.value = true; emit('focus', e); };
const handleBlur = (e) => { focused.value = false; emit('blur', e); };
const handleInput = (e) => { emit('update:modelValue', e.detail.value); };
const handleConfirm = (e) => { emit('search', e.detail.value); };
const handleClear = () => { emit('update:modelValue', ''); emit('clear'); };
const handleCancel = () => { emit('update:modelValue', ''); emit('cancel'); };
</script>

<script>
import { ref } from 'vue';
export default { name: 'BwSearch' }
</script>

<style scoped lang="scss">
.bw-search {
  display: flex;
  align-items: center;
  padding: 10px 16px;
  background: #fff;
  &__content {
    flex: 1;
    display: flex;
    align-items: center;
    background: #f7f8fa;
    border-radius: 4px;
  }
  &__label { padding-left: 12px; font-size: 14px; color: #323233; }
  &__field { flex: 1; display: flex; align-items: center; padding: 6px 8px; }
  &__icon { font-size: 14px; margin-right: 4px; }
  &__input { flex: 1; font-size: 14px; color: #323233; background: transparent; }
  &__clear { font-size: 12px; color: #c8c9cc; cursor: pointer; }
  &__action { margin-left: 12px; font-size: 14px; color: #1989fa; cursor: pointer; }
}
</style>
