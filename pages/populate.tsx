import { NextPage } from 'next';
import { Header } from '../components/Header';
import {
  useContractWrite,
  useContractRead,
  useContractEvent,
  useWaitForTransaction,
} from 'wagmi';
import { useState, useEffect } from 'react';
import router from 'next/router';
import { withRouter } from 'next/router';
import toast, { Toaster } from 'react-hot-toast';
import ReleaseClub from '../abi/ReleaseClub.json';
import ClubFactory from '../abi/ClubFactory.json';
import { BigNumber, ethers } from 'ethers';

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

const Populate: NextPage = (props: pageProps) => {
  interface addNFT {
    contractAddress: string;
  }
  interface Release {
    tokenContract: string;
    tokenID: BigNumber;
  }
  const [inputNFT, setInputNFT] = useState<addNFT>({
    contractAddress: '',
  });

  const [hash, setHash] = useState<string | undefined>(
    undefined
  );

  const clubAddress = props.router.query.clubAddress;

  const newReleases: Release[] = [];
  newReleases.push({
    tokenContract: inputNFT.contractAddress,
    tokenID: ethers.BigNumber.from('1'),
  });

  const { data, isError, isLoading, write } =
    useContractWrite({
      addressOrName: clubAddress,
      contractInterface: ReleaseClub,
      functionName: 'addRelease',
      args: [newReleases],
      onSuccess(data) {
        setHash(data.hash);
      },
      onError(error) {
        console.log('error', error);
      },
    });

  const { status } = useWaitForTransaction({
    hash: hash,
    onSuccess() {
      // toast config
      toast.success('Your NFT was added to the club', {
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
        query: {},
      });
    }
  }, [status]);

  return (
    <div className='max-w-7xl mx-auto'>
      <Header />
      <div className='flex flex-wrap max-w-sm mx-auto'>
        <h1 className='text-4xl text-main-gray font-tr mt-32 my-8 w-full text-center'>
          Add your favorite NFT
        </h1>
        <div className='w-full mt-8'>
          <label className='my-1 text-main-gray text-base'>
            Add your Editions contract*
          </label>
          <p className='text-main-gray-dark text-sm'>
            Place the contract address of the Zora Editions
            NFT you wish to add to this club.
          </p>
          <input
            type='text'
            className='w-full bg-main-black border-0 border-b-2 border-cta text-main-gray-dark px-0 mt-6'
            placeholder='i.e. 0x63d46079d920e5dd1f0a38190764a...'
            value={inputNFT.contractAddress}
            onChange={(e) => {
              e.preventDefault();
              setInputNFT((current) => {
                return {
                  ...current,
                  contractAddress: e.target.value,
                };
              });
            }}
          />
        </div>

        <button
          className='text-lg text-main-black mt-12 bg-cta font-tr px-2 py-1 hover:bg-main-gray w-full'
          onClick={() => write()}
        >
          Add NFT
        </button>

        <p className='text-main-gray-dark text-sm mt-16'>
          Haven&apos;t minted an NFT using Zora&apos;s
          Editions contracts? Mint your first one at{' '}
          <a
            className='text-cta hover:text-main-gray-light'
            href='http://create.zora.co/create/edition'
          >
            create.zora.co
          </a>
        </p>
      </div>
      <Toaster />
    </div>
  );
};

export default withRouter(Populate);
