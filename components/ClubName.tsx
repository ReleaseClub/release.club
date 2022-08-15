import { useState } from 'react';
import { useContractEvent } from 'wagmi';
import ClubFactory from '../abi/ClubFactory.json';

export const ClubName = () => {
  const [clubName, setClubName] = useState<
    string | undefined
  >(undefined);

  useContractEvent({
    addressOrName:
      '0xc2D115ed2Eb75aEB8d598e3149a60fA035a020Fc',
    contractInterface: ClubFactory,
    eventName: 'ClubCreated',
    listener: (event) => {
      console.log('address:', event[0], 'name:', event[1]);
      setClubName(event[1]);
    },
  });
  return <>{clubName}</>;
};
