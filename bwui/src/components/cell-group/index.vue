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
  background-color: $bw-bg-color;
  
  &__title {
    padding: $bw-padding-md $bw-padding-md $bw-padding-sm;
    font-size: $bw-font-size-sm;
    color: $bw-text-color-2;
    line-height: $bw-line-height-sm;
  }

  &__content {
    background-color: $bw-white;
    
    :deep(.bw-cell) {
      background-color: $bw-white;
    }
    
    :deep(.bw-cell:last-child) {
      &::after {
        display: none;
      }
    }
  }

  &--inset {
    margin: $bw-padding-md;
    border-radius: $bw-border-radius-lg;
    overflow: hidden;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
    background-color: transparent;

    .bw-cell-group__content {
      border-radius: $bw-border-radius-lg;
      background-color: $bw-white;
      
      :deep(.bw-cell:first-child) {
        border-radius: $bw-border-radius-lg $bw-border-radius-lg 0 0;
      }
      
      :deep(.bw-cell:last-child) {
        border-radius: 0 0 $bw-border-radius-lg $bw-border-radius-lg;
        
        &::after {
          display: none;
        }
      }
    }
  }
}
</style>
