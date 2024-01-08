// outsource dependencies
import cn from 'classnames';
import { memo, PropsWithChildren } from 'react';


// local dependencies
import { Header } from './header';
import { Footer } from './footer';
import { BodyClassName } from '@/components/body-class-name';


type MainLayoutProps = PropsWithChildren<{
  className?: string;
  classNameBody?: string;
}>;

export const MainLayout = memo<MainLayoutProps>(function MainLayout ({ className, classNameBody, children }) {
  return <BodyClassName className={cn('h-screen-vh', classNameBody)}>
    <div className={cn('main-layout', className)}>
      <Header className="bg-neutral-150/0" />
      <main role="main" className={cn('')}>
        { children }
      </main>
      <Footer className={'footer mt-auto py-3 bg-light'} />
    </div>
  </BodyClassName>;
});

