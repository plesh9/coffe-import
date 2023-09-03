import React, { useState, useEffect } from "react";
import NotFound from "../NotFound";
import CardItem from "./CardItem";
import Pagination from "../Pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { setCurentCategory, setFilterProducts } from "../../state/reducers/shopReducer";
import { usePagination } from "../../hooks/usePagination";
import { useCart } from "../../hooks/useCart";


function PaginatedItems({ itemsPerPage, pagination = false, title = 'Всі категорії'}) {
  const {products, categories, filterProducts, currentCategory} = useSelector((state) => state.shop)
  const dispatch = useDispatch()
  const { handleAddToCart } = useCart()

  const {currentItems, pageCount, handlePageClick, isActive} = usePagination(filterProducts, itemsPerPage)
  const { categoryId } = useParams();

  useEffect(() => {
    const nowCategory = categories.find(category => category.id === categoryId)
    dispatch(setCurentCategory(nowCategory))

    if (nowCategory) {
      const filterProducts = products.filter(product => product.categoryId === categoryId )
      dispatch(setFilterProducts(filterProducts))
    } else {
      dispatch(setFilterProducts(products))
      dispatch(setCurentCategory(null))
    } 
  }, [])

  return (
      <div className="productList">
          <div className="productList__container">
              <div className="productList__title title">{currentCategory ? currentCategory.title : title}</div>
              {currentItems.length ? 
                <>
                  <div className="cards-main__list">
                      {currentItems.map(item => <CardItem currentItem={item} handleAddToCart={handleAddToCart} key={item.id} />)}
                  </div>
                  {pagination && isActive ? <Pagination pageCount={pageCount} handlePageClick={handlePageClick} /> : ''}
                </> : ''}
            {!currentItems.length && <NotFound title='На даний момент цього товару немає в наявності' />}
          </div>
      </div>
  );
}

export default PaginatedItems;
