// outsource dependencies
import { z } from 'zod';
import cn from 'classnames';
import { useForm } from 'react-hook-form';
import { Button, Input } from '@heroui/react';
import { Transition } from '@headlessui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { memo, type PropsWithChildren, useCallback, useState } from 'react';
import { isEmpty, isEqual, get as _get, omit as _omit } from 'es-toolkit/compat';
import { AtSymbolIcon, EyeIcon, EyeSlashIcon, LockClosedIcon, UserIcon } from '@heroicons/react/24/solid';


// local dependencies
import { ValidationRules } from '@/constants';
import useRefinement, { type RefinementCallback } from '@/hooks/use-refinement';
import { useSignUpControllerStore } from '@/pages/sign-up/sign-up.controller';


const SignUpFormSchema = z.object({
  username: ValidationRules.NAME,
  email: ValidationRules.EMAIL,
  password: ValidationRules.PASSWORD,
  confirmPassword: ValidationRules.PASSWORD
  /*    email: z.string().email ("Invalid email address').refine(async (value) => {
    // Perform async validation logic (e.g., check if email exists in the database)
    // Return true if validation passes, false otherwise
  }, 'Email already exists'), */
}).refine((data) => isEqual(data.password, data.confirmPassword), {
  path: ['confirmPassword'],
  message: 'Passwords does not match'
});

export type SignUpFormType = z.infer<typeof SignUpFormSchema>;

type SignUpFormProps = PropsWithChildren<{
  className?: string,
  onSubmitErrorMessage?: string | null,
  onSubmit: (data: Partial<SignUpFormType>) => void
}>;

function checkUserNameToBeUnique (): RefinementCallback<{ username: string }> {
  return async (data, { signal }) => {
    if (!isEmpty(_get(data, 'username'))) {
      // Mock Response async validation
      const response = await fetch('/api/auth/validation/username', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ ...data })
      });
      const json = await response.json();

      return !_get(json, 'data.userNameAlreadyExist', true);
    }

    return true;
  };
}

