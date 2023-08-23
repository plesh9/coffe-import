import axios from "axios"
import $api, { API_URL } from "../http"

export const authApi = {
    async login(email, password) {
        return await $api.post('/login', {email, password}).catch(error => {throw error})
    },
    
    async registration(email, password, firstname, lastname) {
        return await $api.post('/registration', {email, password, firstname, lastname}).catch(error => {throw error})
    },

    async logout() {
        return await $api.post('/logout').catch(error => {throw error})
    },

    async checkAuth() {
        return axios.get(`${API_URL}/refresh`, {withCredentials: true}).catch(error => {throw error})
    },

    async update(id, email, firstname, lastname, oldPassword, newPassword) {
        return await $api.put('/update', {id, email, firstname, lastname, oldPassword, newPassword}).catch(error => {throw error})
    },

    async addSeller(email, password, role) {
        return await $api.put('/add-seller', {email, password, role}).catch(error => {throw error})
    },

    async addAdmin(email, password, firstname, lastname, key) {
        return await $api.put('/add-admin', {email, password, firstname, lastname, key}).catch(error => {throw error})
    },
}
