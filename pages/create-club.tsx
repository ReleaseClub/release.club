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
      <div className='text-3xl text-main-grey'>
        <button onClick={() => write()}>Add Member</button>
      </div>
    </div>
  );
};

export default CreateClub;
