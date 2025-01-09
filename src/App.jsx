import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import axios from "axios";
import ProductCard from "./components/ProductCard";
import ProductDetail from "./components/ProductDetails";
import Cart from "./components/Cart"; // Import Cart component

function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [currentPage, setCurrentPage] = useState(1);
  const [cart, setCart] = useState([]);
  const [productsPerPage] = useState(6);
  const [wishlist, setWishlist] = useState([]);


  useEffect(() => {
    // Fetch products and categories
    axios.get("https://fakestoreapi.com/products").then((res) => {
      setProducts(res.data);
      setFilteredProducts(res.data);
      setCategories([...new Set(res.data.map((product) => product.category))]);
    });
  }, []);

  // Handle Filters
  const handleFilter = (category) => {
    const filtered = products.filter((product) =>
      product.category === category ? true : false
    );
    setFilteredProducts(filtered.length ? filtered : products);
  };

  const handlePriceChange = ([min, max]) => {
    setPriceRange([min, max]);
    const filtered = products.filter(
      (product) => product.price >= min && product.price <= max
    );
    setFilteredProducts(filtered);
  };

  // Pagination
  const lastProductIndex = currentPage * productsPerPage;
  const firstProductIndex = lastProductIndex - productsPerPage;
  const currentProducts = filteredProducts.slice(
    firstProductIndex,
    lastProductIndex
  );


  return (
    <Router>
      <div className="bg-gray-50 min-h-screen">
        <header className="bg-white shadow sticky top-0 z-10">
          <div className="container mx-auto flex items-center justify-between py-4 px-6">
            <nav className="flex items-center space-x-6">
              <Link to="/" className="text-gray-600 hover:text-black">Home</Link>
              <Link to="/cart" className="text-gray-600 hover:text-black">Cart</Link>
              <Link to="/wishlist" className="text-gray-600 hover:text-black">Wishlist</Link>
            </nav>
            <Link to="/login" className="text-gray-600 hover:text-black">Login</Link>
          </div>
        </header>

        <Routes>
          <Route
            path="/"
            element={
              <div className="container mx-auto mt-6 grid grid-cols-12 gap-6 p-4">
                <aside className="col-span-3">
                  <div className="bg-white p-4 shadow rounded-md">
                    <h2 className="text-lg font-semibold mb-4">Filters</h2>
                    <button
                      className="text-blue-500 text-sm mb-4 hover:underline"
                      onClick={() => setFilteredProducts(products)}
                    >
                      Clear filters
                    </button>

                    <h3 className="text-md font-medium mb-2">Categories</h3>
                    <ul>
                      {categories.map((category, index) => (
                        <li key={index}>
                          <label className="inline-flex items-center space-x-2">
                            <input
                              type="checkbox"
                              onChange={() => handleFilter(category)}
                              className="form-checkbox text-blue-600"
                            />
                            <span>{toTitleCase(category)}</span>
                          </label>
                        </li>
                      ))}
                    </ul>

                    <h3 className="text-md font-medium mt-4 mb-2">Prices</h3>
                    <input
                      type="range"
                      min="0"
                      max="1000"
                      value={priceRange[1]}
                      onChange={(e) => handlePriceChange([0, +e.target.value])}
                      className="w-full"
                    />
                    <p className="text-sm mt-2">Range: ${priceRange[0]} - ${priceRange[1]}</p>
                  </div>
                </aside>
                <section className="col-span-9">
                  <div className="grid grid-cols-3 gap-6">
                    {filteredProducts.slice(0, 6).map((product) => (
                      <Link key={product.id} to={`/product/${product.id}`}>
                        <ProductCard product={product} />
                      </Link>
                    ))}
                  </div>
                </section>
              </div>
            }
          />
          <Route
            path="/product/:id"
            element={<ProductDetail cart={cart} setCart={setCart} wishlist={wishlist} setWishlist={setWishlist} />}
          />

          <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
          <Route
            path="/wishlist"
            element={
              <Wishlist wishlist={wishlist} />
            }
          />

        </Routes>
      </div>
    </Router>
  );
}

function Wishlist({ wishlist }) {
  return (
    <div className="container mx-auto mt-6">
    <h1 className="text-2xl font-bold mb-4">Wishlist</h1>
    <div className="grid grid-cols-3 gap-6">
      {wishlist.map((item) => (
        <div key={item.id} className="p-4 border rounded">
          <img src={item.image} alt={item.title} className="h-40 object-contain mb-4" />
          <h2 className="text-lg font-semibold">{item.title}</h2>
          <p className="text-gray-600">${item.price}</p>
        </div>
      ))}
    </div>
  </div>
  );
}

function toTitleCase(str) {
  return str.toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default App;
