import { toast } from 'react-toastify';
import { createClient } from '@/libs/supabase/client';

const supabase = createClient();

export const uploadFileHandler = async () => {
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

    if (error) {
      toast.dismiss(toastId);
      toast.error('파일 업로드에 실패했습니다.');
    }
    if (data) {
      const imageData = supabase.storage.from('images').getPublicUrl(fileName);
      toast.dismiss(toastId);
      toast.success('파일 업로드에 성공했습니다.');
      return imageData.data.publicUrl;
    }
  };

  input.addEventListener('change', changeHandler);
};
