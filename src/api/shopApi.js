
import axios from "axios"

const SHOP_URL = "https://proxy-cors-server.onrender.com/shop"
// const SHOP_URL = "http://localhost:5000/shop"

export const shopApi = {
  async getShop(){
      return axios.get(SHOP_URL).then((resp) => {
          const parser = new window.DOMParser();
          let xmlDataClean = resp.data.replace(/&/g,"&amp;")
          const xmlData = parser.parseFromString(xmlDataClean, "text/xml");
          console.log(xmlData)

          let products = parseXmlProductToArray(xmlData)
          let categories = parseXmlCategoryToArray(xmlData)

          return {products, categories}
      })
  }
}

function parseXmlProductToArray(data) {
  const productList = data.querySelectorAll("offer");
  const productArray = [];

  productList.forEach((el) => {
    // console.log(el)
    productArray.push({
      title: el.querySelector('name').textContent,
      price: el.querySelector('price').textContent,
      // currency: el.querySelector('currencyId').textContent,
      imgUrl: el.querySelector('picture').textContent,
      vendor: el.querySelector('vendor').textContent,
      description: el.querySelector('description').textContent.replace(/^\n/,''),
      // quantity_in_stock: el.querySelector('quantity_in_stock').textContent,
      categoryId: el.querySelector("categoryId").textContent,
      id: el.getAttribute("id"),
      available: el.getAttribute("available"),
      // params: getParams(el)
    })

    function getParams(el) {
      const params = el.querySelectorAll('param')
      const paramsArray = [];
      params.forEach((param) => { paramsArray.push({ name: param.getAttribute('name'), value: param.textContent }) })
      return paramsArray
    }
  })
  return productArray
}

function parseXmlCategoryToArray(data) {
  const categoryList = data.querySelectorAll("category");
  const categoriesArray = [];
  categoryList.forEach((el) => { categoriesArray.push({ title: el.textContent, id: el.getAttribute("id") }) })
  return categoriesArray
}
