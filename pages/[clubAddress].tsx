import { NextPage } from 'next';
import { Header } from '../components/Header';
import { ClubName } from '../components/ClubName';
import { useRouter, NextRouter } from 'next/router';
import { useState, useEffect } from 'react';
import ReleaseClub from '../abi/ReleaseClub.json';
import { 
  useContractInfiniteReads,
  useWaitForTransaction,
  paginatedIndexesConfig,
} from 'wagmi'
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

  const [releases, setReleases] = useState([]);

  const { data, fetchNextPage, hasNextPage } = useContractInfiniteReads({
    cacheKey: `clubNFTs-${clubAddress}`,
    ...paginatedIndexesConfig(
      (index) => ({
        addressOrName: clubAddress,
        contractInterface: ReleaseClub,
        functionName: 'releases',
        args: [index],
      }),
      { start: 0, perPage: 9, direction: 'increment' },
    ),
    onSuccess(data) {
      // console.log(data);
      const nfts = data.pages.flat(1);
      setReleases((prevReleases) => [
        ...nfts.filter(x => x)
      ]);
    },
    onError(error) {
      console.log('error', error);
    },
  })

  return (
    <div className='max-w-7xl mx-auto'>
      <Header />
      <h1 className='my-8 ml-3 text-4xl text-main-gray font-aufgang'>
        <ClubName />
      </h1>
      <div className='flex flex-wrap justify-between'>
        <MediaConfiguration networkId={Networks.RINKEBY}>{/* XXX TODO */}
          {releases.map((release, idx) => (
            <NFTPreview key={idx} contract={release[0]} id='1'/>
          ))}
        </MediaConfiguration>
      </div>
      <button className={hasNextPage ? 'bg-main-gray text-main-black p-5' : 'hidden'} onClick={() => fetchNextPage()}>
        Load More
      </button>
    </div>
  );
};

export default Club;
