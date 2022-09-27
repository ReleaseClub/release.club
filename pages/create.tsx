import { NextPage } from 'next';

import { Button } from '../components/Button';
import { Field } from '../components/Field';
import { Heading } from '../components/Heading';
import { Input } from '../components/Input';

import {
  useContractWrite,
  useContractEvent,
  useWaitForTransaction,
} from 'wagmi';
import toast from 'react-hot-toast';
import { useState, useEffect } from 'react';
import router from 'next/router';

import ClubFactory from '../abi/ClubFactory.json';
import { FACTORY_ADDRESS } from '../config/constants';

const Create: NextPage = () => {
  interface Club {
    name: string;
  }

  // TODO cleanup club hooks
  const [club, setClub] = useState<Club>({ name: '' });

  const [clubAddress, setClubAddress] = useState<
    string | undefined
  >(undefined);

  const [hash, setHash] = useState<string | undefined>(
    undefined
  );

  const { data, isError, write } =
    useContractWrite({
      addressOrName: FACTORY_ADDRESS,
      contractInterface: ClubFactory,
      functionName: 'addClub',
      args: club.name,
      onSuccess(data) {
        console.log('data', data);
        setHash(data.hash);
      },
      onError(error) {
        console.log('error', error);
      },
    });

  // // TODO this is not the way, see below
  // useContractEvent({
  //   addressOrName: FACTORY_ADDRESS,
  //   contractInterface: ClubFactory,
  //   eventName: 'ClubCreated',
  //   listener: (event) => {
  //     console.log('address:', event[0], 'name:', event[1]);
  //     setClubAddress(event[0]);
  //   },
  // });
  //
  // TODO get club address from transaction receipt logs instead of calling useContractEvent above.
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

  useEffect(() => {
    if (status === 'success') {
      router.push({
        pathname: 'populate',
        query: {
          clubAddress,
        },
      });
    }
  }, [status, clubAddress]);

  const [isSsr, setIsSsr] = useState(true);
  useEffect(() => {
    setIsSsr(false);
  }, []);

  // TODO club name should be set when tx completes or optimistically on button.click not input.change
  return isSsr ? undefined : (
    <div className="p-[1rem]">
      <div className="mx-auto max-w-[31rem] p-[3rem]">
        <Heading as="h1" className="mr-[-.5rem]">Create a new club</Heading>
        <div className="h-[4.75rem]"></div>
        <Field label="Club name*">
          <div className="h-[.6875rem]"></div>
          <Input
            type="text"
            placeholder="i.e. Metabolism"
            required
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
        </Field>

        <div className="h-[2.5rem]"></div>
        <Button className="btn-primary" onClick={() => write()}>
          Create club
        </Button>

      </div>
    </div>
  );
};

export default Create;
