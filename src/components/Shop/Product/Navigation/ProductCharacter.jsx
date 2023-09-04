import { useCurrentProduct } from "../../../../hooks/useCurrentProduct";

function ProductCharacter({ title = false }) {
  const { currentProduct } = useCurrentProduct();

  return (
    <div className="product__block">
      <h2 className="product__subtitle">
        Характеристики {title && currentProduct.title}
      </h2>
      <ul className="product__characters characters-product">
        <li className="characters-product__item">
          <span className="characters-product__name">Виробник:</span>
          <p className="characters-product__value">{currentProduct.vendor}</p>
        </li>
        {currentProduct.params.length ? 
          <>
            {currentProduct.params.map((p, i) => (
              <li className="characters-product__item" key={i}>
                <span className="characters-product__name">{p.name}:</span>
                <p className="characters-product__value">{p.value}</p>
              </li>
            ))}
          </> : ""
          }
      </ul>
    </div>
  );
}

export default ProductCharacter;
