import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

import axios from "axios";
import { useEffect, useState } from "react";
import ProductItem from "../../components/ProductsItem/ProductsItem";
import ProductCardSkeleton from "../../components/ProductCardSkeleton/ProductCardSkeleton";

export default function Products() {
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

    setProducts(res.data.products);
    setTotalPage(res.data.total);
  }

  useEffect(() => {
    getProducts();
  }, [page, limit]);

  return (
    <>
      <div className="container">
        <div className="mt-5 mb-[50px]">
          {isLoading ? (
            <div className="flex justify-center items-center h-[400px] rounded-lg bg-gray-200"></div>
          ) : (
            <Swiper
              modules={[Autoplay, Navigation]}
              navigation
              autoplay={{ delay: 3000 }}
              pagination={{ clickable: true }}
              loop
              className="w-full h-[400px]"
            >
              <SwiperSlide key="1">
                <img
                  className="rounded-xl"
                  src="https://images.uzum.uz/d44rthdv2sjo4rvgd0jg/main_page_banner.jpg"
                  alt=""
                />
              </SwiperSlide>
              <SwiperSlide key="2">
                <img
                  className="rounded-xl"
                  src="https://images.uzum.uz/d44tp2mj76ohd6dvot9g/main_page_banner.jpg"
                  alt=""
                />
              </SwiperSlide>
              <SwiperSlide key="3">
                <img
                  className="rounded-xl"
                  src="https://images.uzum.uz/d3rg2v34eu2v7vmclj70/main_page_banner.jpg"
                  alt=""
                />
              </SwiperSlide>
            </Swiper>
          )}
        </div>

        <h1 className="text-[30px]  mb-5 font-bold  text-black">
          Arzon narxlar
        </h1>

        {isLoading ? (
          <ul className="grid gap-6 grid-cols-5 max-w-7xl mx-auto">
            {Array.from({ length: 10 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </ul>
        ) : (
          <ul className="grid gap-6 grid-cols-5 max-w-7xl mx-auto">
            {products.map((el) => (
              <ProductItem product={el} key={el.id} {...el} />
            ))}
          </ul>
        )}

        <div className="flex items-center gap-10 justify-center mt-5">
          <button
            className={`cursor-pointer ${page === 0 ? "opacity-40" : ""} `}
            disabled={page === 0}
            onClick={() => setPage(page - 1)}
          >
            prev
          </button>
          <div className="flex gap-5">
            {Array.from({
              length: Math.ceil(totalPage / limit),
            }).map((el, index) => (
              <div
                key={index}
                onClick={(evt) => setPage(0 + evt.target.innerHTML)}
                className={`${
                  index + 1 == page
                    ? "border-gray-500 border rounded-[3px]"
                    : ""
                }   cursor-pointer  p-[10px_15px]  `}
              >
                {index + 1}
              </div>
            ))}
          </div>
          <button
            className={`cursor-pointer ${
              page + 1 === Math.ceil(totalPage / limit) ? "opacity-40" : ""
            } `}
            disabled={page + 1 === Math.ceil(totalPage / limit)}
            onClick={() => setPage(page + 1)}
          >
            next
          </button>
          <select onChange={(evt) => setLimit(Number(evt.target.value))}>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="40">40</option>
          </select>
        </div>
      </div>
    </>
  );
}
