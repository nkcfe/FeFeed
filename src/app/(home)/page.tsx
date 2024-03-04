import { getCategories, getPosts } from '@/utils/fetch';
import PostList from './components/PostList';

export default async function Home() {
  const posts = await getPosts({});
  const categories = await getCategories();
  return <PostList initialPosts={posts} initialCategories={categories} />;
}
