import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Search from '../../src/components/search/index.vue'

describe('Search 组件测试', () => {
  it('应该正确渲染搜索组件', () => {
    const wrapper = mount(Search)
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.classes()).toContain('bw-search')
  })

  it('应该渲染搜索输入框', () => {
    const wrapper = mount(Search)
    expect(wrapper.find('.bw-search__input').exists()).toBe(true)
  })

  it('应该渲染搜索字段容器', () => {
    const wrapper = mount(Search)
    expect(wrapper.find('.bw-search__field').exists()).toBe(true)
  })

  it('modelValue 默认值为空字符串', () => {
    const wrapper = mount(Search)
    const input = wrapper.find('.bw-search__input')
    expect(input.element.value).toBe('')
  })

  it('modelValue 应该绑定到输入框', () => {
    const wrapper = mount(Search, {
      props: { modelValue: '搜索内容' }
    })
    expect(wrapper.find('.bw-search__input').element.value).toBe('搜索内容')
  })

  it('placeholder 默认值为"请输入搜索关键词"', () => {
    const wrapper = mount(Search)
    expect(wrapper.find('.bw-search__input').attributes('placeholder')).toBe('请输入搜索关键词')
  })

  it('自定义 placeholder', () => {
    const wrapper = mount(Search, {
      props: { placeholder: '输入你想搜索的内容' }
    })
    expect(wrapper.find('.bw-search__input').attributes('placeholder')).toBe('输入你想搜索的内容')
  })

  it('disabled 为 true 时输入框应该禁用', () => {
    const wrapper = mount(Search, {
      props: { disabled: true }
    })
    expect(wrapper.find('.bw-search__input').attributes('disabled')).toBeDefined()
  })

  it('disabled 为 true 时 field 应该添加禁用样式类', () => {
    const wrapper = mount(Search, {
      props: { disabled: true }
    })
    expect(wrapper.find('.bw-search__field').classes()).toContain('bw-search__field--disabled')
  })

  it('readonly 为 true 时输入框应该为只读', () => {
    const wrapper = mount(Search, {
      props: { readonly: true }
    })
    expect(wrapper.find('.bw-search__input').attributes('readonly')).toBeDefined()
  })

  it('readonly 为 false 时输入框不应该为只读', () => {
    const wrapper = mount(Search, {
      props: { readonly: false }
    })
    expect(wrapper.find('.bw-search__input').attributes('readonly')).toBeUndefined()
  })

  it('clearable 且有值时应该显示清除按钮', () => {
    const wrapper = mount(Search, {
      props: { modelValue: '内容', clearable: true }
    })
    expect(wrapper.find('.bw-search__clear').exists()).toBe(true)
  })

  it('clearable 但无值时不应该显示清除按钮', () => {
    const wrapper = mount(Search, {
      props: { modelValue: '', clearable: true }
    })
    expect(wrapper.find('.bw-search__clear').exists()).toBe(false)
  })

  it('clearable 为 false 时不应该显示清除按钮', () => {
    const wrapper = mount(Search, {
      props: { modelValue: '内容', clearable: false }
    })
    expect(wrapper.find('.bw-search__clear').exists()).toBe(false)
  })

  it('点击清除按钮应该清空值', async () => {
    const wrapper = mount(Search, {
      props: { modelValue: '待清除', clearable: true }
    })
    await wrapper.find('.bw-search__clear').trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([''])
    expect(wrapper.emitted('change')?.[0]).toEqual([''])
    expect(wrapper.emitted('clear')).toBeTruthy()
  })

  it('showAction 为 true 时应该显示操作按钮', () => {
    const wrapper = mount(Search, {
      props: { showAction: true }
    })
    expect(wrapper.find('.bw-search__action').exists()).toBe(true)
  })

  it('showAction 为 false 时不应该显示操作按钮', () => {
    const wrapper = mount(Search, {
      props: { showAction: false }
    })
    expect(wrapper.find('.bw-search__action').exists()).toBe(false)
  })

  it('actionText 默认值为"搜索"', () => {
    const wrapper = mount(Search, {
      props: { showAction: true }
    })
    expect(wrapper.find('.bw-search__action').text()).toBe('搜索')
  })

  it('自定义 actionText', () => {
    const wrapper = mount(Search, {
      props: { showAction: true, actionText: '查找' }
    })
    expect(wrapper.find('.bw-search__action').text()).toBe('查找')
  })

  it('点击操作按钮应该触发 search 事件', async () => {
    const wrapper = mount(Search, {
      props: { showAction: true, modelValue: '搜索词' }
    })
    await wrapper.find('.bw-search__action').trigger('click')
    expect(wrapper.emitted('search')).toBeTruthy()
    expect(wrapper.emitted('search')?.[0]).toEqual(['搜索词'])
  })

  it('background 应该应用到根元素', () => {
    const wrapper = mount(Search, {
      props: { background: '#f7f8fa' }
    })
    expect(wrapper.attributes('style')).toContain('#f7f8fa')
  })

  it('shape 默认为 square', () => {
    const wrapper = mount(Search)
    expect(wrapper.classes()).toContain('bw-search--square')
  })

  it('shape 为 round 时应该有圆角样式类', () => {
    const wrapper = mount(Search, {
      props: { shape: 'round' }
    })
    expect(wrapper.classes()).toContain('bw-search--round')
  })

  it('leftIcon 为 search 时应该显示搜索图标', () => {
    const wrapper = mount(Search, {
      props: { leftIcon: 'search' }
    })
    expect(wrapper.find('.bw-search__left-icon').exists()).toBe(true)
  })

  it('输入时应该触发 update:modelValue 事件', async () => {
    const wrapper = mount(Search, {
      props: { modelValue: '' }
    })
    const input = wrapper.find('.bw-search__input')
    input.element.value = '新内容'
    await input.trigger('input')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['新内容'])
  })

  it('输入时应该触发 change 事件', async () => {
    const wrapper = mount(Search, {
      props: { modelValue: '' }
    })
    const input = wrapper.find('.bw-search__input')
    input.element.value = '变更内容'
    await input.trigger('input')
    expect(wrapper.emitted('change')).toBeTruthy()
    expect(wrapper.emitted('change')?.[0]).toEqual(['变更内容'])
  })

  it('focus 时应该触发 focus 事件', async () => {
    const wrapper = mount(Search)
    const input = wrapper.find('.bw-search__input')
    await input.trigger('focus')
    expect(wrapper.emitted('focus')).toBeTruthy()
    expect(wrapper.emitted('focus')?.length).toBe(1)
  })

  it('blur 时应该触发 blur 事件', async () => {
    const wrapper = mount(Search)
    const input = wrapper.find('.bw-search__input')
    await input.trigger('blur')
    expect(wrapper.emitted('blur')).toBeTruthy()
    expect(wrapper.emitted('blur')?.length).toBe(1)
  })

  it('confirm 时应该触发 search 事件', async () => {
    const wrapper = mount(Search, {
      props: { modelValue: '确认搜索' }
    })
    const input = wrapper.find('.bw-search__input')
    await input.trigger('confirm')
    expect(wrapper.emitted('search')).toBeTruthy()
    expect(wrapper.emitted('search')?.[0]).toEqual(['确认搜索'])
  })

  it('默认值测试 - shape 默认 square', () => {
    const wrapper = mount(Search)
    expect(wrapper.classes()).toContain('bw-search--square')
  })

  it('默认值测试 - background 默认 #ffffff', () => {
    const wrapper = mount(Search)
    expect(wrapper.attributes('style')).toContain('background-color: #ffffff')
  })

  it('默认值测试 - disabled 默认 false', () => {
    const wrapper = mount(Search)
    expect(wrapper.find('.bw-search__input').attributes('disabled')).toBeUndefined()
  })

  it('默认值测试 - clearable 默认 false', () => {
    const wrapper = mount(Search, {
      props: { modelValue: 'test' }
    })
    expect(wrapper.find('.bw-search__clear').exists()).toBe(false)
  })

  it('action 插槽应该渲染自定义操作内容', () => {
    const wrapper = mount(Search, {
      props: { showAction: true },
      slots: { action: '<span class="custom-action">自定义</span>' }
    })
    expect(wrapper.find('.custom-action').exists()).toBe(true)
  })

  it('left-icon 插槽应该渲染自定义图标', () => {
    const wrapper = mount(Search, {
      slots: { 'left-icon': '<span class="custom-left-icon">ICON</span>' }
    })
    expect(wrapper.find('.custom-left-icon').exists()).toBe(true)
  })

  it('组合属性 - disabled 且 clearable', () => {
    const wrapper = mount(Search, {
      props: { disabled: true, clearable: true, modelValue: 'test' }
    })
    expect(wrapper.find('.bw-search__field').classes()).toContain('bw-search__field--disabled')
  })

  it('组合属性 - showAction 且 round shape', () => {
    const wrapper = mount(Search, {
      props: { showAction: true, shape: 'round', actionText: '查询' }
    })
    expect(wrapper.classes()).toContain('bw-search--round')
    expect(wrapper.find('.bw-search__action').text()).toBe('查询')
  })
})