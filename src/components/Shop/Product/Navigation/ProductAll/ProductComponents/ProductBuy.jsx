import { useCart } from "../../../../../../hooks/useCart";

function ProductBuy({ currentProduct }) {
  const { handleAddToCart } = useCart();

  const getPrs = () => Math.ceil(+currentProduct.price - (+currentProduct.price / 100) * 20)

  return (
    <div className="product__buy product__wrap">
      <div className="product__sell sell-product">
        <div className="sell-product__info">Замовлення зроблене до 11-ї години відправимо того ж дня!</div>
        <div className="sell-product__status">Готовий до відправки</div>
      </div>
      <ul className="product__prices">
        <li className="product__price product__price-old">{getPrs()} ₴</li>
        <li className="product__price product__price-current">{currentProduct.price} ₴</li>
      </ul>
      <button className="product__btn btn" onClick={() => handleAddToCart(currentProduct)}>
        Купити
      </button>
    </div>
  );
}

export default ProductBuy;
