const navigate = {
    getProductDetail: (category, id) => `/products/${category}/${id}`,
    getCategory: (category) => `/products/${category}`,
};

export default navigate;
