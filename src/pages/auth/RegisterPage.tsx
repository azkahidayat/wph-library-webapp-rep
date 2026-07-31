import InputField from '@/components/shared/InputField';
import Logo from '@/components/shared/Logo';
import {
  registerSchema,
  type RegisterSchema,
} from '@/features/auth/schema/registerSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import type { RegisterPayload } from '@/features/auth/types';
import { useRegister } from '@/features/auth/hooks/useAuth';

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });
  const [isPassShown, setIsPassShown] = useState(false);
  const [isConfirmPassShown, setIsConfirmPassShown] = useState(false);

  const navigate = useNavigate();
  const { mutate, isPending } = useRegister();

  const onSubmit = (data: RegisterSchema) => {
    const registerPayload: RegisterPayload = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      password: data.password,
    };
    mutate(registerPayload);
    setTimeout(() => {
      navigate('/auth/login');
    }, 600);
  };

  return (
    <section id='register' className='flex flex-col gap-5 w-full max-w-100'>
      <Logo />
      <div className='flex flex-col'>
        <p className='font-bold text-display-xs'>Register</p>
        <p className='font-semibold lg:text-md text-neutral-700'>
          Create your account to start borrowing books.
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
        <InputField
          register={register}
          name='name'
          errorMessage={errors.name?.message}
          label='Name'
        />

        <InputField
          register={register}
          name='email'
          errorMessage={errors.email?.message}
          label='Email'
        />
        <InputField
          register={register}
          name='phone'
          type='tel'
          errorMessage={errors.phone?.message}
          label='Phone number'
        />

        <InputField
          register={register}
          name='password'
          errorMessage={errors.password?.message}
          type='password'
          isPassShown={isPassShown}
          label='Password'
          onClick={() => setIsPassShown((prev) => !prev)}
        />
        <InputField
          register={register}
          name='confirmPassword'
          errorMessage={errors.confirmPassword?.message}
          type='password'
          isPassShown={isConfirmPassShown}
          label='Confirm password'
          onClick={() => setIsConfirmPassShown((prev) => !prev)}
        />

        <Button disabled={isPending}>
          {isPending ? 'Submitting...' : 'Submit'}
        </Button>
        <p className='text-center font-semibold text-md'>
          Already have an account?{' '}
          <Link to='/auth/login' className='text-primary-300 cursor-pointer'>
            Log in
          </Link>
        </p>
      </form>
    </section>
  );
};

export default RegisterPage;
