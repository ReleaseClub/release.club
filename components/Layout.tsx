import { Header } from './Header';
import { Toaster } from 'react-hot-toast';

export const Layout = ({children}) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Toaster />
    </>
  );
};
