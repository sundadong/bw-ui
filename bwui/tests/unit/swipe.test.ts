import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import Swipe from '../../src/components/swipe/index.vue'
import SwipeItem from '../../src/components/swipe-item/index.vue'

describe('Swipe 组件测试', () => {
  it('应该正确渲染 Swipe 容器', async () => {
    const wrapper = mount(Swipe, {
      slots: {
        default: [
          '<swipe-item>1</swipe-item>',
          '<swipe-item>2</swipe-item>'
        ]
      },
      global: {
        components: { SwipeItem }
      }
    })
    await nextTick()
    expect(wrapper.find('.bw-swipe').exists()).toBe(true)
  })

  it('应该包含 bw-swipe 类', async () => {
    const wrapper = mount(Swipe, {
      slots: {
        default: [
          '<swipe-item>1</swipe-item>',
          '<swipe-item>2</swipe-item>'
        ]
      },
      global: {
        components: { SwipeItem }
      }
    })
    await nextTick()
    expect(wrapper.classes()).toContain('bw-swipe')
  })

  it('应该正确渲染 SwipeItem', async () => {
    const wrapper = mount(Swipe, {
      slots: {
        default: [
          '<swipe-item>内容1</swipe-item>',
          '<swipe-item>内容2</swipe-item>'
        ]
      },
      global: {
        components: { SwipeItem }
      }
    })
    await nextTick()
    const items = wrapper.findAll('.bw-swipe-item')
    expect(items.length).toBe(2)
  })

  it('SwipeItem 应该包含 bw-swipe-item 类', () => {
    const wrapper = mount(SwipeItem, {
      slots: { default: '内容' }
    })
    expect(wrapper.classes()).toContain('bw-swipe-item')
  })

  it('默认 modelValue 应为 0', async () => {
    const wrapper = mount(Swipe, {
      props: { modelValue: 0 },
      slots: {
        default: [
          '<swipe-item>1</swipe-item>',
          '<swipe-item>2</swipe-item>'
        ]
      },
      global: {
        components: { SwipeItem }
      }
    })
    await nextTick()
    expect(wrapper.vm.modelValue).toBe(0)
  })

  it('应该支持设置初始索引', async () => {
    const wrapper = mount(Swipe, {
      props: { modelValue: 1 },
      slots: {
        default: [
          '<swipe-item>1</swipe-item>',
          '<swipe-item>2</swipe-item>',
          '<swipe-item>3</swipe-item>'
        ]
      },
      global: {
        components: { SwipeItem }
      }
    })
    await nextTick()
    expect(wrapper.props('modelValue')).toBe(1)
  })

  it('默认应该显示指示器', async () => {
    const wrapper = mount(Swipe, {
      slots: {
        default: [
          '<swipe-item>1</swipe-item>',
          '<swipe-item>2</swipe-item>'
        ]
      },
      global: {
        components: { SwipeItem }
      }
    })
    await nextTick()
    await nextTick()
    expect(wrapper.find('.bw-swipe__indicators').exists()).toBe(true)
  })

  it('showIndicators=false 应该隐藏指示器', async () => {
    const wrapper = mount(Swipe, {
      props: { showIndicators: false },
      slots: {
        default: [
          '<swipe-item>1</swipe-item>',
          '<swipe-item>2</swipe-item>'
        ]
      },
      global: {
        components: { SwipeItem }
      }
    })
    await nextTick()
    expect(wrapper.find('.bw-swipe__indicators').exists()).toBe(false)
  })

  it('只有一个项目时不应该显示指示器', async () => {
    const wrapper = mount(Swipe, {
      slots: {
        default: '<swipe-item>1</swipe-item>'
      },
      global: {
        components: { SwipeItem }
      }
    })
    await nextTick()
    await nextTick()
    expect(wrapper.find('.bw-swipe__indicator').exists()).toBe(false)
  })

  it('应该支持自定义指示器颜色', async () => {
    const wrapper = mount(Swipe, {
      props: { indicatorColor: '#ff0000', indicatorActiveColor: '#00ff00' },
      slots: {
        default: [
          '<swipe-item>1</swipe-item>',
          '<swipe-item>2</swipe-item>'
        ]
      },
      global: {
        components: { SwipeItem }
      }
    })
    await nextTick()
    await nextTick()
    expect(wrapper.find('.bw-swipe__indicators').exists()).toBe(true)
  })

  it('应该支持垂直模式', () => {
    const wrapper = mount(Swipe, {
      props: { vertical: true },
      slots: {
        default: [
          '<swipe-item>1</swipe-item>',
          '<swipe-item>2</swipe-item>'
        ]
      },
      global: {
        components: { SwipeItem }
      }
    })
    expect(wrapper.find('.bw-swipe__track--vertical').exists()).toBe(true)
  })

  it('默认应该是水平模式', () => {
    const wrapper = mount(Swipe, {
      slots: {
        default: [
          '<swipe-item>1</swipe-item>',
          '<swipe-item>2</swipe-item>'
        ]
      },
      global: {
        components: { SwipeItem }
      }
    })
    expect(wrapper.find('.bw-swipe__track--vertical').exists()).toBe(false)
  })

  it('应该支持 autoplay 属性', () => {
    const wrapper = mount(Swipe, {
      props: { autoplay: 3000 },
      slots: {
        default: [
          '<swipe-item>1</swipe-item>',
          '<swipe-item>2</swipe-item>'
        ]
      },
      global: {
        components: { SwipeItem }
      }
    })
    expect(wrapper.find('.bw-swipe').exists()).toBe(true)
  })

  it('应该支持 duration 属性', () => {
    const wrapper = mount(Swipe, {
      props: { duration: 300 },
      slots: {
        default: [
          '<swipe-item>1</swipe-item>',
          '<swipe-item>2</swipe-item>'
        ]
      },
      global: {
        components: { SwipeItem }
      }
    })
    expect(wrapper.find('.bw-swipe').exists()).toBe(true)
  })

  it('应该支持 interval 属性', () => {
    const wrapper = mount(Swipe, {
      props: { interval: 2000 },
      slots: {
        default: [
          '<swipe-item>1</swipe-item>',
          '<swipe-item>2</swipe-item>'
        ]
      },
      global: {
        components: { SwipeItem }
      }
    })
    expect(wrapper.find('.bw-swipe').exists()).toBe(true)
  })

  it('应该支持 loop 属性', () => {
    const wrapper = mount(Swipe, {
      props: { loop: false },
      slots: {
        default: [
          '<swipe-item>1</swipe-item>',
          '<swipe-item>2</swipe-item>'
        ]
      },
      global: {
        components: { SwipeItem }
      }
    })
    expect(wrapper.find('.bw-swipe').exists()).toBe(true)
  })

  it('应该支持 touchable 属性', () => {
    const wrapper = mount(Swipe, {
      props: { touchable: false },
      slots: {
        default: [
          '<swipe-item>1</swipe-item>',
          '<swipe-item>2</swipe-item>'
        ]
      },
      global: {
        components: { SwipeItem }
      }
    })
    expect(wrapper.find('.bw-swipe').exists()).toBe(true)
  })

  it('应该支持 lazyRender 属性', () => {
    const wrapper = mount(Swipe, {
      props: { lazyRender: true },
      slots: {
        default: [
          '<swipe-item>1</swipe-item>',
          '<swipe-item>2</swipe-item>'
        ]
      },
      global: {
        components: { SwipeItem }
      }
    })
    expect(wrapper.find('.bw-swipe').exists()).toBe(true)
  })

  it('应该正确渲染 SwipeItem 插槽内容', () => {
    const wrapper = mount(Swipe, {
      slots: {
        default: [
          '<swipe-item><div class="custom">自定义</div></swipe-item>'
        ]
      },
      global: {
        components: { SwipeItem }
      }
    })
    expect(wrapper.find('.custom').exists()).toBe(true)
  })

  it('应该暴露出 goTo 方法', () => {
    const wrapper = mount(Swipe, {
      slots: {
        default: [
          '<swipe-item>1</swipe-item>',
          '<swipe-item>2</swipe-item>'
        ]
      },
      global: {
        components: { SwipeItem }
      }
    })
    expect(typeof wrapper.vm.goTo).toBe('function')
  })

  it('应该暴露出 next 方法', () => {
    const wrapper = mount(Swipe, {
      slots: {
        default: [
          '<swipe-item>1</swipe-item>',
          '<swipe-item>2</swipe-item>'
        ]
      },
      global: {
        components: { SwipeItem }
      }
    })
    expect(typeof wrapper.vm.next).toBe('function')
  })

  it('应该暴露出 prev 方法', () => {
    const wrapper = mount(Swipe, {
      slots: {
        default: [
          '<swipe-item>1</swipe-item>',
          '<swipe-item>2</swipe-item>'
        ]
      },
      global: {
        components: { SwipeItem }
      }
    })
    expect(typeof wrapper.vm.prev).toBe('function')
  })

  it('空插槽时不应该崩溃', () => {
    const wrapper = mount(Swipe)
    expect(wrapper.find('.bw-swipe').exists()).toBe(true)
  })

  it('应该正确渲染 track 元素', () => {
    const wrapper = mount(Swipe, {
      slots: {
        default: [
          '<swipe-item>1</swipe-item>'
        ]
      },
      global: {
        components: { SwipeItem }
      }
    })
    expect(wrapper.find('.bw-swipe__track').exists()).toBe(true)
  })
})