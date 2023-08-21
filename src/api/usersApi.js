import $api from "../http"

export const usersApi = {
    async getUsers() {
        return $api.get('/users').catch(error => {throw error})
    }
}
