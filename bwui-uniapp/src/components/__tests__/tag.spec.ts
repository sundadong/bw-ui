import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import Tag from '../tag/index.vue';

describe('Tag', () => {
  it('renders correctly with default props', () => {
    const wrapper = mount(Tag, {
      slots: { default: '标签' },
    });
    expect(wrapper.find('.bw-tag').exists()).toBe(true);
    expect(wrapper.text()).toBe('标签');
    expect(wrapper.classes()).toContain('bw-tag--default');
  });

  it('renders primary type correctly', () => {
    const wrapper = mount(Tag, {
      props: { type: 'primary' },
    });
    expect(wrapper.classes()).toContain('bw-tag--primary');
  });

  it('renders success type correctly', () => {
    const wrapper = mount(Tag, {
      props: { type: 'success' },
    });
    expect(wrapper.classes()).toContain('bw-tag--success');
  });

  it('renders warning type correctly', () => {
    const wrapper = mount(Tag, {
      props: { type: 'warning' },
    });
    expect(wrapper.classes()).toContain('bw-tag--warning');
  });

  it('renders danger type correctly', () => {
    const wrapper = mount(Tag, {
      props: { type: 'danger' },
    });
    expect(wrapper.classes()).toContain('bw-tag--danger');
  });

  it('renders small size correctly', () => {
    const wrapper = mount(Tag, {
      props: { size: 'small' },
    });
    expect(wrapper.classes()).toContain('bw-tag--small');
  });

  it('renders plain style correctly', () => {
    const wrapper = mount(Tag, {
      props: { plain: true },
    });
    expect(wrapper.classes()).toContain('bw-tag--plain');
  });

  it('renders round style correctly', () => {
    const wrapper = mount(Tag, {
      props: { round: true },
    });
    expect(wrapper.classes()).toContain('bw-tag--round');
  });

  it('renders closable correctly', () => {
    const wrapper = mount(Tag, {
      props: { closable: true },
    });
    expect(wrapper.find('.bw-tag__close').exists()).toBe(true);
  });

  it('emits close event when close button clicked', async () => {
    const wrapper = mount(Tag, {
      props: { closable: true },
    });
    await wrapper.find('.bw-tag__close').trigger('click');
    expect(wrapper.emitted('close')).toBeTruthy();
  });

  it('emits click event', async () => {
    const wrapper = mount(Tag);
    await wrapper.trigger('click');
    expect(wrapper.emitted('click')).toBeTruthy();
  });

  it('does not emit click when disabled', async () => {
    const wrapper = mount(Tag, {
      props: { disabled: true },
    });
    await wrapper.trigger('click');
    expect(wrapper.emitted('click')).toBeUndefined();
  });
});
