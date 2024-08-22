import { Post } from '@/types/galleryRefactor/galleryRefactor';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';

interface IProps {
  queryKey: string[];
  fetchInfinityGalleries: ({ pageParam }: { pageParam: number }) => Promise<any>;
}
interface IQueryData {
  pageParams: number[];
  pages: Post[][];
}
const useFetchInfinityGalleries = (props: IProps) => {
  const client = useQueryClient();
  const { data, isLoading, isError, error, hasNextPage, fetchNextPage, isFetchingNextPage, refetch } = useInfiniteQuery(
    {
      queryKey: props.queryKey,
      queryFn: ({ pageParam }) => props.fetchInfinityGalleries({ pageParam }),
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length > 0 ? allPages.length + 1 : undefined;
      },
      select: (data: IQueryData) => {
        const res = data.pages.map(pageData => pageData).flat();

        res.forEach(data => {
          const queryKey = [...props.queryKey, `${data.id}`];
          client.setQueryData(queryKey, data);
        });

        return res;
      },
    },
  );
  return {
    data,
    isLoading,
    isError,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    refetch,
  };
};

export default useFetchInfinityGalleries;
