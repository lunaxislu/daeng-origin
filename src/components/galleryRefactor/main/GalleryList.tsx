import GalleryListSkeleton from '@/components/gallery/skeleton/GalleryListSkeleton';
import useFetchInfinityGalleries from '@/hooks/server/galleryRefactor/main-hook/useFetchInfinityGalleries';
import { PostQueryKey } from '@/types/galleryRefactor/galleryRefactor';
import { Fragment } from 'react';
import { useInView } from 'react-intersection-observer';
import { fetchInfinityGalleries } from '../api/handler';
import GalleryListItem from './GalleryListItem';

const GalleryList = () => {
  const {
    data: posts,
    isLoading,
    isError,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    refetch,
  } = useFetchInfinityGalleries({
    fetchInfinityGalleries,
    queryKey: [PostQueryKey.posts],
  });
  const { ref, inView } = useInView({
    threshold: 0.1,
    onChange: (inView, entry) => {
      if (!inView || !hasNextPage || isFetchingNextPage) return;
      if (inView) fetchNextPage();
    },
  });
  if (isLoading) return <GalleryListSkeleton />;
  return (
    <Fragment>
      <div></div>
      {/* 인피니티 스크롤을 위한 div */}
      <GalleryListItem posts={posts} />
      <div ref={ref} className="h-[50px]"></div>
    </Fragment>
  );
};

export default GalleryList;
