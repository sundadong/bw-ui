<template>
  <div
    class="bw-safe-area"
    :class="{
      'bw-safe-area--top': position === 'top',
      'bw-safe-area--bottom': position === 'bottom'
    }"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
export interface SafeAreaProps {
  position?: 'top' | 'bottom'
}

withDefaults(defineProps<SafeAreaProps>(), {
  position: 'top'
})
</script>

<style lang="scss" scoped>
@import '../../styles/variables.scss';

.bw-safe-area {
  &--top {
    padding-top: constant(safe-area-inset-top);
    padding-top: env(safe-area-inset-top);
  }

  &--bottom {
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
  }
}
</style>