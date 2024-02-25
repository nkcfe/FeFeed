'use client';

import LoadingModal from '@/components/modal/LoadingModal';
import { createClient } from '@/libs/supabase/client';
import type { PostType } from '@/module/type';
import Placeholder from '@tiptap/extension-placeholder';
import StarterKit from '@tiptap/starter-kit';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import Focus from '@tiptap/extension-focus';
import { useEditor } from '@tiptap/react';
import WriteHeader from '@/components/write/WriteHeader';
import Image from 'next/image';
import Button from '@/components/share/Button';
import Input from '@/components/Input';
import CategorySelect from '@/components/share/category/CategorySelect';
import TagSelect from '@/components/tag/TagSelect';
import Tiptap from '@/components/share/editor/Editor';
import { Image as TiptapImage } from '@tiptap/extension-image';

interface EditProps {
  params: { id: number };
}

const supabase = createClient();

const Edit = (props: EditProps) => {
  const { id } = props.params;

  const { data, isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: async (): Promise<PostType> => {
      const response = await axios.get(`/api/posts?id=${id}`);
      return response.data;
    },
  });

  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);

  const [image, setImage] = useState<string | null>(data?.coverImage ?? null);
  const [category, setCategory] = useState<string>(data?.category ?? '');
  const [selectedTags, setSelectedTags] = useState<string[]>(data?.tags ?? []);

  const router = useRouter();

  const selectCategory = (category: string) => {
    setCategory(category);
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

  useEffect(() => {
    if (data && editor && editor.isEmpty) {
      editor.commands.setContent(data.content);
    }
  }, [editor, data]);

  if (isLoading) return <LoadingModal />;

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
      const res = await axios.put('/api/posts', {
        ...data,
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
      <WriteHeader handleSubmit={handleSubmit} />
      <div className="relative mx-auto lg:max-w-4xl">
        <Image
          src={image ? image : '/strolling.png'}
          alt="image"
          width={600}
          height={300}
          className="h-[300px] w-full bg-red-100 object-cover shadow-sm"
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
          defaultValue={data?.title}
        />
        <Input
          ref={descriptionRef}
          placeholder="설명을 입력해주세요"
          className="w-full text-center text-base text-gray-500"
          defaultValue={data?.description}
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

export default Edit;
