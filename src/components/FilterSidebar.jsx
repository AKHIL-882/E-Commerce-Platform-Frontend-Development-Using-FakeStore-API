import React from "react";

function FilterSidebar({ categories, onFilter, onPriceChange, priceRange }) {
  return (
    <aside className="w-1/4 pr-6">
      <h2 className="font-bold mb-4">Filters</h2>
      <div>
        <h3 className="font-semibold mb-2">Categories</h3>
        {categories.map((category, index) => (
          <div key={index} className="mb-2">
            <input
              type="checkbox"
              id={category}
              onChange={() => onFilter(category)}
              className="mr-2"
            />
            <label htmlFor={category}>{category}</label>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <h3 className="font-semibold mb-2">Prices</h3>
        <input
          type="range"
          min={priceRange[0]}
          max={priceRange[1]}
          className="w-full"
          onChange={(e) =>
            onPriceChange([priceRange[0], parseFloat(e.target.value)])
          }
        />
        <div className="text-gray-600">
          Range: ${priceRange[0]} - ${priceRange[1]}
        </div>
      </div>
    </aside>
  );
}

export default FilterSidebar;
