import axios from "axios"

const NOVA_POSHTA_URL = "https://api.novaposhta.ua/v2.0/json/"
const NOVA_POSHTA_API_KEY = "877198b4bcc47aa9c50c5b7ac388b171"

export const novaPoshtaApi = {
  async getCities(){
      return await axios({
        method: 'post',
        url: NOVA_POSHTA_URL,
        params: {},
        data: JSON.stringify({
          modelName: 'Address',
          calledMethod: 'getCities',
          methodProperties: {},
          apiKey: NOVA_POSHTA_API_KEY
        }),
      }).then(response => response.data)
  },
  async getWarehouses(cityName){
    return await axios({
      method: 'post',
      url: NOVA_POSHTA_URL,
      params: {},
      data: JSON.stringify({
        modelName: 'Address',
        calledMethod: 'getWarehouses',
        methodProperties: {
          CityName: cityName
        },
        apiKey: NOVA_POSHTA_API_KEY
      }),
    }).then(response => response.data)
}
}