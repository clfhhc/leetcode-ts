import 'modern-normalize/modern-normalize.css';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { EngineProvider } from 'lib/state/initStateEngineContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <EngineProvider>
      <Component {...pageProps} />
    </EngineProvider>
  );
}

export default MyApp;
