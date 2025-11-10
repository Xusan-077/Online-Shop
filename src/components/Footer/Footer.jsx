import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer bg-gray-900 text-gray-300 py-8 mt-16">
      <div className="footer__container container mx-auto px-6">
        <div className="footer__inner flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="footer__copyright text-[25px] text-gray-400 text-center ">
            Footer
          </p>

          <ul className="footer__links flex flex-wrap justify-center md:justify-end items-center gap-4 sm:gap-6">
            {[
              { path: "/", label: "Home" },
              { path: "/products", label: "Products" },
              { path: "/recipes", label: "Recipes" },
            ].map(({ path, label }) => (
              <li key={path} className="footer__link-item">
                <Link
                  to={path}
                  className="footer__link text-gray-400 hover:text-sky-300 text-sm sm:text-base"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
