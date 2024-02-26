'use client';
import React, { useRef, useState } from 'react';

import Input from '@/components/share/Input';
import Button from '@/components/share/Button';
import Tiptap from '@/components/share/editor/Editor';

import Image from 'next/image';

import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Focus from '@tiptap/extension-focus';
import { createClient } from '@/libs/supabase/client';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import CategorySelect from '@/components/share/category/CategorySelect';
import TagSelect from '@/components/tag/TagSelect';
import Header from '@/app/write/components/WriteHeader';
import { Image as TiptapImage } from '@tiptap/extension-image';

const supabase = createClient();

const Write = () => {
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);

  const [image, setImage] = useState<string>(
    'https://saryetgujpylhqlvyyek.supabase.co/storage/v1/object/public/images/dylan-nolte-SH_IjrKwG8c-unsplash.jpg',
  );
  const [category, setCategory] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const router = useRouter();

  const selectCategory = (category: string) => {
    setCategory(category);
  };

  const uploadFileHandler = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();
    const changeHandler = async () => {
      const toastId = toast.loading('파일을 업로드 중입니다.');
      const file = input.files?.[0];
      const fileSize = file?.size;
      if (!file) return null;
      if (fileSize && fileSize > 1024 * 1024 * 10) {
        toast.dismiss(toastId);
        toast.error('파일 크기는 10MB를 넘을 수 없습니다.');
        return;
      }
      const currentTime = new Date().toISOString();
      const fileName = `${currentTime}_${file.name}`;
      const { data, error } = await supabase.storage
        .from('images')
        .upload(fileName, file);

      console.log('data', data);

      if (error) {
        toast.dismiss(toastId);
        toast.error('파일 업로드에 실패했습니다.');
      } else {
        const imageData = supabase.storage
          .from('images')
          .getPublicUrl(fileName);
        setImage(imageData.data.publicUrl);
        toast.dismiss(toastId);
        toast.success('파일 업로드에 성공했습니다.');
      }
    };

    input.addEventListener('change', changeHandler);
  };

  const editor = useEditor({
    extensions: [
      StarterKit,
      TiptapImage,
      Placeholder.configure({
        placeholder: '텍스트를 선택해 에디터를 사용해보세요.',
        showOnlyCurrent: false,
      }),
      Focus.configure({
        className: 'has-focus',
        mode: 'all',
      }),
    ],

    editorProps: {
      attributes: {
        class: 'focus:outline-none',
      },
    },
  });

  const handleSubmit = async () => {
    const title = titleRef.current?.value;
    const description = descriptionRef.current?.value;
    const content = editor?.getHTML();
    const isContentEmpty = editor?.isEmpty;

    if (!category) {
      toast.error('카테고리를 선택해주세요.');
      return;
    }

    if (!title) {
      toast.error('제목을 입력해주세요.');
      return;
    }

    if (isContentEmpty) {
      toast.error('내용을 입력해주세요.');
      return;
    }

    if (selectedTags.length === 0) {
      toast.error('태그를 입력해주세요.');
      return;
    }

    try {
      const res = await axios.post('/api/posts', {
        image,
        title,
        description,
        content,
        category,
        selectedTags,
      });

      if (res.status === 200) {
        toast.success('게시물 등록에 성공했습니다.');
        router.replace(`/posts/${res?.data?.id}`);
      } else {
        toast.error('게시물 등록에 실패했습니다.');
      }
    } catch (e) {
      toast.error('게시물 등록에 실패했습니다.');
    }
  };

  return (
    <>
      <Header handleSubmit={handleSubmit} />
      <div className="relative mx-auto lg:max-w-4xl">
        <Image
          src={image}
          alt="image"
          width={600}
          height={300}
          className="h-[300px] w-full object-cover shadow-sm"
        />
        <Button
          variant="gray"
          shape="primary"
          size="medium"
          custom="absolute bottom-4 right-4 z-10"
          onClick={(e) => uploadFileHandler(e)}
        >
          이미지 변경
        </Button>
      </div>
      <div className="mx-auto mt-10 flex flex-col items-center justify-center gap-4 lg:max-w-4xl">
        <Input
          ref={titleRef}
          placeholder="제목을 입력해주세요"
          className="w-full text-center text-3xl font-bold"
        />
        <Input
          ref={descriptionRef}
          placeholder="설명을 입력해주세요"
          className="w-full text-center text-base text-gray-500"
        />
        <CategorySelect selectCategory={selectCategory} category={category} />
        <TagSelect
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
        />
        <hr />
        <div className="mr-auto text-2xl font-semibold text-gray-500">
          Contents
        </div>
        <Tiptap editor={editor} />
      </div>
    </>
  );
};

export default Write;
