<template>
  <demo-layout title="Cell 单元格">
    <div class="demo-block">
      <div class="demo-title">基础用法</div>
      <bw-cell-group>
        <bw-cell title="单元格" value="内容" />
        <bw-cell title="单元格" value="内容" label="描述信息" />
      </bw-cell-group>
    </div>

    <div class="demo-block">
      <div class="demo-title">图标</div>
      <bw-cell-group>
        <bw-cell title="单元格" icon="success" />
        <bw-cell title="单元格" icon="fail" />
        <bw-cell title="单元格" icon="warning" />
        <bw-cell title="单元格" icon="info" />
      </bw-cell-group>
    </div>

    <div class="demo-block">
      <div class="demo-title">可跳转</div>
      <bw-cell-group>
        <bw-cell title="单元格" value="内容" is-link />
        <bw-cell title="单元格" value="内容" is-link />
      </bw-cell-group>
    </div>

    <div class="demo-block">
      <div class="demo-title">大型单元格</div>
      <bw-cell-group>
        <bw-cell title="单元格" value="内容" large />
        <bw-cell title="单元格" value="内容" large label="描述信息" />
      </bw-cell-group>
    </div>

    <div class="demo-block">
      <div class="demo-title">必填项</div>
      <bw-cell-group>
        <bw-cell title="标题" value="内容" required />
        <bw-cell title="标题" required>
          <template #default>
            <input type="text" placeholder="请输入" class="demo-input" />
          </template>
        </bw-cell>
      </bw-cell-group>
    </div>

    <div class="demo-block">
      <div class="demo-title">禁用状态</div>
      <bw-cell-group>
        <bw-cell title="单元格" value="内容" disabled />
        <bw-cell title="单元格" value="内容" disabled is-link />
      </bw-cell-group>
    </div>
  </demo-layout>
</template>

<script setup lang="ts">
import DemoLayout from './DemoLayout.vue'
import BwCell from '../components/cell/index.vue'
import BwCellGroup from '../components/cell-group/index.vue'
</script>

<style lang="scss" scoped>
.demo-block {
  background-color: #ffffff;
  border-radius: 8px;
  padding: 16px 0;
  margin-bottom: 16px;

  .demo-title {
    font-size: 14px;
    color: #969799;
    padding: 0 16px;
    margin-bottom: 12px;
  }
}

.demo-input {
  flex: 1;
  width: 100%;
  border: none;
  background: transparent;
  font-size: 14px;
  color: #323233;
  text-align: right;
  outline: none;

  &::placeholder {
    color: #c8c9cc;
  }
}
</style>
