<template>
  <view class="bw-pagination">
    <view v-if="mode === 'simple'" class="bw-pagination__simple">
      <text class="bw-pagination__info">{{ current }} / {{ pageCount }}</text>
    </view>
    <view v-else class="bw-pagination__pages">
      <view class="bw-pagination__btn" :class="{ 'bw-pagination__btn--disabled': current <= 1 }" @tap="prev">‹</view>
      <view
        v-for="page in visiblePages"
        :key="page"
        class="bw-pagination__page"
        :class="{
          'bw-pagination__page--active': page === current,
          'bw-pagination__page--ellipsis': page === '...'
        }"
        @tap="() => typeof page === 'number' && goTo(page)"
      >
        <text>{{ page }}</text>
      </view>
      <view class="bw-pagination__btn" :class="{ 'bw-pagination__btn--disabled': current >= pageCount }" @tap="next">›</view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

const props = defineProps({
  modelValue: { type: Number, default: 1 },
  total: { type: Number, default: 0 },
  perPage: { type: Number, default: 10 },
  pageRange: { type: Number, default: 5 },
  mode: { type: String, default: 'multi' }
});

const emit = defineEmits(['update:modelValue', 'change']);

const current = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
});

const pageCount = computed(() => Math.ceil(props.total / props.perPage));

const visiblePages = computed(() => {
  const pages = [];
  const total = pageCount.value;
  const currentPage = current.value;
  const range = Math.floor(props.pageRange / 2);
  
  if (total <= props.pageRange + 2) {
    for (let i = 1; i <= total; i++) pages.push(i);
  } else {
    pages.push(1);
    if (currentPage - range > 2) pages.push('...');
    const start = Math.max(2, currentPage - range);
    const end = Math.min(total - 1, currentPage + range);
    for (let i = start; i <= end; i++) pages.push(i);
    if (currentPage + range < total - 1) pages.push('...');
    pages.push(total);
  }
  return pages;
});

const prev = () => { if (current.value > 1) { current.value--; emit('change', current.value); } };
const next = () => { if (current.value < pageCount.value) { current.value++; emit('change', current.value); } };
const goTo = (page) => { current.value = page; emit('change', page); };
</script>

<style scoped lang="scss">
.bw-pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  &__info { font-size: 14px; color: #646566; }
  &__pages { display: flex; align-items: center; }
  &__btn {
    min-width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    color: #646566;
    background: #fff;
    border: 1px solid #ebedf0;
    border-radius: 4px;
    margin: 0 2px;
    cursor: pointer;
    &--disabled { color: #c8c9cc; cursor: not-allowed; }
  }
  &__page {
    min-width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: #646566;
    background: #fff;
    border: 1px solid #ebedf0;
    border-radius: 4px;
    margin: 0 2px;
    cursor: pointer;
    &--active { color: #fff; background: #1989fa; border-color: #1989fa; }
    &--ellipsis { border: none; cursor: default; }
  }
}
</style>
