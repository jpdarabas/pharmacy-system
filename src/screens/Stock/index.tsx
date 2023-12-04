import TableHead from "../../components/TableHead/index.tsx";
import TableItem from "../../components/TableItem/index.tsx";
import { useProducts, AddButton } from "../../components/Products/index.tsx";




interface StockProps {
  // Pode adicionar propriedades específicas, se necessário
}

const Stock: React.FC<StockProps> = () => {

  const { products } = useProducts()

  return (
    <div>
      <h1>Olá, você está na tela de estoque e cadastro!</h1>
      {/* Adicione qualquer conteúdo adicional que você queira exibir no dashboard */}
      <br></br>
      <input
        type="text"
        placeholder="Escolha o produto"
      />
      <br></br>
      <br></br>
      <div>
          <TableHead 
          head_1='ID' 
          head_2='Nome' 
          head_3='Categoria' 
          head_4='Valor'
          head_5='Estoque'
          add= {<AddButton></AddButton>} >

{products.map((product) => (
        
        <TableItem
        item_1={'#'+product.id}
        item_2={product.name}
        item_3={product.category}
        item_4={`R\$${product.value}`}
        item_5={product.stock.toString()}>
          <button className='mx-3'>
            <span className="material-symbols-outlined">edit</span>
          </button> 
          <button className='mx-3'>
          <span className="material-symbols-outlined">delete</span>
          </button>
        </TableItem>

      ))}
          </TableHead>
        </div>
    </div>
  );
};

export default Stock;