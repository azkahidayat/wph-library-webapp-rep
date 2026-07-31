import { cn } from '@/lib/utils';
import type { HTMLInputTypeAttribute, InputHTMLAttributes } from 'react';
import type { FieldValues, Path, UseFormRegister } from 'react-hook-form';
import { FaRegEyeSlash } from 'react-icons/fa';
import { IoEyeOutline } from 'react-icons/io5';

interface InputFieldProps<T extends FieldValues> extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'name' | 'type'
> {
  register: UseFormRegister<T>;
  name: Path<T>;
  errorMessage?: string;
  type?: HTMLInputTypeAttribute;
  onClick?: () => void;
  isPassShown?: boolean;
  label: string;
}

const InputField = <T extends FieldValues>({
  register,
  name,
  errorMessage,
  type = 'text',
  onClick,
  isPassShown,
  label,
  ...props
}: InputFieldProps<T>) => {
  return (
    <div className='flex flex-col w-full'>
      <label htmlFor={name} className='font-bold text-sm'>
        {label}
      </label>
      <div className='relative'>
        <input
          id={name}
          type={type === 'password' && isPassShown ? 'text' : type}
          {...register(name)}
          {...props}
          aria-invalid={!!errorMessage}
          aria-describedby={`${name}-error`}
          className={cn(
            'py-2 px-4 border rounded-xl focus:outline-none w-full',
            errorMessage && 'border-red',
            props.className
          )}
        />
        {type === 'password' && onClick && (
          <button
            type='button'
            onClick={onClick}
            aria-label={isPassShown ? 'Hide password' : 'Show password'}
            className='absolute right-4 cursor-pointer top-1/2 -translate-y-1/2'
          >
            {isPassShown ? (
              <IoEyeOutline className='size-5' />
            ) : (
              <FaRegEyeSlash className='size-5' />
            )}
          </button>
        )}
      </div>
      {errorMessage && (
        <p id={`${name}-error`} className='text-red text-sm'>
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default InputField;
