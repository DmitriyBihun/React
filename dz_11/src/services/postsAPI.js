import axios from "axios"

const BASE_URL = 'https://jsonplaceholder.typicode.com'

export const postsAPI = {
    fetchAllPosts: async () => {
        const res = await axios.get(`${BASE_URL}/posts`)
        return res.data
    }
}