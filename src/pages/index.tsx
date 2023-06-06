import Head from 'next/head';
import dynamic from 'next/dynamic';
import { GetServerSideProps, NextPage } from 'next';
import { dehydrate, QueryClient } from '@tanstack/react-query';

import { getMe } from '@/hooks/api/useAuth';
import { QUERYKEY_CONFERENCES, QUERYKEY_USER } from 'constants/queryKeys';
import { getConferences } from '@/hooks/api/useConference';
import { withAuth } from '@/utils/getServerSide';

import ApiErrorBoundary from './APIErrorBoundary';

const ConferenceListTemplate = dynamic(
  () =>
    import(
      '@/components/templates/ConferenceListTemplate/ConferenceListTemplate'
    ),
);

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Conference</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ApiErrorBoundary>
        <ConferenceListTemplate />
      </ApiErrorBoundary>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = withAuth(async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery([QUERYKEY_USER], getMe, {
    staleTime: 900,
  });

  await queryClient.prefetchQuery([QUERYKEY_CONFERENCES], getConferences, {
    staleTime: 900,
  });

  return {
    props: { dehydratedState: dehydrate(queryClient) },
  };
});

export default Home;
