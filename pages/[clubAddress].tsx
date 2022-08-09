import { NextPage } from 'next';
import { Header } from '../components/Header';
import { ClubName } from '../components/ClubName';
import { NFTPreview } from '@zoralabs/nft-components';
import { useRouter, NextRouter } from 'next/router';

import ReleaseClub from '../abi/ReleaseClub.json';
import { useContractRead } from 'wagmi'

const Club: NextPage = () => {
  const router: NextRouter = useRouter();
  const { clubAddress } = router.query;

  // const { data, isError, isLoading } = useContractRead({
  //     addressOrName: '0xecb504d39723b0be0e3a9aa33d646642d1051ee1',
  //     contractInterface: ReleaseClub,
  //     functionName: 'viewReleases',
  //   })
  // }

  return (
    <div className='max-w-7xl mx-auto'>
      <Header />
      <h1 className='my-8 ml-3 text-4xl text-main-gray font-aufgang'>
        <ClubName />
      </h1>
      <div className='flex flex-wrap justify-between'>
        <NFTPreview
          className='my-4'
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

export default Club;
