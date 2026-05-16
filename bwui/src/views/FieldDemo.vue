<template>
  <demo-layout title="Field 输入框">
    <div class="demo-block">
      <bw-cell-group>
        <bw-field
          v-model="value1"
          label="文本"
          placeholder="请输入文本"
        />
        <bw-field
          v-model="value2"
          label="手机号"
          type="tel"
          placeholder="请输入手机号"
        />
        <bw-field
          v-model="value3"
          label="密码"
          type="password"
          placeholder="请输入密码"
        />
      </bw-cell-group>
    </div>
  </demo-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DemoLayout from './DemoLayout.vue'
import BwCellGroup from '../components/cell-group/index.vue'
import BwField from '../components/field/index.vue'

const value1 = ref('')
const value2 = ref('')
const value3 = ref('')
</script>

<style lang="scss" scoped>
.demo-block {
  background-color: #ffffff;
  border-radius: 8px;
  padding: 0;
  margin-bottom: 16px;
  overflow: hidden;
}
</style>
