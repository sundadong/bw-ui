<template>
  <div v-if="loading" :class="bemClass" :style="containerStyle">
    <div v-if="title" class="bw-skeleton__title" :style="titleStyle"></div>
    <div v-if="avatar" class="bw-skeleton__avatar" :class="[`bw-skeleton__avatar--${avatarShape}`]" :style="avatarStyle"></div>
    <div class="bw-skeleton__rows">
      <div
        v-for="(width, index) in computedRowWidths"
        :key="index"
        class="bw-skeleton__row"
        :class="{ 'bw-skeleton__row--round': round }"
        :style="{ width: typeof width === 'number' ? width + 'px' : width }"
      ></div>
    </div>
  </div>
  <div v-else>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export interface SkeletonProps {
  row?: number
  rowWidth?: (string | number)[]
  title?: boolean
  avatar?: boolean
  avatarSize?: string | number
  avatarShape?: 'round' | 'square'
  loading?: boolean
  animate?: boolean
  round?: boolean
  titleWidth?: string | number
}

const props = withDefaults(defineProps<SkeletonProps>(), {
  row: 3,
  rowWidth: () => [],
  title: false,
  avatar: false,
  avatarSize: 32,
  avatarShape: 'round',
  loading: true,
  animate: true,
  round: false,
  titleWidth: '40%'
})

const bemClass = computed(() => {
  return [
    'bw-skeleton',
    {
      'bw-skeleton--animate': props.animate,
      'bw-skeleton--avatar': props.avatar
    }
  ]
})

const containerStyle = computed(() => {
  const style: Record<string, string> = {}
  if (props.avatar) {
    style.paddingLeft = '0'
  }
  return style
})

const avatarSizeValue = computed(() => {
  if (typeof props.avatarSize === 'number') {
    return props.avatarSize + 'px'
  }
  return props.avatarSize
})

const avatarStyle = computed(() => {
  return {
    width: avatarSizeValue.value,
    height: avatarSizeValue.value
  }
})

const titleStyle = computed(() => {
  return {
    width: typeof props.titleWidth === 'number' ? props.titleWidth + 'px' : props.titleWidth
  }
})

const computedRowWidths = computed(() => {
  const widths: (string | number)[] = []
  for (let i = 0; i < props.row; i++) {
    if (props.rowWidth && props.rowWidth[i] !== undefined) {
      widths.push(props.rowWidth[i])
    } else if (i === props.row - 1) {
      widths.push('60%')
    } else {
      widths.push('100%')
    }
  }
  return widths
})
</script>

<style lang="scss" scoped>
@import '../../styles/variables.scss';

.bw-skeleton {
  display: flex;
  padding: 0 $bw-padding-md;
  flex-wrap: wrap;

  &--avatar {
    padding-left: 0;
  }

  &--animate {
    .bw-skeleton__title,
    .bw-skeleton__row,
    .bw-skeleton__avatar {
      background: linear-gradient(
        90deg,
        $bw-active-color 25%,
        #e8e8e8 37%,
        $bw-active-color 63%
      );
      background-size: 400% 100%;
      animation: bw-skeleton-shimmer 1.4s ease infinite;
    }
  }

  &__avatar {
    flex-shrink: 0;
    background-color: $bw-active-color;
    margin-right: $bw-padding-md;
    margin-bottom: $bw-padding-sm;

    &--round {
      border-radius: $bw-border-radius-round;
    }

    &--square {
      border-radius: $bw-border-radius-md;
    }
  }

  &__title {
    width: 40%;
    height: 16px;
    background-color: $bw-active-color;
    margin-bottom: $bw-padding-sm;
    flex-shrink: 0;
  }

  &__rows {
    flex: 1;
    min-width: 0;
  }

  &__row {
    height: 16px;
    background-color: $bw-active-color;
    margin-bottom: $bw-padding-sm;

    &--round {
      border-radius: $bw-border-radius-round;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }
}

@keyframes bw-skeleton-shimmer {
  0% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0 50%;
  }
}
</style>