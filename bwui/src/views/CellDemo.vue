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
      <div class="demo-title">卡片风格</div>
      <bw-cell-group inset>
        <bw-cell title="单元格" value="内容" />
        <bw-cell title="单元格" value="内容" label="描述信息" />
      </bw-cell-group>
    </div>

    <div class="demo-block">
      <div class="demo-title">展示箭头</div>
      <bw-cell-group>
        <bw-cell title="单元格" is-link />
        <bw-cell title="单元格" is-link value="内容" />
        <bw-cell title="单元格" is-link value="内容" label="描述信息" />
      </bw-cell-group>
    </div>

    <div class="demo-block">
      <div class="demo-title">分组标题</div>
      <bw-cell-group title="分组 1">
        <bw-cell title="单元格" value="内容" />
        <bw-cell title="单元格" value="内容" label="描述信息" />
      </bw-cell-group>
      <bw-cell-group title="分组 2">
        <bw-cell title="单元格" value="内容" />
        <bw-cell title="单元格" value="内容" label="描述信息" />
      </bw-cell-group>
    </div>

    <div class="demo-block">
      <div class="demo-title">使用插槽</div>
      <bw-cell-group>
        <bw-cell value="内容" is-link>
          <template #title>
            <span>单元格</span>
            <bw-tag type="danger" style="margin-left: 8px">标签</bw-tag>
          </template>
        </bw-cell>
        <bw-cell title="单元格" value="内容">
          <template #right-icon>
            <span style="font-size: 14px; color: #969799">搜索</span>
          </template>
        </bw-cell>
      </bw-cell-group>
    </div>

    <div class="demo-block">
      <div class="demo-title">垂直居中</div>
      <bw-cell-group>
        <bw-cell title="单元格" value="内容" center label="描述信息" />
      </bw-cell-group>
    </div>

    <div class="demo-block">
      <div class="demo-title">单元格大小</div>
      <bw-cell-group>
        <bw-cell title="单元格" value="内容" />
        <bw-cell title="单元格" value="内容" label="描述信息" large />
      </bw-cell-group>
    </div>

    <div class="demo-block">
      <div class="demo-title">展示图标</div>
      <bw-cell-group>
        <bw-cell title="单元格" value="内容" icon="success" />
        <bw-cell title="单元格" value="内容" icon="fail" is-link />
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
import BwTag from '../components/tag/index.vue'
</script>

<style lang="less" scoped>
:deep(.demo-content) {
  padding: 0;
}

.demo-block {
  background-color: transparent;
  padding: 0;
  margin-bottom: 24px;

  .demo-title {
    font-size: 14px;
    color: #969799;
    padding: 0 16px 8px;
    margin-bottom: 0;
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