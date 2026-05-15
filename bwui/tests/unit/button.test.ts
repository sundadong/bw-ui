import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Button from '@/components/button/index.vue'

describe('Button Component', () => {
  it('renders with default props', () => {
    const wrapper = mount(Button, {
      slots: {
        default: 'Button Text'
      }
    })
    expect(wrapper.text()).toBe('Button Text')
    expect(wrapper.classes()).toContain('bw-button')
    expect(wrapper.classes()).toContain('bw-button--default')
    expect(wrapper.classes()).toContain('bw-button--medium')
  })

  it('renders with different types', () => {
    const types = ['primary', 'success', 'warning', 'danger', 'default'] as const
    types.forEach(type => {
      const wrapper = mount(Button, {
        props: { type },
        slots: { default: type }
      })
      expect(wrapper.classes()).toContain(`bw-button--${type}`)
    })
  })

  it('renders with different sizes', () => {
    const sizes = ['small', 'medium', 'large'] as const
    sizes.forEach(size => {
      const wrapper = mount(Button, {
        props: { size },
        slots: { default: size }
      })
      expect(wrapper.classes()).toContain(`bw-button--${size}`)
    })
  })

  it('handles loading state', () => {
    const wrapper = mount(Button, {
      props: { loading: true }
    })
    expect(wrapper.classes()).toContain('bw-button--loading')
    expect(wrapper.find('.bw-button__loading').exists()).toBe(true)
  })

  it('handles disabled state', () => {
    const wrapper = mount(Button, {
      props: { disabled: true }
    })
    expect(wrapper.classes()).toContain('bw-button--disabled')
  })

  it('handles block state', () => {
    const wrapper = mount(Button, {
      props: { block: true }
    })
    expect(wrapper.classes()).toContain('bw-button--block')
  })

  it('handles round state', () => {
    const wrapper = mount(Button, {
      props: { round: true }
    })
    expect(wrapper.classes()).toContain('bw-button--round')
  })

  it('handles square state', () => {
    const wrapper = mount(Button, {
      props: { square: true }
    })
    expect(wrapper.classes()).toContain('bw-button--square')
  })

  it('handles text state', () => {
    const wrapper = mount(Button, {
      props: { text: true }
    })
    expect(wrapper.classes()).toContain('bw-button--text')
  })

  it('handles hairline state', () => {
    const wrapper = mount(Button, {
      props: { hairline: true }
    })
    expect(wrapper.classes()).toContain('bw-button--hairline')
  })

  it('emits click event', async () => {
    const wrapper = mount(Button)
    await wrapper.trigger('tap')
    expect(wrapper.emitted('click')).toBeTruthy()
  })

  it('does not emit click when disabled', async () => {
    const wrapper = mount(Button, {
      props: { disabled: true }
    })
    await wrapper.trigger('tap')
    expect(wrapper.emitted('click')).toBeFalsy()
  })

  it('does not emit click when loading', async () => {
    const wrapper = mount(Button, {
      props: { loading: true }
    })
    await wrapper.trigger('tap')
    expect(wrapper.emitted('click')).toBeFalsy()
  })

  it('renders with icon', () => {
    const wrapper = mount(Button, {
      props: { icon: 'success' }
    })
    expect(wrapper.find('.bw-button__icon').exists()).toBe(true)
  })

  it('renders with custom color', () => {
    const wrapper = mount(Button, {
      props: { color: '#ff6600' }
    })
    const style = wrapper.attributes('style')
    expect(style).toContain('color')
  })

  it('renders with nativeType', () => {
    const wrapper = mount(Button, {
      props: { nativeType: 'submit' }
    })
    expect(wrapper.attributes('type')).toBe('button')
  })

  it('renders slot content correctly', () => {
    const wrapper = mount(Button, {
      slots: {
        default: '<span>Custom Content</span>'
      }
    })
    expect(wrapper.find('.bw-button__text').html()).toContain('Custom Content')
  })

  it('updates hover classes', async () => {
    const wrapper = mount(Button)
    await wrapper.trigger('tapstart')
    expect(wrapper.classes()).toContain('bw-button')
  })
})
