import "./products.scss"
import React, { useState, useEffect } from "react";
import NotFound from "../../NotFound";
import ProductCard from "./ProductCard";
import Pagination from "../../Pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setCurentCategory, setFilterProducts} from "../../../state/reducers/shopReducer";
import { usePagination } from "../../../hooks/usePagination";
import { useCart } from "../../../hooks/useCart";

function Products({ itemsPerPage }) {
  const { products, categories, filterProducts, currentCategory } = useSelector(state => state.shop);
  const { currentItems, pageCount, handlePageClick, isActive } = usePagination(filterProducts, itemsPerPage);
  const { handleAddToCart } = useCart();
  const dispatch = useDispatch();
  const { categoryId } = useParams();

  useEffect(() => {
    const nowCategory = categories.find(
      (category) => category.id === categoryId
    );
    dispatch(setCurentCategory(nowCategory));

    if (nowCategory) {
      const filterProducts = products.filter(
        (product) => product.categoryId === categoryId
      );
      dispatch(setFilterProducts(filterProducts));
    } else {
      dispatch(setFilterProducts(products));
      dispatch(setCurentCategory(null));
    }
  }, []);

  return (
    <div className="products">
      <div className="products__container">
        <h1 className="products__title title">{currentCategory?.title}</h1>
        {currentItems?.length ? 
          <>
            <ul className="list-product">
              {currentItems.map((item) => (
                <ProductCard
                  currentItem={item}
                  handleAddToCart={handleAddToCart}
                  key={item.id}
                />
              ))}
            </ul>
            {isActive ? <Pagination pageCount={pageCount} handlePageClick={handlePageClick} /> : ""}
          </>
          : <NotFound title="На даний момент цього товару немає в наявності" />}
      </div>
    </div>
  );
}

export default Products;
