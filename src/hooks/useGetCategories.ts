import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchCategories = async () => {
  const response = await axios.get('/api/categories');
  return response.data;
};

export const useGetCategories = (initialCategories: string[] | null) =>
  useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    initialData: initialCategories,
  });
