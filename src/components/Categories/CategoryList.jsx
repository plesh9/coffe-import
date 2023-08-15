import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { usePagination } from "../../hooks/usePagination";
import { setCurentCatalog } from "../../state/reducers/shopReducer";
import Pagination from "../Pagination/Pagination";
import CategoryItem from "./CategoryItem";

function CategotyList({ itemsPerPage, pagination = false, listClassName, title = 'Каталог'}) {
    const {categories, products, catalog, currentCatalog} = useSelector((state) => state.shop)
    const {currentItems, pageCount, handlePageClick, isActive} = usePagination(categories, itemsPerPage)
    const dispatch = useDispatch()
    const { catalogPath } = useParams()

    useEffect(() => {
        const nowCatalog = catalog.find(catalog => catalog.pathName === catalogPath)
        dispatch(setCurentCatalog(nowCatalog))
      }, [])

    return ( 
        <div className="categories">
            <div className="categories__container">
                <div className="productList__title title">{currentCatalog ? currentCatalog?.title : title}</div>
                <ul className={`${listClassName ? listClassName : "category-list"}`}>
                    {currentItems.map(currentCategory => <CategoryItem catalogPath={catalogPath} currentCategory={currentCategory} products={products} key={currentCategory.id} />)}
                </ul>
                {pagination && isActive ? <Pagination pageCount={pageCount} handlePageClick={handlePageClick} /> : ''}
            </div>
        </div>
     );
}

export default CategotyList;