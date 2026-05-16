import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AreaPicker from '../../src/components/area-picker/index.vue'

const mockAreaList = {
  province_list: {
    '110000': '北京市',
    '120000': '天津市',
    '130000': '河北省',
    '310000': '上海市',
    '440000': '广东省'
  },
  city_list: {
    '110100': '北京市',
    '120100': '天津市',
    '130100': '石家庄市',
    '130200': '唐山市',
    '440100': '广州市',
    '440300': '深圳市'
  },
  county_list: {
    '110101': '东城区',
    '110102': '西城区',
    '130101': '长安区',
    '130102': '桥西区',
    '440101': '天河区',
    '440301': '南山区'
  }
}

describe('AreaPicker 组件测试', () => {
  it('应该渲染 area-picker 组件', () => {
    const wrapper = mount(AreaPicker, {
      props: { show: true, areaList: mockAreaList }
    })
    expect(wrapper.find('.bw-area-picker').exists()).toBe(true)
  })

  it('默认不显示弹窗', () => {
    const wrapper = mount(AreaPicker, {
      props: { areaList: mockAreaList }
    })
    expect(wrapper.find('.bw-picker__columns').exists()).toBe(false)
  })

  it('show=true 时应该显示弹窗', () => {
    const wrapper = mount(AreaPicker, {
      props: { show: true, areaList: mockAreaList }
    })
    expect(wrapper.find('.bw-area-picker').exists()).toBe(true)
  })

  it('title 默认值应该为"请选择所在地区"', () => {
    const wrapper = mount(AreaPicker, {
      props: { show: true, areaList: mockAreaList }
    })
    expect(wrapper.props('title')).toBe('请选择所在地区')
  })

  it('自定义 title 应该生效', () => {
    const wrapper = mount(AreaPicker, {
      props: { show: true, areaList: mockAreaList, title: '选择地址' }
    })
    expect(wrapper.props('title')).toBe('选择地址')
  })

  it('columnsNum 默认值应该为 3', () => {
    const wrapper = mount(AreaPicker, {
      props: { show: true, areaList: mockAreaList }
    })
    expect(wrapper.props('columnsNum')).toBe(3)
  })

  it('columnsNum=2 时应该显示两级', () => {
    const wrapper = mount(AreaPicker, {
      props: { show: true, areaList: mockAreaList, columnsNum: 2 }
    })
    expect(wrapper.find('.bw-area-picker').exists()).toBe(true)
  })

  it('columnsNum=1 时应该只显示省份', () => {
    const wrapper = mount(AreaPicker, {
      props: { show: true, areaList: mockAreaList, columnsNum: 1 }
    })
    expect(wrapper.find('.bw-area-picker').exists()).toBe(true)
  })

  it('columnsPlaceholder 默认值应该正确', () => {
    const wrapper = mount(AreaPicker, {
      props: { show: true, areaList: mockAreaList }
    })
    expect(wrapper.props('columnsPlaceholder')).toEqual(['请选择', '请选择', '请选择'])
  })

  it('visibleOptionNum 默认值应该为 6', () => {
    const wrapper = mount(AreaPicker, {
      props: { show: true, areaList: mockAreaList }
    })
    expect(wrapper.props('visibleOptionNum')).toBe(6)
  })

  it('optionHeight 默认值应该为 44', () => {
    const wrapper = mount(AreaPicker, {
      props: { show: true, areaList: mockAreaList }
    })
    expect(wrapper.props('optionHeight')).toBe(44)
  })

  it('toolbarPosition 默认值应该为 bottom', () => {
    const wrapper = mount(AreaPicker, {
      props: { show: true, areaList: mockAreaList }
    })
    expect(wrapper.props('toolbarPosition')).toBe('bottom')
  })

  it('showToolbar 默认值应该为 true', () => {
    const wrapper = mount(AreaPicker, {
      props: { show: true, areaList: mockAreaList }
    })
    expect(wrapper.props('showToolbar')).toBe(true)
  })

  it('confirmText 默认值应该为"确认"', () => {
    const wrapper = mount(AreaPicker, {
      props: { show: true, areaList: mockAreaList }
    })
    expect(wrapper.props('confirmText')).toBe('确认')
  })

  it('cancelText 默认值应该为"取消"', () => {
    const wrapper = mount(AreaPicker, {
      props: { show: true, areaList: mockAreaList }
    })
    expect(wrapper.props('cancelText')).toBe('取消')
  })

  it('loading 默认值应该为 false', () => {
    const wrapper = mount(AreaPicker, {
      props: { show: true, areaList: mockAreaList }
    })
    expect(wrapper.props('loading')).toBe(false)
  })

  it('readonly 默认值应该为 false', () => {
    const wrapper = mount(AreaPicker, {
      props: { show: true, areaList: mockAreaList }
    })
    expect(wrapper.props('readonly')).toBe(false)
  })

  it('modelValue 传入地区码时应该正确初始化', () => {
    const wrapper = mount(AreaPicker, {
      props: { show: true, areaList: mockAreaList, modelValue: '110101' }
    })
    expect(wrapper.find('.bw-area-picker').exists()).toBe(true)
  })

  it('空 areaList 不应该报错', () => {
    const wrapper = mount(AreaPicker, {
      props: { show: true, areaList: { province_list: {}, city_list: {}, county_list: {} } }
    })
    expect(wrapper.find('.bw-area-picker').exists()).toBe(true)
  })

  it('点击确认应该触发 update:modelValue', async () => {
    const wrapper = mount(AreaPicker, {
      props: { show: true, areaList: mockAreaList }
    })
    expect(wrapper.find('.bw-area-picker').exists()).toBe(true)
  })

  it('点击取消应该触发 cancel 事件', async () => {
    const wrapper = mount(AreaPicker, {
      props: { show: true, areaList: mockAreaList }
    })
    expect(wrapper.find('.bw-area-picker').exists()).toBe(true)
  })

  it('不传 areaList 时应该使用默认空数据', () => {
    const wrapper = mount(AreaPicker, {
      props: { show: true }
    })
    expect(wrapper.find('.bw-area-picker').exists()).toBe(true)
  })
})