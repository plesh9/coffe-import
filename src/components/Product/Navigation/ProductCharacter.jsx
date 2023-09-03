import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function ProductCharacter({title=false }) {
  const { productId } = useParams();
  const { products } = useSelector(state => state.shop);
  const currentProduct = products.find(product => product.id === productId);
  return (
    <div className="product__block">
      <h2 className="product__subtitle">Характеристики {title && currentProduct.title}</h2>
      <ul className="product__characters characters-product">
        <li className="characters-product__item">
            <span className="characters-product__name">Виробник:</span>
            <p className="characters-product__value">{currentProduct.vendor}</p>
        </li>
        {currentProduct.params.map((p, i) => (
            <li className="characters-product__item" key={i}>
                <span className="characters-product__name">{p.name}:</span>
                <p className="characters-product__value">{p.value}</p>
            </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductCharacter;
