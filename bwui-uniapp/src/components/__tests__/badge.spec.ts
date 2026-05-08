import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import Badge from '../badge/index.vue';

describe('Badge', () => {
  it('renders correctly', () => {
    const wrapper = mount(Badge, {
      slots: { default: '<div>Content</div>' },
    });
    expect(wrapper.find('.bw-badge').exists()).toBe(true);
  });

  it('renders with content number', () => {
    const wrapper = mount(Badge, {
      props: { content: 5 },
    });
    expect(wrapper.find('.bw-badge__num').text()).toBe('5');
  });

  it('renders with max number', () => {
    const wrapper = mount(Badge, {
      props: { content: 150, max: 99 },
    });
    expect(wrapper.find('.bw-badge__num').text()).toBe('99+');
  });

  it('renders dot correctly', () => {
    const wrapper = mount(Badge, {
      props: { dot: true },
    });
    expect(wrapper.find('.bw-badge__dot').exists()).toBe(true);
  });

  it('does not render when content is undefined and dot is false', () => {
    const wrapper = mount(Badge);
    expect(wrapper.find('.bw-badge__num').exists()).toBe(false);
    expect(wrapper.find('.bw-badge__dot').exists()).toBe(false);
  });
});
