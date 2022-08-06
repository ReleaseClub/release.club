import { NextPage } from 'next';
import { Header } from '../components/Header';
import { NFTPreview } from '@zoralabs/nft-components';
import { useRouter, NextRouter } from 'next/router'

const Create: NextPage = () => {
  const router: NextRouter = useRouter();
  const { clubAddress } = router.query;
  // XXX TODO use clubAddress to fetch releases and display below.
  return (
    <div className='max-w-7xl mx-auto'>
      <Header />
      <h1 className='my-8 ml-3 text-4xl text-main-gray font-aufgang'>Metabolism</h1>
      <div className='flex flex-wrap justify-between'>
        <NFTPreview className='my-4'
          contract='0x345DDE9BAa7d251ae3B321470E4004532b4294f4'
          id='1'
        />

        <NFTPreview
          contract='0x345DDE9BAa7d251ae3B321470E4004532b4294f4'
          id='2'
        />

        <NFTPreview
          contract='0x345DDE9BAa7d251ae3B321470E4004532b4294f4'
          id='3'
        />
        <NFTPreview
          contract='0x345DDE9BAa7d251ae3B321470E4004532b4294f4'
          id='4'
        />

        <NFTPreview
          contract='0x345DDE9BAa7d251ae3B321470E4004532b4294f4'
          id='5'
        />

        <NFTPreview
          contract='0x345DDE9BAa7d251ae3B321470E4004532b4294f4'
          id='6'
        />
      </div>
    </div>
  );
};

export default Create;
