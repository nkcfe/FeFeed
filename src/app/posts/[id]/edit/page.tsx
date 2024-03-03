import WritePage from '@/app/write/components/WritePage';
import { getPost } from '@/utils/fetch';
import { notFound } from 'next/navigation';

import prisma from '@/libs/prismadb';

interface PostProps {
  params: { id: string };
}

export const generateStaticParams = async () => {
  const response = await prisma.post.findMany({
    select: {
      id: true,
    },
  });
  return response.map(({ id }) => ({ params: { id: id.toString() } }));
};

export default async function EditPage({ params }: PostProps) {
  const post = await getPost(params.id);
  if (!post) return notFound();
  return <WritePage {...post} isEdit="true" />;
}
