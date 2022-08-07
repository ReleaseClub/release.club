import { useContractRead, useAccount } from 'wagmi';

import ClubFactory from '../abi/ClubFactory.json';
export const ClubAddress = () => {
  const { address } = useAccount();

  const { data, isError, isLoading } = useContractRead({
    addressOrName:
      '0x0d07B6b3089E86d9F4DC899526F224788a469Ddd',
    contractInterface: ClubFactory,
    functionName: 'viewClubs',
  });
  console.log(data);
  return (
    <div>
      <h1>{data}</h1>
    </div>
  );
};
