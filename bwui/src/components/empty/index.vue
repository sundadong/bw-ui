<template>
  <div class="bw-empty">
    <div class="bw-empty__image">
      <img v-if="image" :src="image" class="bw-empty__image-img" alt="" />
      <div v-else class="bw-empty__image-default">
        <div class="bw-empty__icon">{{ emptyIcon }}</div>
      </div>
    </div>
    <div class="bw-empty__description">
      <slot name="description">
        {{ description }}
      </slot>
    </div>
    <div v-if="$slots.default" class="bw-empty__footer">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export interface EmptyProps {
  image?: string
  description?: string
  type?: 'empty' | 'error' | 'network'
}

const props = withDefaults(defineProps<EmptyProps>(), {
  image: '',
  description: '暂无数据',
  type: 'empty'
})

const emptyIcon = computed(() => {
  const icons: Record<string, string> = {
    empty: '📭',
    error: '⚠',
    network: '📡'
  }
  return icons[props.type] || icons.empty
})
</script>

<style lang="scss">
.bw-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px 16px;

  &__image {
    margin-bottom: 16px;

    &-img {
      width: 200px;
      height: 200px;
    }

    &__default {
      width: 200px;
      height: 200px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &-icon {
      font-size: 80px;
      line-height: 1;
    }
  }

  &__description {
    font-size: 14px;
    color: #969799;
    text-align: center;
    line-height: 1.5;
    margin-bottom: 16px;
  }

  &__footer {
    margin-top: 16px;
  }
}
</style>
