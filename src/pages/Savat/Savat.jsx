import { useEffect, useState } from "react";
import { useAppContext } from "../../hooks/useAppContext";
import { Link } from "react-router-dom";

export default function Savat() {
  const { cart, setCart } = useAppContext();

  console.log(cart);

  const totalUnits = cart.reduce((acc, el) => acc + el.count, 0);

  const totalSum = cart.reduce(
    (acc, el) => acc + el.product.price * el.count,
    0
  );

  return (
    <section className="savat h-[67vh]">
      <div className="container py-10">
        <div className="flex items-start justify-center">
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
              <div className="flex justify-between gap-5 items-start">
                <div className="border-gray-300 rounded-lg border ">
                  <ul className="flex flex-col">
                    {cart.map(({ product, count }) => {
                      const handleAdd = () => {
                        const updated = cart.map((el) =>
                          el.product.id === product.id
                            ? { ...el, count: el.count + 1 }
                            : el
                        );
                        setCart(updated);
                      };

                      const handleRemove = () => {
                        if (count === 1) {
                          setCart(
                            cart.filter((el) => el.product.id !== product.id)
                          );
                        } else {
                          const updated = cart.map((el) =>
                            el.product.id === product.id
                              ? { ...el, count: el.count - 1 }
                              : el
                          );
                          setCart(updated);
                        }
                      };

                      return (
                        <li
                          key={product.id}
                          className="w-full p-[10px_20px_0_20px] bg-white"
                        >
                          <div className="mb-5">
                            <span className="text-[12px] text-[#7e818c]">
                              Uzum Market yetkazib berishi
                            </span>
                            <h3 className="text-[18px] font-semibold text-[#1f2026]">
                              Ertaga yetkazib beramiz
                            </h3>
                          </div>
                          <div className="flex items-start gap-4">
                            {product.thumbnail ? (
                              <img
                                src={product.thumbnail}
                                alt={product.title}
                                className="w-[100px] h-[100px] object-contain"
                              />
                            ) : (
                              <div className="w-24 h-24 bg-gray-300 rounded-lg"></div>
                            )}

                            <div className="flex flex-col flex-1">
                              <p className="text-sm mb-5 text-gray-500">
                                {product.description}
                              </p>
                              <div className="flex items-center justify-between ">
                                <h3 className="font-semibold">
                                  <span className="text-[12px] text-gray-500">
                                    Sotuvchi :
                                  </span>
                                  <span className="text-[14px] ml-2.5">
                                    {product.title}
                                  </span>
                                </h3>
                                <div className="flex items-center w-[250px] justify-between">
                                  <div className="flex flex-col items-end gap-2">
                                    <div className="flex items-center gap-2">
                                      <button
                                        onClick={handleRemove}
                                        className="bg-white border px-2 rounded cursor-pointer"
                                      >
                                        -
                                      </button>
                                      <span>{count}</span>
                                      <button
                                        onClick={handleAdd}
                                        className="bg-white border px-2 rounded cursor-pointer"
                                      >
                                        +
                                      </button>
                                    </div>
                                  </div>
                                  <p className="text-[24px] text-[#7000FFFF] font-bold">
                                    ${product.price}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="w-full mt-5 flex justify-center border border-gray-200 h-px"></div>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <div className="w-[28%] rounded-lg border-gray-300 border flex flex-col shadow-sm p-[25px_20px] h-[300px]">
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
