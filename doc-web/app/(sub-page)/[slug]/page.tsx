import { getUtilBySlug } from '@/app/utils/getAllUtils';
import { notFound } from 'next/navigation';
import Panel from '@/components/Panel';
import { UtilDataProps } from '@/app/utils/type';
import ReferenceTable from '@/components/ReferenceTable';
import CardList from '@/components/CardList';

export default async function Page({ params }: { params: { slug: string } }) {
  // asynchronous access of `params.id`.
  const { slug } = await params;
  const data = (await getUtilBySlug(slug)) as UtilDataProps;

  if (!data) {
    notFound();
  }
  const { name, shortIntro, description, returns, parameters } = data;

  return (
    <>
      <Panel>
        <header>
          <h1 className="absolute text-3xl font-bold top-[-20px] primary-color">{name}</h1>
          <p className="text-2xl">{shortIntro}</p>
        </header>

        <div className={'flex flex-col gap-2'}>
          <h2 className={'text-3xl font-bold text-yellow-50'}>DESCRIPTIONS:</h2>
          <p className="text-lg max-w-[80%]">{description}</p>
        </div>

        {/*References - Parameters*/}
        {!!parameters?.length ? (
          <div className={'flex flex-col gap-2'}>
            <h3 className={'text-2xl font-bold text-yellow-50'}>PARAMETERS:</h3>
            <ReferenceTable referenceData={parameters} />
          </div>
        ) : (
          <h3 className={'text-xl font-bold text-yellow-50'}>
            <code dir="ltr" className={'code-block-primary'}>
              {name}
            </code>{' '}
            does not take any parameters.
          </h3>
        )}
        {/*References - Returns*/}
        {!!returns?.length ? (
          <div className={'flex flex-col gap-2'}>
            <h3 className={'text-2xl font-bold text-yellow-50'}>RETURNS:</h3>
            <ReferenceTable referenceData={returns} />
          </div>
        ) : (
          <h3 className={'text-xl font-bold text-yellow-50'}>
            <code dir="ltr" className={'code-block-primary'}>
              {name}
            </code>{' '}
            returns{' '}
            <code dir="ltr" className={'code-block-lime'}>
              undefined
            </code>
          </h3>
        )}
      </Panel>
      <div className={' flex flex-col gap-4 w-full p-8'}>
        <h3 className={'text-2xl font-bold text-yellow-50'}>MORE:</h3>
        <div className={'relative'}>
          <CardList executedCardSlug={slug} />
        </div>
      </div>
    </>
  );
}
