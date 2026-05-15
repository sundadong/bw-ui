<template>
  <view class="bw-empty">
    <view class="bw-empty__image">
      <image v-if="image" :src="image" mode="aspectFit" class="bw-empty__image-img" />
      <view v-else class="bw-empty__image-default">
        <slot name="image"></slot>
      </view>
    </view>
    <view class="bw-empty__description">
      <slot name="description">
        {{ description }}
      </slot>
    </view>
    <view v-if="$slots.default" class="bw-empty__footer">
      <slot></slot>
    </view>
  </view>
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
