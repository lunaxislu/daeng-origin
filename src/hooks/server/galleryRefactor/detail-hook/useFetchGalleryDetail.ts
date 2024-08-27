import { Post } from '@/types/galleryRefactor/galleryRefactor';
import { QueryClient, useQuery } from '@tanstack/react-query';

type TPostData<T extends Post = Post> = T;

interface PostDetailProps {
  handleDetailApiRouter: (id: string) => Promise<TPostData>;
  id: string;
  queryKey: string[];
  useQueryClient: QueryClient;
}
const useFetchGalleryDetail = (props: PostDetailProps) => {
  const { handleDetailApiRouter, id, queryKey, useQueryClient } = props;
  const { data, isLoading, isError } = useQuery<TPostData>({
    queryKey: [...queryKey, id],
    queryFn: () => handleDetailApiRouter(id),
    initialData: useQueryClient.getQueryData<TPostData>([...queryKey, id]),
  });
  return {
    data,
    isLoading,
    isError,
  };
};

export default useFetchGalleryDetail;
