import { Link, NavLink } from "react-router-dom";

import "swiper/css";
import "swiper/css/pagination";

import Location from "../../assets/icons/location.svg";
import Search from "../../assets/icons/search.svg";
import Kirish from "../../assets/icons/Kirish.svg";
import Saralangan from "../../assets/icons/Saralangan.svg";
import Savat from "../../assets/icons/Savat.svg";

import { useAppContext } from "../../hooks/useAppContext";
import { useTranslation } from "react-i18next";

export default function Header() {
  const { t, i18n } = useTranslation();
  const { cart } = useAppContext();

  function handleChangeLanguage(e) {
    i18n.changeLanguage(e.target.value);
  }

  return (
    <header className="header bg-white">
      {/* Top info bar */}
      <div className="header__top mb-[30px]">
        <div className="header__info-bar bg-[#F2F4F7] p-[5px_0] mb-[15px]">
          <div className="header__info-container flex items-center justify-between w-[95%] mx-auto max-w-[1240px] px-5">
            <div className="header__location flex items-center gap-4">
              <img
                src={Location}
                alt="Location"
                className="header__location-icon"
              />
              <p className="header__city text-[14px]">
                {t("header.location")}:
                <span className="header__city-name underline">Toshkent</span>
              </p>
              <p className="header__points">{t("header.points")}</p>
            </div>

            <p className="header__order text-[14px] text-gray-500">
              {t("header.order")}
            </p>

            <div className="header__user-actions flex items-center gap-4">
              <p className="header__questions-orders">
                <span>{t("header.Questions")}</span>
                <span className="ml-[15px]">{t("header.MyOrders")}</span>
              </p>
              <select
                onChange={handleChangeLanguage}
                className="header__language-select ml-[15px]"
              >
                <option value="uz">Uzbek</option>
                <option value="ru">Russian</option>
                <option value="en">English</option>
              </select>
            </div>
          </div>
        </div>

        {/* Main header: logo + search + user menu */}
        <div className="header__main container mx-auto px-5">
          <div className="header__top-row flex justify-between items-center mb-2.5">
            <Link
              to="/"
              className="header__logo text-2xl font-bold text-[#7000FF]"
            >
              Online Shop
            </Link>

            <div className="header__search flex items-center border border-gray-300 rounded-[10px] w-[550px]">
              <input
                placeholder={t("header.search")}
                type="text"
                className="header__search-input outline-none border-none w-full p-[10px_0_10px_15px]"
              />
              <button className="header__search-btn bg-[#F2F4F7] px-6 py-3 rounded-r-[10px]">
                <img src={Search} alt="Search" />
              </button>
            </div>

            <ul className="header__menu flex gap-5">
              <li className="header__menu-item">
                <NavLink
                  to="/kirish"
                  className={({ isActive }) =>
                    `flex items-center gap-2.5 header__menu-link ${
                      isActive ? "text-black underline" : ""
                    }`
                  }
                >
                  <img src={Kirish} alt="Kirish" />
                  <span className="text-[14px]">{t("header.access")}</span>
                </NavLink>
              </li>

              <li className="header__menu-item">
                <NavLink
                  to="/saralangan"
                  className={({ isActive }) =>
                    `flex items-center gap-2.5 header__menu-link ${
                      isActive ? "text-black underline" : ""
                    }`
                  }
                >
                  <img src={Saralangan} alt="Saralangan" />
                  <span className="text-[14px]">{t("header.Sorted")}</span>
                </NavLink>
              </li>

              <li className="header__menu-item relative pr-[25px]">
                <NavLink
                  to="/savat"
                  className={({ isActive }) =>
                    `flex items-center gap-2.5 header__menu-link ${
                      isActive ? "text-black underline" : ""
                    }`
                  }
                >
                  <img src={Savat} alt="Savat" />
                  <span className="text-[14px]">{t("header.basket")}</span>
                </NavLink>

                {cart.length ? (
                  <div className="header__cart-count absolute top-0 right-0 bg-[#7000FFFF] text-white p-[0_5px] text-[14px]">
                    {cart.length}
                  </div>
                ) : null}
              </li>
            </ul>
          </div>

          {/* Navigation links */}
          <ul className="header__nav flex justify-between items-center text-sm text-gray-500 hover:text-black transition-all flex-wrap gap-4">
            {[
              { name: t("header.list.Elektronika"), path: "/elektronika" },
              { name: t("header.list.texnika"), path: "/maishiy-texnika" },
              { name: t("header.list.kiyim"), path: "/kiyim" },
              { name: t("header.list.poyabzallar"), path: "/poyabzallar" },
              { name: t("header.list.aksessuarlar"), path: "/aksessuarlar" },
              {
                name: t("header.list.parvarish"),
                path: "/gozallik-va-parvarish",
              },
              { name: t("header.list.Salomatlik"), path: "/salomatlik" },
              {
                name: t("header.list.buyumlari"),
                path: "/uy-rozgor-buyumlari",
              },
              {
                name: t("header.list.Qurilish"),
                path: "/qurilish-va-tamirlash",
              },
            ].map((el) => (
              <li key={el.name} className="header__nav-item">
                <NavLink
                  to={el.path}
                  end
                  className={({ isActive }) =>
                    `header__nav-link hover:text-black transition-all ${
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
