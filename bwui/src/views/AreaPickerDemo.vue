<template>
  <demo-layout title="AreaPicker 地区选择器">
    <div class="demo-block">
      <div class="demo-title">三级联动</div>
      <div class="demo-row">
        <bw-button type="primary" @click="showArea = true">选择地区</bw-button>
        <span v-if="areaResult" class="demo-result">
          {{ areaResult.province }} {{ areaResult.city }} {{ areaResult.county }}
        </span>
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">二级联动</div>
      <div class="demo-row">
        <bw-button type="primary" @click="showTwoLevel = true">省市选择</bw-button>
        <span v-if="twoLevelResult" class="demo-result">
          {{ twoLevelResult.province }} {{ twoLevelResult.city }}
        </span>
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">一级选择</div>
      <div class="demo-row">
        <bw-button type="primary" @click="showOneLevel = true">省份选择</bw-button>
        <span v-if="oneLevelResult" class="demo-result">
          {{ oneLevelResult.province }}
        </span>
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">自定义标题</div>
      <div class="demo-row">
        <bw-button type="primary" @click="showCustom = true">自定义标题</bw-button>
      </div>
    </div>

    <bw-area-picker
      v-model="areaCode"
      :show="showArea"
      :area-list="areaList"
      title="选择地区"
      :columns-num="3"
      @update:show="showArea =  @event"
      @confirm="onAreaConfirm"
    />

    <bw-area-picker
      v-model="twoLevelCode"
      :show="showTwoLevel"
      :area-list="areaList"
      title="省市选择"
      :columns-num="2"
      @update:show="showTwoLevel =  @event"
      @confirm="onTwoLevelConfirm"
    />

    <bw-area-picker
      v-model="oneLevelCode"
      :show="showOneLevel"
      :area-list="areaList"
      title="省份选择"
      :columns-num="1"
      @update:show="showOneLevel =  @event"
      @confirm="onOneLevelConfirm"
    />

    <bw-area-picker
      v-model="customCode"
      :show="showCustom"
      :area-list="areaList"
      title="请选择配送地区"
      :columns-num="3"
      :columns-placeholder="['选择省', '选择市', '选择区']"
      confirm-text="完成"
      cancel-text="返回"
      @update:show="showCustom =  @event"
    />
  </demo-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DemoLayout from './DemoLayout.vue'
import BwButton from '../components/button/index.vue'
import BwAreaPicker from '../components/area-picker/index.vue'

const areaList = {
  province_list: {
    '110000': '北京市',
    '120000': '天津市',
    '130000': '河北省',
    '310000': '上海市',
    '320000': '江苏省',
    '330000': '浙江省',
    '440000': '广东省',
    '510000': '四川省'
  },
  city_list: {
    '110100': '北京市',
    '120100': '天津市',
    '130100': '石家庄市',
    '130200': '唐山市',
    '310100': '上海市',
    '320100': '南京市',
    '320500': '苏州市',
    '330100': '杭州市',
    '330200': '宁波市',
    '440100': '广州市',
    '440300': '深圳市',
    '510100': '成都市'
  },
  county_list: {
    '110101': '东城区',
    '110102': '西城区',
    '110105': '朝阳区',
    '110108': '海淀区',
    '120101': '和平区',
    '120102': '河东区',
    '130101': '长安区',
    '130102': '桥西区',
    '310101': '黄浦区',
    '310105': '长宁区',
    '320101': '玄武区',
    '320102': '秦淮区',
    '320501': '姑苏区',
    '320505': '虎丘区',
    '330101': '上城区',
    '330102': '拱墅区',
    '440101': '天河区',
    '440102': '越秀区',
    '440301': '南山区',
    '440302': '福田区',
    '510101': '锦江区',
    '510102': '青羊区'
  }
}

interface AreaResult {
  code: string
  province: string
  city: string
  county: string
}

const showArea = ref(false)
const areaCode = ref('110101')
const areaResult = ref<AreaResult | null>(null)

const showTwoLevel = ref(false)
const twoLevelCode = ref('440300')
const twoLevelResult = ref<AreaResult | null>(null)

const showOneLevel = ref(false)
const oneLevelCode = ref('440000')
const oneLevelResult = ref<AreaResult | null>(null)

const showCustom = ref(false)
const customCode = ref('')

const onAreaConfirm = (result: AreaResult) => {
  areaResult.value = result
  showArea.value = false
}

const onTwoLevelConfirm = (result: AreaResult) => {
  twoLevelResult.value = result
  showTwoLevel.value = false
}

const onOneLevelConfirm = (result: AreaResult) => {
  oneLevelResult.value = result
  showOneLevel.value = false
}
</script>

<style lang="less" scoped>
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

.demo-result {
  font-size: 14px;
  color: #1989fa;
  margin-left: 8px;
}
</style>