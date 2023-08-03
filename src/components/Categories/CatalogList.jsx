import { useState } from "react";
import { useSelector } from "react-redux";
import Pagination from "../Pagination/Pagination";
import CatalogItem from "./CatalogItem";

function CatalogList({ itemsPerPage = 16, pagination = false, listClassName, title }) {
    const {catalog, categories} = useSelector((state) => state.shop)

    const [itemOffset, setItemOffset] = useState(0);

    const endOffset = itemOffset + itemsPerPage;
    const currentItems = catalog?.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(catalog?.length / itemsPerPage);
  
    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % catalog?.length;
      setItemOffset(newOffset);
      window.scrollTo({top: 0});
    };

    return ( 
        <div className="categories">
            <div className="categories__container">
                <div className="productList__title title">{title ? title : 'Каталог'}</div>
                <ul className={`${listClassName ? listClassName : "category-list"}`}>
                    {currentItems.map(currentCategory => <CatalogItem currentCategory={currentCategory} categories={categories} key={currentCategory.id} />)}
                </ul>
                {pagination && <Pagination pageCount={pageCount} handlePageClick={handlePageClick} itemOffset={itemOffset} />}
            </div>
        </div>
     );
}

export default CatalogList;