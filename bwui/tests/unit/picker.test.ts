import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Picker from '../../src/components/picker/index.vue'

const simpleColumns = [
  { text: '选项1', value: 1 },
  { text: '选项2', value: 2 },
  { text: '选项3', value: 3 },
  { text: '选项4', value: 4 }
]

const multiColumns = [
  [
    { text: '北京', value: 'beijing' },
    { text: '上海', value: 'shanghai' }
  ],
  [
    { text: '朝阳区', value: 'chaoyang' },
    { text: '海淀区', value: 'haidian' }
  ]
]

const cascadeColumns = [
  {
    text: '浙江',
    value: 'zhejiang',
    children: [
      { text: '杭州', value: 'hangzhou' },
      { text: '宁波', value: 'ningbo' }
    ]
  },
  {
    text: '江苏',
    value: 'jiangsu',
    children: [
      { text: '南京', value: 'nanjing' },
      { text: '苏州', value: 'suzhou' }
    ]
  }
]

describe('Picker 组件测试', () => {
  it('应该渲染 picker 组件', () => {
    const wrapper = mount(Picker, {
      props: { columns: simpleColumns, show: true }
    })
    expect(wrapper.find('.bw-picker').exists()).toBe(true)
  })

  it('默认不显示 popup', () => {
    const wrapper = mount(Picker, {
      props: { columns: simpleColumns }
    })
    expect(wrapper.find('.bw-picker__columns').exists()).toBe(false)
  })

  it('show=true 时应该显示 picker 内容', () => {
    const wrapper = mount(Picker, {
      props: { columns: simpleColumns, show: true }
    })
    expect(wrapper.find('.bw-picker__columns').exists()).toBe(true)
  })

  it('showToolbar=true 时应该显示工具栏', () => {
    const wrapper = mount(Picker, {
      props: { columns: simpleColumns, show: true, showToolbar: true }
    })
    expect(wrapper.find('.bw-picker__toolbar').exists()).toBe(true)
  })

  it('showToolbar=false 时应该隐藏工具栏', () => {
    const wrapper = mount(Picker, {
      props: { columns: simpleColumns, show: true, showToolbar: false }
    })
    expect(wrapper.find('.bw-picker__toolbar').exists()).toBe(false)
  })

  it('confirmText 默认值应该为"确认"', () => {
    const wrapper = mount(Picker, {
      props: { columns: simpleColumns, show: true }
    })
    expect(wrapper.find('.bw-picker__confirm').text()).toBe('确认')
  })

  it('cancelText 默认值应该为"取消"', () => {
    const wrapper = mount(Picker, {
      props: { columns: simpleColumns, show: true }
    })
    expect(wrapper.find('.bw-picker__cancel').text()).toBe('取消')
  })

  it('自定义 confirmText 应该正确渲染', () => {
    const wrapper = mount(Picker, {
      props: { columns: simpleColumns, show: true, confirmText: '完成' }
    })
    expect(wrapper.find('.bw-picker__confirm').text()).toBe('完成')
  })

  it('自定义 cancelText 应该正确渲染', () => {
    const wrapper = mount(Picker, {
      props: { columns: simpleColumns, show: true, cancelText: '返回' }
    })
    expect(wrapper.find('.bw-picker__cancel').text()).toBe('返回')
  })

  it('title prop 应该正确渲染', () => {
    const wrapper = mount(Picker, {
      props: { columns: simpleColumns, show: true, title: '选择选项' }
    })
    expect(wrapper.find('.bw-picker__title').text()).toBe('选择选项')
  })

  it('optionHeight 默认值应该为 44', () => {
    const wrapper = mount(Picker, {
      props: { columns: simpleColumns, show: true }
    })
    expect(wrapper.props('optionHeight')).toBe(44)
  })

  it('visibleOptionNum 默认值应该为 6', () => {
    const wrapper = mount(Picker, {
      props: { columns: simpleColumns, show: true }
    })
    expect(wrapper.props('visibleOptionNum')).toBe(6)
  })

  it('columns 高度应该根据 optionHeight 和 visibleOptionNum 计算', () => {
    const wrapper = mount(Picker, {
      props: { columns: simpleColumns, show: true, optionHeight: 50, visibleOptionNum: 5 }
    })
    const columnsEl = wrapper.find('.bw-picker__columns')
    expect(columnsEl.attributes('style')).toContain('height: 250px')
  })

  it('loading=true 时应该显示 loading', () => {
    const wrapper = mount(Picker, {
      props: { columns: simpleColumns, show: true, loading: true }
    })
    expect(wrapper.find('.bw-picker__loading').exists()).toBe(true)
  })

  it('loading=false 时不应该显示 loading', () => {
    const wrapper = mount(Picker, {
      props: { columns: simpleColumns, show: true, loading: false }
    })
    expect(wrapper.find('.bw-picker__loading').exists()).toBe(false)
  })

  it('readonly 默认值应该为 false', () => {
    const wrapper = mount(Picker, {
      props: { columns: simpleColumns, show: true }
    })
    expect(wrapper.props('readonly')).toBe(false)
  })

  it('toolbarPosition 默认值应该为 bottom', () => {
    const wrapper = mount(Picker, {
      props: { columns: simpleColumns, show: true }
    })
    expect(wrapper.props('toolbarPosition')).toBe('bottom')
  })

  it('modelValue 未设置时默认选中第一个选项', () => {
    const wrapper = mount(Picker, {
      props: { columns: simpleColumns, show: true }
    })
    const selected = wrapper.find('.bw-picker__option--selected')
    expect(selected.exists()).toBe(true)
  })

  it('modelValue 设置后应该选中对应选项', () => {
    const wrapper = mount(Picker, {
      props: { columns: simpleColumns, show: true, modelValue: 2 }
    })
    const selected = wrapper.find('.bw-picker__option--selected')
    expect(selected.text()).toBe('选项2')
  })

  it('disabled 选项应该应用对应 class', () => {
    const cols = [
      { text: '正常', value: 1 },
      { text: '禁用', value: 2, disabled: true }
    ]
    const wrapper = mount(Picker, {
      props: { columns: cols, show: true }
    })
    expect(wrapper.find('.bw-picker__option--disabled').exists()).toBe(true)
  })

  it('多列模式下应该渲染多个 column', () => {
    const wrapper = mount(Picker, {
      props: { columns: multiColumns, show: true }
    })
    const columns = wrapper.findAll('.bw-picker__column')
    expect(columns.length).toBe(2)
  })

  it('点击确认按钮触发 confirm 事件', async () => {
    const wrapper = mount(Picker, {
      props: { columns: simpleColumns, show: true }
    })
    await wrapper.find('.bw-picker__confirm').trigger('click')
    expect(wrapper.emitted('confirm')).toBeTruthy()
  })

  it('点击取消按钮触发 cancel 事件', async () => {
    const wrapper = mount(Picker, {
      props: { columns: simpleColumns, show: true }
    })
    await wrapper.find('.bw-picker__cancel').trigger('click')
    expect(wrapper.emitted('cancel')).toBeTruthy()
  })

  it('点击确认后 emit update:modelValue', async () => {
    const wrapper = mount(Picker, {
      props: { columns: simpleColumns, show: true }
    })
    await wrapper.find('.bw-picker__confirm').trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
  })

  it('点击确认后 emit update:show 为 false', async () => {
    const wrapper = mount(Picker, {
      props: { columns: simpleColumns, show: true }
    })
    await wrapper.find('.bw-picker__confirm').trigger('click')
    expect(wrapper.emitted('update:show')).toBeTruthy()
  })
})