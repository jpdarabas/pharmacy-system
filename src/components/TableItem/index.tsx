import { ReactNode } from 'react';

interface TableItemProps {
    item_1: string;
    item_2: string;
    item_3: string;
    item_4: string;
    item_5: string;
    children: ReactNode;
  }
  
const TableItem: React.FC<TableItemProps> = ({
    item_1,
    item_2,
    item_3,
    item_4,
    item_5,
    children}) =>{
    return(
        <tr className='border-b rounded-lg bg-gray-50'>
            <td className='px-5 py-4'>{item_1}</td>
            <td className='2xl:px-36 lg:px-24 sm:px-10 py-4'>{item_2}</td>
            <td className='2xl:px-36 lg:px-24 sm:px-10 py-4'>{item_3}</td>
            <td className='2xl:px-36 lg:px-24 sm:px-10 py-4'>{item_4}</td>
            <td className='2xl:px-36 lg:px-24 sm:px-10 py-4'>{item_5}</td>
            <td className='px-6 py-4'>{children}</td>
        </tr>
    )
}

export default TableItem