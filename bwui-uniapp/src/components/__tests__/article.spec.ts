import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import Article from '../article/index.vue';

describe('Article', () => {
  it('renders correctly with title', () => {
    const wrapper = mount(Article, {
      props: { title: '文章标题' },
    });
    expect(wrapper.find('.bw-article__title').text()).toBe('文章标题');
  });

  it('renders author and publish date', () => {
    const wrapper = mount(Article, {
      props: { author: '张三', publishDate: '2024-01-01' },
    });
    expect(wrapper.find('.bw-article__info').text()).toContain('张三');
    expect(wrapper.find('.bw-article__info').text()).toContain('2024-01-01');
  });

  it('renders content slot', () => {
    const wrapper = mount(Article, {
      slots: {
        default: '<p>文章正文内容</p>',
      },
    });
    expect(wrapper.find('.bw-article__content').html()).toContain('文章正文内容');
  });

  it('renders without title', () => {
    const wrapper = mount(Article);
    expect(wrapper.find('.bw-article__title').exists()).toBe(false);
  });
});
