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
import { NFTPreview, MediaConfiguration } from '@zoralabs/nft-components';
import { Networks } from "@zoralabs/nft-hooks";

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
  const { clubAddress } = router.query;

  const [renderedNFT, setRenderedNFT] = useState();

  const { data, isError } = useContractRead({
    addressOrName: clubAddress,
    contractInterface: ReleaseClub,
    functionName: 'releases',
    args: [0],
    onSuccess(data) {
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
        <MediaConfiguration networkId={Networks.RINKEBY}>{/* XXX TODO */}
          <NFTPreview
            contract={renderedNFT}
            id='1'
          />
        </MediaConfiguration>
      </div>
    </div>
  );
};

export default Club;
