import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function ProductDetails({ cart, setCart, wishlist, setWishlist }) {
  const { id } = useParams();
  const [product, setProduct] = React.useState(null);
  const [quantity, setQuantity] = React.useState(1);
  const [selectedSize, setSelectedSize] = React.useState(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/${id}`).then((res) => {
      setProduct(res.data);
    });
  }, [id]);

  const handleQuantityChange = (type) => {
    setQuantity((prev) => (type === "increase" ? prev + 1 : Math.max(prev - 1, 1)));
  };

  const handleSizeSelection = (size) => {
    setSelectedSize(size);
  };

  const addToCart = () => {
    const productWithDetails = { ...product, quantity, selectedSize };
    setCart((prev) => [...prev, productWithDetails]);
    navigate("/cart");
  };

  const addToWishlist = () => {
    if (!wishlist.some((item) => item.id === product.id)) {
      setWishlist((prevWishlist) => [...prevWishlist, product]);
    }
  };


  if (!product) return <p>Loading product details...</p>;

  return (
    <div className="container mx-auto mt-6 flex flex-wrap">
      {/* Left: Image Section */}
      <div className="w-full md:w-1/2 flex justify-center">
        <img
          src={product.image}
          alt={product.title}
          className="w-3/4 md:w-full max-h-96 object-contain"
        />
      </div>

      {/* Right: Product Details Section */}
      <div className="w-full md:w-1/2 p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">{product.title}</h1>
          <button onClick={addToWishlist} className="text-red-500 hover:text-red-700">
            ❤️
          </button>
        </div>

        <p className="text-lg font-semibold mb-4">Price: ${product.price}</p>
        <p className="text-gray-600 mb-4">{product.description}</p>

        <div className="mb-4">
          <p className="text-lg font-semibold mb-2">Size:</p>
          <div className="flex space-x-4">
            {["S", "M", "L"].map((size) => (
              <button
                key={size}
                className={`px-4 py-2 border rounded ${selectedSize === size
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-600"
                  } hover:bg-blue-500 hover:text-white`}
                onClick={() => handleSizeSelection(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-4 mb-6">
          <p className="text-lg font-medium">Quantity:</p>
          <button
            onClick={() => handleQuantityChange("decrease")}
            className="px-4 py-2 border rounded bg-white hover:bg-gray-100"
          >
            -
          </button>
          <span className="text-lg font-semibold">{quantity}</span>
          <button
            onClick={() => handleQuantityChange("increase")}
            className="px-4 py-2 border rounded bg-white hover:bg-gray-100"
          >
            +
          </button>
        </div>

        <button
          onClick={addToCart}
          disabled={!selectedSize}
          className={`w-full py-3 rounded text-white ${selectedSize ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-400"
            }`}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductDetails;
