import { axiosValid_API } from '@/api/common/axios_instance';
import { T_gallerySchema } from '@/components/gallery/gallery-form/GalleryRegist';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';

const useAddGalleryMutation = () => {
  const { push } = useRouter();
  const client = useQueryClient();
  const didMountRef = useRef(false);

  const addGallery = async (values: T_gallerySchema) => {
    try {
      const formData = new FormData();
      formData.append('thumbnail', values.images[0] as Blob);
      formData.append('title', values.title);
      formData.append('content', values.description);
      values.tags.forEach((tag, index) => {
        formData.append(`tags[${index}]`, tag);
      });
      values.images.forEach((image, index) => formData.append(`images[${index}]`, image as Blob));
      const response = await axiosValid_API.post(`post`, formData);

      push('/gallery');
      console.log(response.data);
    } catch (error) {
      console.error('갤러리 등록 실패여:', error);
    }
  };

  const { isPending, mutate, isError, Error } = useMutation({
    mutationFn: addGallery,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['galleryUpload'] });
    },
  });

  useEffect(() => {
    if (didMountRef.current) {
      console.log(isPending);
    }
    didMountRef.current = true;
  }, [isPending, isError, Error]);

  return { isPending, mutate };
};

export default useAddGalleryMutation;
