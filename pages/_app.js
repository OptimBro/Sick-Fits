/* eslint-disable react/jsx-props-no-spreading */
import { ApolloProvider } from '@apollo/client';
import nProgress from 'nprogress';
import Router from 'next/router';

import Page from '../components/Page';
import '../components/styles/nprogress.css';
import { useApollo } from '../lib/apolloClient';

Router.events.on('routeChangeStart', () => nProgress.start());
Router.events.on('routeChangeError', () => nProgress.done());
Router.events.on('routeChangeComplete', () => nProgress.done());

// eslint-disable-next-line react/prop-types
export default function MyApp({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps);
  return (
    <ApolloProvider client={apolloClient}>
      <Page>
        <Component {...pageProps} />
      </Page>
    </ApolloProvider>
  );
}
