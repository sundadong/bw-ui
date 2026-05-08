<template>
  <view
    class="bw-avatar"
    :class="avatarClass"
    :style="avatarStyle"
  >
    <image
      v-if="src && !loadError"
      class="bw-avatar__image"
      :src="src"
      :mode="mode"
      @error="handleError"
    ></image>
    <text v-else class="bw-avatar__text">
      <slot>{{ text }}</slot>
    </text>
  </view>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed, ref } from 'vue';

export interface AvatarProps {
  src?: string;
  text?: string;
  size?: 'small' | 'medium' | 'large' | number;
  shape?: 'square' | 'circle';
  mode?: 'scaleToFill' | 'aspectFit' | 'aspectFill' | 'widthFix' | 'heightFix' | 'top' | 'bottom' | 'center' | 'left' | 'right';
}

const props = withDefaults(defineProps<AvatarProps>(), {
  src: '',
  text: '',
  size: 'medium',
  shape: 'square',
  mode: 'scaleToFill',
});

const emit = defineEmits<{
  error: [];
}>();

const loadError = ref(false);

const avatarClass = computed(() => {
  const classes: string[] = [];
  if (typeof props.size === 'string') {
    classes.push(`bw-avatar--${props.size}`);
  }
  if (props.shape === 'circle') {
    classes.push('bw-avatar--circle');
  }
  return classes;
});

const avatarStyle = computed(() => {
  const style: Record<string, string> = {};
  if (typeof props.size === 'number') {
    style.width = `${props.size}px`;
    style.height = `${props.size}px`;
  }
  return style;
});

const handleError = () => {
  loadError.value = true;
  emit('error');
};
</script>

<style lang="scss" scoped>
.bw-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  background-color: #f7f8fa;
  border-radius: $border-radius-md;
  overflow: hidden;

  &--small {
    width: 45px;
    height: 45px;
  }

  &--large {
    width: 75px;
    height: 75px;
  }

  &--circle {
    border-radius: 50%;
  }

  &__image {
    width: 100%;
    height: 100%;
  }

  &__text {
    font-size: $font-size-lg;
    color: $text-color-2;
  }
}
</style>
