import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import Input from '../input/index.vue';

describe('Input', () => {
  it('renders correctly with default props', () => {
    const wrapper = mount(Input);
    expect(wrapper.find('.bw-input').exists()).toBe(true);
    expect(wrapper.find('.bw-input__inner').exists()).toBe(true);
  });

  it('renders with placeholder', () => {
    const wrapper = mount(Input, {
      props: { placeholder: '请输入文本' },
    });
    expect(wrapper.find('input').attributes('placeholder')).toBe('请输入文本');
  });

  it('renders disabled state correctly', () => {
    const wrapper = mount(Input, {
      props: { disabled: true },
    });
    expect(wrapper.classes()).toContain('bw-input--disabled');
    expect(wrapper.find('input').attributes('disabled')).toBeDefined();
  });

  it('renders error state correctly', () => {
    const wrapper = mount(Input, {
      props: { error: true },
    });
    expect(wrapper.classes()).toContain('bw-input--error');
  });

  it('renders with prefix icon', () => {
    const wrapper = mount(Input, {
      props: { prefixIcon: 'search' },
    });
    expect(wrapper.find('.bw-input__prefix').exists()).toBe(true);
  });

  it('renders with suffix icon', () => {
    const wrapper = mount(Input, {
      props: { suffixIcon: 'close' },
    });
    expect(wrapper.find('.bw-input__suffix').exists()).toBe(true);
  });

  it('shows clear button when clearable and has value', () => {
    const wrapper = mount(Input, {
      props: { clearable: true, modelValue: 'test value' },
    });
    expect(wrapper.find('.bw-input__clear').exists()).toBe(true);
  });

  it('emits update:modelValue on input', async () => {
    const wrapper = mount(Input);
    await wrapper.find('input').setValue('new value');
    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
  });

  it('emits focus event', async () => {
    const wrapper = mount(Input);
    await wrapper.find('input').trigger('focus');
    expect(wrapper.emitted('focus')).toBeTruthy();
  });

  it('emits blur event', async () => {
    const wrapper = mount(Input);
    await wrapper.find('input').trigger('blur');
    expect(wrapper.emitted('blur')).toBeTruthy();
  });

  it('emits clear event when clear button clicked', async () => {
    const wrapper = mount(Input, {
      props: { clearable: true, modelValue: 'test' },
    });
    await wrapper.find('.bw-input__clear').trigger('click');
    expect(wrapper.emitted('clear')).toBeTruthy();
  });
});
