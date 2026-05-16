<template>
  <div class="bw-card" :class="{ 'bw-card--border': border }" @click="handleClick">
    <div class="bw-card__header">
      <div class="bw-card__thumb" @click.stop="handleThumbClick">
        <component
          :is="thumbLink ? 'a' : 'div'"
          :href="thumbLink"
        >
          <img
            v-if="thumb"
            :src="thumb"
            :loading="lazyLoad ? 'lazy' : undefined"
            class="bw-card__thumb-image"
            :alt="title"
          />
          <slot v-else name="thumb"></slot>
        </component>
      </div>
      <div class="bw-card__content">
        <div class="bw-card__header-row">
          <div class="bw-card__title">
            <slot name="title">{{ title }}</slot>
          </div>
          <div v-if="tag || $slots.tag" class="bw-card__tag">
            <slot name="tag">
              <bw-tag v-if="tag" mark>{{ tag }}</bw-tag>
            </slot>
          </div>
        </div>
        <div class="bw-card__desc">
          <slot name="desc">{{ desc }}</slot>
        </div>
        <div class="bw-card__footer">
          <div class="bw-card__price">
            <template v-if="price || price === 0">
              <span class="bw-card__price-currency">{{ currency }}</span>
              <span class="bw-card__price-integer">{{ formatPrice(price) }}</span>
            </template>
            <span v-if="originPrice || originPrice === 0" class="bw-card__price-origin">
              {{ currency }}{{ formatPrice(originPrice) }}
            </span>
          </div>
          <div v-if="num || num === 0 || $slots.num" class="bw-card__num">
            <slot name="num">x{{ num }}</slot>
          </div>
        </div>
      </div>
    </div>
    <div v-if="$slots.footer" class="bw-card__footer-extra">
      <slot name="footer"></slot>
    </div>
    <div v-if="$slots.bottom" class="bw-card__bottom">
      <slot name="bottom"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import BwTag from '../tag/index.vue'

export interface CardProps {
  title?: string
  desc?: string
  thumb?: string
  price?: string | number
  num?: string | number
  originPrice?: string | number
  centered?: boolean
  currency?: string
  thumbLink?: string
  lazyLoad?: boolean
  tag?: string
  border?: boolean
}

const props = withDefaults(defineProps<CardProps>(), {
  currency: '¥',
  lazyLoad: false,
  border: true
})

const emit = defineEmits<{
  click: [event: Event]
  'click-thumb': [event: Event]
}>()

const handleClick = (event: Event) => {
  emit('click', event)
}

const handleThumbClick = (event: Event) => {
  emit('click-thumb', event)
}

const formatPrice = (price: string | number): string => {
  if (typeof price === 'number') {
    return price.toFixed(2)
  }
  const num = parseFloat(price)
  if (isNaN(num)) return price
  return num.toFixed(2)
}
</script>

<style lang="scss">
@import '../../styles/variables.scss';

.bw-card {
  box-sizing: border-box;
  padding: $bw-padding-xs $bw-padding-base;
  background-color: $bw-white;
  font-size: $bw-font-size-sm;
  color: $bw-text-color;
  position: relative;

  &--border {
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: $bw-padding-base;
      right: $bw-padding-base;
      height: 1px;
      background-color: $bw-border-color;
      transform: scaleY(0.5);
    }
  }

  &__header {
    display: flex;
  }

  &__thumb {
    position: relative;
    flex-shrink: 0;
    width: 88px;
    height: 88px;
    margin-right: $bw-padding-xs;
    border-radius: $bw-border-radius-md;
    overflow: hidden;
    background-color: $bw-bg-color-gray;
  }

  &__thumb-image {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
  }

  &__content {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  &__header-row {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }

  &__title {
    font-size: $bw-font-size-md;
    font-weight: 500;
    line-height: $bw-line-height-md;
    color: $bw-text-color;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-break: break-all;
    flex: 1;
  }

  &__tag {
    flex-shrink: 0;
    margin-left: 4px;
  }

  &__desc {
    font-size: $bw-font-size-sm;
    color: $bw-text-color-2;
    line-height: $bw-line-height-md;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__price {
    display: flex;
    align-items: baseline;
  }

  &__price-currency {
    font-size: $bw-font-size-sm;
    color: $bw-danger-color;
    margin-right: 1px;
  }

  &__price-integer {
    font-size: $bw-font-size-lg;
    color: $bw-danger-color;
    font-weight: 500;
  }

  &__price-origin {
    font-size: $bw-font-size-xs;
    color: $bw-text-color-3;
    text-decoration: line-through;
    margin-left: 5px;
  }

  &__num {
    font-size: $bw-font-size-sm;
    color: $bw-text-color-2;
  }

  &__footer-extra {
    padding-top: $bw-padding-xs;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  &__bottom {
    padding-top: $bw-padding-xs;
  }
}
</style>