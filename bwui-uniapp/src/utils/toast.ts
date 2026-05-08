export type ToastType = 'success' | 'fail' | 'none' | 'loading';

export interface ToastOptions {
  title: string;
  icon?: ToastType;
  image?: string;
  duration?: number;
  mask?: boolean;
}

export function toast(options: ToastOptions | string): void {
  const opt = typeof options === 'string' ? { title: options } : options;
  const { title, icon = 'none', image, duration = 2000, mask = false } = opt;

  uni.showToast({
    title,
    icon,
    image,
    duration,
    mask,
  });
}

export function showLoading(title = '加载中'): void {
  uni.showLoading({
    title,
    mask: true,
  });
}

export function hideLoading(): void {
  uni.hideLoading();
}

export interface ModalOptions {
  title?: string;
  content?: string;
  showCancel?: boolean;
  cancelText?: string;
  cancelColor?: string;
  confirmText?: string;
  confirmColor?: string;
}

export function modal(options: ModalOptions): Promise<boolean> {
  const {
    title = '提示',
    content = '',
    showCancel = true,
    cancelText = '取消',
    cancelColor = '#666666',
    confirmText = '确定',
    confirmColor = '#1989fa',
  } = options;

  return new Promise((resolve) => {
    uni.showModal({
      title,
      content,
      showCancel,
      cancelText,
      cancelColor,
      confirmText,
      confirmColor,
      success: (res) => {
        resolve(res.confirm);
      },
    });
  });
}

export function alert(title: string, content = ''): Promise<boolean> {
  return modal({ title, content, showCancel: false });
}

export function confirm(title: string, content = ''): Promise<boolean> {
  return modal({ title, content, showCancel: true });
}
