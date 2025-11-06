import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../hooks/useAppContext";

export default function ProductItem({
  title,
  price,
  discountPercentage,
  rating,
  brand,
  availabilityStatus,
  description,
  thumbnail,
  category,
  id,
  product,
}) {
  const navigate = useNavigate();
  const { cart, setCart } = useAppContext();

  const inCart = cart.find((el) => el.product.id === product.id);

  function handleNavigate(Id) {
    navigate(`/products/${Id}`);
  }

  function handleAddToCart() {
    if (inCart) {
      const updatedCart = cart.map((el) =>
        el.product.id === product.id ? { ...el, count: el.count + 1 } : el
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { product, count: 1 }]);
    }
  }

  function handleDecreaseCount() {
    if (inCart.count === 1) {
      const filteredCart = cart.filter((el) => el.product.id !== product.id);
      setCart(filteredCart);
    } else {
      const updatedCart = cart.map((el) =>
        el.product.id === product.id ? { ...el, count: el.count - 1 } : el
      );
      setCart(updatedCart);
    }
  }

  return (
    <li
      role="button"
      tabIndex={0}
      className="bg-white border cursor-pointer border-gray-200 rounded-lg overflow-hidden shadow-sm duration-300 flex flex-col"
    >
      <div className="relative w-full h-56 overflow-hidden p-[20px_0_0_0]">
        <div className="flex justify-center">
          <img
            src={thumbnail}
            alt={title}
            className="w-[250px] h-[200px] object-contain"
          />
        </div>
        {discountPercentage > 0 && (
          <span className="absolute top-3 left-3 bg-gradient-to-r from-pink-500 to-red-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-md">
            -{discountPercentage}%
          </span>
        )}
        <span className="absolute top-3 right-3 bg-gray-900/70 text-white text-[11px] px-2 py-0.5 rounded-md uppercase tracking-wide">
          {category}
        </span>
      </div>

      <div className="flex flex-col p-4">
        <h3 className="text-base font-semibold text-gray-900 mb-1 line-clamp-1">
          {title}
        </h3>
        <p className="text-gray-500 text-sm mb-3 line-clamp-1">{description}</p>

        <div className="flex justify-between items-center mb-2">
          <span className="text-lg font-bold text-blue-600">${price}</span>
          <span className="text-yellow-500 text-sm font-semibold flex items-center gap-1">
            {rating}
          </span>
        </div>

        <div className="flex justify-between text-xs text-gray-600 mb-3">
          <span className="font-medium">{brand}</span>
          <span
            className={`font-medium ${
              availabilityStatus === "In Stock"
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {availabilityStatus}
          </span>
        </div>

        {!inCart ? (
          <button
            disabled={availabilityStatus == "Low Stock"}
            onClick={handleAddToCart}
            className={`${
              availabilityStatus == "Low Stock" ? "" : "bg-[#7000FFFF] "
            } cursor-pointer flex items-center justify-center w-full gap-[5px] p-[5px_0] rounded-lg`}
          >
            <span
              className={`${
                availabilityStatus == "Low Stock"
                  ? "text-red-500"
                  : "text-white"
              }  text-6`}
            >
              {availabilityStatus == "Low Stock" ? "Low Stock" : "+ Savatga"}
            </span>
          </button>
        ) : (
          <div className="justify-between p-[5px] cursor-pointer flex items-center bg-[#F0F2F5FF] w-full gap-[5px] rounded-lg">
            <button
              onClick={handleDecreaseCount}
              className="cursor-pointer text-[20px] text-black bg-white w-[25px] flex items-center justify-center"
            >
              -
            </button>
            <p className="text-[18px]">{inCart.count}</p>
            <button
              onClick={handleAddToCart}
              className="cursor-pointer text-[20px] text-black bg-white w-[25px] rounded-lg flex items-center justify-center"
            >
              +
            </button>
          </div>
        )}
      </div>
    </li>
  );
}
