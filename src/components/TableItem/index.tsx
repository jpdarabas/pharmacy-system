import { ReactNode } from 'react';

interface TableItemProps {
    item_1: string;
    item_2: string;
    item_3: number;
    item_4: number;
    children: ReactNode;
  }
  
const TableItem: React.FC<TableItemProps> = ({
    item_1,
    item_2,
    item_3,
    item_4,
    children}) =>{
    return(
        <tr className='border-b rounded-lg bg-gray-50'>
            <td className='px-36 py-4'>{item_1}</td>
            <td className='px-36 py-4'>{item_2}</td>
            <td className='px-36 py-4'>{item_3}</td>
            <td className='px-36 py-4'>{item_4}</td>
            <td className='px-6 py-4'>{children}</td>
        </tr>
    )
}

export default TableItem