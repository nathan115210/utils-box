export interface UtilDataProps {
  tags: UtilTags[];
  name: string;
  slug: string;
  shortIntro: string;
  description: string;
  parameters?: UtilReferenceItemProps[] | null;
  returns?: UtilReferenceItemProps[] | null;
}

export interface UtilReferenceItemProps {
  name: string;
  type: string;
  description: string;
}

export enum UtilTags {
  REACT = 'react',
  NEXTJS = 'next.Js',
  UTILITYFUNCTION = 'utility function',
}
