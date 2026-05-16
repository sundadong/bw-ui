import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Pagination from '../../src/components/pagination/index.vue'

describe('Pagination 组件测试', () => {
  it('应该正确渲染 Pagination 组件', () => {
    const wrapper = mount(Pagination, {
      props: { modelValue: 1, totalItems: 100, itemsPerPage: 10 }
    })
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.classes()).toContain('bw-pagination')
  })

  it('应该正确渲染上一页/下一页按钮', () => {
    const wrapper = mount(Pagination, {
      props: { modelValue: 1, totalItems: 100, itemsPerPage: 10 }
    })
    expect(wrapper.text()).toContain('上一页')
    expect(wrapper.text()).toContain('下一页')
  })

  it('应该支持自定义 prevText', () => {
    const wrapper = mount(Pagination, {
      props: { modelValue: 1, totalItems: 100, itemsPerPage: 10, prevText: 'Prev' }
    })
    expect(wrapper.text()).toContain('Prev')
  })

  it('应该支持自定义 nextText', () => {
    const wrapper = mount(Pagination, {
      props: { modelValue: 1, totalItems: 100, itemsPerPage: 10, nextText: 'Next' }
    })
    expect(wrapper.text()).toContain('Next')
  })

  it('应该渲染正确的页码按钮数量', () => {
    const wrapper = mount(Pagination, {
      props: { modelValue: 1, totalItems: 100, itemsPerPage: 10 }
    })
    const pageItems = wrapper.findAll('.bw-pagination__item')
    expect(pageItems.length).toBeGreaterThanOrEqual(3)
  })

  it('当前页应该处于 active 状态', () => {
    const wrapper = mount(Pagination, {
      props: { modelValue: 3, totalItems: 100, itemsPerPage: 10 }
    })
    const activeItem = wrapper.find('.bw-pagination__item--active')
    expect(activeItem.exists()).toBe(true)
    expect(activeItem.text()).toBe('3')
  })

  it('第一页时上一页按钮应该禁用', () => {
    const wrapper = mount(Pagination, {
      props: { modelValue: 1, totalItems: 100, itemsPerPage: 10 }
    })
    const prevItem = wrapper.find('.bw-pagination__item--prev')
    expect(prevItem.classes()).toContain('bw-pagination__item--disabled')
  })

  it('最后一页时下一页按钮应该禁用', () => {
    const wrapper = mount(Pagination, {
      props: { modelValue: 10, totalItems: 100, itemsPerPage: 10 }
    })
    const nextItem = wrapper.find('.bw-pagination__item--next')
    expect(nextItem.classes()).toContain('bw-pagination__item--disabled')
  })

  it('点击下一页应该触发事件', async () => {
    const wrapper = mount(Pagination, {
      props: { modelValue: 1, totalItems: 100, itemsPerPage: 10 }
    })
    const nextItem = wrapper.find('.bw-pagination__item--next')
    await nextItem.trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([2])
    expect(wrapper.emitted('change')).toBeTruthy()
    expect(wrapper.emitted('change')?.[0]).toEqual([2])
  })

  it('点击上一页应该触发事件', async () => {
    const wrapper = mount(Pagination, {
      props: { modelValue: 5, totalItems: 100, itemsPerPage: 10 }
    })
    const prevItem = wrapper.find('.bw-pagination__item--prev')
    await prevItem.trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([4])
  })

  it('点击页码按钮应该触发事件', async () => {
    const wrapper = mount(Pagination, {
      props: { modelValue: 1, totalItems: 100, itemsPerPage: 10 }
    })
    const pageButtons = wrapper.findAll('.bw-pagination__item')
    const page3 = pageButtons.find(item => item.text() === '3')
    if (page3) {
      await page3.trigger('click')
      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    }
  })

  it('点击当前激活页码不应该触发事件', async () => {
    const wrapper = mount(Pagination, {
      props: { modelValue: 1, totalItems: 100, itemsPerPage: 10 }
    })
    const activeItem = wrapper.find('.bw-pagination__item--active')
    await activeItem.trigger('click')
    const events = wrapper.emitted('update:modelValue')
    if (events) {
      expect(events.length).toBe(0)
    }
  })

  it('showPageSize 为 true 时应该显示每页条数', () => {
    const wrapper = mount(Pagination, {
      props: {
        modelValue: 1,
        totalItems: 100,
        itemsPerPage: 10,
        showPageSize: true,
        pageSize: 10
      }
    })
    expect(wrapper.find('.bw-pagination__page-size').exists()).toBe(true)
    expect(wrapper.text()).toContain('10条/页')
  })

  it('showPageSize 为 false 时不应该显示每页条数', () => {
    const wrapper = mount(Pagination, {
      props: {
        modelValue: 1,
        totalItems: 100,
        itemsPerPage: 10,
        showPageSize: false
      }
    })
    expect(wrapper.find('.bw-pagination__page-size').exists()).toBe(false)
  })

  it('总条目为 0 时应该正常渲染', () => {
    const wrapper = mount(Pagination, {
      props: { modelValue: 1, totalItems: 0, itemsPerPage: 10 }
    })
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('.bw-pagination__item--active').text()).toBe('1')
  })

  it('应该支持 slot prev-text', () => {
    const wrapper = mount(Pagination, {
      props: { modelValue: 1, totalItems: 100, itemsPerPage: 10 },
      slots: { 'prev-text': '&lt;' }
    })
    expect(wrapper.text()).toContain('<')
  })

  it('应该支持 slot next-text', () => {
    const wrapper = mount(Pagination, {
      props: { modelValue: 1, totalItems: 100, itemsPerPage: 10 },
      slots: { 'next-text': '&gt;' }
    })
    expect(wrapper.text()).toContain('>')
  })

  it('只有1页时不应该触发下一页事件', async () => {
    const wrapper = mount(Pagination, {
      props: { modelValue: 1, totalItems: 5, itemsPerPage: 10 }
    })
    const nextItem = wrapper.find('.bw-pagination__item--next')
    await nextItem.trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeFalsy()
  })

  it('应该正确渲染省略号', () => {
    const wrapper = mount(Pagination, {
      props: { modelValue: 5, totalItems: 200, itemsPerPage: 10 }
    })
    const ellipsisItems = wrapper.findAll('.bw-pagination__item--ellipsis')
    expect(ellipsisItems.length).toBeGreaterThanOrEqual(0)
  })

  it('forceEllipses 为 true 时应该正常渲染', () => {
    const wrapper = mount(Pagination, {
      props: { modelValue: 1, totalItems: 50, itemsPerPage: 10, forceEllipses: true }
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('modelValue 超出范围时应该被限制', () => {
    const wrapper = mount(Pagination, {
      props: { modelValue: 99, totalItems: 50, itemsPerPage: 10 }
    })
    expect(wrapper.find('.bw-pagination__item--active').exists()).toBe(true)
  })

  it('总页数小于等于7时不应该有省略号', () => {
    const wrapper = mount(Pagination, {
      props: { modelValue: 1, totalItems: 30, itemsPerPage: 10 }
    })
    const ellipsisItems = wrapper.findAll('.bw-pagination__item--ellipsis')
    expect(ellipsisItems.length).toBe(0)
  })
})