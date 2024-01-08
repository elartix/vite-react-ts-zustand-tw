// outsource dependencies
import cn from 'classnames';
import { memo, PropsWithChildren } from 'react';


// local dependencies
import { config } from '@/constants';
import appLogo from '@/assets/images/logo.svg';
import appDevLogo from '@/assets/images/logo-dev.svg';

// configure
type AppLogoProps = PropsWithChildren<{
  // eslint-disable-next-line react/require-default-props
  src?: any,
  // eslint-disable-next-line react/require-default-props
  alt?: string
  // eslint-disable-next-line react/require-default-props
  className?: string,
}>

export const AppLogo = memo<AppLogoProps>(function AppLogo ({ className, src, alt }) {
  const imageSrc = src || (config('PRODUCTION', false) ? appLogo : appDevLogo);
  return <img className={cn('', className)} src={imageSrc} alt={alt || config('NAME', '')} />;
});
