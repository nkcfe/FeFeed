'use client';
import React, { useRef, useState } from 'react';

import Input from '@/components/share/Input';
import { Button } from '@/components/ui/button';
import Tiptap from '@/components/share/editor/Editor';
import CategorySelect from '@/components/share/category/CategorySelect';
import TagSelect from '@/components/tag/TagSelect';
import WriteHeader from './Header';

import Image from 'next/image';

import { useEditor } from '@tiptap/react';

import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Focus from '@tiptap/extension-focus';
import { Image as TiptapImage } from '@tiptap/extension-image';
import ImageResize from 'tiptap-extension-resize-image';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';

import { createClient } from '@/libs/supabase/client';

import { toast } from 'react-toastify';
import axios from 'axios';

import { useRouter } from 'next/navigation';

import { lowlight } from '@/utils/lowlight';
import Footer from './Footer';

const supabase = createClient();

interface PostType {
  id?: number;
  title?: string;
  description?: string;
  content?: string | null;
  coverImage?: string;
  category?: string;
  tags?: string[];
  createdAt?: Date;
}

const WritePage = (props: PostType) => {
  const {
    id,
    title,
    coverImage,
    description,
    content,
    category: cat,
    tags,
  } = props;
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);

  const [image, setImage] = useState<string>(
    coverImage ||
      'https://saryetgujpylhqlvyyek.supabase.co/storage/v1/object/public/images/europeana-41Wjp_3noHo-unsplash.jpg',
  );
  const [category, setCategory] = useState<string>(cat || '');
  const [selectedTags, setSelectedTags] = useState<string[]>(tags || []);

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
      const { error } = await supabase.storage
        .from('images')
        .upload(fileName, file);

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
    content: content || '',
    extensions: [
      StarterKit,
      TiptapImage,
      ImageResize,
      CodeBlockLowlight.configure({
        lowlight,
      }),
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

    if (!title) {
      toast.error('제목을 입력해주세요.');
      return;
    }

    if (!description) {
      toast.error('설명을 입력해주세요.');
      return;
    }

    if (!category) {
      toast.error('카테고리를 선택해주세요.');
      return;
    }

    if (selectedTags.length === 0) {
      toast.error('태그를 입력해주세요.');
      return;
    }

    if (isContentEmpty) {
      toast.error('내용을 입력해주세요.');
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

  const handleUpdate = async () => {
    const title = titleRef.current?.value;
    const description = descriptionRef.current?.value;
    const content = editor?.getHTML();
    const isContentEmpty = editor?.isEmpty;

    if (!title) {
      toast.error('제목을 입력해주세요.');
      return;
    }

    if (!description) {
      toast.error('설명을 입력해주세요.');
      return;
    }

    if (!category) {
      toast.error('카테고리를 선택해주세요.');
      return;
    }

    if (selectedTags.length === 0) {
      toast.error('태그를 입력해주세요.');
      return;
    }

    if (isContentEmpty) {
      toast.error('내용을 입력해주세요.');
      return;
    }

    try {
      const res = await axios.put('/api/posts', {
        id,
        image,
        title,
        description,
        content,
        category,
        selectedTags,
      });

      if (res.status === 200) {
        toast.success('게시물 수정에 성공했습니다.');
        router.replace(`/posts/${res?.data?.id}`);
      } else {
        toast.error('게시물 수정에 실패했습니다.');
      }
    } catch (e) {
      toast.error('게시물 수정에 실패했습니다.');
    }
  };

  return (
    <>
      <WriteHeader editor={editor} />
      <div className="flex min-h-[calc(100vh-3.5rem)] w-full flex-col items-center justify-start bg-white dark:bg-neutral-800">
        <div className="relative mt-14 flex w-full max-w-4xl items-center justify-center">
          <Image
            src={image}
            alt="image"
            width={400}
            height={300}
            className="m-0 h-[300px] w-full rounded-xl object-cover shadow-sm"
          />
          <Button
            variant="secondary"
            custom="absolute bottom-4 right-4 z-10 p-1 px-2"
            onClick={(e) => uploadFileHandler(e)}
          >
            이미지 변경
          </Button>
        </div>
        <div className="mt-10 flex w-full max-w-sm flex-col items-start justify-start gap-4 bg-transparent sm:max-w-lg md:max-w-2xl lg:max-w-4xl">
          <Input
            ref={titleRef}
            placeholder="제목을 입력해주세요"
            className="h-14 w-full bg-transparent text-4xl font-semibold dark:text-white"
            defaultValue={title}
          />
          <Input
            ref={descriptionRef}
            placeholder="설명을 입력해주세요"
            className="w-full bg-transparent text-base text-gray-500 dark:text-white"
            defaultValue={description}
          />
          <CategorySelect selectCategory={selectCategory} category={category} />
          <TagSelect
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
          />

          <Tiptap editor={editor} />
        </div>
        <Footer handleUpdate={handleUpdate} handleSubmit={handleSubmit} />
      </div>
    </>
  );
};

export default WritePage;
