import React, { ReactNode, createContext, useState, useContext } from 'react';



interface Customer {
    id: number;
    name: string;
    email: string;
    number: string;
    cpf: string;
  }


interface CustomersContextProps {
    customers: Customer[];
    addCustomer: (newCustomer: Customer) => void;
    updateCustomer: (updatedCustomers: Customer[]) => void;
}


const CustomersContext = createContext<CustomersContextProps | undefined>(undefined);

interface CustomersProviderProps {
    children: ReactNode;
  }

export const CustomersProvider: React.FC<CustomersProviderProps> = ({ children }) => {
  const [customers, setCustomers] = useState<Customer[]>([]);

  const addCustomer = (newCustomer: Customer) => {
    setCustomers([...customers, newCustomer]);
  };

  const updateCustomer = (updatedCustomers: Customer[]) => {
    setCustomers(updatedCustomers)
    };

  return (
    <CustomersContext.Provider value={{ customers, addCustomer, updateCustomer }}>
      {children}
    </CustomersContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCustomers = () => {
  const context = useContext(CustomersContext);
  if (!context) {
    throw new Error('useCustomers deve ser usado dentro de um CustomersProvider');
  }
  return context;
};

interface ModalProps {
    add: (e: React.FormEvent<HTMLFormElement>) => void;
    close: () => void;
    customer: Customer | null;
    title: string;
  }

const Modal: React.FC<ModalProps> = ({add, close, customer, title}) => {

    return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
        <div className="modal bg-white p-8 rounded">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <form onSubmit={add}>
            <label htmlFor="name" className="block mb-2">
            Nome:
            </label>
            <input 
            type="text" 
            id="name" 
            name="name"
            defaultValue={customer ? customer.name : ''}
            className="w-full border p-2 rounded mb-4"/>
            <br />
            <label htmlFor="email" className="block mb-2">
            E-mail:
            </label>
            <input 
            type="email" 
            id="email" 
            name="email"
            defaultValue={customer ? customer.email : ''}
            className="w-full border p-2 rounded mb-4"/>
            <br />
            <label htmlFor="number" className="block mb-2">
            Telefone:
            </label>
            <input 
            type="text"
            id="number" 
            name="number"
            pattern="^\([1-9]{2}\) (?:[2-8]|9[0-9])[0-9]{3}\-[0-9]{4}$"
            defaultValue={customer ? customer.number : ''}
            className="w-full border p-2 rounded mb-4"/><br />
            <label htmlFor="cpf" className="block mb-2">
            CPF:
            </label>
            <input 
            type="text"
            id="cpf" 
            name="cpf"
            defaultValue={customer ? customer.cpf : ''}
            className="w-full border p-2 rounded mb-4"/>
            <br />
            <div>
            <button 
                type="submit"
                className="mx-2 bg-green-600 text-white px-4 py-2 rounded">
                Confirmar 
                </button>
            <button
                type="button"
                onClick={close}
                className="mx-2 bg-red-600 text-white px-4 py-2 rounded">
                Cancelar
                </button>
            </div>
        </form>
        </div>
    </div>
)}

export const AddButton: React.FC = () => {

    const { customers, addCustomer } = useCustomers();
    
    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    const AddCustomer = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form)

        const id = customers.length > 0 ? customers[customers.length - 1].id + 1 : 1
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const number = formData.get("number") as string;
        const cpf = formData.get("cpf") as string;

        
        if (!name || !email || !number || !cpf) {
        alert('Preencha todos os campos obrigatórios.');
        return;
        }
        
        if (customers.find(customer =>
            customer.name.toLowerCase().includes(name.toLowerCase()))) {
                alert(`O cliente ${name} já foi inserido.`);
                return;
            }

        const newCustomer = {
        id: id,
        name: name,
        email: email,
        number: number,
        cpf: cpf
        };

        addCustomer(newCustomer);
        setModalOpen(false);
    };

return (
<div>
    <button onClick={openModal}><span className="material-symbols-outlined">
        add</span></button>

    {isModalOpen && (
        <Modal title='Adicionar cliente' add={AddCustomer} close={closeModal} customer={null}></Modal>
    )}
</div>
);
};


interface UpdateButtonProps {
    id: string;
  }
export const UpdateButton: React.FC<UpdateButtonProps> = ({id}) => {

    const { customers, updateCustomer } = useCustomers();
    
    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    
    const index = customers.findIndex(customer => customer.id.toString() === id);

    const updatedCustomers = [...customers];

    const UpdateCustomer = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form)

        const name = formData.get("name");
        const email = formData.get("email");
        const number = formData.get("number");
        const cpf = formData.get("cpf");

        
        
        if (!name || !email || !number || !cpf) {
          alert('Preencha todos os campos obrigatórios.');
          return;
        }

        const newCustomer = {
        id: Number(id),
        name: name as string,
        email: email as string,
        number: number as string,
        cpf: cpf as string
        };

        updatedCustomers[index] = newCustomer
        
        updateCustomer(updatedCustomers);
        setModalOpen(false);
    };

return (
<div>
    <button id={id} onClick={openModal}><span className="material-symbols-outlined">
        edit</span></button>

    {isModalOpen && (
        <Modal title='Editar produto'  add={UpdateCustomer} close={closeModal} customer={updatedCustomers[index]}></Modal>
    )}
</div>
);
};

interface DeleteButtonProps {
    id: string;
  }
export const DeleteButton: React.FC<DeleteButtonProps> = ({id}) => {

    const { customers, updateCustomer } = useCustomers();

    const DeleteCustomer = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const index = customers.findIndex(customer => customer.id.toString() === id);

        const updatedCustomers = [...customers];

        if (index !== -1) {
            updatedCustomers.splice(index, 1);
          }
        updateCustomer(updatedCustomers);
    };

return (
<div>
    <button id={id} onClick={DeleteCustomer}><span className="material-symbols-outlined">
        delete</span></button>
</div>
);
};
