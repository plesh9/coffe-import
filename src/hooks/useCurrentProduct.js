import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export const useCurrentProduct = () => {
  const { productId } = useParams();
  const { products } = useSelector((state) => state.shop);
  const currentProduct = products.find((product) => product.id === productId);
  const productPath = "/product/" + productId;

  return { currentProduct, productPath };
};
