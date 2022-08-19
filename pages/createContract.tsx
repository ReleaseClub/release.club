import { NextPage } from 'next';
import { Header } from '../components/Header';
import toast, { Toaster } from 'react-hot-toast';
import { useState, useEffect } from 'react';
import router from 'next/router';
import { useForm, Controller } from "react-hook-form";
// import { SuccessPopup } from '../components/SuccessPopup';
import axios from 'axios';

const Create: NextPage = () => {
  interface Club {
    name: string;
  }
  let abc;
  const api = "plPhDK6AiKeqXxTgbmFOVkKEfmlnDaGS"
  const { register, handleSubmit } = useForm();
  const [iFrame, setIFrame] = useState("");
  const [check, setCheck] = useState(false);

  const openInNewTab = (url) => {
    const newWindow = window.open(url, 'mozilla','popup')
    if (newWindow) newWindow.opener = null
  }

  const checker =(id)=> {
    console.log("AAAAA");
    var dat ={
      "key": api,
      "chain_id": "4",
      "url":"https://thentic.tech/api/contracts",
      "method":"get"
    };
    console.log('dat :>> ', dat);
    var config = {
      method: 'post',
      url: "https://release-club-playground.vercel.app/api/myapi",
      data : dat
    };
    
    axios(config).then(function(response){
      var contract = response.data.contracts.filter(contract=>contract.request_id===id)
      console.log('contract :>> ', contract);
      console.log('response :>> ', response);
      console.log('contract[0].status :>> ', contract[0].status);
      if(contract[0].status==="success"){
      clearInterval(abc);
      console.log("Cleared");
      }
    })
  }
  const onSubmit = data => {
    console.log(data)
    var dat ={
      "key": api,
      "chain_id": "4",
      "name": data.name,
      "short_name": data.short_name,
      "url":"https://thentic.tech/api/nfts/contract",
      "method":"post"
    };
    console.log('dat :>> ', dat);
    var config = {
      method: 'post',
      url: 'https://release-club-playground.vercel.app/api/myapi',
      data : dat
    };
    
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      abc = setInterval(()=>checker(response.data.request_id),5000);
    })
  };
  return (
    <div className='max-w-7xl mx-auto'>
      <Header />
      <div className='flex flex-wrap max-w-sm mx-auto'>
        <h1 className='text-4xl text-main-gray font-tr mt-32 my-8 w-full text-center'>
          Create a new NFT contract
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
            {...register("name")}
          />
        </div>
        <div className='w-full mt-8'>
          <label className='my-2 text-main-gray text-base'>
            Short Name*
          </label>
          <p className='text-main-gray-dark text-sm mt-1'>
            The Symbol of your club NFT.
          </p>
          <input
            type='text'
            className='w-full bg-main-black border-0 border-b-2 border-cta text-main-gray-dark px-0'
            {...register("short_name")}
          />
        </div>
        <button
          className='text-lg text-main-black mt-20 bg-cta font-tr px-2 py-1 hover:bg-main-gray'
          onClick={handleSubmit(onSubmit)}
        >
          Create club
        </button>
      </div>
     { check && (<div>
      <label className='my-2 text-main-gray text-base'>
            Short Name*
          </label>
      <div dangerouslySetInnerHTML={ {__html:iFrame} } />
      </div>)}
      <Toaster />
    </div>
  );
};

export default Create;
