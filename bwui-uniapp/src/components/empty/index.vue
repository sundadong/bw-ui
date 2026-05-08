<template>
  <view class="bw-empty">
    <view class="bw-empty__image">
      <slot name="image">
        <image
          v-if="image"
          class="bw-empty__pic"
          :src="image"
          mode="aspectFit"
        ></image>
        <text v-else class="bw-icon bw-icon-file bw-empty__icon"></text>
      </slot>
    </view>
    <view class="bw-empty__tip">
      <slot name="tip">{{ description || '暂无数据' }}</slot>
    </view>
    <view v-if="$slots.default" class="bw-empty__action">
      <slot></slot>
    </view>
  </view>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

export interface EmptyProps {
  image?: string;
  description?: string;
}

withDefaults(defineProps<EmptyProps>(), {
  image: '',
  description: '',
});
</script>

<style lang="scss" scoped>
.bw-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 40px;
  text-align: center;

  &__image {
    margin-bottom: $padding-md;
  }

  &__icon {
    font-size: 50px;
    color: $text-color-3;
  }

  &__pic {
    width: 160px;
    height: auto;
  }

  &__tip {
    display: block;
    font-size: $font-size-lg;
    color: $text-color-3;
  }

  &__action {
    margin-top: $padding-md;
  }
}
</style>
