import React from 'react';
import { UtilReferenceItemProps } from '@/app/utils/type';
import { toTitleCase } from '@/app/utils/helpers';

const ReferenceTable = ({ referenceData }: { referenceData: UtilReferenceItemProps[] }) => {
  const tableHeaderProps = Object.keys(referenceData[0]);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm text-left text-white">
        <thead className="bg-[#f9f4da1a] hidden md:table-header-group">
          <tr>
            {tableHeaderProps.map((headerItem, index) => (
              <th key={`table-header-${index}`} scope="col" className="px-6 pl-2 py-4 font-bold">
                {toTitleCase(headerItem)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {referenceData.map((referenceItem, index) => (
            <tr
              key={`tr-${index}`}
              className={`${index !== referenceData.length - 1 ? 'border-b border-gray-500' : ''} block md:table-row mb-4`}
            >
              {tableHeaderProps.map((headerItem, tdIndex) => (
                <td key={`td-${tdIndex}`} className="block md:table-cell py-2  ">
                  <span className="font-bold capitalize block md:hidden mb-1 bg-[#f9f4da1a] py-4 pl-2">
                    {toTitleCase(headerItem)}
                  </span>
                  <span className={'pl-2'}>
                    {referenceItem[headerItem as keyof UtilReferenceItemProps]}
                  </span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReferenceTable;
