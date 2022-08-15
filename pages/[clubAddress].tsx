import { NextPage } from 'next';
import { Header } from '../components/Header';
import { ClubName } from '../components/ClubName';
import { useRouter, NextRouter } from 'next/router';
import { useState, useEffect } from 'react';
import ReleaseClub from '../abi/ReleaseClub.json';
import {
  useContractRead,
  useWaitForTransaction,
} from 'wagmi';
import { NFTPreview } from '@zoralabs/nft-components';

interface Query {
  clubAddress: string;
}
interface Router {
  pathname: string;
  query: Query;
}
interface pageProps {
  router: Router;
}

const Club: NextPage = (props: pageProps) => {
  const router: NextRouter = useRouter();
  console.log('router:', router.asPath);

  // this is some pure hackathon code right here
  const clubAddressFromRouter = router.asPath
    .substring(1)
    .toString();
  console.log('from router', clubAddressFromRouter);
  console.log(typeof clubAddressFromRouter);

  const [renderedNFT, setRenderedNFT] = useState();

  const { data, isError } = useContractRead({
    addressOrName: clubAddressFromRouter,
    contractInterface: ReleaseClub,
    functionName: 'releases',
    args: [0],
    onSettled() {
      setRenderedNFT(data[0]);
    },
    onError(error) {
      console.log('error', error);
    },
  });

  return (
    <div className='max-w-7xl mx-auto'>
      <Header />
      <h1 className='my-8 ml-3 text-4xl text-main-gray font-aufgang'>
        <ClubName />
      </h1>
      <div className='flex flex-wrap justify-between'>
        <NFTPreview
          contract={renderedNFT}
          // contract='0xd945f759d422ae30a6166838317b937de08380e3'
          id='1'
        />
      </div>
    </div>
  );
};

export default Club;
