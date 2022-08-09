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

  const [clubAddress, setClubAddress] = useState<
    string | undefined
  >(undefined);

  const [clubName, setClubName] = useState<
    string | undefined
  >(undefined);

  const [hash, setHash] = useState<string | undefined>(
    undefined
  );

  const [loading, setLoading] = useState(false);

  const { data, isError, isLoading, write } =
    useContractWrite({
      addressOrName:
        '0xc2D115ed2Eb75aEB8d598e3149a60fA035a020Fc',
      contractInterface: ClubFactory,
      functionName: 'addClub',
      args: club.name,
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
      toast.success('Your club was created successfully', {
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

  // START HERE
  useEffect(() => {
    if (status === 'success') {
      router.push({
        pathname: 'populate',
        query: {
          clubAddress,
        },
      });
    }
  }, [status]);

  useContractEvent({
    addressOrName:
      '0xc2D115ed2Eb75aEB8d598e3149a60fA035a020Fc',
    contractInterface: ClubFactory,
    eventName: 'ClubCreated',
    listener: (event) => {
      console.log('address:', event[0], 'name:', event[1]);
      setClubAddress(event[0]);
      setClubName(event[1]);
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
            className='w-full bg-main-black border-0 border-b-2 border-cta text-main-gray-dark px-0 mt-6'
            placeholder='i.e. Metabolism'
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

        <button
          className='text-lg text-main-black mt-12 bg-cta font-tr px-2 py-1 hover:bg-main-gray w-full'
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
