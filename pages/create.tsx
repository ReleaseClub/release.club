import { NextPage } from 'next';
import { Header } from '../components/Header';
import { useContractWrite, useContractRead } from 'wagmi';

import ReleaseClub from '../abi/ReleaseClub.json';

const CreateClub: NextPage = () => {
  const { data, isError, isLoading, write } =
    useContractWrite({
      addressOrName:
        '0x17a306731ceE03Cf74feBE7c04f1B28898D0F360',
      contractInterface: ReleaseClub,
      functionName: 'addMember',
      args: ['0xF2365A26f766109b5322B0f90d71c21bF32bda04'],
      overrides: {
        gasLimit: 1000000,
      },
      // onError(error, variables, context) {
      //     console.log("error", error)
      // },
      // onSuccess(cancelData, variables, context) {
      //     console.log("Success!", cancelData)
    });

  return (
    <div className='max-w-7xl mx-auto'>
      <Header />
      <div className='flex flex-wrap max-w-sm mx-auto'>
        <h1 className='text-4xl text-main-gray font-aufgang mt-32 my-8 w-full text-center'>
          Create a new club
        </h1>
        <div className='w-full font-satoshi-med'>
          <label className='my-2 text-main-gray text-base'>
            Name*
          </label>
          <input type='text' className='w-full bg-main-black border-0 border-b-2 border-cta text-main-gray-dark px-0'/>
        </div>

        <div className='w-full font-satoshi-med mt-16'>
          <label className='my-1 text-main-gray text-base'>
            Add curators
          </label>
          <p className='text-main-gray-dark text-sm'>
            Add wallet addresses for each collaborator in
            this club. You will also be able to do this
            later.
          </p>
          <input type='text' className='w-full bg-main-black border-0 border-b-2 border-cta text-main-gray-dark px-0 mt-6'/>
        </div>

        <button
          className='text-lg text-main-black mt-20 bg-cta font-aufgang px-1 py-1'
          onClick={() => write()}
        >
          Create Club
        </button>
      </div>
    </div>
  );
};

export default CreateClub;
