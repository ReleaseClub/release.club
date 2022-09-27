import { Header } from './Header';
import { Toaster } from 'react-hot-toast';

interface LayoutProps {
  
}

export const Layout = ({children}) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Toaster />
    </>
  );
};
