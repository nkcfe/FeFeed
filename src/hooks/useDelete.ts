import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

const fetchDelete = async (id: number) => {
  try {
    const response = await axios.delete(`/api/posts?id=${id}`);
    return response.data;
  } catch (error) {
    console.error('Failed to delete post: ', error);
  }
};

export const useDelete = (id: number) => {
  const queryClient = useQueryClient();
  const mutation = useMutation(fetchDelete, {
    onSuccess: () => {
      queryClient.invalidateQueries('posts');
      toast.success('게시물이 삭제되었습니다.');
    },
    onError: () => {
      toast.error('게시물 삭제에 실패했습니다.');
    },
  });
  return {
    deletePost: mutation.mutate,
    isDeleteLoading: mutation.isLoading,
    isDeleteSuccess: mutation.isSuccess,
  };
};
