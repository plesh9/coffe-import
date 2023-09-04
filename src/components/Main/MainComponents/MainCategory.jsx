import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setCurentCatalog } from "../../../state/reducers/shopReducer";
import CategoryItem from "../../Shop/Categories/CategoryItem";

function MainCategory() {
  const { categories, products, catalog } = useSelector((state) => state.shop);
  const dispatch = useDispatch();
  const { catalogPath } = useParams();

  useEffect(() => {
    const nowCatalog = catalog.find(
      (catalog) => catalog.pathName === catalogPath
    );
    dispatch(setCurentCatalog(nowCatalog));
  }, []);

  const slicedCategories = categories.slice(0, 7);

  return (
    <div className="items-main">
      <div className="items-main__container">
        <div className="items-main__title title">Популярні категорії</div>
        <ul className="items-main__list">
          {slicedCategories.map((currentCategory) => (
            <CategoryItem
              catalogPath={catalogPath}
              currentCategory={currentCategory}
              products={products}
              key={currentCategory.id}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MainCategory;
