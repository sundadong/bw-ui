import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Cell from '@/components/cell/index.vue'

describe('Cell Component', () => {
  it('renders with default props', () => {
    const wrapper = mount(Cell)
    expect(wrapper.classes()).toContain('bw-cell')
  })

  it('renders title and value', () => {
    const wrapper = mount(Cell, {
      props: {
        title: 'Title',
        value: 'Value'
      }
    })
    expect(wrapper.find('.bw-cell__title-text').text()).toBe('Title')
    expect(wrapper.find('.bw-cell__value').text()).toBe('Value')
  })

  it('renders label', () => {
    const wrapper = mount(Cell, {
      props: {
        title: 'Title',
        label: 'Description'
      }
    })
    expect(wrapper.find('.bw-cell__label').text()).toBe('Description')
  })

  it('renders icon', () => {
    const wrapper = mount(Cell, {
      props: {
        icon: 'success'
      }
    })
    expect(wrapper.find('.bw-cell__left-icon').exists()).toBe(true)
  })

  it('renders arrow icon when isLink is true', () => {
    const wrapper = mount(Cell, {
      props: {
        isLink: true
      }
    })
    expect(wrapper.find('.bw-cell__right-icon').exists()).toBe(true)
  })

  it('renders arrow icon when arrow is true', () => {
    const wrapper = mount(Cell, {
      props: {
        arrow: true
      }
    })
    expect(wrapper.find('.bw-cell__right-icon').exists()).toBe(true)
  })

  it('handles clickable state', () => {
    const wrapper = mount(Cell, {
      props: {
        clickable: true
      }
    })
    expect(wrapper.classes()).toContain('bw-cell--clickable')
  })

  it('handles disabled state', () => {
    const wrapper = mount(Cell, {
      props: {
        disabled: true
      }
    })
    expect(wrapper.classes()).toContain('bw-cell--disabled')
  })

  it('handles center state', () => {
    const wrapper = mount(Cell, {
      props: {
        center: true
      }
    })
    expect(wrapper.classes()).toContain('bw-cell--center')
  })

  it('emits click event', async () => {
    const wrapper = mount(Cell)
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })

  it('does not emit click when disabled', async () => {
    const wrapper = mount(Cell, {
      props: {
        disabled: true
      }
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeFalsy()
  })

  it('renders slot content', () => {
    const wrapper = mount(Cell, {
      slots: {
        title: '<span>Custom Title</span>',
        default: '<span>Custom Value</span>'
      }
    })
    expect(wrapper.find('.bw-cell__title').html()).toContain('Custom Title')
    expect(wrapper.find('.bw-cell__value').html()).toContain('Custom Value')
  })

  it('renders icon slot', () => {
    const wrapper = mount(Cell, {
      slots: {
        icon: '<span>Custom Icon</span>'
      }
    })
    expect(wrapper.find('.bw-cell__left-icon').html()).toContain('Custom Icon')
  })

  it('renders extra slot', () => {
    const wrapper = mount(Cell, {
      props: {
        isLink: true
      },
      slots: {
        extra: '<span>Custom Extra</span>'
      }
    })
    expect(wrapper.find('.bw-cell__right-icon').html()).toContain('Custom Extra')
  })

  it('is clickable when isLink is true', () => {
    const wrapper = mount(Cell, {
      props: {
        isLink: true
      }
    })
    expect(wrapper.classes()).toContain('bw-cell--clickable')
  })

  it('is clickable when arrow is true', () => {
    const wrapper = mount(Cell, {
      props: {
        arrow: true
      }
    })
    expect(wrapper.classes()).toContain('bw-cell--clickable')
  })
})
