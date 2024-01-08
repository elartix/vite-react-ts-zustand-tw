// outsource dependencies
import cn from 'classnames';
import { memo, PropsWithChildren } from 'react';


// local dependencies

type MainFooterLayoutProps = PropsWithChildren<{
  className?: string;
}>;

export const Footer = memo<MainFooterLayoutProps>(function Footer ({ className }) {
  return (
    <footer id="footer" className={cn('footer', className)} />
  );
});
