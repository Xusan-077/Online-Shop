import { useAppContext } from "../../hooks/useAppContext";
import { Link } from "react-router-dom";
import SavatItem from "../../components/SavatItem/SavatItem";
import Products from "../Products/Products";

export default function Savat() {
  const { cart } = useAppContext();

  console.log(cart);

  const totalUnits = cart.reduce((acc, el) => acc + el.count, 0);

  const totalSum = cart.reduce(
    (acc, el) => acc + el.product.price * el.count,
    0
  );

  return (
    <section className="savat">
      <div className="container py-10">
        <div className="">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center h-[67vh]">
              <img
                src="https://uzum.uz/static/img/shopocat.490a4a1.png"
                alt=""
                width={150}
                height={150}
              />
              <p className="text-[1.375rem] mt-6 font-semibold mb-3">
                Savatingiz hozircha bo‘sh
              </p>
              <p className="mb-6">
                Bosh sahifadan boshlang — kerakli tovarni qidiruv orqali
                topishingiz yoki to‘plamlarni ko‘rishingiz mumkin
              </p>
              <Link
                className="bg-[#E6E8EDFF] text-gray-800 rounded-lg p-[10px_20px]"
                to="/"
              >
                Bosh Sahifa
              </Link>
            </div>
          ) : (
            <div className="">
              <h1 className="text-[28px] font-bold mb-6">Savat</h1>
              <div className="flex justify-between items-start">
                <div className="border-gray-300 rounded-lg border ">
                  <ul className="flex flex-col w-[800px]">
                    {cart.map(({ product, count }) => (
                      <SavatItem
                        key={product.id}
                        product={product}
                        count={count}
                      />
                    ))}
                  </ul>
                </div>

                <div className="w-[30%] rounded-lg border-gray-300 border flex flex-col shadow-sm p-[25px_20px] h-[300px]">
                  <h3 className="text-[16px] font-semibold mb-5">
                    Buyurtmangiz
                  </h3>
                  <div className="flex items-center justify-between mb-10">
                    <p className="">Mahsulotlar ({totalUnits})</p>
                    <p className="">${totalSum.toFixed(2)}</p>
                  </div>
                  <div className="mb-auto">
                    <h2 className="mb-2.5">Jami</h2>
                    <p className="flex justify-end">${totalSum.toFixed(2)}</p>
                  </div>
                  <button className="text-white cursor-pointer font-semibold bg-[#7000FFFF] p-[8px_0] w-full rounded-lg ">
                    Rasmiylashtirishga o`tish
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
