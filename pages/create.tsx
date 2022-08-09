import { NextPage } from 'next';
import Link from 'next/link';
import { Header } from '../components/Header';
import { ethers } from 'ethers';
import {
  useContractWrite,
  useContractRead,
  useContractEvent,
  useWaitForTransaction,
} from 'wagmi';
import { useState, createContext } from 'react';
import toast, {Toaster} from 'react-hot-toast';


// import { SuccessPopup } from '../components/SuccessPopup';

import ClubFactory from '../abi/ClubFactory.json';

const Create: NextPage = () => {
  interface Club {
    name: string;
  }

  const [club, setClub] = useState<Club>({ name: '' });

  const { data, isError, isLoading, write } =
    useContractWrite({
      addressOrName:
        '0xc2D115ed2Eb75aEB8d598e3149a60fA035a020Fc',
      contractInterface: ClubFactory,
      functionName: 'addClub',
      args: club.name,
      onError(error) {
        console.log('error', error);
      },
      // onSuccess(data) {
      //   console.log('Your club was created')
      // }
    });

  useContractEvent({
    addressOrName:
      '0xc2D115ed2Eb75aEB8d598e3149a60fA035a020Fc',
    contractInterface: ClubFactory,
    eventName: 'ClubCreated',
    // listener: (event) => (
    //   setClubName(event[1]), console.log(clubName)
    // ),
    listener: (event) => {
      console.log(event);
      toast.success('Api data succcessfully received!', {
        duration: 4000,
        position: 'top-right',
  
        // Custom Icon
        icon: '👏',
        // Change colors of success/error/loading icon
        iconTheme: {
          primary: '#0a0',
          secondary: '#fff',
        },
        // styling
      style: {
        border: '1px solid #FFFDF8',
        padding: '8px 12px',
        color: '#FFFDF8',
        backgroundColor: '#1E1E1E'
        // minWidth: '300px'
      },
        // Aria
        ariaProps: {
          role: 'status',
          'aria-live': 'polite',
        },
      });
    
    },

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
            <button className='mt-12 text-main-gray-dark text-base hover:text-main-gray'>
              Continue
            </button>
          </Link>
        </div>
      </div>
      <Toaster/>
    </div>
  );
};

export default Create;
