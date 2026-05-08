import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import Loading from '../loading/index.vue';

describe('Loading', () => {
  it('renders correctly with show prop', () => {
    const wrapper = mount(Loading, {
      props: { show: true },
    });
    expect(wrapper.find('.bw-loading').exists()).toBe(true);
  });

  it('does not render when show is false', () => {
    const wrapper = mount(Loading, {
      props: { show: false },
    });
    expect(wrapper.find('.bw-loading').exists()).toBe(false);
  });

  it('renders with tip text', () => {
    const wrapper = mount(Loading, {
      props: { show: true, tip: '加载中...' },
    });
    expect(wrapper.find('.bw-loading__tip').text()).toBe('加载中...');
  });

  it('renders dark theme correctly', () => {
    const wrapper = mount(Loading, {
      props: { show: true, theme: 'dark' },
    });
    expect(wrapper.classes()).toContain('bw-loading--dark');
  });

  it('renders fullscreen correctly', () => {
    const wrapper = mount(Loading, {
      props: { show: true, fullscreen: true },
    });
    expect(wrapper.find('.bw-loading__fixed').exists()).toBe(true);
  });
});