export const SignUpForm = memo<SignUpFormProps>(function SignUpForm ({ className, onSubmit }) {
  const {
    isLoading,
    submitErrorMessage,
    user,
  } = useSignUpControllerStore((state) => state);

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handlePasswordVisibility = useCallback(() => {
    setIsPasswordVisible((prev) => !prev);
  }, [setIsPasswordVisible]);

  const uniqueName = useRefinement(checkUserNameToBeUnique(), {
    debounce: 500,
  });

  const {
    setValue,
    reset,
    control,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignUpFormType>({
    // Specify SignUpForm as generic type
    resolver: zodResolver(SignUpFormSchema.refine(uniqueName, {
      message: 'Provided username already in use.',
      path: ['username'],
    })),
    mode: 'all', // 'onBlur',
    reValidateMode: 'onSubmit'
  });

  const handleFormSubmit = useCallback((data: SignUpFormType) => {
    onSubmit(_omit(data, 'confirmPassword'));
    reset();
  }, [onSubmit, reset]);

  return <form
    className={cn('grid grid-cols-1 gap-y-4', className)} noValidate
    onSubmit={handleSubmit(handleFormSubmit)}>
    <Transition
      show={Boolean(user)}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <div
        className="p-4 mb-8 text-sm text-red-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-white overflow-x-auto"
      >
        <div className="font-medium">User Created!</div>
        <span>
          You can check username { ' ' }
          <Button
            type="button"
            size="sm"
            color="primary"
            variant="flat"
            onClick={() => setValue('username', _get(user, 'username', ''))}
          >
            Set value: { user?.username }
          </Button>
        </span>
        <pre><code>{ JSON.stringify(user, null, 4) }</code></pre>
      </div>
    </Transition>

    <Input
      type="text"
      label="Username"
      variant={'flat'}
      placeholder="Enter your username"
      labelPlacement="outside-top"
      startContent={
        <UserIcon className="h-4 text-2xl text-default-400 pointer-events-none flex-shrink-0"/>
      }
      isInvalid={!isEmpty(_get(errors, 'username.message'))}
      color={!isEmpty(_get(errors, 'username.message')) ? 'danger' : 'default'}
      errorMessage={!isEmpty(_get(errors, 'username.message')) && _get(errors, 'username.message', null)}
      {...register('username', { onChange: uniqueName.invalidate })}
    />
    <Input
      type="text"
      label="Email"
      variant={'flat'}
      placeholder="Enter your email"
      labelPlacement="outside-top"
      startContent={
        <AtSymbolIcon className="h-4 text-2xl text-default-400 pointer-events-none flex-shrink-0"/>
      }
      isInvalid={!isEmpty(_get(errors, 'email.message'))}
      color={!isEmpty(_get(errors, 'email.message')) ? 'danger' : 'default'}
      errorMessage={!isEmpty(_get(errors, 'email.message')) && _get(errors, 'email.message', null)}
      {...register('email')}
    />
    <Input
      label="Password"
      variant={'flat'}
      labelPlacement="outside-top"
      placeholder="Enter your password"
      startContent={
        <LockClosedIcon className="h-4 text-2xl text-default-400 pointer-events-none flex-shrink-0"/>
      }
      endContent={
        <Button
          isIconOnly
          type="button"
          variant="light"
          aria-label={isPasswordVisible ? 'Hide Password' : 'Show Password'}
          className="focus:outline-none"
          onClick={handlePasswordVisibility}>
          { isPasswordVisible ? (
            <EyeIcon className="h-4 text-2xl text-default-400 pointer-events-none"/>
          ) : (
            <EyeSlashIcon className="h-4 text-2xl text-default-400 pointer-events-none"/>
          ) }
        </Button>
      }
      type={isPasswordVisible ? 'text' : 'password'}
      isInvalid={!isEmpty(_get(errors, 'password.message'))}
      color={!isEmpty(_get(errors, 'password.message')) ? 'danger' : 'default'}
      errorMessage={!isEmpty(_get(errors, 'password.message')) && _get(errors, 'password.message', null)}
      {...register('password')}
    />
    <Input
      label="Confirm Password"
      variant={'flat'}
      labelPlacement="outside-top"
      placeholder="Enter confirm password"
      startContent={
        <LockClosedIcon className="h-4 text-2xl text-default-400 pointer-events-none flex-shrink-0"/>
      }
      endContent={
        <Button
          isIconOnly
          type="button"
          variant="light"
          aria-label={isPasswordVisible ? 'Hide Password' : 'Show Password'}
          className="focus:outline-none"
          onClick={handlePasswordVisibility}>
          { isPasswordVisible ? (
            <EyeIcon className="h-4 text-2xl text-default-400 pointer-events-none"/>
          ) : (
            <EyeSlashIcon className="h-4 text-2xl text-default-400 pointer-events-none"/>
          ) }
        </Button>
      }
      type={isPasswordVisible ? 'text' : 'password'}
      isInvalid={!isEmpty(_get(errors, 'confirmPassword.message'))}
      color={!isEmpty(_get(errors, 'confirmPassword.message')) ? 'danger' : 'default'}
      errorMessage={!isEmpty(_get(errors, 'confirmPassword.message')) && _get(errors, 'confirmPassword.message', null)}
      {...register('confirmPassword')}
    />
    <div className="flex items-center">
      <Button
        type="submit"
        variant="solid"
        color="primary"
        className="w-full"
        isLoading={isLoading}
      >
        <span>
          Sign Up
        </span>
      </Button>
    </div>

    <Transition
      show={Boolean(submitErrorMessage)}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <div className="p-4 mb-0 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">
        <div className="font-medium">Sign up error!</div>
        <span>{ submitErrorMessage }</span>.
      </div>
    </Transition>
  </form>;
});
