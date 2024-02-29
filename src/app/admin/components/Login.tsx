'use client';

import AuthInput from '@/components/share/AuthInput';
import Button from '@/components/share/Button';
import { createClient } from '@/libs/supabase/client';
import React from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const supabase = createClient();

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const response = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (!response.data.user) {
      return toast.error('로그인에 실패했습니다.');
    }

    location.reload();
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="z-10 flex w-80 flex-col items-center justify-center gap-2 rounded-sm bg-white/50 p-8 shadow-lg backdrop-blur-lg"
    >
      <div className="mb-10 text-2xl font-bold text-black">Welcome Back!</div>
      <AuthInput
        register={register}
        errors={errors}
        required
        id="email"
        type="email"
        label="Email"
      />
      <AuthInput
        register={register}
        errors={errors}
        required
        id="password"
        type="password"
        label="Password"
      />
      <Button
        type="submit"
        variant="purple"
        size="medium"
        weight="bold"
        custom="w-full py-4 mt-6 "
        shape="secondary"
      >
        Login
      </Button>
    </form>
  );
};

export default Login;
