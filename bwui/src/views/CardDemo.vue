<template>
  <demo-layout title="Card 卡片">
    <div class="demo-block">
      <div class="demo-title">基础用法</div>
      <div class="demo-row">
        <bw-card
          title="商品名称"
          desc="描述信息描述信息描述信息"
          thumb="https://img.yzcdn.cn/vant/ipad.jpeg"
          price="99.99"
          num="2"
        />
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">带标签</div>
      <div class="demo-row">
        <bw-card
          title="热门商品"
          desc="描述信息"
          thumb="https://img.yzcdn.cn/vant/ipad.jpeg"
          price="199.00"
          origin-price="299.00"
          tag="热卖"
          num="1"
        />
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">自定义内容</div>
      <div class="demo-row">
        <bw-card
          thumb="https://img.yzcdn.cn/vant/ipad.jpeg"
          price="88.88"
          num="3"
        >
          <template #title>
            <span style="font-weight: bold; color: #1989fa">自定义标题</span>
          </template>
          <template #desc>
            <span style="color: #ee0a24">自定义描述</span>
          </template>
          <template #tag>
            <span style="color: #07c160; font-size: 12px">新品</span>
          </template>
        </bw-card>
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">自定义底部</div>
      <div class="demo-row">
        <bw-card
          title="商品名称"
          thumb="https://img.yzcdn.cn/vant/ipad.jpeg"
          price="66.66"
        >
          <template #footer>
            <bw-button type="primary" size="small">立即购买</bw-button>
            <bw-button type="default" size="small" style="margin-left: 8px">加入购物车</bw-button>
          </template>
        </bw-card>
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">多张卡片</div>
      <div class="demo-row">
        <bw-card
          title="商品一"
          desc="这是商品一的描述"
          thumb="https://img.yzcdn.cn/vant/ipad.jpeg"
          price="100.00"
          num="1"
        />
        <bw-card
          title="商品二"
          desc="这是商品二的描述"
          thumb="https://img.yzcdn.cn/vant/ipad.jpeg"
          price="200.00"
          origin-price="300.00"
          num="2"
          :border="false"
        />
      </div>
    </div>
  </demo-layout>
</template>

<script setup lang="ts">
import DemoLayout from './DemoLayout.vue'
import BwCard from '../components/card/index.vue'
import BwButton from '../components/button/index.vue'
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
    flex-direction: column;
  }
}
</style>