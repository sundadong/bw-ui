import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import Stepper from '../stepper/index.vue';

describe('Stepper', () => {
  it('renders correctly with default value', () => {
    const wrapper = mount(Stepper, {
      props: { modelValue: 1 },
    });
    expect(wrapper.find('.bw-stepper').exists()).toBe(true);
    expect(wrapper.find('.bw-stepper__input').exists()).toBe(true);
    expect(wrapper.find('.bw-stepper__minus').exists()).toBe(true);
    expect(wrapper.find('.bw-stepper__plus').exists()).toBe(true);
  });

  it('renders disabled state correctly', () => {
    const wrapper = mount(Stepper, {
      props: { disabled: true, modelValue: 1 },
    });
    expect(wrapper.classes()).toContain('bw-stepper--disabled');
  });

  it('minus button is disabled when value equals min', () => {
    const wrapper = mount(Stepper, {
      props: { modelValue: 0, min: 0 },
    });
    expect(wrapper.find('.bw-stepper__minus').classes()).toContain('is-disabled');
  });

  it('plus button is disabled when value equals max', () => {
    const wrapper = mount(Stepper, {
      props: { modelValue: 10, max: 10 },
    });
    expect(wrapper.find('.bw-stepper__plus').classes()).toContain('is-disabled');
  });

  it('emits update:modelValue when minus clicked', async () => {
    const wrapper = mount(Stepper, {
      props: { modelValue: 5 },
    });
    await wrapper.find('.bw-stepper__minus').trigger('click');
    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    const emitted = wrapper.emitted('update:modelValue') as any[][];
    expect(emitted[0][0]).toBe(4);
  });

  it('emits update:modelValue when plus clicked', async () => {
    const wrapper = mount(Stepper, {
      props: { modelValue: 5 },
    });
    await wrapper.find('.bw-stepper__plus').trigger('click');
    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    const emitted = wrapper.emitted('update:modelValue') as any[][];
    expect(emitted[0][0]).toBe(6);
  });

  it('respects step prop', async () => {
    const wrapper = mount(Stepper, {
      props: { modelValue: 5, step: 2 },
    });
    await wrapper.find('.bw-stepper__plus').trigger('click');
    const emitted = wrapper.emitted('update:modelValue') as any[][];
    expect(emitted[0][0]).toBe(7);
  });

  it('respects min and max props', async () => {
    const wrapper = mount(Stepper, {
      props: { modelValue: 1, min: 0, max: 5 },
    });
    
    // Try to go below min
    await wrapper.find('.bw-stepper__minus').trigger('click');
    await wrapper.find('.bw-stepper__minus').trigger('click');
    let emitted = wrapper.emitted('update:modelValue') as any[][];
    expect(emitted[emitted.length - 1][0]).toBe(0);
    
    // Reset and try to go above max
    await wrapper.setProps({ modelValue: 4 });
    await wrapper.find('.bw-stepper__plus').trigger('click');
    await wrapper.find('.bw-stepper__plus').trigger('click');
    emitted = wrapper.emitted('update:modelValue') as any[][];
    expect(emitted[emitted.length - 1][0]).toBe(5);
  });

  it('handles decimal values', async () => {
    const wrapper = mount(Stepper, {
      props: { modelValue: 1.0, step: 0.1, decimalLength: 1 },
    });
    await wrapper.find('.bw-stepper__plus').trigger('click');
    const emitted = wrapper.emitted('update:modelValue') as any[][];
    expect(emitted[0][0]).toBe(1.1);
  });
});
