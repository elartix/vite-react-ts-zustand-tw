// outsource dependencies
import { type PropsWithChildren, type FC, memo } from 'react';
import { type NavigateOptions, useHref, useNavigate } from 'react-router';

// local dependencies
import { HeroUIProvider } from '@heroui/react';

// @ts-ignore
declare module '@react-types/shared' {
  interface RouterConfig {
    routerOptions: NavigateOptions
  }
}

export type AppProviderProps = PropsWithChildren<{
  className?: string
}>

export const AppProvider:FC<AppProviderProps> = memo<AppProviderProps>(({ className, children }: AppProviderProps) => {
  const navigate = useNavigate();

  return (
    <HeroUIProvider navigate={navigate} useHref={useHref}>
      { children }
    </HeroUIProvider>
  );
});
