import prisma from '@/libs/prismadb';
import { getPost } from '@/utils/fetch';
import { notFound } from 'next/navigation';
import PostPage from '../../../components/post/Postpage';
import { Metadata } from 'next';

interface PostProps {
  params: { id: string };
}

export const generateMetadata = async ({
  params,
}: PostProps): Promise<Metadata> => {
  const post = await getPost(params.id);

  if (!post) return notFound();

  return {
    title: post.title,
    description: post.description,
    openGraph: post?.coverImage
      ? {
          images: [
            {
              url: post.coverImage,
            },
          ],
        }
      : undefined,
  };
};

export const generateStaticParams = async () => {
  const response = await prisma.post.findMany({
    select: {
      id: true,
    },
  });
  return response.map(({ id }) => ({ params: { id: id.toString() } }));
};

export default async function Post({ params }: PostProps) {
  const post = await getPost(params.id);
  if (!post) return notFound();
  return <PostPage {...post} />;
}
