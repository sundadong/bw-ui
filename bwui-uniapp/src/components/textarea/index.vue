<template>
  <view class="bw-textarea">
    <view v-if="label" class="bw-textarea__label">{{ label }}</view>
    <textarea
      class="bw-textarea__field"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :maxlength="maxlength"
      :rows="rows"
      @input="handleInput"
    ></textarea>
    <view v-if="showCount" class="bw-textarea__count">{{ String(modelValue).length }}/{{ maxlength }}</view>
  </view>
</template>

<script setup>
defineProps({
  modelValue: { type: String, default: '' },
  placeholder: { type: String, default: '请输入' },
  disabled: Boolean,
  maxlength: { type: Number, default: 200 },
  rows: { type: Number, default: 3 },
  showCount: Boolean,
  label: { type: String, default: '' }
});
const emit = defineEmits(['update:modelValue']);
const handleInput = (e) => emit('update:modelValue', e.detail.value);
</script>

<style scoped lang="scss">
.bw-textarea {
  background: #fff;
  padding: 12px;

  &__label {
    font-size: 14px;
    color: #323233;
    margin-bottom: 8px;
  }

  &__field {
    width: 100%;
    border: 1px solid #ebedf0;
    border-radius: 4px;
    padding: 10px;
    font-size: 14px;
    resize: none;
    outline: none;
    box-sizing: border-box;
  }

  &__count {
    text-align: right;
    font-size: 12px;
    color: #969799;
    margin-top: 4px;
  }
}
</style>
