import React from 'react';
import Card, { CardProps } from '@/components/Card';
import { getAllUtils } from '@/app/utils/getAllUtils';
import { UtilDataProps } from '@/app/utils/type';
import { notFound } from 'next/navigation';

export default async function CardList({ executedCardSlug }: { executedCardSlug?: string }) {
  const data = (await getAllUtils()) as UtilDataProps[];
  if (!data) return notFound();

  const cardsData: CardProps[] = data?.reduce((result, item) => {
    const { name, shortIntro, tags } = item;
    const slug = name.replace(/\s+/g, '-').toLowerCase();
    if (executedCardSlug && slug === executedCardSlug) {
      return result;
    } else {
      const description = shortIntro;
      const heading = name;
      const card: CardProps = {
        heading,
        description,
        slug,
        tags,
      };
      result.push(card);
    }

    return result;
  }, [] as CardProps[]);

  return (
    <ul className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
      {cardsData.map((card, index) => {
        const { heading, description, slug, tags } = card;
        return (
          <li key={`${index}--card`}>
            <Card heading={heading} description={description} slug={slug} tags={tags} />
          </li>
        );
      })}
    </ul>
  );
}
