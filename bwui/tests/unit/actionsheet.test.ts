import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import ActionSheet from '../../src/components/actionsheet/index.vue'

describe('ActionSheet 组件测试', () => {
  const mockActions = [
    { name: '选项一' },
    { name: '选项二', color: '#ee0a24' },
    { name: '选项三', subname: '描述信息' },
    { name: '选项四', disabled: true },
    { name: '选项五', loading: true }
  ]

  it('默认不显示动作面板', () => {
    const wrapper = mount(ActionSheet)
    expect(wrapper.find('.bw-action-sheet').exists()).toBe(false)
  })

  it('设置 modelValue=true 后应该显示动作面板', () => {
    const wrapper = mount(ActionSheet, {
      props: { modelValue: true, actions: mockActions }
    })
    expect(wrapper.find('.bw-action-sheet').exists()).toBe(true)
  })

  it('应该正确渲染 actions 列表项数量', () => {
    const wrapper = mount(ActionSheet, {
      props: { modelValue: true, actions: mockActions }
    })
    expect(wrapper.findAll('.bw-action-sheet__item').length).toBe(5)
  })

  it('应该正确渲染 action 名称', () => {
    const wrapper = mount(ActionSheet, {
      props: { modelValue: true, actions: mockActions }
    })
    const names = wrapper.findAll('.bw-action-sheet__name')
    expect(names[0].text()).toBe('选项一')
    expect(names[1].text()).toBe('选项二')
  })

  it('应该正确渲染 action 子名称', () => {
    const wrapper = mount(ActionSheet, {
      props: { modelValue: true, actions: mockActions }
    })
    expect(wrapper.find('.bw-action-sheet__subname').text()).toBe('描述信息')
  })

  it('禁用项应该应用 disabled 样式', () => {
    const wrapper = mount(ActionSheet, {
      props: { modelValue: true, actions: mockActions }
    })
    const items = wrapper.findAll('.bw-action-sheet__item')
    expect(items[3].classes()).toContain('bw-action-sheet__item--disabled')
  })

  it('加载项应该应用 loading 样式', () => {
    const wrapper = mount(ActionSheet, {
      props: { modelValue: true, actions: mockActions }
    })
    const items = wrapper.findAll('.bw-action-sheet__item')
    expect(items[4].classes()).toContain('bw-action-sheet__item--loading')
  })

  it('color 属性应该设置内联样式', () => {
    const wrapper = mount(ActionSheet, {
      props: { modelValue: true, actions: mockActions }
    })
    const items = wrapper.findAll('.bw-action-sheet__item')
    expect(items[1].attributes('style')).toContain('color: #ee0a24')
  })

  it('点击 action 项应该触发 select 事件', async () => {
    const wrapper = mount(ActionSheet, {
      props: { modelValue: true, actions: mockActions }
    })
    await wrapper.findAll('.bw-action-sheet__item')[0].trigger('click')
    expect(wrapper.emitted('select')).toBeTruthy()
    expect(wrapper.emitted('select')?.[0]).toEqual([mockActions[0], 0])
  })

  it('点击 action 项应该关闭面板', async () => {
    const wrapper = mount(ActionSheet, {
      props: { modelValue: true, actions: mockActions }
    })
    await wrapper.findAll('.bw-action-sheet__item')[0].trigger('click')
    await nextTick()
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false])
  })

  it('点击禁用项不应该触发 select 事件', async () => {
    const wrapper = mount(ActionSheet, {
      props: { modelValue: true, actions: mockActions }
    })
    await wrapper.findAll('.bw-action-sheet__item')[3].trigger('click')
    expect(wrapper.emitted('select')).toBeFalsy()
  })

  it('点击加载项不应该触发 select 事件', async () => {
    const wrapper = mount(ActionSheet, {
      props: { modelValue: true, actions: mockActions }
    })
    await wrapper.findAll('.bw-action-sheet__item')[4].trigger('click')
    expect(wrapper.emitted('select')).toBeFalsy()
  })

  it('cancelText 存在时应该渲染取消按钮', () => {
    const wrapper = mount(ActionSheet, {
      props: { modelValue: true, actions: mockActions, cancelText: '取消' }
    })
    expect(wrapper.find('.bw-action-sheet__cancel').exists()).toBe(true)
    expect(wrapper.find('.bw-action-sheet__cancel').text()).toBe('取消')
  })

  it('cancelText 为空时不渲染取消按钮', () => {
    const wrapper = mount(ActionSheet, {
      props: { modelValue: true, actions: mockActions }
    })
    expect(wrapper.find('.bw-action-sheet__cancel').exists()).toBe(false)
  })

  it('点击取消按钮应该触发 cancel 事件', async () => {
    const wrapper = mount(ActionSheet, {
      props: { modelValue: true, actions: mockActions, cancelText: '取消' }
    })
    await wrapper.find('.bw-action-sheet__cancel').trigger('click')
    expect(wrapper.emitted('cancel')).toBeTruthy()
  })

  it('description 应该正确渲染', () => {
    const wrapper = mount(ActionSheet, {
      props: { modelValue: true, actions: mockActions, description: '这是一段描述' }
    })
    expect(wrapper.find('.bw-action-sheet__description').text()).toBe('这是一段描述')
  })

  it('description 为空时不渲染描述', () => {
    const wrapper = mount(ActionSheet, {
      props: { modelValue: true, actions: mockActions }
    })
    expect(wrapper.find('.bw-action-sheet__description').exists()).toBe(false)
  })

  it('round 为 true 时应该应用圆角样式', () => {
    const wrapper = mount(ActionSheet, {
      props: { modelValue: true, actions: mockActions, round: true }
    })
    expect(wrapper.find('.bw-action-sheet').classes()).toContain('bw-action-sheet--round')
  })

  it('round 为 false 时不应该应用圆角样式', () => {
    const wrapper = mount(ActionSheet, {
      props: { modelValue: true, actions: mockActions, round: false }
    })
    expect(wrapper.find('.bw-action-sheet').classes()).not.toContain('bw-action-sheet--round')
  })

  it('safeAreaInsetBottom 应该应用对应样式', () => {
    const wrapper = mount(ActionSheet, {
      props: { modelValue: true, actions: mockActions, safeAreaInsetBottom: true }
    })
    expect(wrapper.find('.bw-action-sheet').classes()).toContain('bw-action-sheet--safe-area-inset-bottom')
  })

  it('closeOnClickOverlay 为 true 时点击遮罩应该关闭', async () => {
    const wrapper = mount(ActionSheet, {
      props: { modelValue: true, actions: mockActions, closeOnClickOverlay: true }
    })
    await wrapper.find('.bw-overlay').trigger('click')
    await nextTick()
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
  })

  it('modelValue 从 false 变为 true 时应该显示', async () => {
    const wrapper = mount(ActionSheet, {
      props: { modelValue: false, actions: mockActions }
    })
    expect(wrapper.find('.bw-action-sheet').exists()).toBe(false)
    await wrapper.setProps({ modelValue: true })
    expect(wrapper.find('.bw-action-sheet').exists()).toBe(true)
  })

  it('action 的 callback 应该被调用', async () => {
    let callbackCalled = false
    const actions = [
      {
        name: '回调测试',
        callback: () => {
          callbackCalled = true
        }
      }
    ]
    const wrapper = mount(ActionSheet, {
      props: { modelValue: true, actions }
    })
    await wrapper.find('.bw-action-sheet__item').trigger('click')
    expect(callbackCalled).toBe(true)
  })

  it('空 actions 数组应该正常渲染', () => {
    const wrapper = mount(ActionSheet, {
      props: { modelValue: true, actions: [] }
    })
    expect(wrapper.find('.bw-action-sheet').exists()).toBe(true)
    expect(wrapper.findAll('.bw-action-sheet__item').length).toBe(0)
  })
})