import { withCSR } from '@/api/withCsr';
import { fetchGalleryDetail, fetchInfinityGalleries } from '@/components/galleryRefactor/api/handler';
import { GalleryInitialData, InitialInfinitePosts, Post, PostQueryKey } from '@/types/galleryRefactor/galleryRefactor';

import { dehydrate, InfiniteData, QueryClient } from '@tanstack/react-query';

import { GetServerSidePropsContext } from 'next';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

const LazyInfinityComponent = dynamic(() => import('@/components/galleryRefactor/main/GalleryList'));
const LazyDetailComponent = dynamic(() => import('@/components/galleryRefactor/detail/GalleryDetail'));
const BASE_PATH = '/galleryRefactor';

const GalleryRefactorPage = ({ initialData }: { initialData: GalleryInitialData }) => {
  const result = initialData as InitialInfinitePosts;
  const router = useRouter();
  return (
    <div>
      -----------------------------------------------------------------------------
      {result.pages.flat().map((post: Post) => {
        return (
          <Link
            href={{
              href: `/galleryRefactor/${post.id}`,
              query: { postId: post.id },
            }}
            shallow={true}
            prefetch={false}
            className="flex flex-col items-center w-[30.2rem] h-[32.5rem] bg-white rounded-lg shadow-md cursor-pointer overflow-hidden"
            key={post.id}
          >
            <span className="w-[30.2rem] h-[20rem] object-cover mb-6 relative">
              <Image
                layout="fill"
                src={post.thumbnail ?? ''}
                alt={post.title}
                objectFit="cover"
                objectPosition="center"
              />
            </span>
            <h3 className="text-xl font-bold mb-2">{post?.title}</h3>
            <p className="text-gray-500 mb-4">{post?.content}</p>
            <div className="flex space-x-2">
              {post.postcategory.map(category => (
                <span key={category.id} className="bg-gray-200 px-2 py-1 rounded-full text-sm">
                  {category.category}
                </span>
              ))}
            </div>
          </Link>
        );
      })}
      {router.asPath === BASE_PATH ? <LazyInfinityComponent /> : <LazyDetailComponent />}
    </div>
  );
};

export default GalleryRefactorPage;

export const getServerSideProps = withCSR(async (ctx: GetServerSidePropsContext) => {
  const queryKey = ctx.query.postId;
  const queryClient = new QueryClient();
  if (queryKey) {
    try {
      const result = await queryClient.fetchQuery<Post>({
        queryKey: [PostQueryKey.posts, queryKey],
        queryFn: () => fetchGalleryDetail(queryKey as string),
      });
      return {
        props: {
          dehydratedState: dehydrate(queryClient),
          initialData: result,
        },
      };
    } catch (err) {
      return {
        notFound: true,
      };
    }
  } else {
    try {
      const results = await queryClient.fetchInfiniteQuery({
        queryKey: [PostQueryKey.posts],
        initialPageParam: 1,
        queryFn: ({ pageParam }) => fetchInfinityGalleries({ pageParam }),
        staleTime: 60 * 1000,
      });
      return {
        props: {
          dehydratedState: dehydrate(queryClient),
          initialData: results,
        },
      };
    } catch (err) {
      return {
        notFound: true,
      };
    }
  }
});
