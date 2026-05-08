import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import Cell from '../cell/index.vue';

describe('Cell', () => {
  it('renders correctly with title and value', () => {
    const wrapper = mount(Cell, {
      props: { title: '单元格标题', value: '单元格内容' },
    });
    expect(wrapper.find('.bw-cell__title').text()).toBe('单元格标题');
    expect(wrapper.find('.bw-cell__value').text()).toBe('单元格内容');
  });

  it('renders is-link style correctly', () => {
    const wrapper = mount(Cell, {
      props: { isLink: true },
    });
    expect(wrapper.find('.bw-cell__right-icon-wrap').exists()).toBe(true);
  });

  it('renders disabled state correctly', () => {
    const wrapper = mount(Cell, {
      props: { disabled: true },
    });
    expect(wrapper.classes()).toContain('bw-cell--disabled');
  });

  it('renders with left icon', () => {
    const wrapper = mount(Cell, {
      props: { leftIcon: 'location' },
    });
    expect(wrapper.find('.bw-cell__left-icon-wrap').exists()).toBe(true);
  });

  it('renders with label', () => {
    const wrapper = mount(Cell, {
      props: { title: '标题', label: '描述文本' },
    });
    expect(wrapper.find('.bw-cell__label').text()).toBe('描述文本');
  });

  it('emits click event', async () => {
    const wrapper = mount(Cell);
    await wrapper.trigger('click');
    expect(wrapper.emitted('click')).toBeTruthy();
  });

  it('does not emit click when disabled', async () => {
    const wrapper = mount(Cell, {
      props: { disabled: true },
    });
    await wrapper.trigger('click');
    expect(wrapper.emitted('click')).toBeUndefined();
  });
});
