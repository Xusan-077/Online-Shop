import { useAppContext } from "../../hooks/useAppContext";
import { Link } from "react-router-dom";
import SavatItem from "../../components/SavatItem/SavatItem";
import axios from "axios";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import ProductCardSkeleton from "../../components/ProductCardSkeleton/ProductCardSkeleton";
import ProductItem from "../../components/ProductsItem/ProductsItem";
import { useTranslation } from "react-i18next";

export default function Savat() {
  const { t } = useTranslation();

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { cart } = useAppContext();

  const totalUnits = cart.reduce((acc, el) => acc + el.count, 0);
  const totalSum = cart.reduce(
    (acc, el) => acc + el.product.price * el.count,
    0
  );

  async function getProducts() {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `https://dummyjson.com/products?skip=4&limit=10`
      );
      setProducts(res.data.products);
    } catch (err) {
      console.error("Xatolik yuz berdi:", err);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <section className="savat">
      <div className="savat__container container py-10">
        {cart.length === 0 ? (
          <div className="savat__empty flex flex-col items-center my-[150px]">
            <img
              className="savat__empty-img"
              src="https://uzum.uz/static/img/shopocat.490a4a1.png"
              alt="empty-cart"
              width={150}
              height={150}
            />

            <p className="savat__empty-title text-[1.375rem] mt-6 font-semibold mb-3">
              Savatingiz hozircha bo‘sh
            </p>

            <p className="savat__empty-text mb-6 text-center max-w-md">
              Bosh sahifadan boshlang — kerakli tovarni qidiruv orqali
              topishingiz yoki to‘plamlarni ko‘rishingiz mumkin.
            </p>

            <Link
              className="savat__empty-link bg-[#E6E8ED] text-gray-800 rounded-lg p-[10px_20px]"
              to="/"
            >
              Bosh sahifa
            </Link>
          </div>
        ) : (
          <div className="savat__content">
            <h1 className="savat__title text-[28px] font-bold mb-6">{t("header.basket")}</h1>

            <div className="savat__body flex justify-between items-start gap-5">
              <div className="savat__product border-gray-300 rounded-lg border w-[800px]">
                <ul className="savat__product-list flex flex-col">
                  {cart.map(({ product, count }) => (
                    <SavatItem
                      key={product.id}
                      product={product}
                      count={count}
                    />
                  ))}
                </ul>
              </div>

              <div className="savat__summary w-[30%] rounded-lg border-gray-300 border flex flex-col shadow-sm p-[25px_20px] h-[300px]">
                <h3 className="savat__summary-title text-[16px] font-semibold mb-5">
                  {t("savat.order")}
                </h3>

                <div className="savat__summary-products flex items-center justify-between mb-10">
                  <p className="">
                    {t("savat.products")} ({totalUnits})
                  </p>
                  <p className="">${totalSum.toFixed(2)}</p>
                </div>

                <div className="savat__summary-total mb-auto">
                  <h2 className="savat__summary-label mb-2.5 font-semibold">
                    {t("savat.total")}
                  </h2>
                  <p className="savat__summary-price flex justify-end text-lg font-bold">
                    ${totalSum.toFixed(2)}
                  </p>
                </div>

                <button className="savat__summary-btn text-white cursor-pointer font-semibold bg-[#7000FF] p-[8px_0] w-full rounded-lg mt-4 hover:bg-[#5c00cc] transition-all">
                  {t("savat.formalization")}
                </button>
              </div>
            </div>
          </div>
        )}

        <h1 className="savat__related-title text-[30px] mb-5 font-bold text-black mt-10">
          {t("savat.following")}
        </h1>

        {isLoading ? (
          <ul className="savat__related-list grid gap-6 grid-cols-5 max-w-7xl mx-auto">
            {Array.from({ length: 10 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </ul>
        ) : (
          <ul className="savat__related-list grid gap-6 grid-cols-5 max-w-7xl mx-auto">
            {products.map((el) => (
              <ProductItem
                key={el.id}
                product={el}
                {...el}
                products={products}
                setProducts={setProducts}
              />
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
