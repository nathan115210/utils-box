import Image from 'next/image';
import Link from 'next/link';
import BackLink from '@/components/BackLink';

const Header = () => {
  return (
    <nav className="w-full flex border-b gap-2 items-center justify-between">
      <BackLink href={'/'} className={'flex-shrink-0'} />
      <Link
        href="https://github.com/nathan115210/utils-box"
        target="_blank"
        rel="noopener noreferrer"
        className="flex-shrink-0"
      >
        <Image
          className="hover:scale-125 transition-transform"
          src="/github.svg"
          alt="GitHub"
          width={40}
          height={40}
        />
      </Link>
    </nav>
  );
};

export default Header;
