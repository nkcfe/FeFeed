import { getPosts } from '@/utils/fetch';
import PostList from './components/PostList';

export default async function Home() {
  const posts = await getPosts({});
  return <PostList initialPosts={posts} />;
}
