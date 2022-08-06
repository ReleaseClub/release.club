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
      <main className='max-w-7xl mx-auto'>
        <div>
          <h1 className='text-9xl text-main-grey capitalize font-aufgang text-right'>
            Release<br></br>Club
          </h1>
          <p className='uppercase text-main-grey mr-48 text-right'>
            Collective Curation
          </p>
        </div>

        <div className='flex text-main-grey uppercase mt-32'>
          <h5>Your music. Your platform</h5>
          {/* <h5>Your platform</h5> */}
        </div>
        <button className='bg-cta'>Create your club</button>
        {/* <div>
          <h3>BYOC</h3>
          <p className='capitalize'>
            Create your own contract
          </p>
        </div> */}
        <div className='flex justify-even text-main-grey mt-16'>
          <p>
            In web3, artists face a difficult choice: give
            up control on an existing music platform or
            create their own contracts and go at it alone
          </p>
          <p>
            With <strong>Release Club</strong>, you gain the
            benefits of a curated music NFT platform that
            you control.
            <strong>
              with the NFT contracts that you create.
            </strong>
          </p>
          <p>
            By creating a club, a group of artists can{' '}
            <strong>define their own platform</strong>,
            craft a unique identity, and reach their
            audience, together
          </p>
        </div>
        <div className='flex justify-even text-main-grey mt-16'>
          <h2>what's the deal?</h2>
          <div>
            <h4>first, you can</h4>
            <p>
              Create your own NFT contracts with Zora's
              Creator toolkit.
            </p>
          </div>
          <div>
            {/* supposed to be an em dash below instead of an ellipsis */}
            <h4>then after...</h4>
            <p>
              Create your own NFT contracts with Zora's
              Creator toolkit.
            </p>
          </div>
          <div>
            <h4>important!</h4>
            <p>Connect your NFT contracts to your club.</p>
          </div>
          <div>
            {/* supposed to be an ampersane below instead of 'and' */}
            <h4>and don't forget to</h4>
            <p>Enjoy your new music NFT platform.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
