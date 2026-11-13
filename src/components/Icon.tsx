import type { CSSProperties } from 'react';

export type IconName = 'arrow' | 'arrow-down' | 'arrow-up' | 'github' | 'linkedin' | 'mail' | 'download' | 'menu' | 'close' | 'spark' | 'book';

interface IconProps {
  name?: IconName;
  size?: number;
  className?: string;
  style?: CSSProperties;
}

export function Icon({ name = 'arrow', size = 20, className, style }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
      style={style}
    >
      {name === 'arrow' && <path d="M6 18 18 6M6 6h12v12" />}
      {name === 'arrow-down' && <path d="M12 4v16m-6-6 6 6 6-6" />}
      {name === 'arrow-up' && <path d="M12 20V4m-6 6 6-6 6 6" />}
      {name === 'mail' && <><rect x="3" y="5" width="18" height="14" rx="1" /><path d="m3 6 9 7 9-7" /></>}
      {name === 'download' && <><path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5" /></>}
      {name === 'menu' && <path d="M4 7h16M4 12h16M4 17h16" />}
      {name === 'close' && <path d="m5 5 14 14M5 19 19 5" />}
      {name === 'spark' && <path d="m12 2 2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5L12 2Z" />}
      {name === 'book' && <><path d="M12 6C9.8 4.5 6.3 4 3 4v15c3.3 0 6.8.5 9 2 2.2-1.5 5.7-2 9-2V4c-3.3 0-6.8.5-9 2Zm0 0v15" /><path d="M6 8h3M6 12h3m6-4h3m-3 4h3" /></>}
      {name === 'linkedin' && <><rect x="3" y="3" width="18" height="18" rx="1" /><path d="M8 10v7m4 0v-7m0 3a3 3 0 0 1 6 0v4" /><circle cx="8" cy="7" r=".5" fill="currentColor" stroke="none" /></>}
      {name === 'github' && <path fill="currentColor" stroke="none" d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.86c-2.78.61-3.37-1.18-3.37-1.18-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.64-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.6 9.6 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.86v2.75c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />}
    </svg>
  );
}

export default Icon;
