import Button from '@/components/share/Button';
import { useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'react-toastify';
import { HiOutlineShare } from 'react-icons/hi';
import { FiEdit2 } from 'react-icons/fi';
import { AiOutlineDelete } from 'react-icons/ai';

interface FooterProps {
  id: number;
  isAuthenticated: boolean;
  deletePost: () => void;
}

const Footer = (props: FooterProps) => {
  const { id, isAuthenticated, deletePost } = props;
  const router = useRouter();

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

  return (
    <>
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
        {isAuthenticated && (
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
        )}
      </div>
      <hr className="mb-12 mt-6" />
    </>
  );
};

export default Footer;
