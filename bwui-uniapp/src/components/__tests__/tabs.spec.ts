import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import Tabs from '../tabs/index.vue';

describe('Tabs', () => {
  const tabs = [
    { title: '标签1' },
    { title: '标签2' },
    { title: '标签3' },
  ];

  it('renders correctly with tabs prop', () => {
    const wrapper = mount(Tabs, {
      props: { tabs },
    });
    expect(wrapper.findAll('.bw-tabs__item')).toHaveLength(3);
    expect(wrapper.find('.bw-tabs__item').text()).toBe('标签1');
  });

  it('highlights current tab', () => {
    const wrapper = mount(Tabs, {
      props: { tabs, currentIndex: 1 },
    });
    const items = wrapper.findAll('.bw-tabs__item');
    expect(items[0].classes()).not.toContain('is-active');
    expect(items[1].classes()).toContain('is-active');
    expect(items[2].classes()).not.toContain('is-active');
  });

  it('emits update:currentIndex when tab clicked', async () => {
    const wrapper = mount(Tabs, {
      props: { tabs },
    });
    await wrapper.findAll('.bw-tabs__item')[1].trigger('click');
    expect(wrapper.emitted('update:currentIndex')).toBeTruthy();
    const emitted = wrapper.emitted('update:currentIndex') as any[][];
    expect(emitted[0][0]).toBe(1);
  });

  it('does not emit when disabled tab clicked', async () => {
    const disabledTabs = [
      { title: '标签1' },
      { title: '标签2', disabled: true },
      { title: '标签3' },
    ];
    const wrapper = mount(Tabs, {
      props: { tabs: disabledTabs },
    });
    await wrapper.findAll('.bw-tabs__item')[1].trigger('click');
    expect(wrapper.emitted('update:currentIndex')).toBeUndefined();
  });

  it('renders fixed style correctly', () => {
    const wrapper = mount(Tabs, {
      props: { tabs, fixed: true },
    });
    expect(wrapper.classes()).toContain('bw-tabs--fixed');
  });

  it('renders scroll style correctly', () => {
    const wrapper = mount(Tabs, {
      props: { tabs, scroll: true },
    });
    expect(wrapper.find('.bw-tabs__body--scroll').exists()).toBe(true);
  });
});
