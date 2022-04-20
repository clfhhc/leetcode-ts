import 'modern-normalize/modern-normalize.css';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { StateProvider } from 'lib/state/initStateEngineContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StateProvider>
      <Component {...pageProps} />
    </StateProvider>
  );
}

export default MyApp;
