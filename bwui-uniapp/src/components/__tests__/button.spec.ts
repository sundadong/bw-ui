import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import Button from '../button/index.vue';

describe('Button', () => {
  it('renders correctly with default props', () => {
    const wrapper = mount(Button, {
      slots: {
        default: '按钮文本',
      },
    });
    expect(wrapper.text()).toBe('按钮文本');
    expect(wrapper.classes()).toContain('bw-button');
    expect(wrapper.classes()).toContain('bw-button--default');
  });

  it('renders primary type correctly', () => {
    const wrapper = mount(Button, {
      props: { type: 'primary' },
      slots: { default: '主要按钮' },
    });
    expect(wrapper.classes()).toContain('bw-button--primary');
  });

  it('renders success type correctly', () => {
    const wrapper = mount(Button, {
      props: { type: 'success' },
      slots: { default: '成功按钮' },
    });
    expect(wrapper.classes()).toContain('bw-button--success');
  });

  it('renders warning type correctly', () => {
    const wrapper = mount(Button, {
      props: { type: 'warning' },
      slots: { default: '警告按钮' },
    });
    expect(wrapper.classes()).toContain('bw-button--warning');
  });

  it('renders danger type correctly', () => {
    const wrapper = mount(Button, {
      props: { type: 'danger' },
      slots: { default: '危险按钮' },
    });
    expect(wrapper.classes()).toContain('bw-button--danger');
  });

  it('renders small size correctly', () => {
    const wrapper = mount(Button, {
      props: { size: 'small' },
      slots: { default: '小按钮' },
    });
    expect(wrapper.classes()).toContain('bw-button--small');
  });

  it('renders large size correctly', () => {
    const wrapper = mount(Button, {
      props: { size: 'large' },
      slots: { default: '大按钮' },
    });
    expect(wrapper.classes()).toContain('bw-button--large');
  });

  it('renders plain style correctly', () => {
    const wrapper = mount(Button, {
      props: { plain: true },
      slots: { default: '空心按钮' },
    });
    expect(wrapper.classes()).toContain('bw-button--plain');
  });

  it('renders round style correctly', () => {
    const wrapper = mount(Button, {
      props: { round: true },
      slots: { default: '圆角按钮' },
    });
    expect(wrapper.classes()).toContain('bw-button--round');
  });

  it('renders block style correctly', () => {
    const wrapper = mount(Button, {
      props: { block: true },
      slots: { default: '块级按钮' },
    });
    expect(wrapper.classes()).toContain('bw-button--block');
  });

  it('renders disabled state correctly', () => {
    const wrapper = mount(Button, {
      props: { disabled: true },
      slots: { default: '禁用按钮' },
    });
    expect(wrapper.classes()).toContain('bw-button--disabled');
    expect(wrapper.find('button').attributes('disabled')).toBeDefined();
  });

  it('renders loading state correctly', () => {
    const wrapper = mount(Button, {
      props: { loading: true },
      slots: { default: '加载中' },
    });
    expect(wrapper.classes()).toContain('bw-button--loading');
    expect(wrapper.find('.bw-button__loading').exists()).toBe(true);
  });

  it('emits click event when clicked', async () => {
    const wrapper = mount(Button, {
      slots: { default: '点击我' },
    });
    await wrapper.trigger('click');
    expect(wrapper.emitted('click')).toBeTruthy();
  });

  it('does not emit click event when disabled', async () => {
    const wrapper = mount(Button, {
      props: { disabled: true },
      slots: { default: '禁用' },
    });
    await wrapper.trigger('click');
    expect(wrapper.emitted('click')).toBeUndefined();
  });

  it('does not emit click event when loading', async () => {
    const wrapper = mount(Button, {
      props: { loading: true },
      slots: { default: '加载中' },
    });
    await wrapper.trigger('click');
    expect(wrapper.emitted('click')).toBeUndefined();
  });

  it('renders with icon correctly', () => {
    const wrapper = mount(Button, {
      props: { icon: 'check' },
      slots: { default: '带图标' },
    });
    expect(wrapper.find('.bw-button__icon').exists()).toBe(true);
  });
});
