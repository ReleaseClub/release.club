import { NextPage } from 'next';
import { Header } from '../components/Header';
import toast, { Toaster } from 'react-hot-toast';
import { useState } from 'react';
import router from 'next/router';

import {
  useContractWrite,
  useContractRead,
  useContractEvent,
  useWaitForTransaction,
} from 'wagmi';
// import { SuccessPopup } from '../components/SuccessPopup';

import ClubFactory from '../abi/ClubFactory.json';
import { FACTORY_ADDRESS } from '../config/constants';

const Create: NextPage = () => {
  interface Club {
    name: string;
  }

  const [club, setClub] = useState<Club>({ name: '' });

  // const [clubName, setClubName] = useState('');

  const { data, isError, isLoading, write } =
    useContractWrite({
      addressOrName: FACTORY_ADDRESS,
      contractInterface: ClubFactory,
      functionName: 'addClub',
      args: club.name,
      onError(error) {
        console.log('error', error);
      },
      // onSuccess(cancelData, variables, context) {
      //   console.log('Success!', cancelData);
      // },
    });

  useContractEvent({
    addressOrName: FACTORY_ADDRESS,
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
      router.push({
        pathname: 'populate',
        query: {},
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

        {/* <div className='w-full font-satoshi-med mt-16'>
          <label className='my-1 text-main-gray text-base'>
            Add curators
          </label>
          <p className='text-main-gray-dark text-sm'>
            Add wallet addresses for each collaborator in
            this club. You will also be able to do this
            later.
          </p>
          <input
            type='text'
            className='w-full bg-main-black border-0 border-b-2 border-cta text-main-gray-dark px-0 mt-6'
            value={club.curators}
            onChange={(e) => {
              e.preventDefault();
              setClub((current) => {
                return {
                  ...current,
                  curators: [e.target.value],
                };
              });
            }}
          />
        </div> */}

        <button
          className='text-lg text-main-black mt-20 bg-cta font-tr px-2 py-1 hover:bg-main-gray'
          onClick={() => write()}
        >
          Create club
        </button>
      </div>
      <Toaster />
    </div>
  );
};

export default Create;
