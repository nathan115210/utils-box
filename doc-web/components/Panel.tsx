import { ReactNode } from 'react';

interface FullWidthPanelProps {
  children: ReactNode;
  className?: string;
  transparentBg?: boolean;
}

export default function Panel({ children, className, transparentBg }: FullWidthPanelProps) {
  return (
    <section
      className={`flex flex-col gap-6 ${!transparentBg && 'bg-[#231f20]'} p-8 shadow-md rounded  relative ${className ? className : ''}`}
    >
      {children}
    </section>
  );
}
