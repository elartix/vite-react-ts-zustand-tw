// outsource dependencies
import _ from 'lodash';
import { z } from 'zod';
import cn from 'classnames';
import { useForm } from 'react-hook-form';
import { Transition } from '@headlessui/react';
import { Button, Input } from '@nextui-org/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { memo, PropsWithChildren, useCallback, useState } from 'react';
import { EyeIcon, EyeSlashIcon, LockClosedIcon, UserIcon } from '@heroicons/react/24/solid';


// local dependencies
import { ValidationRules } from '@/constants';


const SignInFormSchema = z.object({
  username: ValidationRules.NAME,
  password: ValidationRules.PASSWORD,
  /*    email: z.string().email ("Invalid email address').refine(async (value) => {
    // Perform async validation logic (e.g., check if email exists in the database)
    // Return true if validation passes, false otherwise
  }, 'Email already exists'), */
});

export type SignInFormType = z.infer<typeof SignInFormSchema>;

type SignInFormProps = PropsWithChildren<{
  className?: string
  onSubmitErrorMessage?: string | null
  onSubmit: (data: SignInFormType) => void;
}>;

export const SignInForm = memo<SignInFormProps>(function SignInForm ({ className, onSubmit, onSubmitErrorMessage }) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handlePasswordVisibility = useCallback(() => {
    setIsPasswordVisible((prev) => !prev);
  }, [setIsPasswordVisible]);

  const {
    reset,
    control,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignInFormType>({
    // Specify SignInForm as generic type
    resolver: zodResolver(SignInFormSchema),
  });

  const handleFormSubmit = useCallback((data: SignInFormType) => {
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
    <div className="flex items-center">
      <Button
        type="submit"
        variant="solid"
        color="primary"
        className="w-full"
        isLoading={false}
      >
        <span>
          Sign In
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
        <div className="font-medium">Sign in error!</div>
        <span>{ onSubmitErrorMessage }</span>.
      </div>
    </Transition>
  </form>;
});
