import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";

const App = ({ Component, pageProps }: AppProps) => {
  const AnyComponent = Component as any;

  return (
    <SessionProvider session={pageProps.session}>
      <AnyComponent {...pageProps} />
    </SessionProvider>
  );
};

export default App;
