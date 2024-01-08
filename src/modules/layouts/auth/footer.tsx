// outsource dependencies
import cn from 'classnames';
import { memo, PropsWithChildren } from 'react';

const footerYear = new Date().getFullYear();

type AuthFooterLayoutProps = PropsWithChildren<{
  className?: string;
  classNameBody?: string;
}>;

export const AuthFooter = memo<AuthFooterLayoutProps>(function AuthFooter ({ className }) {
  return <footer className={cn('mx-auto w-full max-w-container px-4 sm:px-6 lg:px-8', className)}>
    <p className="mt-2 text-center text-sm leading-6 text-slate-500">
      Copyright &copy; { footerYear }. All right reserved.
    </p>
  </footer>;
});
