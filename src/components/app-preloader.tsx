// outsource dependencies
import { type FC, memo } from 'react';
import { Spinner } from '@heroui/react';


// local dependencies
import { cn } from '@/utils/cn';
import { Spinner as LocalSpinner } from '@/components/spinner';

type AppPreloaderProps = {
  className?: string
}

export const AppPreloader:FC<AppPreloaderProps> = memo<AppPreloaderProps>(({ className }: AppPreloaderProps) => {
  return <div className="flex min-h-screen-vh justify-center items-center">
    <Spinner size="lg" color="primary" />
  </div>;
});

