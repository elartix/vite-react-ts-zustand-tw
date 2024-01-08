// outsource dependencies
import cn from 'classnames';
import { memo, PropsWithChildren } from 'react';


// local dependencies
import { AuthFooter } from '@/modules/layouts/auth/footer';
import { BodyClassName } from '@/components/body-class-name';


type AuthLayoutProps = PropsWithChildren<{
  className?: string;
  classNameBody?: string;
}>;

export const AuthLayout = memo<AuthLayoutProps>(function AuthLayout ({ className, classNameBody, children }) {
  return <BodyClassName className={cn('h-screen-vh', classNameBody)}>
    <div className={cn('auth-layout flex flex-col isolate', className)}>
      <div className="flex flex-col max-h-full py-12 overflow-y-auto">
        <main role="main" className={cn('')}>
          { children }
        </main>
        <AuthFooter className={'footer py-3 bg-light'}/>
      </div>
      <div
        className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
        aria-hidden="true"
      >
        <div
          className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
    </div>
  </BodyClassName>;
});
/*


export const AuthLayout = memo<AuthLayoutProps>(function AuthLayout ({ className, classNameBody, children }) {
  return <BodyClassName className={cn('h-screen-vh', classNameBody)}>
    <div className={cn('auth-layout h-screen-vh flex flex-col', className)}>
      <main role="main" className={cn('relative w-full flex flex-col')}>
        <div
          className="w-full flex flex-col items-center justify-center px-6 mx-auto lg:py-0">
          {children}
          <AuthFooter/>
        </div>
      </main>
    </div>
  </BodyClassName>
    ;
});
*/
