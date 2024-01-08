// outsource dependencies
import cn from 'classnames';
import { FC, memo } from 'react';

type SpinnerProps = {
  className?: string
}

export const Spinner:FC<SpinnerProps> = memo<SpinnerProps>(({ className }: SpinnerProps) => {
  return <svg
    fill="none"
    aria-busy="true"
    aria-live="polite"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby="title-04a desc-04a"
    className={cn('animate animate-spin', { 'h-5 w-5 text-sky-500': !className }, className)}
  >
    <title id="title-04a">Icon title</title>
    <desc id="desc-04a">Some desc</desc>
    <circle
      r="10"
      cx="12"
      cy="12"
      strokeWidth="4"
      className="stroke-slate-200"
    />
    <path
      strokeWidth="4"
      stroke="currentColor"
      d="M12 22C14.6522 22 17.1957 20.9464 19.0711 19.0711C20.9464 17.1957 22 14.6522 22 12C22 9.34784 20.9464 6.8043 19.0711 4.92893C17.1957 3.05357 14.6522 2 12 2"
    />
  </svg>;
});
