import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import Icon from '../icon/index.vue';

describe('Icon', () => {
  it('renders correctly with name', () => {
    const wrapper = mount(Icon, {
      props: { name: 'check' },
    });
    expect(wrapper.find('.bw-icon').exists()).toBe(true);
    expect(wrapper.classes()).toContain('bw-icon-check');
  });

  it('renders spin style correctly', () => {
    const wrapper = mount(Icon, {
      props: { name: 'loading', spin: true },
    });
    expect(wrapper.classes()).toContain('bw-icon--spin');
  });

  it('applies custom size correctly', () => {
    const wrapper = mount(Icon, {
      props: { name: 'check', size: 24 },
    });
    const style = wrapper.attributes('style') || '';
    expect(style).toContain('24px');
  });

  it('applies custom color correctly', () => {
    const wrapper = mount(Icon, {
      props: { name: 'check', color: '#ff0000' },
    });
    const style = wrapper.attributes('style') || '';
    expect(style).toContain('rgb(255, 0, 0)');
  });
});
