import { Link, NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 mt-16">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Chap tomonda brend nomi yoki copyright */}
          <p className="text-sm text-gray-400 text-center md:text-left">
            © {new Date().getFullYear()}{" "}
            <span className="font-semibold text-white">MyBrand</span>. All
            rights reserved.
          </p>

          {/* Navigatsiya linklari */}
          <ul className="flex flex-wrap justify-center md:justify-end items-center gap-8">
            {[
              { path: "/", label: "Home", end: true },
              { path: "/products", label: "Products" },
              { path: "/recipes", label: "Recipes" },
            ].map(({ path, label }) => (
              <li key={path}>
                <Link to={path} className={`text-gray-400 hover:text-sky-300`}>
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
