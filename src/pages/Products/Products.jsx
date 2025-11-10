import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

import axios from "axios";
import { useEffect, useState } from "react";
import ProductItem from "../../components/ProductsItem/ProductsItem";
import ProductCardSkeleton from "../../components/ProductCardSkeleton/ProductCardSkeleton";
import { useTranslation } from "react-i18next";

export default function Products() {
  const { t } = useTranslation();

  const [page, setPage] = useState(0);
  const [products, setProducts] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [totalPage, setTotalPage] = useState(0);

  let [limit, setLimit] = useState(20);

  async function getProducts() {
    setIsLoading(true);

    let res = await axios.get(
      `https://dummyjson.com/products?skip=${page * limit}&limit=${limit}`
    );

    setIsLoading(false);

    console.log(res.data.products);

    setProducts(res.data.products);
    setTotalPage(res.data.total);
  }

  useEffect(() => {
    getProducts();
  }, [page, limit]);

  return (
    <section className="products">
      <div className="container">
        <div className="products__slider-wrapper mt-5 mb-[50px]">
          {isLoading ? (
            <div className="products__slider-loading flex justify-center items-center h-[400px] rounded-lg bg-gray-200"></div>
          ) : (
            <Swiper
              modules={[Autoplay]}
              navigation
              autoplay={{ delay: 3000 }}
              pagination={{ clickable: true }}
              loop
              className="products__slider w-full h-[400px]"
            >
              <SwiperSlide key="1" className="products__slide">
                <img
                  className="products__slide-img rounded-xl"
                  src="https://images.uzum.uz/d44rthdv2sjo4rvgd0jg/main_page_banner.jpg"
                  alt="banner 1"
                />
              </SwiperSlide>
              <SwiperSlide key="2" className="products__slide">
                <img
                  className="products__slide-img rounded-xl"
                  src="https://images.uzum.uz/d44tp2mj76ohd6dvot9g/main_page_banner.jpg"
                  alt="banner 2"
                />
              </SwiperSlide>
              <SwiperSlide key="3" className="products__slide">
                <img
                  className="products__slide-img rounded-xl"
                  src="https://images.uzum.uz/d3rg2v34eu2v7vmclj70/main_page_banner.jpg"
                  alt="banner 3"
                />
              </SwiperSlide>
            </Swiper>
          )}
        </div>

        <h1 className="products__title text-[30px] mb-5 font-bold text-black">
          {t("products.price")}
        </h1>

        {isLoading ? (
          <ul className="products__list grid gap-6 grid-cols-5">
            {Array.from({ length: 10 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </ul>
        ) : (
          <ul className="products__list grid items-center gap-6 grid-cols-5">
            {products.map((el) => (
              <ProductItem
                className="products__item"
                products={products}
                setProducts={setProducts}
                product={el}
                key={el.id}
                {...el}
              />
            ))}
          </ul>
        )}

        <div className="products__pagination flex items-center gap-10 justify-center mt-5">
          <button
            className={`products__btn-prev cursor-pointer ${
              page === 0 ? "opacity-40" : ""
            }`}
            disabled={page === 0}
            onClick={() => setPage(page - 1)}
          >
            {t("products.pagination.prev")}
          </button>

          <div className="products__pages flex gap-5">
            {Array.from({ length: Math.ceil(totalPage / limit) }).map(
              (el, index) => (
                <div
                  key={index}
                  onClick={(evt) => setPage(0 + evt.target.innerHTML)}
                  className={`products__page-number ${
                    index + 1 == page
                      ? "border-gray-500 border rounded-[3px]"
                      : ""
                  } cursor-pointer p-[10px_15px]`}
                >
                  {index + 1}
                </div>
              )
            )}
          </div>

          <button
            className={`products__btn-next cursor-pointer ${
              page + 1 === Math.ceil(totalPage / limit) ? "opacity-40" : ""
            }`}
            disabled={page + 1 === Math.ceil(totalPage / limit)}
            onClick={() => setPage(page + 1)}
          >
            {t("products.pagination.next")}
          </button>

          <select
            className="products__limit-select"
            onChange={(evt) => setLimit(Number(evt.target.value))}
          >
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="40">40</option>
          </select>
        </div>
      </div>
    </section>
  );
}
