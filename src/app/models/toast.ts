export interface ToastData {
  type: ToastType;
  message: string;
  durationMillis: number;
}

export interface Toast extends ToastData {
  id: number;
}

export type ToastType = 'info' | 'success' | 'warning' | 'error';
