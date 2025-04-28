'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from '@/components/Logo';

const BackLink = ({
  href,
  iconPath,
  className,
}: {
  href: string;
  iconPath?: string;
  className?: string;
}) => {
  const pathName = usePathname();
  if (pathName === '/') return <Logo />;

  return (
    <Link href={href} className={className}>
      <Image
        className="hover:scale-125 transition-transform"
        src={iconPath || '/arrowLeftIcon.svg'}
        alt="View all"
        width={40}
        height={40}
      />
    </Link>
  );
};
export default BackLink;
