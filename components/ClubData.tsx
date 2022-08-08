import {
  useContractEvent,
} from 'wagmi';
import { useState } from 'react';

import ClubFactory from '../abi/ClubFactory.json';

export const ClubData = (name, address) => {
  const [clubName, setClubName] = useState('');
  const [clubAddress, setClubAddress] = useState('');

  useContractEvent({
    addressOrName:
      '0x0d07B6b3089E86d9F4DC899526F224788a469Ddd',
    contractInterface: ClubFactory,
    eventName: 'ClubCreated',
    listener: (event) => (
      setClubName(event[1]), setClubAddress(event[0])
    ),
  });

  console.log(clubName);
  console.log(clubAddress);

  return (
    <div>
      <h1>{clubName}</h1>
      {/* <p>{clubAddress}</p> */}
    </div>
  );
};
