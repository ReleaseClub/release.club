import { NextPage } from 'next';
import Link from 'next/link';
import { Header } from '../components/Header';
import { ClubAddress } from '../components/ClubAddress';
import { useContractWrite, useContractEvent } from 'wagmi';
import { useState } from 'react';

import ReleaseClub from '../abi/ReleaseClub.json';
import ClubFactory from '../abi/ClubFactory.json';

const Populate: NextPage = () => {
  interface addNFT {
    contractAddress: string;
  }

  const [inputNFT, setInputNFT] = useState<addNFT>({
    contractAddress:
      'i.e. 0x63d46079d920e5dd1f0a38190764a...',
  });

  const { data, isError, isLoading, write } =
    useContractWrite({
      // address below should be that of the newly created club contract
      addressOrName:
        '0x68482945ab747e97d2EbDD9EfB9bB9e7C3B87F0D',
      contractInterface: ReleaseClub,
      functionName: 'addRelease',
      args: [
        {
          tokenContract: inputNFT.contractAddress,
          tokenID: 1,
        },
      ],
      overrides: {
        gasLimit: 1000000,
      },
    });

  return (
    <div className='max-w-7xl mx-auto'>
      <Header />
      <div className='flex flex-wrap max-w-sm mx-auto'>
        <h1 className='text-4xl text-main-gray font-tr mt-32 my-8 w-full text-center'>
          Add NFTs to{' '}
          <div className='max-w-sm mx-auto'></div>
        </h1>
        <div className='w-full mt-16'>
          <label className='my-1 text-main-gray text-base'>
            Add your Editions contract
          </label>
          <p className='text-main-gray-dark text-sm'>
            Place the contract address of the Zora Editions
            NFT you wish to add to this club.
          </p>
          <input
            type='text'
            className='w-full bg-main-black border-0 border-b-2 border-cta text-main-gray-dark px-0 mt-6'
            // placeholder='i.e. 0x63d46079d920e5dd1f0a38190764a...'
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
        <p className='text-main-gray-dark text-sm mt-12'>
          Haven&apos;t minted an NFT using Zora&apos;s
          Editions contracts? Mint your first one at{' '}
          <a
            className='text-cta'
            href='http://create.zora.co/create/edition'
          >
            create.zora.co
          </a>
        </p>

        <div className='flex w-full flex-wrap justify-end'>
          <button
            className='text-lg text-main-black mt-20 bg-cta font-tr px-2 py-1 hover:bg-main-gray w-full'
            onClick={() => write()}
          >
            Add NFT
          </button>
          {/* fix the below link */}
          <Link href='/[clubAddress]'>
            <button className='mt-12 text-main-gray-dark text-base hover:text-main-gray'>
              Continue
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Populate;
