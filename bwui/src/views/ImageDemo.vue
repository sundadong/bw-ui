<template>
  <demo-layout title="Image 图片">
    <div class="demo-block">
      <div class="demo-title">基础用法</div>
      <div class="demo-row">
        <bw-image
          src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
          width="100"
          height="100"
        />
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">填充模式</div>
      <div class="demo-row">
        <div class="image-demo-item">
          <span>contain</span>
          <bw-image
            src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
            width="100"
            height="100"
            fit="contain"
          />
        </div>
        <div class="image-demo-item">
          <span>cover</span>
          <bw-image
            src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
            width="100"
            height="100"
            fit="cover"
          />
        </div>
        <div class="image-demo-item">
          <span>fill</span>
          <bw-image
            src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
            width="100"
            height="100"
            fit="fill"
          />
        </div>
        <div class="image-demo-item">
          <span>none</span>
          <bw-image
            src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
            width="100"
            height="100"
            fit="none"
          />
        </div>
        <div class="image-demo-item">
          <span>scale-down</span>
          <bw-image
            src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
            width="100"
            height="100"
            fit="scale-down"
          />
        </div>
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">圆角图片</div>
      <div class="demo-row">
        <bw-image
          src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
          width="100"
          height="100"
          round
        />
        <bw-image
          src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
          width="100"
          height="100"
          :radius="8"
        />
        <bw-image
          src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
          width="100"
          height="100"
          radius="50%"
        />
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">自定义尺寸</div>
      <div class="demo-row">
        <bw-image
          src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
          width="80"
          height="80"
        />
        <bw-image
          src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
          width="120"
          height="120"
        />
        <bw-image
          src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
          width="160"
          height="100"
        />
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">加载中提示</div>
      <div class="demo-row">
        <bw-image
          src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
          width="100"
          height="100"
          :show-loading="true"
        />
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">加载失败</div>
      <div class="demo-row">
        <bw-image
          src="https://invalid.url/image.jpg"
          width="100"
          height="100"
          :show-error="true"
        />
        <bw-image
          src="https://invalid.url/image2.jpg"
          width="100"
          height="100"
          :show-error="false"
        />
      </div>
    </div>
  </demo-layout>
</template>

<script setup lang="ts">
import DemoLayout from './DemoLayout.vue'
import BwImage from '../components/image/index.vue'
</script>

<style lang="scss" scoped>
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

  .demo-row {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    align-items: center;
  }
}

.image-demo-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;

  span {
    font-size: 12px;
    color: #969799;
  }
}
</style>