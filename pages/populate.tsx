import { NextPage } from 'next';
import { Header } from '../components/Header';
import { useContractWrite, useContractRead, useContractEvent } from 'wagmi';
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
      addressOrName:
        '0x47227af59cDb02C41501966a8ed92f47D1FD2858',
      contractInterface: ReleaseClub,
      functionName: 'addRelease',
      // takes two arguments, newReleases as a tuple, and length as a uint256
      args: [inputNFT.contractAddress, 1],
      overrides: {
        gasLimit: 1000000,
      },
      // onError(error, variables, context) {
      //     console.log("error", error)
      // },
      // onSuccess(cancelData, variables, context) {
      //     console.log("Success!", cancelData)
    });

    // useContractEvent({
    //   addressOrName: '0x47227af59cDb02C41501966a8ed92f47D1FD2858',
    //   contractInterface: ClubFactory,
    //   eventName: 'ClubCreated',
    //   listener: (event) => console.log(event),
    // })

  return (
    <div className='max-w-7xl mx-auto'>
      <Header />
      <div className='flex flex-wrap max-w-sm mx-auto'>
        <h1 className='text-4xl text-main-gray font-tr mt-32 my-8 w-full text-center'>
          Add NFTs to {}
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
          Haven&apos;t minted an NFT using Zora&apos;s Editions
          contracts? Mint your first one at{' '}
          <a
            className='text-cta'
            href='http://create.zora.co/create/edition'
            target="_blank"
          >
            create.zora.co
          </a>
        </p>

        <button
          className='text-lg text-main-black mt-20 bg-cta font-tr px-2 py-1 hover:bg-main-gray'
          onClick={() => write()}
        >
          Add NFT
        </button>
      </div>
    </div>
  );
};

export default Populate;
