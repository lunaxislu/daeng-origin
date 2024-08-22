import { I_GalleryData } from '@/components/gallery/type/gallery';
import { fetchGalleryDetail } from '@/components/galleryRefactor/api/handler';
import { useQuery } from '@tanstack/react-query';

const useFetchGalleryDetailQuery = (id: string) => {
  const { data, isLoading, refetch, isError, error } = useQuery<I_GalleryData>({
    queryKey: ['galleryDetail', id],
    queryFn: () => fetchGalleryDetail(id),
    enabled: !!id,
  });

  return { data, isLoading, refetch };
};
export default useFetchGalleryDetailQuery;
