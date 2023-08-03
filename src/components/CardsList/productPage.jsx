import React, { useState, useEffect } from "react";
import NotFound from "../NotFound";
import CardItem from "./CardItem";
import Pagination from "../Pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { setCurentCategory, setFilterProducts } from "../../state/reducers/shopReducer";
import { scrollLock } from "../../tools/subFunctions";
import { addToCart, showCart } from "../../state/reducers/cartReducer";


function PaginatedItems({ itemsPerPage = 16, pagination = false, title = 'Всі категорії'}) {
  const {products, categories, filterProducts, currentCategory} = useSelector((state) => state.shop)

  const dispatch = useDispatch()
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

  const onByProduct = (currentItem) => {
    let cartItem = {
      title: currentItem.title,
      id: currentItem.id, 
      imgUrl: currentItem.imgUrl,
      price: currentItem.price,
      dropPrice: 0,
      count: 1,
      totalPrice: currentItem.price
    }

    dispatch(addToCart(cartItem))
    dispatch(showCart(true))
    scrollLock()
  }

  // pagination
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = filterProducts?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(filterProducts?.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filterProducts?.length;
    setItemOffset(newOffset);
    window.scrollTo({top: 0});
  };

  return (
      <div className="productList">
          <div className="productList__container">
              <div className="productList__title title">{currentCategory ? currentCategory.title : title}</div>
              {currentItems.length ? 
                <>
                  <div className="cards-main__list">
                      {currentItems.map(item => <CardItem currentItem={item} onByProduct={onByProduct} key={item.id} />)}
                  </div>
                  {pagination && <Pagination pageCount={pageCount} handlePageClick={handlePageClick} itemOffset={itemOffset} />}
                </> : ''}
            {!currentItems.length && <NotFound title='На даний момент цього товару немає в наявності' />}
          </div>
      </div>
  );
}

export default PaginatedItems;
