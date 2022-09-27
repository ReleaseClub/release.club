import '../styles/globals.css';
import type { AppProps } from 'next/app';
import '@rainbow-me/rainbowkit/styles.css';
import merge from 'lodash.merge';
import {
  darkTheme,
  getDefaultWallets,
  RainbowKitProvider,
  Theme
} from '@rainbow-me/rainbowkit';
import {
  chain,
  configureChains,
  createClient,
  WagmiConfig
} from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { Layout, LayoutProps } from '../components/Layout';

const { chains, provider } = configureChains(
  [chain.rinkeby],
  [
    // alchemyProvider({ alchemyId: process.env.NEXT_PUBLIC_ALCHMEY_ID }),
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'Release Club',
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
});

const rkTheme: Theme = merge(darkTheme({
  borderRadius: "none",
  accentColor: "#FFB5A7",
  accentColorForeground: "black",
}), {
  colors: {
    connectButtonBackground: "#FFB5A7",
    connectButtonText: "black",
  }
});

function MyApp({ Component, pageProps }: AppProps) {
  const layoutProps: LayoutProps = Component.getLayoutProps?.() || {};
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        chains={chains}
        theme={rkTheme}
      >
        <Layout {...layoutProps}>
          <Component {...pageProps} />
        </Layout>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
