import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import useFetchGalleryDetail from '@/hooks/server/galleryRefactor/detail-hook/useFetchGalleryDetail';
import { PostQueryKey } from '@/types/galleryRefactor/galleryRefactor';
import { useQueryClient } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { fetchGalleryDetail } from '../api/handler';
import GallerySkeleton from '../skeleton/GallerySkeleton';
const CSRPaginationComponent = dynamic(() => import('./GalleryPagination'), {
  ssr: false,
  loading: () => <GallerySkeleton />,
});
const GalleryDetail = () => {
  const router = useRouter();
  const id = router.query.postId as string;
  const queryClient = useQueryClient();
  const { data, isError, isLoading } = useFetchGalleryDetail({
    fetchGalleryDetail,
    id,
    queryKey: [PostQueryKey.posts],
    useQueryClient: queryClient,
  });

  return (
    <div className=" flex flex-col items-center justify-center">
      <Carousel className="w-[84.6rem] h-[56rem] mb-8 cursor-pointer">
        <CarouselContent>
          {data?.images?.map((image, index) => (
            <CarouselItem key={image.id}>
              <div className="w-[84.6rem] h-[56rem] flex justify-center items-center rounded-3xl">
                <Image src={image.image} alt={`Slide ${index + 1}`} objectFit="cover" width={846} height={560} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-2 top-1/2 transform -translate-y-1/2 w-[4rem] h-[3.7rem]" />
        <CarouselNext className="absolute right-2 top-1/2 transform -translate-y-1/2 w-[4rem] h-[3.7rem]" />
      </Carousel>
      <div className="mt-4 flex justify-between w-[84.6rem]">
        <h2 className="text-2xl font-bold">{data?.title}</h2>
        <span className="text-gray-500">{data?.updatedAt}</span>
      </div>
      <p className="mt-2 w-[84.6rem]">{data?.content}</p>
      <div className="mt-4 w-[84.6rem] flex space-x-2">
        {data?.postcategory?.map(category => (
          <span key={category.id} className="bg-gray-200 px-2 py-1 rounded-full text-sm">
            {category.category}
          </span>
        ))}
      </div>
      <CSRPaginationComponent useQueryClient={queryClient} id={id} />
    </div>
  );
};

export default GalleryDetail;
