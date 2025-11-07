import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppContext } from "../../hooks/useAppContext";
import { toast } from "react-toastify";

export default function ProductDetail() {
  const { cart, setCart } = useAppContext();
  const { newId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  const inCart = product && cart.find((el) => el.product.id === product.id);

  function handleAddToCart() {
    if (inCart) {
      const updatedCart = cart.map((el) =>
        el.product.id === product.id ? { ...el, count: el.count + 1 } : el
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { product, count: 1 }]);
      toast.success("Product added to cart");
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

  async function getProduct() {
    try {
      setLoading(true);
      const res = await axios.get(`https://dummyjson.com/products/${newId}`);
      setProduct(res.data);
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getProduct();
  }, [newId]);

  if (loading) {
    return (
      <div className="flex min-h-[67vh] flex-col justify-center items-center py-10 px-5 animate-pulse">
        <div className="w-full max-w-5xl bg-white rounded-2xl shadow-md overflow-hidden p-6">
          <div className="w-16 h-4 bg-gray-200 rounded mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="bg-gray-100 rounded-xl p-6 flex justify-center items-center">
              <div className="w-full max-w-sm h-[300px] bg-gray-200 rounded-xl" />
            </div>
            <div className="flex flex-col justify-between">
              <div>
                <div className="h-6 bg-gray-200 rounded w-2/3 mb-4" />
                <div className="h-4 bg-gray-200 rounded w-full mb-4" />
                <div className="h-4 bg-gray-200 rounded w-5/6 mb-6" />
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-8 w-20 bg-gray-200 rounded" />
                  <div className="h-6 w-16 bg-gray-200 rounded" />
                </div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2" />
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2" />
                <div className="h-4 bg-gray-200 rounded w-1/3" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500 text-lg">
        Product not found!
      </div>
    );
  }

  return (
    <div className="flex min-h-[67vh] flex-col justify-center items-center py-10 px-5">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-md overflow-hidden p-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition"
        >
          <span>Back</span>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="flex justify-center items-center bg-gray-100 rounded-xl p-6">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full max-w-sm h-auto object-contain"
            />
          </div>

          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {product.title}
              </h1>
              <p className="text-gray-600 mb-4">{product.description}</p>

              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl font-bold text-blue-600">
                  ${product.price}
                </span>
                {product.discountPercentage > 0 && (
                  <span className="bg-gradient-to-r from-pink-500 to-red-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-md">
                    -{product.discountPercentage}%
                  </span>
                )}
              </div>

              <p className="text-sm text-gray-700 mb-2">
                <span className="font-semibold">Brand:</span> {product.brand}
              </p>
              <p className="text-sm text-gray-700 mb-2">
                <span className="font-semibold">Category:</span>{" "}
                {product.category}
              </p>
              <p
                className={`text-sm font-semibold ${
                  product.availabilityStatus === "In Stock"
                    ? "text-green-600"
                    : "text-red-500"
                }`}
              >
                {product.availabilityStatus || "In Stock"}
              </p>

              <div className="mt-4">
                {!inCart ? (
                  <button
                    disabled={product.availabilityStatus === "Low Stock"}
                    onClick={handleAddToCart}
                    className={`${
                      product.availabilityStatus === "Low Stock"
                        ? "bg-gray-200"
                        : "bg-[#7000FFFF]"
                    } cursor-pointer flex items-center justify-center w-full gap-2 p-2 rounded-lg`}
                  >
                    <span
                      className={`${
                        product.availabilityStatus === "Low Stock"
                          ? "text-red-500"
                          : "text-white"
                      } text-sm font-semibold`}
                    >
                      {product.availabilityStatus === "Low Stock"
                        ? "Low Stock"
                        : "Savatga"}
                    </span>
                  </button>
                ) : (
                  <div className="flex items-center justify-between bg-[#F0F2F5FF] p-2 rounded-lg">
                    <button
                      onClick={handleDecreaseCount}
                      className="text-[20px] text-black bg-white w-[30px] h-[30px] flex items-center justify-center rounded"
                    >
                      -
                    </button>
                    <p className="text-[18px] font-semibold">{inCart.count}</p>
                    <button
                      onClick={handleAddToCart}
                      className="text-[20px] text-black bg-white w-[30px] h-[30px] flex items-center justify-center rounded"
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
