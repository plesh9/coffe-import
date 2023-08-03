import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setCurentCatalog } from "../../state/reducers/shopReducer";
import Pagination from "../Pagination/Pagination";
import CategoryItem from "./CategoryItem";

function CategotyList({ itemsPerPage = 16, pagination = false, listClassName, title = 'Каталог'}) {
    const {categories, products, catalog, currentCatalog} = useSelector((state) => state.shop)
    const dispatch = useDispatch()
    const { catalogPath } = useParams()

    useEffect(() => {
        const nowCatalog = catalog.find(catalog => catalog.pathName === catalogPath)
        dispatch(setCurentCatalog(nowCatalog))
      }, [])

    const [itemOffset, setItemOffset] = useState(0);

    const endOffset = itemOffset + itemsPerPage;
    const currentItems = categories?.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(categories?.length / itemsPerPage);
  
    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % categories?.length;
      setItemOffset(newOffset);
      window.scrollTo({top: 0});
    };



    return ( 
        <div className="categories">
            <div className="categories__container">
                <div className="productList__title title">{currentCatalog ? currentCatalog?.title : title}</div>
                <ul className={`${listClassName ? listClassName : "category-list"}`}>
                    {currentItems.map(currentCategory => <CategoryItem catalogPath={catalogPath} currentCategory={currentCategory} products={products} key={currentCategory.id} />)}
                </ul>
                {pagination && <Pagination pageCount={pageCount} handlePageClick={handlePageClick} itemOffset={itemOffset} />}
            </div>
        </div>
     );
}

export default CategotyList;