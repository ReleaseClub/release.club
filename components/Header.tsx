import Link from 'next/link';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export const Header = () => {
  return (
    <div className='flex justify-end max-w-7xl mx-auto my-8'>
      <div>
        <ConnectButton
          accountStatus='address'
          showBalance={false}
        />
      </div>
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
