import { ReactNode } from 'react';

interface TableHeadProps {
  head_1: string;
  head_2: string;
  head_3: string;
  head_4: string;
  head_5: string;
  add: ReactNode;
  children: ReactNode;
}

const TableHead: React.FC<TableHeadProps> = ({ 
  head_1, 
  head_2, 
  head_3, 
  head_4,
  head_5,
  add,
  children }) => {
  return (
    <table>
        <thead>
            <tr className='border-b bg-gray-50 uppercase'>
                <th className='px-5 py-3'>{head_1}</th>
                <th className='2xl:px-36 lg:px-24 sm:px-10 py-3'>{head_2}</th>
                <th className='2xl:px-36 lg:px-24 sm:px-10 py-3'>{head_3}</th>
                <th className='2xl:px-36 lg:px-24 sm:px-10 py-3'>{head_4}</th>
                <th className='2xl:px-36 lg:px-24 sm:px-10 py-3'>{head_5}</th>
                <th className='px-6 py-3'>{add}</th>
            </tr>
        </thead>
        <tbody>
          {children}
        </tbody>
      </table>
  );
};

export default TableHead;