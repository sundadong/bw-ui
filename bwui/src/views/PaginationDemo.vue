<template>
  <demo-layout title="Pagination 分页">
    <div class="demo-block">
      <div class="demo-title">基础用法</div>
      <div class="demo-row">
        <bw-pagination
          v-model="page1"
          :total-items="100"
          :items-per-page="10"
          @change="handleChange"
        />
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">自定义文字</div>
      <div class="demo-row">
        <bw-pagination
          v-model="page2"
          :total-items="100"
          :items-per-page="10"
          prev-text="Prev"
          next-text="Next"
        />
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">使用插槽</div>
      <div class="demo-row">
        <bw-pagination
          v-model="page3"
          :total-items="100"
          :items-per-page="10"
        >
          <template #prev-text>&lt;</template>
          <template #next-text>&gt;</template>
        </bw-pagination>
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">显示每页条数</div>
      <div class="demo-row">
        <bw-pagination
          v-model="page4"
          :total-items="200"
          :items-per-page="20"
          :show-page-size="true"
          :page-size="20"
        />
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">较少页数</div>
      <div class="demo-row">
        <bw-pagination
          v-model="page5"
          :total-items="30"
          :items-per-page="10"
        />
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">大量页数</div>
      <div class="demo-row">
        <bw-pagination
          v-model="page6"
          :total-items="500"
          :items-per-page="10"
        />
      </div>
    </div>
  </demo-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DemoLayout from './DemoLayout.vue'
import BwPagination from '../components/pagination/index.vue'

const page1 = ref(1)
const page2 = ref(1)
const page3 = ref(1)
const page4 = ref(1)
const page5 = ref(1)
const page6 = ref(1)

const handleChange = (page: number) => {
  console.log('当前页码:', page)
}
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
  }
}
</style>