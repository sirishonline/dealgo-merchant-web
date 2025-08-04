import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import { AuthProvider } from '../context/AuthContext';
import apolloClient from '../lib/apollo-client';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ApolloProvider>
  );
}