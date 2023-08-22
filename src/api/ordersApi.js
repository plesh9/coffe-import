import $api from "../http"

export const ordersApi = {
    async getOrders() {
        return $api.get('/orders').catch(error => {throw error})
    },

    async addOrder(newOrder) {
        return await $api.post('/addOrder', {...newOrder}).catch(error => {throw error})
    },
}
