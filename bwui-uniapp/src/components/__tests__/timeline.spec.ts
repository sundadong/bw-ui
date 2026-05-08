import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import Timeline from '../timeline/index.vue';

describe('Timeline', () => {
  const items = [
    { title: '第一步', label: '10:00', description: '开始' },
    { title: '第二步', label: '12:00', description: '进行中', active: true },
    { title: '第三步', label: '14:00', description: '完成' },
  ];

  it('renders correctly with items', () => {
    const wrapper = mount(Timeline, {
      props: { items },
    });
    expect(wrapper.find('.bw-timeline').exists()).toBe(true);
    expect(wrapper.findAll('.bw-timeline__item')).toHaveLength(3);
  });

  it('renders item title correctly', () => {
    const wrapper = mount(Timeline, {
      props: { items },
    });
    expect(wrapper.find('.bw-timeline__title').text()).toBe('第一步');
  });

  it('renders item label correctly', () => {
    const wrapper = mount(Timeline, {
      props: { items },
    });
    expect(wrapper.find('.bw-timeline__label').text()).toBe('10:00');
  });

  it('renders item description correctly', () => {
    const wrapper = mount(Timeline, {
      props: { items },
    });
    expect(wrapper.find('.bw-timeline__description').text()).toBe('开始');
  });

  it('renders active dot correctly', () => {
    const wrapper = mount(Timeline, {
      props: { items },
    });
    const activeDot = wrapper.findAll('.bw-timeline__dot')[1];
    expect(activeDot.classes()).toContain('is-active');
  });

  it('renders with empty items', () => {
    const wrapper = mount(Timeline, {
      props: { items: [] },
    });
    expect(wrapper.findAll('.bw-timeline__item')).toHaveLength(0);
  });
});
