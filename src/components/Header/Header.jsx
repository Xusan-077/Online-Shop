import { Link, NavLink } from "react-router-dom";

import "swiper/css";
import "swiper/css/pagination";

import Location from "../../assets/icons/location.svg";
import Search from "../../assets/icons/search.svg";
import Kirish from "../../assets/icons/Kirish.svg";
import Saralangan from "../../assets/icons/Saralangan.svg";
import Savat from "../../assets/icons/Savat.svg";

import { useAppContext } from "../../hooks/useAppContext";

export default function Header() {
  const { cart } = useAppContext();

  return (
    <header className="bg-white">
      <div className="mb-[30px]">
        <div className="bg-[#F2F4F7] p-[5px_0] mb-[15px]">
          <div className="flex items-center justify-between w-[95%] mx-auto max-w-[1240px] px-5">
            <div className="flex items-center gap-4">
              <img src={Location} alt="Location" />
              <p className="text-[14px]">
                Shahar: <span className="underline">Toshkent</span>
              </p>
              <p>Topshirish punktlari</p>
            </div>
            <p className="text-[14px] text-gray-500">
              Buyurtmangizni 1 kunda bepul yetkazib beramiz!
            </p>
            <div className="flex items-center gap-4">
              <p>
                <span>Savol-javoblar</span>
                <span className="ml-[15px]">Buyurtmalarim</span>
              </p>
              <select className="ml-[15px]">
                <option value="UZB">UZB</option>
                <option value="RU">RU</option>
                <option value="ENG">ENG</option>
              </select>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-5">
          <div className="flex justify-between items-center mb-2.5">
            <Link to="/" className="text-2xl font-bold text-[#7000FF]">
              Online Shop
            </Link>

            <div className="flex items-center border border-gray-300 rounded-[10px] w-[550px]">
              <input
                placeholder="Mahsulotlar va turkumlar izlash"
                type="text"
                className="outline-none border-none w-full p-[10px_0_10px_15px]"
              />
              <button className="bg-[#F2F4F7] px-6 py-3 rounded-r-[10px]">
                <img src={Search} alt="Search" />
              </button>
            </div>
            <ul className="flex gap-5">
              <li>
                <NavLink
                  to="/kirish"
                  className={({ isActive }) =>
                    `flex items-center gap-2.5 ${
                      isActive ? "text-black underline" : ""
                    }`
                  }
                >
                  <img src={Kirish} alt="Kirish" />
                  <span className="text-[14px]">Kirish</span>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/saralangan"
                  className={({ isActive }) =>
                    `flex items-center gap-2.5 ${
                      isActive ? "text-black underline" : ""
                    }`
                  }
                >
                  <img src={Saralangan} alt="Saralangan" />
                  <span className="text-[14px]">Saralangan</span>
                </NavLink>
              </li>

              <li className="relative pr-[25px]">
                <NavLink
                  to="/savat"
                  className={({ isActive }) =>
                    `flex items-center gap-2.5 ${
                      isActive ? "text-black underline" : ""
                    }`
                  }
                >
                  <img src={Savat} alt="Savat" />
                  <span className="text-[14px]">Savat</span>
                </NavLink>

                {cart.length ? (
                  <div className="absolute top-0 right-0 bg-[#7000FFFF] text-white p-[0_5px] text-[14px]">
                    {cart.length}
                  </div>
                ) : (
                  ""
                )}
              </li>
            </ul>
          </div>

          <ul className="flex justify-between items-center text-sm text-gray-500 hover:text-black transition-all">
            {[
              { name: "Elektronika", path: "/elektronika" },
              { name: "Maishiy texnika", path: "/maishiy-texnika" },
              { name: "Kiyim", path: "/kiyim" },
              { name: "Poyabzallar", path: "/poyabzallar" },
              { name: "Aksessuarlar", path: "/aksessuarlar" },
              {
                name: "Go`zallik va parvarish",
                path: "/gozallik-va-parvarish",
              },
              { name: "Salomatlik", path: "/salomatlik" },
              { name: "Uy-ro`zg`or buyumlari", path: "/uy-rozgor-buyumlari" },
              {
                name: "Qurilish va taʼmirlash",
                path: "/qurilish-va-tamirlash",
              },
            ].map((el) => (
              <li key={el.name}>
                <NavLink
                  to={el.path}
                  end
                  className={({ isActive }) =>
                    `hover:text-black transition-all ${
                      isActive ? "text-black" : "text-gray-500"
                    }`
                  }
                >
                  {el.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}
