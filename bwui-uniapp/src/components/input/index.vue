<template>
  <view class="bw-input">
    <view v-if="label" class="bw-input__label">{{ label }}</view>
    <input
      class="bw-input__field"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      @input="handleInput"
    />
    <view v-if="clearable && modelValue" class="bw-input__clear" @tap="handleClear">×</view>
  </view>
</template>

<script setup>
defineProps({
  modelValue: { type: [String, Number], default: '' },
  type: { type: String, default: 'text' },
  placeholder: { type: String, default: '请输入' },
  disabled: Boolean,
  clearable: Boolean,
  label: { type: String, default: '' }
});

const emit = defineEmits(['update:modelValue']);
const handleInput = (e) => emit('update:modelValue', e.detail.value);
const handleClear = () => emit('update:modelValue', '');
</script>

<style scoped lang="scss">
.bw-input {
  display: flex;
  align-items: center;
  background: #fff;
  padding: 10px 12px;
  border-bottom: 1px solid #ebedf0;

  &__label {
    width: 80px;
    font-size: 14px;
    color: #323233;
    flex-shrink: 0;
  }

  &__field {
    flex: 1;
    border: none;
    outline: none;
    font-size: 14px;
    background: transparent;
  }

  &__clear {
    padding: 4px 8px;
    color: #969799;
    font-size: 18px;
  }
}
</style>
