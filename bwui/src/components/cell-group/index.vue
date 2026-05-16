<template>
  <div class="bw-cell-group" :class="{ 'bw-cell-group--inset': inset }">
    <div v-if="title || $slots.title" class="bw-cell-group__title">
      <slot name="title">{{ title }}</slot>
    </div>
    <div class="bw-cell-group__content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
export interface CellGroupProps {
  title?: string
  inset?: boolean
}

withDefaults(defineProps<CellGroupProps>(), {
  inset: false
})
</script>

<style lang="scss" scoped>
@import '../../styles/variables.scss';

.bw-cell-group {
  &__title {
    padding: $bw-padding-md $bw-padding-md $bw-padding-sm;
    font-size: $bw-font-size-sm;
    color: $bw-text-color-2;
    line-height: $bw-line-height-sm;
  }

  &__content {
    background-color: $bw-bg-color;
  }

  &--inset {
    margin: $bw-padding-md;
    border-radius: $bw-border-radius-lg;
    overflow: hidden;

    .bw-cell-group__content {
      border-radius: $bw-border-radius-lg;
    }
  }
}
</style>
