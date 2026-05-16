import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Article from '../../src/components/article/index.vue'

describe('Article 组件测试', () => {
  it('应该正确渲染文章组件', () => {
    const wrapper = mount(Article)
    expect(wrapper.exists()).toBe(true)
  })

  it('应该包含 bw-article 类', () => {
    const wrapper = mount(Article)
    expect(wrapper.classes()).toContain('bw-article')
  })

  it('默认不显示标题', () => {
    const wrapper = mount(Article)
    expect(wrapper.find('.bw-article__title').exists()).toBe(false)
  })

  it('应该显示 title 文本', () => {
    const wrapper = mount(Article, {
      props: { title: '文章标题' }
    })
    expect(wrapper.find('.bw-article__title').exists()).toBe(true)
    expect(wrapper.find('.bw-article__title').text()).toBe('文章标题')
  })

  it('应该支持 title 插槽', () => {
    const wrapper = mount(Article, {
      slots: { title: '<h1 class="custom-title">自定义标题</h1>' }
    })
    expect(wrapper.find('.custom-title').text()).toBe('自定义标题')
  })

  it('默认不显示 meta 区域', () => {
    const wrapper = mount(Article)
    expect(wrapper.find('.bw-article__meta').exists()).toBe(false)
  })

  it('应该支持 meta 插槽', () => {
    const wrapper = mount(Article, {
      slots: { meta: '<span class="custom-meta">作者 · 日期</span>' }
    })
    expect(wrapper.find('.custom-meta').text()).toBe('作者 · 日期')
  })

  it('应该显示 content 文本', () => {
    const wrapper = mount(Article, {
      props: { content: '这是一段文章内容' }
    })
    expect(wrapper.find('.bw-article__content').text()).toBe('这是一段文章内容')
  })

  it('默认 markdown 为 false', () => {
    const wrapper = mount(Article, {
      props: { content: '**加粗**' }
    })
    expect(wrapper.find('.bw-article__content--markdown').exists()).toBe(false)
    expect(wrapper.find('.bw-article__content').text()).toBe('**加粗**')
  })

  it('markdown 为 true 时应有对应类', () => {
    const wrapper = mount(Article, {
      props: { markdown: true, content: '# 标题' }
    })
    expect(wrapper.find('.bw-article__content--markdown').exists()).toBe(true)
  })

  it('markdown 模式下应渲染标题', () => {
    const wrapper = mount(Article, {
      props: { markdown: true, content: '# 一级标题' }
    })
    expect(wrapper.find('.bw-article__content h1').exists()).toBe(true)
    expect(wrapper.find('.bw-article__content h1').text()).toBe('一级标题')
  })

  it('markdown 模式下应渲染加粗', () => {
    const wrapper = mount(Article, {
      props: { markdown: true, content: '**加粗文字**' }
    })
    expect(wrapper.find('.bw-article__content strong').exists()).toBe(true)
    expect(wrapper.find('.bw-article__content strong').text()).toBe('加粗文字')
  })

  it('markdown 模式下应渲染斜体', () => {
    const wrapper = mount(Article, {
      props: { markdown: true, content: '*斜体文字*' }
    })
    expect(wrapper.find('.bw-article__content em').exists()).toBe(true)
    expect(wrapper.find('.bw-article__content em').text()).toBe('斜体文字')
  })

  it('markdown 模式下应渲染行内代码', () => {
    const wrapper = mount(Article, {
      props: { markdown: true, content: '`const a = 1`' }
    })
    expect(wrapper.find('.bw-article__content code').exists()).toBe(true)
    expect(wrapper.find('.bw-article__content code').text()).toBe('const a = 1')
  })

  it('markdown 模式下应支持二级标题', () => {
    const wrapper = mount(Article, {
      props: { markdown: true, content: '## 二级标题' }
    })
    expect(wrapper.find('.bw-article__content h2').exists()).toBe(true)
    expect(wrapper.find('.bw-article__content h2').text()).toBe('二级标题')
  })

  it('markdown 模式下应支持三级标题', () => {
    const wrapper = mount(Article, {
      props: { markdown: true, content: '### 三级标题' }
    })
    expect(wrapper.find('.bw-article__content h3').exists()).toBe(true)
    expect(wrapper.find('.bw-article__content h3').text()).toBe('三级标题')
  })

  it('默认 lineClamp 为 0 不限制行数', () => {
    const wrapper = mount(Article, {
      props: { content: '文本内容' }
    })
    const content = wrapper.find('.bw-article__content')
    expect(content.attributes('style')).toBeUndefined()
  })

  it('应该支持 lineClamp 限制行数', () => {
    const wrapper = mount(Article, {
      props: { content: '长文本', lineClamp: 3 }
    })
    const content = wrapper.find('.bw-article__content')
    expect(content.attributes('style')).toContain('overflow: hidden')
    expect(content.attributes('style')).toContain('text-overflow: ellipsis')
  })

  it('应该支持默认插槽', () => {
    const wrapper = mount(Article, {
      slots: { default: '<p class="custom-content">自定义文章内容</p>' }
    })
    expect(wrapper.find('.custom-content').text()).toBe('自定义文章内容')
  })

  it('默认插槽优先于 content prop', () => {
    const wrapper = mount(Article, {
      props: { content: 'prop内容' },
      slots: { default: '<p>插槽内容</p>' }
    })
    expect(wrapper.find('.bw-article__content').text()).toBe('插槽内容')
  })

  it('应该渲染为 div 元素', () => {
    const wrapper = mount(Article)
    expect(wrapper.element.tagName.toLowerCase()).toBe('div')
  })

  it('所有属性组合应正常工作', () => {
    const wrapper = mount(Article, {
      props: {
        title: '标题',
        content: '# Markdown内容',
        markdown: true,
        lineClamp: 5
      }
    })
    expect(wrapper.find('.bw-article__title').text()).toBe('标题')
    expect(wrapper.find('.bw-article__content--markdown').exists()).toBe(true)
    expect(wrapper.find('h1').exists()).toBe(true)
  })

  it('content 为空时不渲染内容', () => {
    const wrapper = mount(Article, {
      props: { content: '' }
    })
    expect(wrapper.find('.bw-article__content').text()).toBe('')
  })

  it('title 为空字符串时不显示标题区域', () => {
    const wrapper = mount(Article, {
      props: { title: '' }
    })
    expect(wrapper.find('.bw-article__title').exists()).toBe(false)
  })
})