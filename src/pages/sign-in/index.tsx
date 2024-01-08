// outsource dependencies
import _ from 'lodash';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { memo, PropsWithChildren, useCallback } from 'react';


// local dependencies
import * as ROUTE from '@/constants/routes';
import { AuthLayout } from '@/modules/layouts';
import { AppLogo } from '@/components/app-logo';
import { SignInForm, SignInFormType } from '@/pages/sign-in/sign-in-form';


export const SignIn = memo<PropsWithChildren<{ className?: string }>>(function SignIn ({ className }) {

  const handleSubmitForm = useCallback((data: SignInFormType) => {

  }, []);

  // items-center justify-center min-h-screen-vh overflow-y-auto
  // h-[calc((var(--vh,1vh)_*_100)_-_8rem)]

  return <AuthLayout
    className={cn('signin-page neutral-150 justify-center h-screen-vh', className)}>
    <div className="relative w-full flex flex-col items-center mx-auto bg-white
    rounded-2xl shadow-xl dark:border dark:bg-gray-800 dark:border-gray-700
    max-w-md sm:max-w-md md:max-w-md p-8 sm:p-10 md:p-12
    ">
      <div className="mx-auto w-full">
        <div className="flex flex-col w-full mb-10">
          <div className="flex flex-col items-center mb-10">
            <Link className="inline-block" to={ROUTE.HOME.ROUTE} aria-label="Home">
              <AppLogo className="h-14 w-auto"/>
            </Link>
          </div>
          <div className="text-left">
            <h2 className="text-lg font-semibold text-gray-900">
              Sign in to your account
            </h2>
          </div>
        </div>
        <SignInForm
          className="mb-8"
          onSubmit={handleSubmitForm}
          onSubmitErrorMessage={null}
        />
        <div className="flex flex-col w-full">
          <p className="text-sm font-normal text-gray-700 dark:text-gray-400 !mb-2">
            Don&apos;t have an account yet? { ' ' }
            <Link
              to={ROUTE.SIGN_UP.LINK()}
              className="font-medium text-primary-500 hover:text-primary-600 hover:underline dark:text-blue-500 transition-colors ease-linear duration-150"
            >
              Sign up
            </Link>
          </p>
          <p className="text-sm font-normal text-gray-700 dark:text-gray-400 !mt-0">
            <Link
              to={ROUTE.FORGOT_PASSWORD.LINK()}
              className="font-medium text-primary-500 hover:text-primary-600 hover:underline dark:text-blue-500 transition-colors ease-linear duration-150">
              Forgot password?
            </Link>
          </p>
        </div>
      </div>
    </div>
  </AuthLayout>;
});
