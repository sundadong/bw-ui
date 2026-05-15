<template>
  <div class="bw-loading" :class="[`bw-loading--${type}`, `bw-loading--${size}`]">
    <div v-if="type === 'circular'" class="bw-loading__circular">
      <div class="bw-loading__circular-circle"></div>
    </div>
    <div v-else class="bw-loading__spinner">
      <div v-for="i in 12" :key="i" class="bw-loading__spinner-item" :style="{ animationDelay: `${(i - 1) * 0.083}s` }"></div>
    </div>
    <div v-if="$slots.default" class="bw-loading__text">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
export interface LoadingProps {
  type?: 'circular' | 'spinner'
  size?: string | number
  color?: string
  vertical?: boolean
}

withDefaults(defineProps<LoadingProps>(), {
  type: 'circular',
  size: '30px',
  color: '',
  vertical: false
})
</script>

<style lang="scss" scoped>
@import '../../styles/variables.scss';

.bw-loading {
  display: inline-flex;
  align-items: center;

  &--vertical {
    flex-direction: column;
  }

  &--small {
    font-size: $bw-icon-size-sm;
  }

  &--medium {
    font-size: $bw-icon-size-md;
  }

  &--large {
    font-size: $bw-icon-size-lg;
  }

  &__circular {
    display: inline-block;
    width: 1em;
    height: 1em;

    &-circle {
      width: 100%;
      height: 100%;
      border: 2px solid transparent;
      border-top-color: currentColor;
      border-radius: 50%;
      animation: bw-loading-rotate 0.8s linear infinite;
    }
  }

  &__spinner {
    display: inline-flex;
    position: relative;
    width: 1em;
    height: 1em;

    &-item {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;

      &::before {
        display: block;
        width: 2px;
        height: 25%;
        margin: 0 auto;
        background-color: currentColor;
        border-radius: 40%;
        content: '';
      }
    }
  }

  &__text {
    margin-left: $bw-padding-xs;
    font-size: $bw-font-size-md;
  }
}

@keyframes bw-loading-rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.bw-loading__spinner-item {
  animation: bw-loading-spinner 1.2s ease-in-out infinite;
}

@keyframes bw-loading-spinner {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0.3;
  }
}
</style>
