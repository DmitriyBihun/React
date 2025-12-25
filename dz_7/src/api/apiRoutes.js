const backendUrl = 'https://simple-backend-2-r1ri.onrender.com'

export default {
  productsList: `${backendUrl}/products`,
  addProduct: `${backendUrl}/products`,
  getUpdateProductLink: (id) => `${backendUrl}/products/${id}`,
  getProductById: (id) => `${backendUrl}/products/${id}`,
  getDeleteProductLink: (id) => `${backendUrl}/products/${id}`,
}
