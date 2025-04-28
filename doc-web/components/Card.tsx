import React, { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { UtilTags } from '@/app/utils/type';
import { toTitleCase } from '@/app/utils/helpers';

export interface CardProps {
  heading: string;
  description: string;
  slug: string;
  tags: UtilTags[];
}

const Card: FC<CardProps> = ({ heading, slug, description, tags }) => {
  console.log('tags', tags);
  return (
    <Link
      className="flex flex-col gap-4 p-4 rounded shadow bg-zinc-600 hover:shadow-lg transition-transform transform hover:scale-102 cursor-pointer relative primary-color"
      href={`/${slug}`}
      rel="noopener noreferrer"
    >
      <div className={'flex justify-between items-center align-middle flex-wrap gap-2'}>
        <h2 className="text-lg font-bold">{heading}</h2>
        {tags.map((item, index) => {
          return (
            <div key={`${index}--tag`} className="flex items-center gap-2  justify-center ">
              {getTagIcon(item)}
              <span className="text-sm text-gray-400">{toTitleCase(item)}</span>
            </div>
          );
        })}
      </div>

      <p className="text-white ">{description}</p>
      <Image
        className="right-4 text-blue-500 hover:text-blue-700 self-end"
        src={'./arrowRightIcon.svg'}
        alt={'arrow'}
        width={30}
        height={30}
      />
    </Link>
  );
};

export default Card;

// Helper function to convert tags to svgs
export const getTagIcon = (tag: UtilTags) => {
  switch (tag) {
    case UtilTags.REACT:
      return <Image src={'./tags/ReactJs.svg'} alt={tag} width={20} height={20} />;
    case UtilTags.NEXTJS:
      return <Image src={'./tags/NextJs.svg'} alt={tag} width={20} height={20} />;
    case UtilTags.UTILITYFUNCTION:
      return <Image src={'./tags/toolbox.svg'} alt={tag} width={20} height={20} />;
    default:
      return null;
  }
};
