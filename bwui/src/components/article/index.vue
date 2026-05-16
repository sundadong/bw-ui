<template>
  <div class="bw-article">
    <div v-if="title || $slots.title" class="bw-article__title">
      <slot name="title">{{ title }}</slot>
    </div>
    <div v-if="$slots.meta" class="bw-article__meta">
      <slot name="meta"></slot>
    </div>
    <div
      class="bw-article__content"
      :class="{ 'bw-article__content--markdown': markdown }"
      :style="contentStyle"
    >
      <slot>
        <template v-if="markdown && content">
          <div v-html="renderedMarkdown"></div>
        </template>
        <template v-else>
          {{ content }}
        </template>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export interface ArticleProps {
  title?: string
  content?: string
  markdown?: boolean
  lineClamp?: number
}

const props = withDefaults(defineProps<ArticleProps>(), {
  markdown: false,
  lineClamp: 0
})

const contentStyle = computed(() => {
  const style: Record<string, string> = {}
  if (props.lineClamp && props.lineClamp > 0) {
    style.display = '-webkit-box'
    style.webkitBoxOrient = 'vertical'
    style.webkitLineClamp = String(props.lineClamp)
    style.overflow = 'hidden'
    style.textOverflow = 'ellipsis'
  }
  return style
})

const renderedMarkdown = computed(() => {
  if (!props.content) return ''
  return props.content
    .replace(/### (.+)/g, '<h3>$1</h3>')
    .replace(/## (.+)/g, '<h2>$1</h2>')
    .replace(/# (.+)/g, '<h1>$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(.+)$/gm, (match: string) => {
      if (match.startsWith('<h') || match.startsWith('</p>')) return match
      if (match.trim() === '') return ''
      return match
    })
    .replace(/^(.+?)(?=<h|$)/gm, '<p>$1</p>')
})
</script>

<style lang="scss" scoped>
@import '../../styles/variables.scss';

.bw-article {
  padding: $bw-padding-md;
  background-color: $bw-bg-color;
  border-radius: $bw-border-radius-lg;

  &__title {
    font-size: $bw-font-size-xxl;
    font-weight: 600;
    color: $bw-text-color;
    margin-bottom: 12px;
    line-height: 1.4;
  }

  &__meta {
    font-size: $bw-font-size-sm;
    color: $bw-text-color-2;
    margin-bottom: $bw-padding-md;
    display: flex;
    align-items: center;
    gap: $bw-padding-xs;
  }

  &__content {
    font-size: $bw-font-size-md;
    color: $bw-text-color;
    line-height: $bw-line-height-lg;
    word-break: break-word;

    &--markdown {
      :deep(h1) {
        font-size: $bw-font-size-xxl;
        font-weight: 600;
        margin: $bw-padding-md 0 $bw-padding-xs;
        line-height: 1.4;
      }

      :deep(h2) {
        font-size: $bw-font-size-xl;
        font-weight: 600;
        margin: $bw-padding-sm 0 $bw-padding-xs;
        line-height: 1.4;
      }

      :deep(h3) {
        font-size: $bw-font-size-lg;
        font-weight: 600;
        margin: $bw-padding-xs 0;
        line-height: 1.4;
      }

      :deep(p) {
        margin: $bw-padding-xs 0;
        line-height: $bw-line-height-lg;
      }

      :deep(strong) {
        font-weight: 600;
      }

      :deep(em) {
        font-style: italic;
      }

      :deep(code) {
        background-color: $bw-bg-color-light;
        padding: 2px 6px;
        border-radius: $bw-border-radius-sm;
        font-family: 'Courier New', monospace;
        font-size: $bw-font-size-sm;
        color: $bw-danger-color;
      }
    }
  }
}
</style>