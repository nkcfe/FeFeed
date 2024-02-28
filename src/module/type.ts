export interface PostType {
  id: number;
  title: string;
  description: string;
  content: string | null;
  coverImage: string;
  category: string;
  tags: string[];
  createdAt: Date;
}
