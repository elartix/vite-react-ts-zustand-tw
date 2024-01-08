// outsource dependencies
import cn from 'classnames';
import { FC, memo } from 'react';
import { Spinner } from '@nextui-org/react';


// local dependencies
import { Spinner as LocalSpinner } from '@/components/spinner.tsx';

type AppPreloaderProps = {
  className?: string
}

export const AppPreloader:FC<AppPreloaderProps> = memo<AppPreloaderProps>(({ className }: AppPreloaderProps) => {
  return <div className="flex min-h-screen-vh justify-center items-center">
    <Spinner size="lg" color="primary" />
  </div>;
});
