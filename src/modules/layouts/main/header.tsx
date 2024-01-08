// outsource dependencies
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { Button } from '@nextui-org/react';
import { Popover, Transition } from '@headlessui/react';
import { Fragment, memo, PropsWithChildren } from 'react';


// local dependencies
import * as ROUTE from '@/constants/routes';
import { AppLogo } from '@/components/app-logo';
import { useNavSticky } from '@/hooks/use-nav-sticky';


type MainHeaderLayoutProps = PropsWithChildren<{
  className?: string;
}>;

type HeaderNavLinkProps = PropsWithChildren<{
  href: string;
}>;

type MobileNavLinkProps = PropsWithChildren<{
  href: string;
}>;

type MobileNavIconProps = PropsWithChildren<{
  open?: boolean;
}>;

const HeaderNavLink = memo<HeaderNavLinkProps>(function HeaderNavLink ({ href, children }) {
  return <Link
    to={href}
    className="inline-block rounded-lg px-2 py-1 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors ease-linear duration-150"
  >
    { children }
  </Link>;
});

const MobileNavLink = memo<MobileNavLinkProps>(function MobileNavLink ({ href, children }) {
  return <Popover.Button as={Link} to={href} className="block w-full rounded-xl px-3 py-2 hover:bg-primary hover:text-white transition-colors ease-linear duration-150">
    { children }
  </Popover.Button>;
});

const MobileNavIcon = memo<MobileNavIconProps>(function MobileNavIcon ({ open }) {
  return <svg
    aria-hidden="true"
    className="h-3.5 w-3.5 overflow-visible stroke-slate-700"
    fill="none"
    strokeWidth={2}
    strokeLinecap="round"
  >
    <path
      d="M0 1H14M0 7H14M0 13H14"
      className={cn(
        'origin-center transition',
        open && 'scale-90 opacity-0'
      )}
    />
    <path
      d="M2 2L12 12M12 2L2 12"
      className={cn(
        'origin-center transition',
        !open && 'scale-90 opacity-0'
      )}
    />
  </svg>;
});

const MobileNavigation = memo<PropsWithChildren<{}>>(function MobileNavigation ({ }) {
  return <Popover>
    <Popover.Button
      className="relative z-10 flex h-8 w-8 items-center justify-center [&:not(:focus-visible)]:focus:outline-none"
      aria-label="Toggle Navigation"
    >
      { ({ open }) => <MobileNavIcon open={open} /> }
    </Popover.Button>
    <Transition.Root>
      <Transition.Child
        as={Fragment}
        enter="duration-150 ease-out"
        enterFrom="opacity-0"
        enterTo="opacity-100" // 100
        leave="duration-150 ease-in"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Popover.Overlay className="fixed inset-0 bg-slate-300/50" />
      </Transition.Child>
      <Transition.Child
        as={Fragment}
        enter="duration-150 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel
          as="div"
          className="absolute inset-x-0 top-full mt-4 flex origin-top flex-col rounded-2xl bg-white p-3 text-lg tracking-tight text-slate-900 shadow-xl ring-1 ring-slate-900/5"
        >
          <MobileNavLink href="#features">Features</MobileNavLink>
          <MobileNavLink href="#testimonials">Testimonials</MobileNavLink>
          <MobileNavLink href="#pricing">Pricing</MobileNavLink>
          <hr className="m-2 border-slate-300/40" />
          <MobileNavLink href="/login">Sign in</MobileNavLink>
        </Popover.Panel>
      </Transition.Child>
    </Transition.Root>
  </Popover>;
});

export const Header = memo<MainHeaderLayoutProps>(function Header ({ className }) {
  const { isSticky } = useNavSticky();

  return <header id="header" className={cn('header')}>
    <nav className={cn('navbar', className, { 'is-sticky fixed-top': isSticky })}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative z-50 flex h-16 justify-between">
          <div className="flex items-center md:gap-x-12">
            <Link to={ROUTE.HOME.ROUTE} aria-label="Home">
              <AppLogo className="h-10 w-auto"/>
            </Link>
            <div className="hidden md:flex md:gap-x-6">
              <HeaderNavLink href="#features">Features</HeaderNavLink>
              <HeaderNavLink href="#testimonials">Testimonials</HeaderNavLink>
              <HeaderNavLink href="#pricing">Pricing</HeaderNavLink>
            </div>
          </div>
          <div className="flex items-center gap-x-5 md:gap-x-8">
            <div className="hidden md:block">
              <HeaderNavLink href={ROUTE.SIGN_IN.ROUTE}>Sign in</HeaderNavLink>
            </div>
            <Button as={Link} to={ROUTE.SIGN_UP.ROUTE} color="primary" className="rounded-full">
              <span>
                Get started <span className="hidden lg:inline">today</span>
              </span>
            </Button>
            <div className="-mr-1 md:hidden">
              <MobileNavigation/>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>;
});
