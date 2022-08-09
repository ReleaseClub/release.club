// @ts-ignore
import { NextPage } from 'next';
import { Header } from '../components/Header';
import { useContractWrite, useContractRead, useContractEvent, useWaitForTransaction } from 'wagmi';
import { useState,useEffect } from 'react';
import router, { withRouter } from 'next/router';

import toast, {Toaster} from 'react-hot-toast'
import ReleaseClub from '../abi/ReleaseClub.json';
import ClubFactory from '../abi/ClubFactory.json';
import { BigNumber, ethers } from 'ethers';


interface Query {
  clubAdd:string
}
interface Router {
  pathname:string,
  query:Query
}
interface pageProps {
  router:Router;
}
const Populate: NextPage = (props:pageProps) => {
  interface addNFT {
    contractAddress: string;
  }
  interface pageProps {
    router:Router;
  }
  
  interface Release {
    tokenContract: string;
    tokenID:BigNumber;
  }

  const [hash, setHash]= useState<string|undefined>(undefined);
  const [inputNFT, setInputNFT] = useState<addNFT>({
    contractAddress:
      'i.e. 0x63d46079d920e5dd1f0a38190764a...',
  });
  let test:string= "0x47227af59cDb02C41501966a8ed92f47D1FD2858";
  let A:Release[] = [];

  let clubAdd=props.router.query.clubAdd?props.router.query.clubAdd:"0xB6e4AA83425fD6316791EC3C3a1a00b8754dc399";
  A.push({
    tokenContract:test,
    tokenID:ethers.BigNumber.from("1")
  })
  A.push({
    tokenContract:test,
    tokenID:ethers.BigNumber.from("2")
  })
  console.log(A)

  const {status}=useWaitForTransaction({
    hash:hash
  })
  
  useEffect(() => {
    // Update the document title using the browser API
    console.log("STAT",status)
    if(status==='success')
  {
    router.push({
      pathname: 'protocol',
      query: {},
    });
  }
  },[status]);
  const { data, isError, isLoading, write } =
    useContractWrite({
      addressOrName:
        clubAdd,
      contractInterface: ReleaseClub,
      functionName: 'addRelease',
      // takes two arguments, newReleases as a tuple, and length as a uint256
      args:[A],
      onSuccess(cancelData,variables,context){
        console.log("Success!", cancelData);
        setHash(cancelData.hash);
      
      }
      // onError(error, variables, context) {
      //     console.log("error", error)
      // },
      // onSuccess(cancelData, variables, context) {
      //     console.log("Success!", cancelData)
    });

    useContractEvent({
      addressOrName:
        clubAdd,
      contractInterface: ReleaseClub,
      eventName: 'NewRelease',
      // listener: (event) => (
      //   setClubName(event[1]), console.log(clubName)
      // ),
      listener: (event) =>{
         console.log(event);
         toast.success('Your NFT has been added to your club', {
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
          backgroundColor: '#1E1E1E'
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

    // useContractEvent({
    //   addressOrName: '0x47227af59cDb02C41501966a8ed92f47D1FD2858',
    //   contractInterface: ClubFactory,
    //   eventName: 'ClubCreated',
    //   listener: (event) => console.log(event),
    // })

  return (
    <div className='max-w-7xl mx-auto'>
      <Header />
      <div className='flex flex-wrap max-w-sm mx-auto'>
        <h1 className='text-4xl text-main-gray font-tr mt-32 my-8 w-full text-center'>
          Add NFTs to {}
        </h1>
        <div className='w-full mt-16'>
          <label className='my-1 text-main-gray text-base'>
            Add your Editions contract
          </label>
          <p className='text-main-gray-dark text-sm'>
            Place the contract address of the Zora Editions
            NFT you wish to add to this club.
          </p>
          <input
            type='text'
            className='w-full bg-main-black border-0 border-b-2 border-cta text-main-gray-dark px-0 mt-6'
            // placeholder='i.e. 0x63d46079d920e5dd1f0a38190764a...'
            value={inputNFT.contractAddress}
            onChange={(e) => {
              e.preventDefault();
              setInputNFT((current) => {
                return {
                  ...current,
                  contractAddress: e.target.value,
                };
              });
            }}
          />
        </div>
        <p className='text-main-gray-dark text-sm mt-12'>
          Haven&apos;t minted an NFT using Zora&apos;s Editions
          contracts? Mint your first one at{' '}
          <a
            className='text-cta'
            href='http://create.zora.co/create/edition'
          >
            create.zora.co
          </a>
        </p>

        <button
          className='text-lg text-main-black mt-20 bg-cta font-tr px-2 py-1 hover:bg-main-gray'
          onClick={() => write()}
        >
          Add NFT
        </button>
      </div>
      <Toaster/>
    </div>
  );
};

export default withRouter(Populate);
