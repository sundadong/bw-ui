<template>
  <demo-layout title="Article 文章">
    <div class="demo-block">
      <div class="demo-title">基础用法</div>
      <bw-article title="文章标题" content="这是一段文章正文内容，用于展示文章组件的基础用法。文章组件支持标题、内容和各种丰富的展示形式。" />
    </div>

    <div class="demo-block">
      <div class="demo-title">含元信息</div>
      <bw-article title="文章标题" content="这是一篇带有作者和日期信息的文章内容。">
        <template #meta>
          <span>张三</span>
          <span>2024-01-15</span>
        </template>
      </bw-article>
    </div>

    <div class="demo-block">
      <div class="demo-title">限制行数</div>
      <bw-article
        title="长文章截断"
        :line-clamp="3"
        content="这是一段非常长的文章内容，用于测试行数限制功能。当内容超过指定行数时，多余的内容会被截断并显示省略号。这是一段非常长的文章内容，用于测试行数限制功能。"
      />
    </div>

    <div class="demo-block">
      <div class="demo-title">Markdown 渲染</div>
      <bw-article
        :markdown="true"
        content="# 一级标题

## 二级标题

这是**加粗文字**和*斜体文字*的示例，还可以使用行内代码`const a = 1`。

### 三级标题

更多内容展示。"
      />
    </div>

    <div class="demo-block">
      <div class="demo-title">自定义插槽</div>
      <bw-article>
        <template #title>
          <span style="color: #1989fa">自定义标题样式</span>
        </template>
        <template #meta>
          <span>自定义元信息</span>
        </template>
        <div style="color: #646566">
          完全自定义的文章内容区域，可以使用任意 HTML 结构和样式。
        </div>
      </bw-article>
    </div>
  </demo-layout>
</template>

<script setup lang="ts">
import DemoLayout from './DemoLayout.vue'
import BwArticle from '../components/article/index.vue'
</script>

<style lang="less" scoped>
.demo-block {
  background-color: #ffffff;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;

  .demo-title {
    font-size: 14px;
    color: #969799;
    margin-bottom: 16px;
  }
}
</style>