import React, { useState } from 'react';
import TableHead from "../../components/TableHead/index.tsx";
import TableItem from "../../components/TableItem/index.tsx";
import Search from "../../components/Search/index.tsx";
import { useCustomers, AddButton, UpdateButton, DeleteButton } from "../../components/Customers/index.tsx";


// Componente da tela de estoque
const Customer: React.FC = () => {

  const { customers } = useCustomers();

  const [SearchItem, setSearchItem] = useState('')
    
  const SearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchItem(e.target.value.toLowerCase())
  };
    
  return (
    <div>
      <h1 className="max-w-lg text-3xl font-semibold leading-normal text-gray-900 ">Clientes</h1>
      <br></br>
      <Search searchChange={SearchChange} placeHolder='Buscar cliente'></Search>
      <br></br>
      <div>
          <TableHead 
          head_1='ID' 
          head_2='Nome' 
          head_3='E-mail' 
          head_4='Telefone'
          head_5=''
          add= {<AddButton></AddButton>} >
            {(customers.filter(customer =>
            customer.name.toLowerCase().includes(SearchItem))).map((customer) => (
                  <TableItem
                  item_1={'#'+customer.id}
                  item_2={customer.name}
                  item_3={customer.email}
                  item_4={customer.number}
                  item_5={''}>
                    <UpdateButton id={''+customer.id}></UpdateButton>
                    <DeleteButton id={''+customer.id}></DeleteButton>
                  </TableItem>
                ))}
          </TableHead>
        </div>
    </div>
  );
};

export default Customer;