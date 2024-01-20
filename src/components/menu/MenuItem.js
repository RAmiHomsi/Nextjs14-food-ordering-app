import React from "react";

export default function MenuItem() {
  return (
    <div className="bg-gray-200 p-4 rounded-lg text-center hover:bg-white hover:shadow-md transition-all">
      <div className="flex items-center justify-center">
        <img src="/pizza.png" className="max-h-24" alt="pizza"></img>
      </div>

      <h4 className="font-semibold my-2">Pepperoni Pizza</h4>
      <p className="text-gray-500 text-sm">
        fadsfwgrehjtrjngbdfvrhtrmn bfsvsdvxvcxbxcv
      </p>
      <button className="mt-4 bg-primary text-white rounded-full px-4 py-2">
        Add to cart
      </button>
    </div>
  );
}
