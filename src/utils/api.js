// src/utils/api.js

export const fetchProducts = async () => {
    const response = await fetch('https://fakestoreapi.com/products');
    console.log(response);
    return await response.json();
  };
  
  export const fetchProductDetails = async (id) => {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    return await response.json();
  };
  