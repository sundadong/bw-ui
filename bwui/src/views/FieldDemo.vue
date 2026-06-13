<template>
  <demo-layout title="Field 输入框">
    <div class="demo-block">
      <div class="demo-title">基础用法</div>
      <bw-cell-group>
        <bw-field
          v-model="value1"
          label="文本"
          placeholder="请输入文本"
        />
      </bw-cell-group>
    </div>

    <div class="demo-block">
      <div class="demo-title">自定义类型</div>
      <bw-cell-group>
        <bw-field
          v-model="value2"
          label="文本"
          placeholder="请输入文本"
          type="text"
        />
        <bw-field
          v-model="value3"
          label="手机号"
          placeholder="请输入手机号"
          type="tel"
        />
        <bw-field
          v-model="value4"
          label="整数"
          placeholder="请输入整数"
          type="digit"
        />
        <bw-field
          v-model="value5"
          label="数字"
          placeholder="请输入数字"
          type="number"
        />
        <bw-field
          v-model="value6"
          label="密码"
          placeholder="请输入密码"
          type="password"
        />
      </bw-cell-group>
    </div>

    <div class="demo-block">
      <div class="demo-title">禁用/只读</div>
      <bw-cell-group>
        <bw-field
          v-model="value7"
          label="禁用"
          placeholder="输入框已禁用"
          disabled
        />
        <bw-field
          v-model="value8"
          label="只读"
          placeholder="输入框只读"
          readonly
        />
      </bw-cell-group>
    </div>

    <div class="demo-block">
      <div class="demo-title">显示图标</div>
      <bw-cell-group>
        <bw-field
          v-model="value9"
          label="文本"
          placeholder="请输入文本"
          left-icon="contact"
        />
        <bw-field
          v-model="value10"
          label="文本"
          placeholder="请输入文本"
          right-icon="question"
        />
        <bw-field
          v-model="value11"
          label="可清除"
          placeholder="请输入内容"
          clearable
        />
      </bw-cell-group>
    </div>

    <div class="demo-block">
      <div class="demo-title">错误提示</div>
      <bw-cell-group>
        <bw-field
          v-model="value12"
          label="用户名"
          placeholder="请输入用户名"
          :error-message="errorMessage"
        />
      </bw-cell-group>
    </div>

    <div class="demo-block">
      <div class="demo-title">插入按钮</div>
      <bw-cell-group>
        <bw-field
          v-model="value13"
          label="短信验证码"
          placeholder="请输入验证码"
          type="tel"
        >
          <template #button>
            <bw-button size="small" type="primary" @click="sendSms">发送验证码</bw-button>
          </template>
        </bw-field>
      </bw-cell-group>
    </div>
  </demo-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DemoLayout from './DemoLayout.vue'
import BwCellGroup from '../components/cell-group/index.vue'
import BwField from '../components/field/index.vue'
import BwButton from '../components/button/index.vue'

const value1 = ref('')
const value2 = ref('')
const value3 = ref('')
const value4 = ref('')
const value5 = ref('')
const value6 = ref('')
const value7 = ref('输入框已禁用')
const value8 = ref('输入框只读')
const value9 = ref('')
const value10 = ref('')
const value11 = ref('')
const value12 = ref('')
const value13 = ref('')

const errorMessage = ref('用户名格式不正确')

const sendSms = () => {
  alert('验证码已发送')
}
</script>

<style lang="less" scoped>
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
</style>