// outsource dependencies
import _ from 'lodash';
import { z } from 'zod';
import cn from 'classnames';
import { useForm } from 'react-hook-form';
import { Transition } from '@headlessui/react';
import { Button, Input } from '@nextui-org/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { memo, PropsWithChildren, useCallback, useState } from 'react';
import { AtSymbolIcon, EyeIcon, EyeSlashIcon, LockClosedIcon, UserIcon } from '@heroicons/react/24/solid';


// local dependencies
import { ValidationRules } from '@/constants';
import useRefinement, { RefinementCallback } from '@/hooks/use-refinement.ts';


const SignUpFormSchema = z.object({
  username: ValidationRules.NAME,
  email: ValidationRules.EMAIL,
  password: ValidationRules.PASSWORD,
  confirmPassword: ValidationRules.PASSWORD
  /*    email: z.string().email ("Invalid email address').refine(async (value) => {
    // Perform async validation logic (e.g., check if email exists in the database)
    // Return true if validation passes, false otherwise
  }, 'Email already exists'), */
}).refine((data) => _.isEqual(data.password, data.confirmPassword), {
  path: ['confirmPassword'],
  message: 'Passwords does not match'
});

export type SignUpFormType = z.infer<typeof SignUpFormSchema>;

type SignUpFormProps = PropsWithChildren<{
  className?: string
  onSubmitErrorMessage?: string | null
  onSubmit: (data: SignUpFormType) => void;
}>;

function checkUserNameToBeUnique (): RefinementCallback<{ username: string }> {
  return async (data, { signal }) => {
    const response = await fetch('/api/auth/validation/username', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      // body: JSON.stringify({ username: 'hello' })
      body: JSON.stringify({ ...data })
    });
    const json = await response.json();

    return !_.get(json, 'data.userNameAlreadyExist', false);
  };
}

export const SignUpForm = memo<SignUpFormProps>(function SignUpForm ({ className, onSubmit, onSubmitErrorMessage }) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handlePasswordVisibility = useCallback(() => {
    setIsPasswordVisible((prev) => !prev);
  }, [setIsPasswordVisible]);

  const uniqueName = useRefinement(checkUserNameToBeUnique(), {
    debounce: 1000,
  });

  const {
    reset,
    control,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignUpFormType>({
    // Specify SignUpForm as generic type
    resolver: zodResolver(SignUpFormSchema.refine(uniqueName, {
      message: 'Username already exists',
      path: ['username'],
    })),
    mode: 'all',
  });

  const handleFormSubmit = useCallback((data: SignUpFormType) => {
    console.log(errors);
    onSubmit(data);
  }, [errors, onSubmit]);
  console.log(errors);

  return <form className={cn('grid grid-cols-1 gap-y-8', className)} noValidate onSubmit={handleSubmit(handleFormSubmit)}>
    <Input
      type="text"
      label="Username"
      variant={'flat'}
      placeholder="Enter your username"
      labelPlacement="outside"
      startContent={
        <UserIcon className="h-4 text-2xl text-default-400 pointer-events-none flex-shrink-0"/>
      }
      isInvalid={!_.isEmpty(_.get(errors, 'username.message'))}
      color={!_.isEmpty(_.get(errors, 'username.message')) ? 'danger' : 'default'}
      errorMessage={!_.isEmpty(_.get(errors, 'username.message')) && _.get(errors, 'username.message', null)}
      {...register('username')}
    />
    <Input
      type="text"
      label="Email"
      variant={'flat'}
      placeholder="Enter your email"
      labelPlacement="outside"
      startContent={
        <AtSymbolIcon className="h-4 text-2xl text-default-400 pointer-events-none flex-shrink-0"/>
      }
      isInvalid={!_.isEmpty(_.get(errors, 'username.message'))}
      color={!_.isEmpty(_.get(errors, 'username.message')) ? 'danger' : 'default'}
      errorMessage={!_.isEmpty(_.get(errors, 'username.message')) && _.get(errors, 'username.message', null)}
      {...register('email')}
    />
    <Input
      label="Password"
      variant={'flat'}
      labelPlacement="outside"
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
      isInvalid={!_.isEmpty(_.get(errors, 'password.message'))}
      color={!_.isEmpty(_.get(errors, 'password.message')) ? 'danger' : 'default'}
      errorMessage={!_.isEmpty(_.get(errors, 'password.message')) && _.get(errors, 'password.message', null)}
      {...register('password')}
    />
    <Input
      label="Confirm Password"
      variant={'flat'}
      labelPlacement="outside"
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
      isInvalid={!_.isEmpty(_.get(errors, 'password.message'))}
      color={!_.isEmpty(_.get(errors, 'password.message')) ? 'danger' : 'default'}
      errorMessage={!_.isEmpty(_.get(errors, 'password.message')) && _.get(errors, 'password.message', null)}
      {...register('confirmPassword')}
    />
    <div className="flex items-center">
      <Button
        type="submit"
        variant="solid"
        color="primary"
        className="w-full"
        isLoading={false}
      >
        <span>
          Sign Up
        </span>
      </Button>
    </div>

    <Transition
      show={Boolean(onSubmitErrorMessage)}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <div className="p-4 mb-0 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
           role="alert">
        <div className="font-medium">Sign up error!</div>
        <span>{ onSubmitErrorMessage }</span>.
      </div>
    </Transition>
  </form>;
});
