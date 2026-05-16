<template>
  <demo-layout title="Switch 开关">
    <div class="demo-block">
      <bw-cell-group>
        <bw-cell title="开关">
          <template #right-icon>
            <bw-switch v-model="value1" />
          </template>
        </bw-cell>
        <bw-cell title="禁用状态">
          <template #right-icon>
            <bw-switch v-model="value2" disabled />
          </template>
        </bw-cell>
      </bw-cell-group>
    </div>
  </demo-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DemoLayout from './DemoLayout.vue'
import BwCell from '../components/cell/index.vue'
import BwCellGroup from '../components/cell-group/index.vue'
import BwSwitch from '../components/switch/index.vue'

const value1 = ref(false)
const value2 = ref(true)
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
