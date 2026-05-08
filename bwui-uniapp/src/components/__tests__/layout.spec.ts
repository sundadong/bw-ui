import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import Row from '../layout/index.vue';
import Col from '../layout/col.vue';

describe('Row', () => {
  it('renders correctly', () => {
    const wrapper = mount(Row);
    expect(wrapper.find('.bw-row').exists()).toBe(true);
  });

  it('applies gutter correctly', () => {
    const wrapper = mount(Row, {
      props: { gutter: 16 },
    });
    expect(wrapper.props('gutter')).toBe(16);
  });
});

describe('Col', () => {
  it('renders correctly', () => {
    const wrapper = mount(Col);
    expect(wrapper.find('.bw-col').exists()).toBe(true);
  });

  it('applies span correctly', () => {
    const wrapper = mount(Col, {
      props: { span: 6 },
    });
    const style = wrapper.attributes('style') || '';
    expect(style).toContain('flex');
    expect(style).toContain('max-width');
  });

  it('applies offset correctly', () => {
    const wrapper = mount(Col, {
      props: { span: 6, offset: 2 },
    });
    const style = wrapper.attributes('style') || '';
    expect(style).toContain('margin-left');
  });
});
