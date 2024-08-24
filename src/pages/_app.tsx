import CommonLayout from '@/components/common/layout/CommonLayout';
import Toast from '@/components/common/toast/Toast';
import Modal from '@/components/modal/Modal';
import { cn } from '@/lib/utils';
import '@/styles/globals.css';
import { HydrationBoundary, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import localFont from 'next/font/local';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const queryClient = new QueryClient();
const myFont = localFont({ src: '../../public/font/PretendardVariable.woff2', variable: '--main-font' });

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const router = useRouter();
  useEffect(() => {
    const page = router.asPath;
    const [navigation] = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
    if (navigation) {
      const ttfb = navigation.responseStart - navigation.requestStart;
      const responseTime = navigation.responseEnd - navigation.responseStart;
      const pageLoadTime = navigation.loadEventEnd - navigation.startTime;
      const domContentLoaded = navigation.domContentLoadedEventEnd - navigation.startTime;

      console.log('TTFB:', ttfb, 'ms', '<- 브라우저가 서버로 요청을 보낸 후 첫 번째 바이트를 받을 때까지의 시간.');
      console.log('Response Time:', responseTime, 'ms', '<- 서버에서 응답이 완료되기까지 걸린 시간.');
      console.log('Page Load Time:', pageLoadTime, 'ms', '<- 전체 페이지가 로드되는 데 걸린 시간.');
      console.log(
        'DOM Content Loaded:',
        domContentLoaded,
        'ms',
        '<- HTML 문서가 완전히 파싱되어 DOMContentLoaded 이벤트가 발생할 때까지의 시간.',
      );
    }
    const handleRouteChangeStart = (page: string) => {
      console.time(`${page} Page Transition Time`);
    };

    const handleRouteChangeComplete = (page: string) => {
      console.timeEnd(`${page} Page Transition Time`);
    };

    router.events.on('routeChangeStart', () => handleRouteChangeStart(page));
    router.events.on('routeChangeComplete', () => handleRouteChangeComplete(page));

    // 클린업 함수
    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, [router]);
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <HydrationBoundary state={pageProps.dehydratedState}>
          <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          </Head>
          <div style={{ fontSize: '24px' }}>
            <ReactQueryDevtools initialIsOpen={false} />
          </div>
          <main className={cn(myFont.variable)}>
            <CommonLayout>
              <Component {...pageProps} />
            </CommonLayout>
          </main>
          <Modal />
          <Toast />
        </HydrationBoundary>
      </QueryClientProvider>
    </SessionProvider>
  );
}
