<template>
  <div class="bw-empty">
    <div class="bw-empty__image">
      <image v-if="image" :src="image" mode="aspectFit" class="bw-empty__image-img" />
      <div v-else class="bw-empty__image-default">
        <slot name="image"></slot>
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
export interface EmptyProps {
  image?: string
  description?: string
  type?: 'empty' | 'error' | 'network'
}

withDefaults(defineProps<EmptyProps>(), {
  image: '',
  description: '暂无数据',
  type: 'empty'
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

    &-default {
      width: 200px;
      height: 200px;
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
