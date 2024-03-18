import Logo from '@/components/share/Logo';
import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react';
import { MdOutlineKeyboardBackspace } from 'react-icons/md';
import { HiOutlineShare } from 'react-icons/hi';
import { toast } from 'react-toastify';
import { FiEdit2 } from 'react-icons/fi';
import { AiOutlineDelete } from 'react-icons/ai';
import { useRouter } from 'next/navigation';
import { UseMutateFunction } from '@tanstack/react-query';

interface HeaderProps {
  isAuthenticated: boolean;
  id: number;
  deletePost: UseMutateFunction<any, Error, void, unknown>;
}

const Header = (props: HeaderProps) => {
  const { isAuthenticated, id, deletePost } = props;
  const router = useRouter();

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.info('URL이 복사되었습니다.');
    } catch (err) {
      console.error('Failed to copy URL: ', err);
    }
  };

  const handleUpdatePost = () => {
    router.push(`/posts/${id}/edit`);
  };

  const handleDeletePost = () => {
    deletePost();
    toast.info('게시글이 삭제되었습니다.');
  };

  return (
    <div className="fixed top-0 z-[50] w-screen bg-white/50 backdrop-blur-xl dark:bg-black/80">
      <div className="mx-auto flex h-16 items-center justify-between p-6 text-lg lg:max-w-6xl">
        <Button
          variant="outline"
          className="gap-2"
          onClick={() => router.back()}
        >
          <MdOutlineKeyboardBackspace />
          <div>Back</div>
        </Button>
        <Logo />
        <div className="flex items-center justify-center gap-2">
          <Button variant="outline" className="gap-2" onClick={copyToClipboard}>
            <HiOutlineShare />
            <div>Share</div>
          </Button>
          {isAuthenticated && (
            <>
              <Button
                variant="outline"
                className="gap-2"
                onClick={handleUpdatePost}
              >
                <FiEdit2 />
              </Button>
              <Button
                variant="outline"
                className="gap-2"
                onClick={handleDeletePost}
              >
                <AiOutlineDelete />
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
