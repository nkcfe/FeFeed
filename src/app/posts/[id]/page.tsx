'use client';

import Button from '@/components/Button';
import LoadingModal from '@/components/modal/LoadingModal';

import axios from 'axios';

import type { PostType } from '@/module/type';

import { format } from 'date-fns';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { FaAngleDown } from 'react-icons/fa6';
import { HiOutlineShare } from 'react-icons/hi';
import { FiEdit2 } from 'react-icons/fi';
import { AiOutlineDelete } from 'react-icons/ai';
import Header from '@/components/Header';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useDelete } from '@/hooks/useDelete';

interface PostProps {
  params: { id: number };
}

const Post = (props: PostProps) => {
  const { id } = props.params;

  const [isScrollDown, setIsScrollDown] = useState(false);

  const bodyRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: ['posts', id],
    queryFn: async (): Promise<PostType> => {
      const response = await axios.get(`/api/posts?id=${id}`);
      return response.data;
    },
  });

  const { deletePost, isDeleteSuccess } = useDelete(id);

  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const handleScroll = () => {
    bodyRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.info('URL이 복사되었습니다.');
    } catch (err) {
      console.error('Failed to copy URL: ', err);
    }
  };

  const handleEdit = () => {
    router.push(`/posts/${id}/edit`);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrollDown(true);
      } else {
        setIsScrollDown(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isDeleteSuccess) {
      router.push('/');
    }
  }, [isDeleteSuccess, router]);

  if (isLoading) return <LoadingModal />;

  return (
    <>
      <Header isScrollDown={isScrollDown} />
      {isLoading ? (
        <LoadingModal />
      ) : (
        <>
          <motion.div
            className="fixed inset-x-0 top-14 h-2 origin-[0%] bg-slate-900"
            style={{ scaleX }}
          />
          <div className="flex flex-col">
            <div className="h-[100vh] bg-white">
              <div className="relative h-[90vh] w-screen object-cover ">
                <Image
                  src={data?.coverImage!!}
                  alt={data?.title!!}
                  layout="fill"
                  objectFit="cover"
                />
                <div className="absolute bottom-20 left-[50%] z-10 flex translate-x-[-50%] flex-col items-center justify-center gap-4 text-white">
                  <div className="text-6xl font-bold">{data?.title}</div>
                  <div className="mb-4 text-sm">
                    {data &&
                      !isNaN(new Date(data.createdAt).valueOf()) &&
                      format(new Date(data.createdAt), 'yyyy.MM.dd')}
                  </div>
                  <Button shape="full" variant="gray" onClick={handleScroll}>
                    <div className="flex items-center justify-center p-3 text-white">
                      <FaAngleDown size={20} />
                    </div>
                  </Button>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50" />
              </div>
              <div className="h-24 " ref={bodyRef} />
            </div>
            <div className="mx-auto lg:max-w-4xl">
              <div dangerouslySetInnerHTML={{ __html: data?.content ?? '' }} />
              <div className="flex h-52 w-full items-end justify-between bg-white">
                <Button
                  variant="gray"
                  shape="primary"
                  size="medium"
                  onClick={handleShare}
                >
                  <div className="flex items-center justify-center gap-1">
                    <HiOutlineShare />
                    공유
                  </div>
                </Button>
                <div className="flex gap-2">
                  <Button
                    variant="gray"
                    shape="primary"
                    size="medium"
                    onClick={handleEdit}
                  >
                    <div className="flex items-center justify-center gap-1">
                      <FiEdit2 />
                      수정
                    </div>
                  </Button>
                  <Button
                    variant="gray"
                    shape="primary"
                    size="medium"
                    onClick={() => deletePost()}
                  >
                    <div className="flex items-center justify-center gap-1">
                      <AiOutlineDelete />
                      삭제
                    </div>
                  </Button>
                </div>
              </div>
              <hr className="mb-12 mt-6" />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Post;
