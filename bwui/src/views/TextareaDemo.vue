<template>
  <demo-layout title="Textarea 文本域">
    <div class="demo-block">
      <div class="demo-title">基础用法</div>
      <div class="demo-row">
        <bw-textarea v-model="value1" placeholder="请输入文本" />
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">禁用和只读</div>
      <div class="demo-row">
        <bw-textarea v-model="value2" placeholder="禁用状态" disabled />
      </div>
      <div class="demo-row">
        <bw-textarea v-model="value3" placeholder="只读状态" readonly />
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">显示字数统计</div>
      <div class="demo-row">
        <bw-textarea
          v-model="value4"
          placeholder="最多输入 50 字"
          :maxlength="50"
          :show-word-limit="true"
        />
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">自定义行数</div>
      <div class="demo-row">
        <bw-textarea v-model="value5" placeholder="5 行文本域" :rows="5" />
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">自动高度</div>
      <div class="demo-row">
        <bw-textarea
          v-model="value6"
          placeholder="自动撑开高度"
          :autosize="true"
        />
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">自动高度（限制最大最小）</div>
      <div class="demo-row">
        <bw-textarea
          v-model="value7"
          placeholder="最小 80px，最大 200px"
          :autosize="{ minHeight: 80, maxHeight: 200 }"
        />
      </div>
    </div>
  </demo-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DemoLayout from './DemoLayout.vue'
import BwTextarea from '../components/textarea/index.vue'

const value1 = ref('')
const value2 = ref('输入框已禁用')
const value3 = ref('输入框只读')
const value4 = ref('')
const value5 = ref('')
const value6 = ref('')
const value7 = ref('')
</script>

<style lang="scss" scoped>
.demo-block {
  background-color: #ffffff;
  border-radius: 8px;
  padding: 0;
  margin-bottom: 16px;
  overflow: hidden;

  .demo-title {
    font-size: 14px;
    color: #969799;
    padding: 16px 16px 8px;
  }
}

.demo-row {
  padding: 0 16px 16px;
}
</style>