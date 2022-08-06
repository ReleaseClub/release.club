import type { NextPage } from 'next';
import Head from 'next/head';
import { Header } from '../components/Header';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Release Club</title>
        <meta
          name='Release Club'
          content='Your music. Your platform.'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Header />
      <main className='max-w-8xl mx-auto'>
        <></>
      </main>
    </div>
  );
};

export default Home;
