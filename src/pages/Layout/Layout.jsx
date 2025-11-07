import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useEffect, useState } from "react";

export default function Layout() {
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div
        onClick={scrollToTop}
        className={`${
          scroll >= 500 ? "bottom-5" : "-bottom-30"
        } transition-all z-10000 fixed right-5 text-white  cursor-pointer bg-[#7F4DFFFF] rounded-full text-center w-[65px] p-[10px_0]`}
      >
        <i className="bi bi-arrow-up text-[30px]"></i>
      </div>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
