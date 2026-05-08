import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import Notify from '../notify/index.vue';

describe('Notify', () => {
  it('renders correctly', () => {
    const wrapper = mount(Notify, {
      props: { message: '通知消息' },
    });
    expect(wrapper.find('.bw-notify').exists()).toBe(true);
    expect(wrapper.text()).toContain('通知消息');
  });

  it('renders primary type correctly', () => {
    const wrapper = mount(Notify, {
      props: { message: '消息', type: 'primary' },
    });
    expect(wrapper.classes()).toContain('bw-notify--primary');
  });

  it('renders success type correctly', () => {
    const wrapper = mount(Notify, {
      props: { message: '消息', type: 'success' },
    });
    expect(wrapper.classes()).toContain('bw-notify--success');
  });

  it('renders warning type correctly', () => {
    const wrapper = mount(Notify, {
      props: { message: '消息', type: 'warning' },
    });
    expect(wrapper.classes()).toContain('bw-notify--warning');
  });

  it('renders danger type correctly', () => {
    const wrapper = mount(Notify, {
      props: { message: '消息', type: 'danger' },
    });
    expect(wrapper.classes()).toContain('bw-notify--danger');
  });
});
