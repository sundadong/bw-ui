import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Timeline from '../../src/components/timeline/index.vue'
import TimelineItem from '../../src/components/timeline-item/index.vue'

describe('Timeline 组件测试', () => {
  it('应该正确渲染时间轴组件', () => {
    const wrapper = mount(Timeline)
    expect(wrapper.exists()).toBe(true)
  })

  it('应该包含 bw-timeline 类', () => {
    const wrapper = mount(Timeline)
    expect(wrapper.classes()).toContain('bw-timeline')
  })

  it('默认方向为 vertical', () => {
    const wrapper = mount(Timeline)
    expect(wrapper.classes()).not.toContain('bw-timeline--horizontal')
  })

  it('direction 为 horizontal 时应添加对应类', () => {
    const wrapper = mount(Timeline, {
      props: { direction: 'horizontal' }
    })
    expect(wrapper.classes()).toContain('bw-timeline--horizontal')
  })

  it('reverse 为 true 时应添加对应类', () => {
    const wrapper = mount(Timeline, {
      props: { reverse: true }
    })
    expect(wrapper.classes()).toContain('bw-timeline--reverse')
  })

  it('reverse + horizontal 应同时生效', () => {
    const wrapper = mount(Timeline, {
      props: { reverse: true, direction: 'horizontal' }
    })
    expect(wrapper.classes()).toContain('bw-timeline--reverse')
    expect(wrapper.classes()).toContain('bw-timeline--horizontal')
  })

  it('应该渲染默认插槽内容', () => {
    const wrapper = mount(Timeline, {
      slots: { default: '<div class="test-child">子内容</div>' }
    })
    expect(wrapper.find('.test-child').exists()).toBe(true)
    expect(wrapper.find('.test-child').text()).toBe('子内容')
  })

  it('应该渲染为 div 元素', () => {
    const wrapper = mount(Timeline)
    expect(wrapper.element.tagName.toLowerCase()).toBe('div')
  })
})

describe('TimelineItem 组件测试', () => {
  it('应该正确渲染时间轴项组件', () => {
    const wrapper = mount(TimelineItem)
    expect(wrapper.exists()).toBe(true)
  })

  it('应该包含 bw-timeline-item 类', () => {
    const wrapper = mount(TimelineItem)
    expect(wrapper.classes()).toContain('bw-timeline-item')
  })

  it('应该包含圆点元素', () => {
    const wrapper = mount(TimelineItem)
    expect(wrapper.find('.bw-timeline-item__dot').exists()).toBe(true)
  })

  it('应该包含连接线元素', () => {
    const wrapper = mount(TimelineItem)
    expect(wrapper.find('.bw-timeline-item__line').exists()).toBe(true)
  })

  it('默认 color 为 #1989fa', () => {
    const wrapper = mount(TimelineItem)
    const dot = wrapper.find('.bw-timeline-item__dot')
    expect(dot.attributes('style')).toContain('background-color: #1989fa')
  })

  it('应该支持自定义 color', () => {
    const wrapper = mount(TimelineItem, {
      props: { color: '#07c160' }
    })
    const dot = wrapper.find('.bw-timeline-item__dot')
    expect(dot.attributes('style')).toContain('background-color: #07c160')
  })

  it('默认 lineColor 为 #ebedf0', () => {
    const wrapper = mount(TimelineItem)
    const line = wrapper.find('.bw-timeline-item__line')
    expect(line.attributes('style')).toContain('background-color: #ebedf0')
  })

  it('应该支持自定义 lineColor', () => {
    const wrapper = mount(TimelineItem, {
      props: { lineColor: '#ff0000' }
    })
    const line = wrapper.find('.bw-timeline-item__line')
    expect(line.attributes('style')).toContain('background-color: #ff0000')
  })

  it('应该显示 content 文本', () => {
    const wrapper = mount(TimelineItem, {
      props: { content: '步骤一' }
    })
    expect(wrapper.find('.bw-timeline-item__body').text()).toBe('步骤一')
  })

  it('应该显示 time 文本', () => {
    const wrapper = mount(TimelineItem, {
      props: { time: '2024-01-01' }
    })
    expect(wrapper.find('.bw-timeline-item__time').text()).toBe('2024-01-01')
  })

  it('应该支持 time 插槽', () => {
    const wrapper = mount(TimelineItem, {
      slots: { time: '<span class="custom-time">自定义时间</span>' }
    })
    expect(wrapper.find('.custom-time').text()).toBe('自定义时间')
  })

  it('应该支持 dot 插槽', () => {
    const wrapper = mount(TimelineItem, {
      slots: { dot: '<span class="custom-dot">●</span>' }
    })
    expect(wrapper.find('.custom-dot').exists()).toBe(true)
  })

  it('应该支持默认插槽', () => {
    const wrapper = mount(TimelineItem, {
      slots: { default: '<span class="custom-body">自定义内容</span>' }
    })
    expect(wrapper.find('.custom-body').text()).toBe('自定义内容')
  })

  it('应该渲染为 div 元素', () => {
    const wrapper = mount(TimelineItem)
    expect(wrapper.element.tagName.toLowerCase()).toBe('div')
  })

  it('time 为空时不应显示时间区域', () => {
    const wrapper = mount(TimelineItem)
    expect(wrapper.find('.bw-timeline-item__time').exists()).toBe(false)
  })

  it('同时设置 time 和 content 应正确渲染', () => {
    const wrapper = mount(TimelineItem, {
      props: { time: '2024-01-01', content: '事件描述' }
    })
    expect(wrapper.find('.bw-timeline-item__time').text()).toBe('2024-01-01')
    expect(wrapper.find('.bw-timeline-item__body').text()).toBe('事件描述')
  })

  it('默认插槽内容优先于 content prop', () => {
    const wrapper = mount(TimelineItem, {
      props: { content: 'prop内容' },
      slots: { default: '<span>插槽内容</span>' }
    })
    expect(wrapper.find('.bw-timeline-item__body').text()).toBe('插槽内容')
  })
})

describe('Timeline + TimelineItem 组合测试', () => {
  it('Timeline 中应该正确嵌套 TimelineItem', () => {
    const wrapper = mount(Timeline, {
      slots: {
        default: `
          <timeline-item content="步骤一" time="10:00" />
          <timeline-item content="步骤二" time="11:00" />
        `
      },
      global: {
        components: { TimelineItem }
      }
    })
    expect(wrapper.findAllComponents(TimelineItem).length).toBe(2)
  })
})