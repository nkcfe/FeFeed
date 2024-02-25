'use client';

import React from 'react';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import clsx from 'clsx';

interface InputProps {
  label: string;
  id: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  disabled?: boolean;
}

const AuthInput = (props: InputProps) => {
  const { label, id, type, required, register, errors, disabled } = props;
  return (
    <div className="w-full">
      <label
        htmlFor={id}
        className={`ml-2 block text-sm font-medium leading-6 text-gray-700`}
      >
        {label}
      </label>
      <div>
        <input
          id={id}
          type={type}
          autoComplete="off"
          disabled={disabled}
          {...register(id, { required })}
          className={clsx(
            `form-input block w-full rounded-md border-0 py-1.5 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 outline-none transition px-2`,
            errors[id] && 'focus:ring-rose-500',
            disabled && 'opacity-50 cursor-default',
          )}
        />
      </div>
    </div>
  );
};

export default AuthInput;
