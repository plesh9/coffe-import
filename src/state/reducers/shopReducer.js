import { shopApi } from "../../api/shopApi";

const SET_PRODUCTS = 'SET_PRODUCTS'
const SET_CATEGORIES = 'SET_CATEGORIES'
const SET_CURRENT_CATALOG = 'SET_CURRENT_CATALOG'
const SET_CURRENT_CATEGORY = 'SET_CURRENT_CATEGORY'
const SET_FILTER_PRODUCTS = 'SET_FILTER_PRODUCTS'
const SET_IS_LOADING = 'SET_IS_LOADING'

let initialState = {
    products: [],
    categories: [],
    catalog: [ 
        {title: 'Кавове обладнання', pathName: 'coffee-equipment', imgUrl: 'https://thumb.tildacdn.com/tild3036-3837-4036-b435-313737343162/-/format/webp/Saeco_Lirika_Plus_-_.png', id: 1}
    ],
    filterProducts: [],
    currentCategory: null,
    currentCatalog: null,
    isLoading: true
}

const shopReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PRODUCTS:
            return  {
                ...state,
                products: action.products
            }
        case SET_CATEGORIES:
            return  {
                ...state,
                categories: action.categories
            }
        case SET_CURRENT_CATALOG:
            return  {
                ...state,
                currentCatalog: action.currentCatalog
            }
        case SET_CURRENT_CATEGORY:
            return  {
                ...state,
                currentCategory: action.currentCategory
            }
        case SET_FILTER_PRODUCTS:
            return  {
                ...state,
                filterProducts: action.filterProducts
            }
        case SET_IS_LOADING:
            return  {
                ...state,
                isLoading: action.state
            }
            
        default: return state
    }
}

// get && set shop
const setProducts = (products) => {
    return { type: SET_PRODUCTS, products }
}
const setCategories = (categories) => {
    return { type: SET_CATEGORIES, categories }
}
export const getShop = () =>{
    return dispatch => shopApi.getShop().then(({products, categories}) => {
        dispatch(setProducts(products))
        dispatch(setCategories(categories))
    }) 
}
// set current catalog
export const setCurentCatalog = (currentCatalog) => {
    return { type: SET_CURRENT_CATALOG, currentCatalog }
}
// set current category
export const setCurentCategory = (currentCategory) => {
    return { type: SET_CURRENT_CATEGORY, currentCategory }
}
// set filter products
export const setFilterProducts = (filterProducts) => {
    return { type: SET_FILTER_PRODUCTS, filterProducts }
}
// set loading
export const setIsLoading = (state) => {
    return { type: SET_IS_LOADING, state }
}

export default shopReducer;