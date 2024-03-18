import { getCategories, getPosts, getTags } from '@/utils/fetch';
import PostList from '../../components/main/PostList';

export default async function Home() {
  const posts = await getPosts({});
  const categories = await getCategories();
  const tags = await getTags();

  return (
    <PostList
      initialPosts={posts}
      initialCategories={categories}
      initialTags={tags}
    />
  );
}
