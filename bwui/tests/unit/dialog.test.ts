import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import Dialog from '../../src/components/dialog/index.vue'

describe('Dialog 组件测试', () => {
  it('默认不显示 dialog', () => {
    const wrapper = mount(Dialog)
    expect(wrapper.find('.bw-dialog').exists()).toBe(false)
  })

  it('设置 show=true 后应该显示 dialog', () => {
    const wrapper = mount(Dialog, {
      props: { show: true }
    })
    expect(wrapper.find('.bw-dialog').exists()).toBe(true)
  })

  it('应该正确渲染 title', () => {
    const wrapper = mount(Dialog, {
      props: { show: true, title: '提示标题' }
    })
    expect(wrapper.find('.bw-dialog__title').text()).toBe('提示标题')
  })

  it('应该正确渲染 message', () => {
    const wrapper = mount(Dialog, {
      props: { show: true, message: '这是一条消息' }
    })
    expect(wrapper.find('.bw-dialog__message').text()).toBe('这是一条消息')
  })

  it('默认显示确认按钮和取消按钮', () => {
    const wrapper = mount(Dialog, {
      props: { show: true }
    })
    expect(wrapper.find('.bw-dialog__confirm').exists()).toBe(true)
    expect(wrapper.find('.bw-dialog__cancel').exists()).toBe(true)
  })

  it('showConfirmButton=false 时隐藏确认按钮', () => {
    const wrapper = mount(Dialog, {
      props: { show: true, showConfirmButton: false }
    })
    expect(wrapper.find('.bw-dialog__confirm').exists()).toBe(false)
  })

  it('showCancelButton=false 时隐藏取消按钮', () => {
    const wrapper = mount(Dialog, {
      props: { show: true, showCancelButton: false }
    })
    expect(wrapper.find('.bw-dialog__cancel').exists()).toBe(false)
  })

  it('应该使用自定义 confirmButtonText', () => {
    const wrapper = mount(Dialog, {
      props: { show: true, confirmButtonText: '好的' }
    })
    expect(wrapper.find('.bw-dialog__confirm').text()).toBe('好的')
  })

  it('应该使用自定义 cancelButtonText', () => {
    const wrapper = mount(Dialog, {
      props: { show: true, cancelButtonText: '算了' }
    })
    expect(wrapper.find('.bw-dialog__cancel').text()).toBe('算了')
  })

  it('hideFooter=true 时隐藏 footer', () => {
    const wrapper = mount(Dialog, {
      props: { show: true, hideFooter: true }
    })
    expect(wrapper.find('.bw-dialog__footer').exists()).toBe(false)
  })

  it('buttonLayout=vertical 时应用对应 class', () => {
    const wrapper = mount(Dialog, {
      props: { show: true, buttonLayout: 'vertical' }
    })
    expect(wrapper.find('.bw-dialog__footer').classes()).toContain('bw-dialog__footer--vertical')
  })

  it('buttonLayout=horizontal 时应用对应 class', () => {
    const wrapper = mount(Dialog, {
      props: { show: true, buttonLayout: 'horizontal' }
    })
    expect(wrapper.find('.bw-dialog__footer').classes()).toContain('bw-dialog__footer--horizontal')
  })

  it('点击确认按钮触发 confirm 事件', async () => {
    const wrapper = mount(Dialog, {
      props: { show: true }
    })
    await wrapper.find('.bw-dialog__confirm').trigger('click')
    expect(wrapper.emitted('confirm')).toBeTruthy()
    expect(wrapper.emitted('confirm')?.length).toBe(1)
  })

  it('点击取消按钮触发 cancel 事件', async () => {
    const wrapper = mount(Dialog, {
      props: { show: true }
    })
    await wrapper.find('.bw-dialog__cancel').trigger('click')
    expect(wrapper.emitted('cancel')).toBeTruthy()
    expect(wrapper.emitted('cancel')?.length).toBe(1)
  })

  it('点击确认后触发 update:modelValue 为 false', async () => {
    const wrapper = mount(Dialog, {
      props: { show: true }
    })
    await wrapper.find('.bw-dialog__confirm').trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false])
  })

  it('点击确认后触发 update:show 为 false', async () => {
    const wrapper = mount(Dialog, {
      props: { show: true }
    })
    await wrapper.find('.bw-dialog__confirm').trigger('click')
    expect(wrapper.emitted('update:show')).toBeTruthy()
    expect(wrapper.emitted('update:show')?.[0]).toEqual([false])
  })

  it('beforeClose 返回 false 时阻止关闭', async () => {
    const beforeClose = vi.fn().mockResolvedValue(false)
    const wrapper = mount(Dialog, {
      props: { show: true, beforeClose }
    })
    await wrapper.find('.bw-dialog__confirm').trigger('click')
    expect(wrapper.emitted('confirm')).toBeFalsy()
  })

  it('beforeClose 返回 true 时允许关闭', async () => {
    const beforeClose = vi.fn().mockResolvedValue(true)
    const wrapper = mount(Dialog, {
      props: { show: true, beforeClose }
    })
    await wrapper.find('.bw-dialog__confirm').trigger('click')
    expect(wrapper.emitted('confirm')).toBeTruthy()
  })

  it('open() 方法应该显示 dialog 并触发 open 事件', async () => {
    const wrapper = mount(Dialog)
    const vm = wrapper.vm as any
    vm.open()
    await nextTick()
    expect(wrapper.find('.bw-dialog').exists()).toBe(true)
    expect(wrapper.emitted('open')).toBeTruthy()
  })

  it('close() 方法应该隐藏 dialog 并触发 close 事件', async () => {
    const wrapper = mount(Dialog, {
      props: { show: true }
    })
    const vm = wrapper.vm as any
    vm.close()
    await nextTick()
    expect(wrapper.find('.bw-dialog').exists()).toBe(false)
    expect(wrapper.emitted('close')).toBeTruthy()
  })

  it('close() 方法应该触发 update:modelValue 为 false', async () => {
    const wrapper = mount(Dialog, {
      props: { show: true }
    })
    const vm = wrapper.vm as any
    vm.close()
    await nextTick()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false])
  })

  it('show prop 从 false 变为 true 时应该显示', async () => {
    const wrapper = mount(Dialog, {
      props: { show: false }
    })
    expect(wrapper.find('.bw-dialog').exists()).toBe(false)
    await wrapper.setProps({ show: true })
    expect(wrapper.find('.bw-dialog').exists()).toBe(true)
  })

  it('zIndex 默认值应该为 2000', () => {
    const wrapper = mount(Dialog, {
      props: { show: true }
    })
    expect(wrapper.props('zIndex')).toBe(2000)
  })

  it('title slot 应该正确渲染', () => {
    const wrapper = mount(Dialog, {
      props: { show: true },
      slots: { title: '<span class="custom-title">自定义标题</span>' }
    })
    expect(wrapper.find('.custom-title').exists()).toBe(true)
    expect(wrapper.find('.custom-title').text()).toBe('自定义标题')
  })

  it('默认 slot 应该正确渲染', () => {
    const wrapper = mount(Dialog, {
      props: { show: true },
      slots: { default: '<div class="custom-content">自定义内容</div>' }
    })
    expect(wrapper.find('.custom-content').exists()).toBe(true)
  })

  it('confirm-button slot 应该正确渲染', () => {
    const wrapper = mount(Dialog, {
      props: { show: true },
      slots: { 'confirm-button': '<span class="custom-confirm">确定按钮</span>' }
    })
    expect(wrapper.find('.custom-confirm').exists()).toBe(true)
  })

  it('cancel-button slot 应该正确渲染', () => {
    const wrapper = mount(Dialog, {
      props: { show: true },
      slots: { 'cancel-button': '<span class="custom-cancel">返回按钮</span>' }
    })
    expect(wrapper.find('.custom-cancel').exists()).toBe(true)
  })

  it('confirmButtonText 和 cancelButtonText 默认值', () => {
    const wrapper = mount(Dialog, {
      props: { show: true }
    })
    expect(wrapper.props('confirmButtonText')).toBe('确认')
    expect(wrapper.props('cancelButtonText')).toBe('取消')
  })

  it('无 title 时不渲染 header', () => {
    const wrapper = mount(Dialog, {
      props: { show: true }
    })
    expect(wrapper.find('.bw-dialog__header').exists()).toBe(false)
  })
})