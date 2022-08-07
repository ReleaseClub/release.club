import { NextPage } from 'next';
import Link from 'next/link';
import { Header } from '../components/Header';
import {
  useContractWrite,
  useContractRead,
  useContractEvent,
  useWaitForTransaction,
} from 'wagmi';
import { useState } from 'react';

// import { SuccessPopup } from '../components/SuccessPopup';

import ClubFactory from '../abi/ClubFactory.json';

const Create: NextPage = () => {
  interface Club {
    name: string;
  }

  const [club, setClub] = useState<Club>({ name: '' });

  // const [clubName, setClubName] = useState('');

  const { data, isError, isLoading, write } =
    useContractWrite({
      addressOrName:
        '0x0d07B6b3089E86d9F4DC899526F224788a469Ddd',
      contractInterface: ClubFactory,
      functionName: 'addClub',
      args: club.name,
      onError(error) {
        console.log('error', error);
      },
    });

  useContractEvent({
    addressOrName:
      '0x0d07B6b3089E86d9F4DC899526F224788a469Ddd',
    contractInterface: ClubFactory,
    eventName: 'ClubCreated',
    listener: (event) => console.log(event),
  });

  return (
    <div className='max-w-7xl mx-auto'>
      <Header />
      <div className='flex flex-wrap max-w-sm mx-auto'>
        <h1 className='text-4xl text-main-gray font-tr mt-32 my-8 w-full text-center'>
          Create a new club
        </h1>
        <div className='w-full mt-8'>
          <label className='my-2 text-main-gray text-base'>
            Name*
          </label>
          <p className='text-main-gray-dark text-sm mt-1'>
            The name of your club will be visible to
            everyone.
          </p>
          <input
            type='text'
            className='w-full bg-main-black border-0 border-b-2 border-cta text-main-gray-dark px-0'
            value={club.name}
            onChange={(e) => {
              e.preventDefault();
              setClub((current) => {
                return {
                  ...current,
                  name: e.target.value,
                };
              });
            }}
          />
        </div>
        <div className='flex w-full flex-wrap justify-end'>
          <button
            className='text-lg text-main-black mt-20 bg-cta font-tr px-2 py-1 hover:bg-main-gray w-full'
            onClick={() => write()}
          >
            Create club
          </button>
          <Link href='/populate'>
            <button className='mt-12 text-main-gray-dark text-base hover:text-main-gray'>Continue</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Create;
