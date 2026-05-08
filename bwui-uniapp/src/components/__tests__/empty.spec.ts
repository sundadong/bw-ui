import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import Empty from '../empty/index.vue';

describe('Empty', () => {
  it('renders correctly with default description', () => {
    const wrapper = mount(Empty);
    expect(wrapper.find('.bw-empty').exists()).toBe(true);
    expect(wrapper.find('.bw-empty__tip').text()).toBe('暂无数据');
  });

  it('renders with custom description', () => {
    const wrapper = mount(Empty, {
      props: { description: '没有找到相关数据' },
    });
    expect(wrapper.find('.bw-empty__tip').text()).toBe('没有找到相关数据');
  });

  it('renders image slot', () => {
    const wrapper = mount(Empty, {
      slots: {
        image: '<div class="custom-image">自定义图片</div>',
      },
    });
    expect(wrapper.find('.custom-image').exists()).toBe(true);
  });

  it('renders tip slot', () => {
    const wrapper = mount(Empty, {
      slots: {
        tip: '<span>自定义提示</span>',
      },
    });
    expect(wrapper.find('.bw-empty__tip').html()).toContain('自定义提示');
  });
});
