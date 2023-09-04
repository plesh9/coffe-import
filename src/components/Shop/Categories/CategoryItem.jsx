import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import missing from "../../../images/missing-image.svg"

function CategoryItem({ currentCategory, catalogPath }) {
  const { products } = useSelector(state => state.shop)
  
  function getCategoryImg() {
    const currentCategoryProducts = products.filter(product => product.categoryId === currentCategory.id)
    if (currentCategoryProducts.length) {
      return currentCategoryProducts[0].imgUrl
    }
    return missing
  }
  
  return (
    <li className="items-main__item">
      <NavLink 
      to={`/catalog/${catalogPath ? catalogPath : 'coffee-equipment'}/${currentCategory.id}`} 
      className="items-main__link" 
      >
        <div className="items-main__img">
          <img src={getCategoryImg()} alt="category" />
        </div>
        <p className="items-main__text">{currentCategory.title}</p>
      </NavLink>
    </li>
  );
}

export default CategoryItem;
