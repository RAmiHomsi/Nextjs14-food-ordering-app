import Image from "next/image";

export default function MenuItemTile({ onAddToCart, ...item }) {
  const { image, description, name, basePrice, sizes, extraIngredientPrices } =
    item;

  return (
    <div className="bg-gray-200 p-4 rounded-lg text-center hover:bg-white hover:shadow-md transition-all">
      <div className="flex items-center justify-center">
        <Image src={image} className="max-h-24" alt="pizza"></Image>
      </div>

      <h4 className="font-semibold my-2">{name}</h4>
      <p className="text-gray-500 text-sm max-h-18 line-clamp-3">
        {description}
      </p>
      <button
        className="mt-4 bg-primary text-white rounded-full px-4 py-2"
        onClick={onAddToCart}
      >
        Add to cart ${basePrice}
      </button>
    </div>
  );
}
