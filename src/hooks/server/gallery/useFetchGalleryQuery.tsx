import { fetchInfinityGalleries } from '@/components/galleryRefactor/api/handler';
import { useInfiniteQuery } from '@tanstack/react-query';

const useFetchGalleryQuery = () => {
  /**
   * 무한스클롤 용 react-query
   */
  const { data, isLoading, isError, error, hasNextPage, fetchNextPage, isFetchingNextPage, refetch } = useInfiniteQuery(
    {
      queryKey: ['galleryUpload'],
      queryFn: ({ pageParam }) => fetchInfinityGalleries({ pageParam }),
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPage) => {
        if (lastPage) {
          if (lastPage?.length === 0) {
            return;
          } else {
            return allPage.length + 1;
          }
        }
      },
      select: data => {
        return data.pages.map(pageData => pageData).flat();
      },
    },
  );

  return { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage, refetch };
};

export default useFetchGalleryQuery;
