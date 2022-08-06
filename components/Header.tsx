import Link from 'next/link';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export const Header = () => {
  return (
    <div className='flex flex-row-reverse justify-start max-w-8xl mx-auto my-8 items-center'>
      <div>
        <ConnectButton
          accountStatus='address'
          showBalance={false}
        />
      </div>
      <div className='text-xl text-main-gray mr-8 font-aufgang'>
        <p>Settings</p>
      </div>
      <Link href='/'>
        <img src='../assets/release_club_logo.png' />
      </Link>
      <div>
        {/* included for logo reference */}
        {/* <Link
          href="/"
        >
          <a className="hover:text-[#f53bc3]">
          HOME
          </a>
        </Link> */}
      </div>
    </div>
  );
};
