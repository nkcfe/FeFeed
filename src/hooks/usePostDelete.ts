import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const fetchDelete = async (id: number) => {
  try {
    const response = await axios.delete(`/api/posts?id=${id}`);
    return response.data;
  } catch (error) {
    console.error('Failed to delete post: ', error);
  }
};

export const usePostDelete = (id: number) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => fetchDelete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      toast.success('게시물이 삭제되었습니다.');
    },
    onError: () => {
      toast.error('게시물 삭제에 실패했습니다.');
    },
  });
  return {
    deletePost: mutation.mutate,
    isDeleteLoading: mutation.isPaused,
    isDeleteSuccess: mutation.isSuccess,
  };
};
