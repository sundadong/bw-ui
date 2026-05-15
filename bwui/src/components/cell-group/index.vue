<template>
  <div class="bw-cell-group">
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
.bw-cell-group {
  &__title {
    padding: $bw-padding-md $bw-padding-md $bw-padding-sm;
    font-size: $bw-font-size-md;
    color: $bw-text-color-2;
    line-height: $bw-line-height-sm;
  }

  &__content {
    background-color: $bw-bg-color;
  }
}

.bw-cell-group--inset {
  margin: $bw-padding-md;
  border-radius: $bw-border-radius-lg;

  .bw-cell-group__content {
    border-radius: $bw-border-radius-lg;
    overflow: hidden;
  }
}
</style>
