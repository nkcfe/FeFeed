'use client';

import AuthInput from '@/components/share/AuthInput';
import Button from '@/components/share/Button';
import { createClient } from '@/libs/supabase/client';
import { UserResponse } from '@supabase/supabase-js';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const supabase = createClient();

const Login = () => {
  const router = useRouter();
  const [userResponse, setUserResponse] = useState<UserResponse>();
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

  useEffect(() => {
    // async 함수는 Promsie를 반환하기 때문에 useEffect 내부에서 사용할 수 없다.
    // 따라서 즉시 실행 함수로 감싸주어야 한다.
    (async () => {
      const user = await supabase.auth.getUser();
      setUserResponse(user);
    })();
  }, []);

  return (
    <div className="relative flex h-screen w-screen flex-col items-center justify-center">
      <Image src="/banner3.png" alt="배경" fill />
      <div className="absolute inset-0 bg-white/10" />
      {!!userResponse?.data.user ? (
        <div className="z-10 flex flex-col items-center justify-center">
          <div className=" text-5xl font-bold text-gray-200">
            Welcome!
            {/* {userResponse.data.user.email}님 */}
          </div>
          <div className="mt-10 flex items-center justify-center gap-4">
            <Button
              variant="blue"
              size="medium"
              weight="bold"
              custom="text-gray-600"
              onClick={() => router.push('/')}
            >
              홈 화면으로
            </Button>
            <Button
              variant="blue"
              size="medium"
              weight="bold"
              custom="text-gray-600"
              onClick={() => {
                supabase.auth.signOut();
                location.reload();
              }}
            >
              로그아웃
            </Button>
          </div>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="z-10 flex w-96 flex-col items-center justify-center gap-2 rounded-2xl bg-white/50 p-8 shadow-lg backdrop-blur-lg"
        >
          <div className="mb-10 text-2xl font-bold text-gray-700">
            관리자 로그인
          </div>
          <AuthInput
            register={register}
            errors={errors}
            required
            id="email"
            type="email"
            label="이메일"
          />
          <AuthInput
            register={register}
            errors={errors}
            required
            id="password"
            type="password"
            label="비밀번호"
          />
          <Button
            type="submit"
            variant="blue"
            size="medium"
            weight="bold"
            custom="w-full mt-4 text-gray-600"
          >
            Login
          </Button>
        </form>
      )}
    </div>
  );
};

export default Login;
