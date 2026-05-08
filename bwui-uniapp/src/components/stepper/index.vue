<template>
  <view class="bw-stepper">
    <view class="bw-stepper__btn" :class="{ disabled: value <= min }" @tap="decrease">−</view>
    <input class="bw-stepper__input" type="number" :value="value" :disabled="disabled" @change="handleChange" />
    <view class="bw-stepper__btn" :class="{ disabled: value >= max }" @tap="increase">+</view>
  </view>
</template>

<script setup>
const props = defineProps({
  modelValue: { type: Number, default: 0 },
  min: { type: Number, default: 0 },
  max: { type: Number, default: 100 },
  step: { type: Number, default: 1 },
  disabled: Boolean
});

const emit = defineEmits(['update:modelValue', 'change']);
const value = defineModel();

const decrease = () => {
  if (value.value > props.min) {
    value.value = Math.max(props.min, value.value - props.step);
    emit('change', value.value);
  }
};

const increase = () => {
  if (value.value < props.max) {
    value.value = Math.min(props.max, value.value + props.step);
    emit('change', value.value);
  }
};

const handleChange = (e) => {
  let val = parseInt(e.detail.value) || props.min;
  val = Math.max(props.min, Math.min(props.max, val));
  value.value = val;
  emit('change', val);
};
</script>

<style scoped lang="scss">
.bw-stepper {
  display: inline-flex;
  align-items: center;
  border: 1px solid #ebedf0;
  border-radius: 4px;
  overflow: hidden;

  &__btn {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f7f8fa;
    font-size: 18px;
    color: #323233;
    &.disabled { color: #ccc; }
  }

  &__input {
    width: 50px;
    height: 32px;
    text-align: center;
    border: none;
    border-left: 1px solid #ebedf0;
    border-right: 1px solid #ebedf0;
    font-size: 14px;
    outline: none;
  }
}
</style>
