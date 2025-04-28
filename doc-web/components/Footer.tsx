import Link from 'next/link';
import { Logo } from '@/components/Logo';

const Footer = () => {
  return (
    <footer className="w-full flex flex-col justify-center items-center p-4 bg-zinc-800 text-white mt-auto">
      <Logo />
      <Link
        href="https://zhaohongyu.netlify.app/"
        target="_blank"
        /*className="hover:bg-[#F18E24CD] px-2 py-1 rounded"*/
        className=" underline hover:no-underline bg-gradient-to-r hover:from-[#168AAD] hover:to-[#F15A24] px-2 py-1 rounded bg-lime-100 text-black hover:text-white"
      >
        by <b>Zhao Hongyu</b>
      </Link>
    </footer>
  );
};

export default Footer;
