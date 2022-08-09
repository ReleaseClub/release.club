import { NextPage } from 'next';
import { Header } from '../components/Header';
import { ClubName } from '../components/ClubName';
import { useRouter, NextRouter } from 'next/router';
import { useState } from 'react';
import ReleaseClub from '../abi/ReleaseClub.json';
import { useContractRead } from 'wagmi';
import {
  NFTPreview,
} from '@zoralabs/nft-components';
import { useNFT } from '@zoralabs/nft-hooks'

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

  const { data, isError, isLoading } = useContractRead({
    addressOrName: clubAddressFromRouter,
    contractInterface: ReleaseClub,
    functionName: 'releases',
    args: [0],
    onSuccess() {
      setRenderedNFT(data[0]);
      console.log('returned NFT', data[0]);
      // console.log(data)
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
            className='my-4'
            contract='0x63d46079d920e5dd1f0a38190764aa1845dc4bc6'
            id='1'
          
          />
        {renderedNFT}
      </div>
    </div>
  );
};

export default Club;
