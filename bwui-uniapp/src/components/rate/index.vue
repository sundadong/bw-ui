<template>
  <view class="bw-rate" :class="{ 'bw-rate--disabled': disabled }">
    <view
      v-for="i in count"
      :key="i"
      class="bw-rate__item"
      @tap="handleClick(i)"
    >
      <text
        class="bw-rate__icon"
        :class="{ 'bw-rate__icon--active': i <= currentValue, 'bw-rate__icon--half': i - 0.5 <= currentValue && i > currentValue }"
        :style="{ fontSize: size, color: i <= currentValue ? color : '#ebedf0' }"
      >★</text>
    </view>
  </view>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  modelValue: { type: Number, default: 0 },
  count: { type: Number, default: 5 },
  size: { type: String, default: '20px' },
  color: { type: String, default: '#ffd21e' },
  readonly: { type: Boolean, default: false },
  allowHalf: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false }
});

const emit = defineEmits(['update:modelValue', 'change']);

const currentValue = ref(props.modelValue);

watch(() => props.modelValue, (val) => {
  currentValue.value = val;
});

const handleClick = (value) => {
  if (props.disabled || props.readonly) return;
  currentValue.value = value;
  emit('update:modelValue', value);
  emit('change', value);
};
</script>

<style scoped lang="scss">
.bw-rate {
  display: inline-flex;
  align-items: center;
  &--disabled { opacity: 0.5; cursor: not-allowed; }
  &__item { display: flex; align-items: center; }
  &__icon {
    transition: color 0.2s;
    &--active { color: #ffd21e; }
  }
}
</style>
