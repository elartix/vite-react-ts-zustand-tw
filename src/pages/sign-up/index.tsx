// outsource dependencies
import _ from 'lodash';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { memo, PropsWithChildren, useCallback, useEffect } from 'react';


// local dependencies
import * as ROUTE from '@/constants/routes';
import { AuthLayout } from '@/modules/layouts';
import { AppLogo } from '@/components/app-logo';
import { SignUpForm, SignUpFormType } from '@/pages/sign-up/sign-up-form';
import { useSignUpControllerStore } from '@/pages/sign-up/sign-up.controller';


export const SignUp = memo<PropsWithChildren<{ className?: string }>>(function SignUp ({ className }) {

  const {
    health,
    initialized,
    submitErrorMessage,
    initialize,
    signUp,
    resetSubmitErrorMessage
  } = useSignUpControllerStore((state) => state);

  // NOTE initialize business logic
  useEffect(() => { initialize({}); }, [initialize]);

  const handleSubmitForm = useCallback((data: Partial<SignUpFormType>) => {
    signUp(data);
  }, [signUp]);

  useEffect(() => {
    if (!_.isEmpty(submitErrorMessage)) {
      setTimeout(() => resetSubmitErrorMessage(), 4000);
    }
  }, [submitErrorMessage, resetSubmitErrorMessage]);

  return <AuthLayout
    className={cn('sign-up-page neutral-150 justify-center h-screen-vh', className)}>
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
              Get started for free
            </h2>
          </div>
        </div>
        <SignUpForm
          className="mb-8"
          onSubmit={handleSubmitForm}
          onSubmitErrorMessage={null}
        />
        <div className="flex flex-col w-full">
          <p className="text-sm font-normal text-gray-700 dark:text-gray-400 !mb-2">
            Already registered? { ' ' }
            <Link
              to={ROUTE.SIGN_IN.LINK()}
              className="font-medium text-primary-500 hover:text-primary-600 hover:underline dark:text-blue-500 transition-colors ease-linear duration-150"
            >
              Sign in
            </Link>{ ' ' }
            to your account.
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
