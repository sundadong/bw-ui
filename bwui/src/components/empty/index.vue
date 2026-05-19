<template>
  <div class="bw-empty">
    <div class="bw-empty__image">
      <img v-if="image" :src="image" class="bw-empty__image-img" alt="" />
      <div v-else class="bw-empty__image-default">
        <span class="bw-empty__icon" style="display: none;">{{ emojiIcon }}</span>
        <bw-icon :name="emptyIcon" :size="80" />
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
import BwIcon from '../icon/index.vue'

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
    empty: 'records-o',
    error: 'fail',
    network: 'warning-o'
  }
  return icons[props.type] || icons.empty
})

const emojiIcon = computed(() => {
  const icons: Record<string, string> = {
    empty: '📭',
    error: '⚠',
    network: '📡'
  }
  return icons[props.type] || icons.empty
})
</script>

<style lang="less">
@import '../../styles/variables.less';

.bw-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: @bw-padding-xl * 2  @bw-padding-md;
  color: @bw-text-color-2;

  &__image {
    margin-bottom: @bw-padding-md;

    &-img {
      width: 160px;
      height: 160px;
      display: block;
    }

    &-default {
      width: 160px;
      height: 160px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  &__description {
    font-size: @bw-font-size-md;
    color: @bw-text-color-2;
    text-align: center;
    line-height: @bw-line-height-md;
    margin-bottom: @bw-padding-md;
  }

  &__footer {
    margin-top: @bw-padding-md;
  }
}
</style>
