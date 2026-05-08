// 平台判断工具

export type Platform = 'mp-weixin' | 'mp-alipay' | 'mp-baidu' | 'mp-toutiao' | 'h5' | 'app';

export function getPlatform(): Platform {
  // #ifdef MP-WEIXIN
  return 'mp-weixin';
  // #endif

  // #ifdef MP-ALIPAY
  return 'mp-alipay';
  // #endif

  // #ifdef MP-BAIDU
  return 'mp-baidu';
  // #endif

  // #ifdef MP-TOUTIAO
  return 'mp-toutiao';
  // #endif

  // #ifdef H5
  return 'h5';
  // #endif

  // #ifdef APP-PLUS
  return 'app';
  // #endif

  return 'h5';
}

export const platform = getPlatform();

export function isWeixin(): boolean {
  return platform === 'mp-weixin';
}

export function isAlipay(): boolean {
  return platform === 'mp-alipay';
}

export function isH5(): boolean {
  return platform === 'h5';
}

export function isApp(): boolean {
  return platform === 'app';
}

export function isMiniProgram(): boolean {
  return ['mp-weixin', 'mp-alipay', 'mp-baidu', 'mp-toutiao'].includes(platform);
}
