import { NextPage } from 'next';
import { Header } from '../components/Header';
import {
  useContractWrite,
  useContractRead,
  useContractEvent,
  useWaitForTransaction,
} from 'wagmi';
import toast, { Toaster } from 'react-hot-toast';
import { useState, useEffect } from 'react';
import router from 'next/router';

import ClubFactory from '../abi/ClubFactory.json';

const Create: NextPage = () => {
  interface Club {
    name: string;
  }

  const [club, setClub] = useState<Club>({ name: '' });

  const [clubAdd, setClubAdd] = useState<
    string | undefined
  >(undefined);
  const [hash, setHash] = useState<string | undefined>(
    undefined
  );
  const { status } = useWaitForTransaction({
    hash: hash,
  });

  useEffect(() => {
    // Update the document title using the browser API
    console.log('STAT', status, clubAdd);
    if (status === 'success') {
      router.push({
        pathname: 'populate',
        query: {
          clubAddress: clubAdd,
        },
      });
    }
  }, [status]);
  // const [clubName, setClubName] = useState('');

  const { data, isError, isLoading, write } =
    useContractWrite({
      addressOrName:
        '0xc2D115ed2Eb75aEB8d598e3149a60fA035a020Fc',
      contractInterface: ClubFactory,
      functionName: 'addClub',
      args: club.name,

      onSuccess(cancelData, variables, context) {
        console.log('Success!', cancelData);
        setHash(cancelData.hash);
      },
      onError(error) {
        console.log('error', error);
      },
      // onSuccess(cancelData, variables, context) {
      //   console.log('Success!', cancelData);
      // },
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
      console.log('RH', event);
      setClubAdd(event[0]);
      toast.success('Club Created Successfully', {
        duration: 4000,
        position: 'top-left',

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
          backgroundColor: '#1E1E1E',
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
