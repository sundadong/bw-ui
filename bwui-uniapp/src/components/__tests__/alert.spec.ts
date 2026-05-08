import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import Alert from '../alert/index.vue';

describe('Alert', () => {
  it('renders correctly with default props', () => {
    const wrapper = mount(Alert, {
      props: { title: '提示信息' },
    });
    expect(wrapper.find('.bw-alert').exists()).toBe(true);
    expect(wrapper.find('.bw-alert__title').text()).toBe('提示信息');
  });

  it('renders primary type correctly', () => {
    const wrapper = mount(Alert, {
      props: { type: 'primary' },
    });
    expect(wrapper.classes()).toContain('bw-alert--primary');
  });

  it('renders success type correctly', () => {
    const wrapper = mount(Alert, {
      props: { type: 'success' },
    });
    expect(wrapper.classes()).toContain('bw-alert--success');
  });

  it('renders warning type correctly', () => {
    const wrapper = mount(Alert, {
      props: { type: 'warning' },
    });
    expect(wrapper.classes()).toContain('bw-alert--warning');
  });

  it('renders danger type correctly', () => {
    const wrapper = mount(Alert, {
      props: { type: 'danger' },
    });
    expect(wrapper.classes()).toContain('bw-alert--danger');
  });

  it('renders closable correctly', () => {
    const wrapper = mount(Alert, {
      props: { closable: true },
    });
    expect(wrapper.find('.bw-alert__right').exists()).toBe(true);
  });

  it('emits close event when close button clicked', async () => {
    const wrapper = mount(Alert, {
      props: { closable: true },
    });
    await wrapper.find('.bw-alert__right').trigger('click');
    expect(wrapper.emitted('close')).toBeTruthy();
  });

  it('renders fixed style correctly', () => {
    const wrapper = mount(Alert, {
      props: { fixed: true },
    });
    expect(wrapper.classes()).toContain('bw-alert--fixed');
  });
});
