import Image from 'next/image';
import Link from 'next/link';

export const Logo = ({ className }: { className?: string }) => {
  return (
    <Link className={className} href={'/'}>
      {' '}
      <Image src="/logo.svg" alt="Logo" width={200} height={70} priority />{' '}
    </Link>
  );
};
