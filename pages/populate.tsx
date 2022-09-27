import { NextPage } from 'next';
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import { useState, useEffect} from 'react';
import router, { withRouter } from 'next/router';
import toast from 'react-hot-toast';
import ReleaseClub from '../abi/ReleaseClub.json';
import ClubFactory from '../abi/ClubFactory.json';
import { BigNumber, ethers } from 'ethers';

import { Button } from '../components/Button';
import { Field } from '../components/Field';
import { Heading } from '../components/Heading';
import { MultiAddressInput } from '../components/MultiAddressInput';

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

interface Tag {
  id: number,
  text: string
}

interface Release {
  tokenContract: string;
  tokenID: BigNumber;
}

const Populate: NextPage = (props: pageProps) => {
  
  const clubAddress = props.router.query.clubAddress;

  const [contractAddrs, setContractAddrs] = useState<Tag[]>([]);

  const newReleases: Release[] = contractAddrs.map(({text}) => ({
    tokenContract: text,
    tokenID: ethers.BigNumber.from('1')
  }));

  const { config } = usePrepareContractWrite({
    addressOrName: clubAddress,
    contractInterface: ReleaseClub,
    functionName: 'addRelease',
    args: [newReleases]
  });

  const { data, write, error } = useContractWrite(config);
 
  const { status } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess() {
      // toast config
      toast.success('Your NFTs have been added.', {
        icon: null,
        duration: 4000,
        position: 'top-left',
        style: {
          border: '1px solid #FFB5A7',
          padding: '8px 12px',
          color: '#8F8E94',
          backgroundColor: '#171718',
        },
        ariaProps: {
          role: 'status',
          'aria-live': 'polite',
        },
      });
    },
  });

  useEffect(() => {
    if (status === 'success') {
      router.push({
        pathname: clubAddress,
      });
    }
  }, [status, clubAddress]);

  return (
    <div className="p-[1rem]">
      <div className="border border-n4 mx-auto max-w-[31rem] p-[3rem]">
        <Heading as="h1" className="mr-[-.5rem]">Add your NFTs</Heading>
        <div className="h-[4.75rem]"></div>
        <Field label="Add your Editions contracts">
          <p className='text-n3 text-sm'>
            You can add multiple Zora Editions contract addresses below
          </p>
          <div className="h-[1.5rem]"></div>
          <MultiAddressInput
            tags={contractAddrs}
            suggestions={[]}
            handleAdd={(tag) => {
              setContractAddrs((current) => {
                return [...current, tag];
              });
            }}
            handleRemove={(i) => {
              setContractAddrs((current) => {
                const updated = [...current];
                updated.splice(i, 1);
                return updated;
              });
            }}
          />
        </Field>

        <div className="h-[2rem]"></div>
        <p className='text-n3 text-sm'>
          <span>
            Haven&apos;t minted an NFT using Zora Editions? Mint your first one at{' '}
          </span>
          <a
            className='text-b1 hover:text-n0'
            href='https://create.zora.co/create/edition'
          >
            create.zora.co
          </a>
        </p>

        <div className="h-[2.5rem]"></div>
        <Button className="btn-primary" disabled={!write} onClick={() => write?.()}>
          Update
        </Button>
        {error && <div className="text-[#ff0000]">Error: {error.message}</div>}
      </div>
    </div>
  );
};

export default withRouter(Populate);
