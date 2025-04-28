import { NextResponse } from 'next/server';
import utilsData from '@/utilsData.json';

export async function GET() {
  return NextResponse.json(utilsData);
}
