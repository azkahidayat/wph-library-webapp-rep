import {
  loginSchema,
  type LoginSchema,
} from '@/features/auth/schema/loginSchema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import InputField from '@/components/shared/InputField';
import { Button } from '@/components/ui/button';
import Logo from '@/components/shared/Logo';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useLogin } from '@/features/auth/hooks/useAuth';

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const { mutate, isPending } = useLogin();
  const navigate = useNavigate();

  const [isPassShown, setIsPassShown] = useState(false);

  const onSubmit = (data: LoginSchema) => {
    mutate(data, {
      onSuccess: () => {
        navigate('/');
      },
    });
  };

  return (
    <section id='login' className='flex flex-col gap-5 w-full max-w-100'>
      <Logo />
      <div className='flex flex-col'>
        <p className='font-bold text-display-xs'>Login</p>
        <p className='font-semibold lg:text-md text-neutral-700'>
          Sign in to manage your library account.
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
        <InputField
          register={register}
          name='email'
          errorMessage={errors.email?.message}
          label='Email'
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

        <Button disabled={isPending}>Login</Button>
        <p className='text-center font-semibold text-md'>
          Don't have an account?{' '}
          <Link to='/auth/register' className='text-primary-300 cursor-pointer'>
            Register
          </Link>
        </p>
      </form>
    </section>
  );
};

export default LoginPage;
