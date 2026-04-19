import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

function BaseIcon({ size = 32, className, children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 28 28"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

// Clean geometric frame mark
export function MarkFrameIcon({ size, className, ...props }: IconProps) {
  return (
    <BaseIcon size={size} className={className} {...props}>
      <rect x="4.5" y="4.5" width="19" height="19" rx="4.2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8.5 14h11M14 8.5v11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </BaseIcon>
  );
}

// Observer: radial striped disc
export function DotReticleIcon({ size, className, ...props }: IconProps) {
  return (
    <BaseIcon size={size} className={className} {...props}>
      <circle cx="14" cy="14" r="8.9" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8 9.5c2.1-.9 4.2-.9 6.3 0 2.1.9 4.2.9 6.3 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M7.7 13.8c2.2-.95 4.3-.95 6.5 0 2.2.95 4.3.95 6.5 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M8 18.1c2.1-.9 4.2-.9 6.3 0 2.1.9 4.2.9 6.3 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="14" cy="14" r="1.5" fill="currentColor" />
    </BaseIcon>
  );
}

// Strategic: stepped parallel bands
export function BaselineTicksIcon({ size, className, ...props }: IconProps) {
  return (
    <BaseIcon size={size} className={className} {...props}>
      <path d="M5 7.5h14.8c2 0 3.2 1.2 3.2 3.2 0 2-1.2 3.2-3.2 3.2H5z" fill="currentColor" />
      <path d="M5 12.4h12.3c2 0 3.2 1.2 3.2 3.2 0 2-1.2 3.2-3.2 3.2H5z" fill="currentColor" opacity="0.9" />
      <path d="M5 17.3h9.9c2 0 3.2 1.2 3.2 3.2 0 2-1.2 3.2-3.2 3.2H5z" fill="currentColor" opacity="0.82" />
    </BaseIcon>
  );
}

// Professional: interlocked path mark
export function SignalWaveIcon({ size, className, ...props }: IconProps) {
  return (
    <BaseIcon size={size} className={className} {...props}>
      <path d="M4.8 19.6c2.8 0 4.4-1.5 5.7-4.3 1.3-2.7 2.8-4.3 5.7-4.3h1.9v4h-1.9c-1 0-1.6.5-2.2 1.8-1.3 2.8-2.9 4.3-5.7 4.3H4.8z" fill="currentColor" />
      <path d="M23.2 8.4c-2.8 0-4.4 1.5-5.7 4.3-1.3 2.7-2.8 4.3-5.7 4.3h-1.9v-4h1.9c1 0 1.6-.5 2.2-1.8 1.3-2.8 2.9-4.3 5.7-4.3h3.5z" fill="currentColor" opacity="0.88" />
    </BaseIcon>
  );
}

// Focus: circular lens with stem
export function FocusLoopIcon({ size, className, ...props }: IconProps) {
  return (
    <BaseIcon size={size} className={className} {...props}>
      <circle cx="12.2" cy="12.2" r="6.1" stroke="currentColor" strokeWidth="1.9" />
      <path d="M16.9 16.9 23 23" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
      <circle cx="12.2" cy="12.2" r="1.9" fill="currentColor" />
    </BaseIcon>
  );
}

// Agency: precision dial + directional notch
export function RadialDialIcon({ size, className, ...props }: IconProps) {
  return (
    <BaseIcon size={size} className={className} {...props}>
      <circle cx="14" cy="14" r="9.2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M14 6.6a7.4 7.4 0 1 1-5.23 2.17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="m7.25 8.2 1.75 2.9 3.05-1.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="14" cy="14" r="1.7" fill="currentColor" />
    </BaseIcon>
  );
}
