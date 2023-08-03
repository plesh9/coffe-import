import { useState } from "react";
import { NavLink } from "react-router-dom";
import missing from "../../images/missing-image.svg"

function CategoryItem({ currentCategory, categories }) {
  
  return (
    <li className="items-main__item">
      <NavLink 
      to={'/catalog/' + currentCategory.pathName} 
      className="items-main__link" 
      >
        <div className="items-main__img">
          <img src={currentCategory.imgUrl} alt="category" />
        </div>
        <p className="items-main__text">{currentCategory.title}</p>
      </NavLink>
    </li>
  );
}

export default CategoryItem;
