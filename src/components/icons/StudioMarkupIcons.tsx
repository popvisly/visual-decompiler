import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

function BaseIcon({ size = 28, className, children, ...props }: IconProps) {
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

export function MarkFrameIcon({ size, className, ...props }: IconProps) {
  return (
    <BaseIcon size={size} className={className} {...props}>
      <rect x="6" y="6" width="16" height="16" stroke="currentColor" strokeWidth="1.5" rx="0.5" />
      <path d="M6 3v2M6 23v2M22 3v2M22 23v2M3 6h2M23 6h2M3 22h2M23 22h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </BaseIcon>
  );
}

export function DotReticleIcon({ size, className, ...props }: IconProps) {
  return (
    <BaseIcon size={size} className={className} {...props}>
      <circle cx="14" cy="14" r="2.2" fill="currentColor" />
      <path d="M14 4.5v2.6M14 20.9v2.6M4.5 14h2.6M20.9 14h2.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="14" cy="14" r="7.2" stroke="currentColor" strokeWidth="1.3" strokeDasharray="0.1 4.1" strokeLinecap="round" />
    </BaseIcon>
  );
}

export function BaselineTicksIcon({ size, className, ...props }: IconProps) {
  return (
    <BaseIcon size={size} className={className} {...props}>
      <path d="M3.5 14h21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M9 12v4M14 11v6M18.5 12v4M21.5 12.6v2.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </BaseIcon>
  );
}

export function SignalWaveIcon({ size, className, ...props }: IconProps) {
  return (
    <BaseIcon size={size} className={className} {...props}>
      <path
        d="M2.5 18.5c2.7 0 4.3-.8 5.8-3 1.4-2 2.2-7.5 5.8-7.5 3.2 0 3.8 5.6 5.2 7.6 1.1 1.6 2.6 2.9 6.2 2.9"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </BaseIcon>
  );
}

export function FocusLoopIcon({ size, className, ...props }: IconProps) {
  return (
    <BaseIcon size={size} className={className} {...props}>
      <circle cx="16.5" cy="11.5" r="4.8" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12.8 15.2 7 21" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M15.1 12.9 18 10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </BaseIcon>
  );
}

export function RadialDialIcon({ size, className, ...props }: IconProps) {
  return (
    <BaseIcon size={size} className={className} {...props}>
      <circle cx="14" cy="14" r="9.2" stroke="currentColor" strokeWidth="1.4" strokeDasharray="0.1 3.4" strokeLinecap="round" />
      <path d="m14 4.7 2.9 2.1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="14" cy="14" r="1.9" fill="currentColor" />
    </BaseIcon>
  );
}
