import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAppContext } from "../../hooks/useAppContext";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import Rating from "../Rating";
import TimeOfComent from "../TimeOfComent";

export default function ProductDetail() {
  const { t } = useTranslation();

  const { cart, setCart } = useAppContext();
  const { newId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  const [img, setImg] = useState(null);

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

  useEffect(() => {
    if (product?.thumbnail) setImg(product.thumbnail);
  }, [product]);

  if (loading) {
    return (
      <div className="container">
        <div className="mb-10">
          <div className="h-6 w-[200px] bg-gray-300 rounded animate-pulse mb-[5px]"></div>
          <div className="h-[20px] w-[100px] bg-gray-300 rounded animate-pulse"></div>
        </div>

        <div className="flex items-start justify-between">
          <div className="flex gap-10">
            <div className="flex flex-col gap-2.5">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="w-[63px] h-[84px] rounded-lg bg-gray-300 animate-pulse"
                ></div>
              ))}
            </div>
            <div className="flex gap-3">
              <div className="bg-gray-300 rounded-lg w-[300px] h-[400px] animate-pulse"></div>
              <div className="bg-gray-300 rounded-lg w-[300px] h-[400px] animate-pulse"></div>
            </div>
          </div>

          <div className="w-[35%]">
            <div className="border border-gray-300 p-[30px] rounded-lg mb-4">
              <div className="h-[50px] w-[150px] bg-gray-300 rounded animate-pulse mb-4"></div>
              <div className="h-5 w-[100px] bg-gray-300 rounded animate-pulse mb-2.5"></div>
              <div className="h-3.5 w-full bg-gray-300 rounded animate-pulse mb-5"></div>
              <div className="h-5 w-[200px] bg-gray-300 rounded animate-pulse mb-10"></div>

              <div className="flex flex-col gap-2">
                <div className="h-4 w-[120px] bg-gray-300 rounded animate-pulse"></div>
                <div className="h-4 w-[120px] bg-gray-300 rounded animate-pulse"></div>
                <div className="h-4 w-[120px] bg-gray-300 rounded animate-pulse"></div>
              </div>

              <div className="mt-4">
                <div className="w-full h-[45px] bg-gray-300 rounded-lg animate-pulse"></div>
              </div>
            </div>

            <div className="border border-gray-300 p-5 rounded-lg mb-3">
              <div className="h-[25px] w-[200px] bg-gray-300 rounded animate-pulse mb-2"></div>
              <div className="h-[18px] w-[250px] bg-gray-300 rounded animate-pulse"></div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex gap-3">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="border border-gray-300 rounded-lg p-[25px] w-full animate-pulse"
            >
              <div className="flex items-center justify-between mb-2.5">
                <div className="h-4 w-[100px] bg-gray-300 rounded"></div>
                <div className="h-4 w-[60px] bg-gray-300 rounded"></div>
              </div>
              <div className="h-2.5 w-full bg-gray-300 rounded mb-2"></div>
              <div className="h-2.5 w-[150px] bg-gray-300 rounded mb-2"></div>
              <div className="h-2.5 w-[200px] bg-gray-300 rounded"></div>
            </div>
          ))}
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

  console.log(product);

  return (
    <div className="">
      <div className="container">
        <div className="">
          <div className="mb-10">
            <h2 className="text-[20px] font-semibold mb-[5px]">
              {product.title}
            </h2>
            <Rating rating={product.rating} />
          </div>
          <div className="flex items-start justify-between">
            <div className="">
              <div className="flex gap-10 ">
                <div className="flex flex-col gap-2.5">
                  {product.images ? (
                    product.images?.map((el) => (
                      <img
                        onClick={() => setImg(el)}
                        src={el}
                        className="w-[63px] h-[84px] rounded-lg bg-gray-300 cursor-pointer hover:opacity-80 transition"
                        key={el}
                        alt=""
                      />
                    ))
                  ) : (
                    <img
                      src={product.thumbnail}
                      className="w-[63px] h-[84px] rounded-lg bg-gray-300 cursor-pointer hover:opacity-80 transition"
                      key={el}
                      alt=""
                    />
                  )}
                </div>
                <div className="flex gap-3">
                  <img
                    className="bg-gray-300 rounded-lg w-[300px] h-[400px]"
                    src={img}
                    alt=""
                  />
                  <img
                    className="bg-gray-300 rounded-lg w-[300px] h-[400px]"
                    src={product.images[2]}
                    alt=""
                  />
                </div>
              </div>
              <div className="mt-6">
                <Rating rating={product.rating} bottom />
                <div className="flex gap-3 mt-5">
                  {product.images?.map((el) => (
                    <img
                      onClick={() => setImg(el)}
                      src={el}
                      className="w-[70px] h-[90px] rounded-lg bg-gray-300 cursor-pointer hover:opacity-80 transition"
                      key={el}
                      alt=""
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="w-[35%]">
              <div className="border border-gray-500 p-[30px] rounded-lg mb-4">
                <h2 className="text-[50px] text-[#7F4DFFFF] font-bold">
                  ${product.price}
                </h2>

                <span className="block text-[18px] mb-2.5 text-gray-600">
                  {t("detail.Category")} : {product.category}
                </span>
                <p className="text-[14px] mb-5">{product.description}</p>

                <span className="mb-10 block">
                  {product.warrantyInformation}
                </span>

                <div className="flex flex-col gap-2">
                  <span className="">
                    {t("detail.depth")} : {product.dimensions.depth}
                  </span>
                  <span className="">
                    {t("detail.height")} : {product.dimensions.height}
                  </span>
                  <span className="">
                    {t("detail.width")} : {product.dimensions.width}
                  </span>
                </div>

                <div className="mt-4">
                  {!inCart ? (
                    <button
                      disabled={product.availabilityStatus === "Low Stock"}
                      onClick={handleAddToCart}
                      className={`${
                        product.availabilityStatus === "Low Stock"
                          ? "bg-gray-200"
                          : "bg-[#7000FFFF]"
                      } cursor-pointer flex items-center justify-center w-full gap-2 p-[13px] rounded-lg`}
                    >
                      <span
                        className={`${
                          product.availabilityStatus === "Low Stock"
                            ? "text-red-500"
                            : "text-white"
                        } text-sm font-semibold`}
                      >
                        {product.availabilityStatus === "Low Stock"
                          ? t("detail.lowStock")
                          : t("detail.addToCart")}
                      </span>
                    </button>
                  ) : (
                    <div className="flex gap-3">
                      <div className="flex items-center w-[65%] justify-between bg-[#F0F2F5FF] p-2 rounded-lg">
                        <button
                          onClick={handleDecreaseCount}
                          className="text-[20px] text-black bg-white w-[30px] h-[30px] flex items-center justify-center rounded"
                        >
                          -
                        </button>
                        <p className="text-[18px] font-semibold">
                          {inCart.count}
                        </p>
                        <button
                          onClick={handleAddToCart}
                          className="text-[20px] text-black bg-white w-[30px] h-[30px] flex items-center justify-center rounded"
                        >
                          +
                        </button>
                      </div>
                      <Link
                        className="w-[35%] p-[10px_0] justify-center rounded-lg text-[#7F4DFFFF] flex gap-3 bg-[#d8c9ff]"
                        to="/savat"
                      >
                        {t("detail.goToCart")}
                        <i class="bi bi-basket3"></i>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
              <div className="border-gray-500 border p-5 rounded-lg mb-3">
                <h2 className="text-[25px] font-bold">
                  {t("detail.deliveryTomorrow")}
                </h2>
                <p className="text-[18px] text-gray-500">
                  {t("detail.deliveryInfo")}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="">
          <div className="mt-2.5">
            <h2 className="text-[30px] font-bold text-[#7F4DFFFF] mb-3">
              {t("detail.reviews")}
            </h2>
            <div className="flex gap-3">
              {product.reviews.map((el, i) => {
                return (
                  <div
                    key={i}
                    className="border border-gray-500 rounded-lg p-[25px] w-full"
                  >
                    <div className="flex items-center justify-between mb-2.5">
                      <span className="">{el.reviewerName}</span>
                      <Rating nan rating={el.rating} />
                    </div>
                    <h2 className="text-[14px] text-gray-500">{el.comment}</h2>
                    <TimeOfComent key={i} Time={el.date} />
                    <span className="block">{el.reviewerEmail}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
