import Skeleton from '@/components/ui/skeleton';
import usePaginationQueries from '@/hooks/server/galleryRefactor/pagination-hook/usePaginationQueries';
import { PostQueryKey } from '@/types/galleryRefactor/galleryRefactor';
import { QueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { handleDetailApiRouter } from '../api/handler';

interface PostDetailPaginationProps {
  useQueryClient: QueryClient;
}
const GalleryPagination = (props: PostDetailPaginationProps) => {
  const { useQueryClient } = props;
  const router = useRouter();
  const id = router.query.postId as string;
  const { results } = usePaginationQueries({
    handleDetailApiRouter,
    id,
    queryKey: [PostQueryKey.posts],
    useQueryClient,
  });
  return (
    <div className="flex justify-center gap-[20px] p-11">
      {results.map((query, i) => {
        return (
          <div key={`${query.data?.createdAt}${id}${i}`} className="w-[240px] h-[240px]">
            {query.isLoading ? (
              <Skeleton className="w-[240px] h-[240px]" type="picture" />
            ) : query.data ? (
              <Link
                href={{
                  href: `/galleryRefactor/${query.data.id}`,
                  query: { postId: query.data.id },
                }}
                shallow={true}
                prefetch={false}
                className="flex flex-col items-center bg-white rounded-lg shadow-md cursor-pointer overflow-hidden"
                key={query.data.id}
              >
                <span className=" w-[100%] h-[10rem] object-cover mb-6 relative">
                  <Image
                    layout="fill"
                    src={query.data.thumbnail ?? ''}
                    alt={query.data.title}
                    objectFit="cover"
                    objectPosition="center"
                  />
                </span>
                <h3 className="text-xl font-bold mb-2">{query.data?.title}</h3>
                <h3 className="text-xl font-bold mb-2">{query.data?.id}</h3>
                <p className="text-gray-500 mb-4">{query.data?.content}</p>
                <div className="flex space-x-2">
                  {query.data.postcategory?.map(category => (
                    <span key={category.id} className="bg-gray-200 px-2 py-1 rounded-full text-sm">
                      {category.category}
                    </span>
                  ))}
                </div>
              </Link>
            ) : null}
          </div>
        );
      })}
    </div>
  );
};

export default GalleryPagination;
