import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export const Header = () => {
  return (
    <header className="max-w-screen-2xl mx-auto flex flex-row-reverse justify-start px-4 sm:px-10 py-6 items-center">
      <div>
        <ConnectButton
          accountStatus="address"
          showBalance={false}
        />
      </div>
      {/* <div className="text-xl text-main-gray-dark mr-8">
        <p>Settings</p>
      </div> */}
      {/* <Link href="/">
        <img src="../assets/release_club_logo.png" />
      </Link> */}
      
    </header>
  );
};
