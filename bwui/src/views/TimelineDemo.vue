<template>
  <demo-layout title="Timeline 时间轴">
    <div class="demo-block">
      <div class="demo-title">基础用法</div>
      <bw-timeline>
        <bw-timeline-item content="步骤一：提交申请" time="2024-01-01 10:00" />
        <bw-timeline-item content="步骤二：审核中" time="2024-01-02 14:00" />
        <bw-timeline-item content="步骤三：审核通过" time="2024-01-03 09:00" />
        <bw-timeline-item content="步骤四：已完成" time="2024-01-04 16:00" />
      </bw-timeline>
    </div>

    <div class="demo-block">
      <div class="demo-title">自定义颜色</div>
      <bw-timeline>
        <bw-timeline-item content="默认蓝色" time="10:00" />
        <bw-timeline-item content="绿色节点" time="11:00" color="#07c160" />
        <bw-timeline-item content="红色节点" time="12:00" color="#ee0a24" />
        <bw-timeline-item content="橙色节点" time="13:00" color="#ff976a" />
      </bw-timeline>
    </div>

    <div class="demo-block">
      <div class="demo-title">自定义连接线颜色</div>
      <bw-timeline>
        <bw-timeline-item content="步骤一" line-color="#1989fa" />
        <bw-timeline-item content="步骤二" line-color="#07c160" />
        <bw-timeline-item content="步骤三" line-color="#ee0a24" />
      </bw-timeline>
    </div>

    <div class="demo-block">
      <div class="demo-title">自定义插槽</div>
      <bw-timeline>
        <bw-timeline-item>
          <template #dot>
            <span style="font-size: 16px">✓</span>
          </template>
          <template #time>昨天</template>
          自定义内容区域
        </bw-timeline-item>
        <bw-timeline-item content="普通内容" time="今天" />
      </bw-timeline>
    </div>

    <div class="demo-block">
      <div class="demo-title">倒序排列</div>
      <bw-timeline :reverse="true">
        <bw-timeline-item content="步骤一" time="10:00" />
        <bw-timeline-item content="步骤二" time="11:00" />
        <bw-timeline-item content="步骤三" time="12:00" />
      </bw-timeline>
    </div>
  </demo-layout>
</template>

<script setup lang="ts">
import DemoLayout from './DemoLayout.vue'
import BwTimeline from '../components/timeline/index.vue'
import BwTimelineItem from '../components/timeline-item/index.vue'
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
}
</style>