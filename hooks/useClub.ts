import { useContractReads } from 'wagmi';
import clubAbi from '../abi/ReleaseClub.json';

const CLUB_VIEW_FUNCS = clubAbi.filter(
  (x) => x.type === 'function' && x.stateMutability === 'view' && x.inputs.length === 0
);

const CLUB_VIEW_FUNC_NAMES = CLUB_VIEW_FUNCS.map(({name}) => name);

// export interface ClubProps<FunctionName> {
//   contractAdress = string;
//   functionName: FunctionName;
//   args?: any[]; // TODO
// }
//
// export type ClubReadProps = ClubProps<'viewReleases'>; // TODO
//
// export const useClubRead = ({ contractAddress, ...props }: ClubReadProps) => {
//   return useContractRead({...props, addressOrName: contractAddress});
// };
//
// export type ClubWriteProps = ClubProps<'addRelease'>; // TODO
//
// export const useClubWrite = ({ contractAddress, ...props }: ClubWriteProps) => {
//   const prepare = usePrepareContractWrite({...props, addressOrName: contractAddress});
//   const result = useContractWrite(prepare.config);
//
//   return {
//     ...result,
//     prepare,
//   }
// };

export const useClub = ({ contractAddress }) => {
  const clubContract = {
    addressOrName: contractAddress,
    contractInterface: clubAbi
  };

  const functionNames = CLUB_VIEW_FUNC_NAMES;
  const contracts = functionNames.map(name => {
    return { ...clubContract, functionName: name };
  });

  return useContractReads({
    contracts,
    select: (data) => {
      return functionNames.reduce((acc, name, i) => {
        acc[name] = data[i];
        return acc;
      }, {})
    }
  });
};
