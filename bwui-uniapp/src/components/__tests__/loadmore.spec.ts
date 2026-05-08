import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import Loadmore from '../loadmore/index.vue';

describe('Loadmore', () => {
  it('renders loading status correctly', () => {
    const wrapper = mount(Loadmore, {
      props: { status: 'loading' },
    });
    expect(wrapper.find('.bw-loadmore__loading').exists()).toBe(true);
    expect(wrapper.find('.bw-loadmore__icon').exists()).toBe(true);
  });

  it('renders loading text correctly', () => {
    const wrapper = mount(Loadmore, {
      props: { status: 'loading', loadingText: '正在加载...' },
    });
    expect(wrapper.find('.bw-loadmore__tip').text()).toBe('正在加载...');
  });

  it('renders finished status correctly', () => {
    const wrapper = mount(Loadmore, {
      props: { status: 'finished' },
    });
    expect(wrapper.classes()).toContain('bw-loadmore--finished');
    expect(wrapper.text()).toContain('没有更多了');
  });

  it('renders error status correctly', () => {
    const wrapper = mount(Loadmore, {
      props: { status: 'error' },
    });
    expect(wrapper.text()).toContain('加载失败，点击重新加载');
  });

  it('respects custom finished text', () => {
    const wrapper = mount(Loadmore, {
      props: { status: 'finished', finishedText: '数据加载完成' },
    });
    expect(wrapper.text()).toContain('数据加载完成');
  });
});
