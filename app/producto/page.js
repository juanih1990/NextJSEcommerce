import ProductList from "../componentes/ProductList";
import mockData from "../data/mockData";


export default function Home() {
  return (
    <div>
      <ProductList category={'all'} data= {mockData} />
    </div>
  );
}
