import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import Popup from '../popup/index.vue';

describe('Popup', () => {
  it('renders correctly with show prop', () => {
    const wrapper = mount(Popup, {
      props: { show: true },
    });
    expect(wrapper.find('.bw-popup__mask').exists()).toBe(true);
    expect(wrapper.find('.bw-popup__container').exists()).toBe(true);
  });

  it('renders with title', () => {
    const wrapper = mount(Popup, {
      props: { show: true, title: '弹窗标题' },
    });
    expect(wrapper.find('.bw-popup__header').text()).toContain('弹窗标题');
  });

  it('renders close button when closeable', () => {
    const wrapper = mount(Popup, {
      props: { show: true, closeable: true },
    });
    expect(wrapper.find('.bw-popup__close').exists()).toBe(true);
  });

  it('emits close event when close clicked', async () => {
    const wrapper = mount(Popup, {
      props: { show: true, closeable: true },
    });
    await wrapper.find('.bw-popup__close').trigger('click');
    expect(wrapper.emitted('close')).toBeTruthy();
  });

  it('renders content slot', () => {
    const wrapper = mount(Popup, {
      props: { show: true },
      slots: {
        default: '<div class="popup-content">弹窗内容</div>',
      },
    });
    expect(wrapper.find('.bw-popup__body').text()).toBe('弹窗内容');
  });

  it('renders footer slot', () => {
    const wrapper = mount(Popup, {
      props: { show: true },
      slots: {
        footer: '<button>确定</button>',
      },
    });
    expect(wrapper.find('.bw-popup__footer').exists()).toBe(true);
  });
});
