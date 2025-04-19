const BASE_URL = "http://localhost:4000/api/v1"

export const categoryEndpoints = {
    GET_ALL_CATEGORY : BASE_URL + "/category/getallcategory"
}

export const productEndpoints = {
    GET_ALL_PRODUCT_BY_CATEGORY_ID : (categoryId) => BASE_URL +`/product/get-product/${categoryId}`,
    GET_PRODUCT_BY_PRODUCT_ID : (productId) => BASE_URL +`/product/get-product-by-id/${productId}`

}

export const orderEndpoints = {
    CREATE_ORDER : BASE_URL + "/order/createorder",
    GET_ALL_ORDER : (phone) => BASE_URL + `/order/getorder/${phone}`
}