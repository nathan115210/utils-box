import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = await params;

  return {
    title: `utilsBox - ${slug}`,
    description: `This is the sub page for ${slug}.`,
  };
}

export default function SubPageLayout({ children }: { children: React.ReactNode }) {
  return <main className={'w-full  h-auto flex flex-col items-center gap-4'}>{children}</main>;
}
