import { NextPage } from 'next';
import { useRouter, NextRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useClub } from '../hooks/useClub';

import { Header } from '../components/Header';
// import { ClubName } from '../components/ClubName';
// import { NFTPreview, MediaConfiguration } from '@zoralabs/nft-components';
// import { Networks } from "@zoralabs/nft-hooks";

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
  const clubAddress = router.query.clubAddress as string;

  const [isSsr, setIsSsr] = useState(true);
  useEffect(() => {
    setIsSsr(false);
  }, []);

  const { data, error } = useClub({
    contractAddress: clubAddress,
  });

  return isSsr ? undefined : (
    <>
      {error && (
        <div className="text-[#aa0000]">{error.message}</div>
      )}
      {data && (
        <code><pre>{JSON.stringify(data, null, 2)}</pre></code>
      )}
    </>
  );
};

export default Club;
