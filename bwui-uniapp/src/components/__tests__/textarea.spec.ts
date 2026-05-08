import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import Textarea from '../textarea/index.vue';

describe('Textarea', () => {
  it('renders correctly with default props', () => {
    const wrapper = mount(Textarea);
    expect(wrapper.find('.bw-textarea').exists()).toBe(true);
    expect(wrapper.find('.bw-textarea__inner').exists()).toBe(true);
  });

  it('renders with placeholder', () => {
    const wrapper = mount(Textarea, {
      props: { placeholder: '请输入多行文本' },
    });
    expect(wrapper.find('textarea').attributes('placeholder')).toBe('请输入多行文本');
  });

  it('renders disabled state correctly', () => {
    const wrapper = mount(Textarea, {
      props: { disabled: true },
    });
    expect(wrapper.classes()).toContain('bw-textarea--disabled');
  });

  it('renders error state correctly', () => {
    const wrapper = mount(Textarea, {
      props: { error: true },
    });
    expect(wrapper.classes()).toContain('bw-textarea--error');
  });

  it('shows word count correctly', () => {
    const wrapper = mount(Textarea, {
      props: { showWordCount: true, modelValue: 'hello' },
    });
    expect(wrapper.find('.bw-textarea__count').exists()).toBe(true);
    expect(wrapper.text()).toContain('5/');
  });

  it('emits update:modelValue on input', async () => {
    const wrapper = mount(Textarea);
    await wrapper.find('textarea').setValue('new value');
    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
  });

  it('emits focus event', async () => {
    const wrapper = mount(Textarea);
    await wrapper.find('textarea').trigger('focus');
    expect(wrapper.emitted('focus')).toBeTruthy();
  });

  it('emits blur event', async () => {
    const wrapper = mount(Textarea);
    await wrapper.find('textarea').trigger('blur');
    expect(wrapper.emitted('blur')).toBeTruthy();
  });
});
