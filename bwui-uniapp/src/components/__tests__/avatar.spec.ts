import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import Avatar from '../avatar/index.vue';

describe('Avatar', () => {
  it('renders correctly with default props', () => {
    const wrapper = mount(Avatar, {
      slots: { default: '头像' },
    });
    expect(wrapper.find('.bw-avatar').exists()).toBe(true);
    expect(wrapper.text()).toBe('头像');
    expect(wrapper.classes()).toContain('bw-avatar--medium');
  });

  it('renders text prop correctly', () => {
    const wrapper = mount(Avatar, {
      props: { text: 'A' },
    });
    expect(wrapper.find('.bw-avatar__text').text()).toBe('A');
  });

  it('renders small size correctly', () => {
    const wrapper = mount(Avatar, {
      props: { size: 'small' },
    });
    expect(wrapper.classes()).toContain('bw-avatar--small');
  });

  it('renders large size correctly', () => {
    const wrapper = mount(Avatar, {
      props: { size: 'large' },
    });
    expect(wrapper.classes()).toContain('bw-avatar--large');
  });

  it('renders circle shape correctly', () => {
    const wrapper = mount(Avatar, {
      props: { shape: 'circle' },
    });
    expect(wrapper.classes()).toContain('bw-avatar--circle');
  });

  it('applies custom size correctly', () => {
    const wrapper = mount(Avatar, {
      props: { size: 100 },
    });
    const style = wrapper.attributes('style') || '';
    expect(style).toContain('width');
    expect(style).toContain('height');
  });

  it('renders image when src is provided', () => {
    const wrapper = mount(Avatar, {
      props: { src: 'https://example.com/avatar.jpg' },
    });
    expect(wrapper.find('.bw-avatar__image').exists()).toBe(true);
  });
});
