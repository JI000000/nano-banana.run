export type GAEventParams = Record<string, any>;

export function trackEvent(eventName: string, params: GAEventParams = {}): void {
  if (typeof window === 'undefined') return;
  // gtag injected in _app.tsx
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const gtagFn = (window as any).gtag;
  if (typeof gtagFn === 'function') {
    gtagFn('event', eventName, params);
  }
}

export const GAEvents = {
  upload_image: 'upload_image',
  use_example_prompt: 'use_example_prompt',
  toggle_smart_workflow: 'toggle_smart_workflow',
  select_mode: 'select_mode',
  copy_prompt: 'copy_prompt',
  start_generate: 'start_generate',
  generate_complete: 'generate_complete',
  generate_error: 'generate_error',
  download_result: 'download_result',
  share_result: 'share_result'
} as const;


