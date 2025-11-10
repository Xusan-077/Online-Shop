import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import Rating from "../components/Rating";
import TimeOfComent from "../components/TimeOfComent";

export default function ReviewsCarousel({ product }) {
  if (!product?.reviews?.length) return null;

  return (
    <div className="w-full relative">
      <h3 className="text-xl font-semibold mb-4">Fikrlar</h3>

      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView={2}
        navigation={{
          nextEl: ".swiper-button-next-custom",
          prevEl: ".swiper-button-prev-custom",
        }}
        pagination={{ clickable: true }}
        breakpoints={{
          0: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
        }}
        className="pb-10"
      >
        {product.reviews.map((el, i) => (
          <SwiperSlide key={i}>
            <div className="border border-gray-300 rounded-lg p-6 bg-white">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-gray-800">
                  {el.reviewerName}
                </span>
                <Rating rating={el.rating} />
              </div>
              <p className="text-gray-700 mb-3">{el.comment}</p>
              <TimeOfComent Time={el.date} />
              <span className="block text-sm text-gray-500 mt-2">
                {el.reviewerEmail}
              </span>
            </div>
          </SwiperSlide>
        ))}

        <div className="swiper-button-prev-custom absolute top-1/2 text-black text-[50px] left-2 z-10 -translate-y-1/2 cursor-pointe flex items-center justify-center rounded-full transition">
          ‹
        </div>
        <div className="swiper-button-next-custom absolute top-1/2 text-black text-[50px] right-2 z-10 -translate-y-1/2 cursor-pointer flex items-center justify-center rounded-full transition">
          ›
        </div>
      </Swiper>
    </div>
  );
}
