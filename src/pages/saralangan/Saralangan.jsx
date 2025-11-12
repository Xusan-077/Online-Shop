import { Link } from "react-router-dom";
import ProductItem from "../../components/ProductsItem/ProductsItem";
import { useAppContext } from "../../hooks/useAppContext";

export default function Saralangan() {
  const { like } = useAppContext();

  return (
    <section>
      <div className="container">
        {like.length ? (
          <ul className="products__list grid items-center gap-6 grid-cols-5">
            {like.map((el) => (
              <ProductItem
                className="products__item"
                products={like}
                product={el}
                key={el.id}
                {...el}
              />
            ))}
          </ul>
        ) : (
          <div className="savat__empty flex flex-col items-center my-[150px]">
            <img
              className="savat__empty-img"
              src="https://uzum.uz/static/img/shopocat.490a4a1.png"
              alt="empty-cart"
              width={150}
              height={150}
            />

            <p className="savat__empty-title text-[1.375rem] mt-6 font-semibold mb-3">
              saralanganlar hozircha bo‘sh
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
        )}
      </div>
    </section>
  );
}
