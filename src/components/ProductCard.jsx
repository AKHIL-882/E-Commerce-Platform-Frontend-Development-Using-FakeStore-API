import React from "react";

function ProductCard({ product }) {
  return (
    <div className="border p-4 bg-white rounded-lg shadow-sm">
      {/* Image container with fixed size */}
      <div className="h-48 w-full bg-gray-200 mb-4 flex items-center justify-center overflow-hidden rounded-md">
        {/* Ensure all images fit within the container */}
        <img
          src={product.image}
          alt={product.title}
          className="h-full w-full object-contain"
        />
      </div>

      {/* Product title */}
      <h3 className="font-semibold text-gray-800 text-lg truncate">
        {product.title}
      </h3>

      {/* Product price */}
      <p className="text-gray-600 text-sm">${product.price}</p>
    </div>
  );
}

export default ProductCard;
