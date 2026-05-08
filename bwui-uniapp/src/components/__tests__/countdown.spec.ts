import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import Countdown from '../countdown/index.vue';

describe('Countdown', () => {
  it('renders correctly', () => {
    const wrapper = mount(Countdown, {
      props: { time: 60000 },
    });
    expect(wrapper.find('.bw-countdown').exists()).toBe(true);
    expect(wrapper.findAll('.bw-countdown__digit')).toHaveLength(3);
  });

  it('displays correct time format', async () => {
    const wrapper = mount(Countdown, {
      props: { time: 30 * 60 * 1000, autoStart: false },
    });
    await wrapper.vm.$nextTick();
    const digits = wrapper.findAll('.bw-countdown__digit');
    expect(digits[0].text()).toBe('00');
    expect(digits[1].text()).toBe('30');
    expect(digits[2].text()).toBe('00');
  });

  it('shows day when showDay is true', async () => {
    const wrapper = mount(Countdown, {
      props: { time: 24 * 60 * 60 * 1000, showDay: true, autoStart: false },
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.findAll('.bw-countdown__digit')).toHaveLength(4);
  });

  it('hides colon when showColon is false', async () => {
    const wrapper = mount(Countdown, {
      props: { time: 60000, showColon: false, autoStart: false },
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.findAll('.bw-countdown__colon')).toHaveLength(0);
  });

  it('exposes start, stop, reset methods', () => {
    const wrapper = mount(Countdown, {
      props: { time: 60000 },
    });
    const vm = wrapper.vm as any;
    expect(typeof vm.start).toBe('function');
    expect(typeof vm.stop).toBe('function');
    expect(typeof vm.reset).toBe('function');
  });
});
