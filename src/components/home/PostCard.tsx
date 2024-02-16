import Image from 'next/image';
import React from 'react';

const PostCard = () => {
  return (
    <div className="group flex w-[550px] cursor-pointer flex-col items-center justify-center">
      <Image
        src="https://saryetgujpylhqlvyyek.supabase.co/storage/v1/object/public/images/kilimanjaro-studioz-_8mos_CBmBM-unsplash.jpg"
        alt="cover"
        width={600}
        height={250}
        className="inset-1 h-[300px] w-full rounded-xl object-cover transition duration-300 group-hover:translate-y-[-10px] group-hover:shadow-2xl"
      />
      <div className="mt-8 flex w-full flex-col items-start gap-3 transition duration-300 group-hover:text-blue-600">
        <div className="text-sm text-gray-500">서비스</div>
        <div className="text-3xl font-semibold">
          해외여행 준비하기: 토스 환전 방법 및 수수료
        </div>
        <div className="text-sm text-gray-500">
          토스에서 환전하는 방법과 수령 방법, 수수료 등을 알려드려요.
        </div>
        <div className="text-sm text-gray-500">2024.02.16</div>
      </div>
    </div>
  );
};

export default PostCard;
