import { useSelector } from "react-redux";
import { usePagination } from "../../hooks/usePagination";
import Pagination from "../Pagination/Pagination";
import CatalogItem from "./CatalogItem";

function CatalogList({ itemsPerPage, pagination = false, listClassName, title }) {
    const {catalog, categories} = useSelector((state) => state.shop)
    const {currentItems, pageCount, handlePageClick, isActive} = usePagination(catalog, itemsPerPage)

    return ( 
        <div className="categories">
            <div className="categories__container">
                <div className="productList__title title">{title ? title : 'Каталог'}</div>
                <ul className={`${listClassName ? listClassName : "category-list"}`}>
                    {currentItems.map(currentCategory => <CatalogItem currentCategory={currentCategory} categories={categories} key={currentCategory.id} />)}
                </ul>
                {pagination && isActive ? <Pagination pageCount={pageCount} handlePageClick={handlePageClick} /> : ''}
            </div>
        </div>
     );
}

export default CatalogList;