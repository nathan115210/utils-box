import { NextResponse } from 'next/server';
import utilsData from '@/utilsData.json';
import { UtilDataProps } from '@/app/utils/type';

type UtilsDataType = { id: number } & UtilDataProps;

export async function GET(_request: Request, { params }: { params: { slug: string } }) {
  const { slug } = await params;
  const util = (utilsData as UtilsDataType[]).find((item) => item.slug === slug);
  if (!util) {
    return NextResponse.json({ message: `Util ${slug}, not found` }, { status: 404 });
  }
  return NextResponse.json(util);
}
