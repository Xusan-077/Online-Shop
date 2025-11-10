import { toast } from "react-toastify";
import { useAppContext } from "../../hooks/useAppContext";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function SavatItem({ count, product }) {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const { cart, setCart } = useAppContext();

  const handleAdd = () => {
    const updated = cart.map((el) =>
      el.product.id === product.id ? { ...el, count: el.count + 1 } : el
    );
    setCart(updated);
  };

  function handleNavigate(Id) {
    navigate(`/products/${Id}`);
  }

  const handleRemove = () => {
    if (count === 1) {
      setCart(cart.filter((el) => el.product.id !== product.id));
    } else {
      const updated = cart.map((el) =>
        el.product.id === product.id ? { ...el, count: el.count - 1 } : el
      );
      setCart(updated);
    }
  };

  function handleDelete() {
    let filtered = cart.filter((el) => el.product.id != product.id);

    setCart([...filtered]);

    toast.success("Product removed");
  }

  return (
    <li
      key={product.id}
      className="savat__product-item w-full p-[10px_20px_0_20px] bg-white"
    >
      <div className="savat__delivery mb-8">
        <span className="savat__delivery-label text-[12px] text-[#7e818c]">
          {t("savat.delivery")}
        </span>
        <h3 className="savat__delivery-title text-[18px] font-semibold text-[#1f2026]">
          {t("savat.tomorrow")}
        </h3>
      </div>

      <div className="savat__content flex items-start gap-4">
        {product.thumbnail ? (
          <img
            onClick={() => handleNavigate(product.id)}
            src={product.thumbnail}
            alt={product.title}
            className="savat__product-img w-[150px] cursor-pointer h-[100px] object-contain"
          />
        ) : (
          <div className="savat__product-img--empty w-24 h-24 bg-gray-300 rounded-lg"></div>
        )}

        <div className="savat__product-info flex flex-col flex-1">
          <div className="savat__product-header flex items-start justify-between">
            <p className="savat__product-desc text-sm mb-5 max-w-[80%] text-gray-500">
              {product.description}
            </p>

            <button
              onClick={handleDelete}
              className="savat__product-delete flex items-center cursor-pointer gap-[5px] text-[18px] text-[gray]"
            >
              <i className="bi bi-trash3-fill"></i>
              <span>{t("savat.delete")}</span>
            </button>
          </div>

          <div className="savat__product-footer flex items-center justify-between">
            <h3 className="savat__product-seller font-semibold">
              <span className="text-[12px] text-gray-500">
                {t("savat.seller")} :
              </span>
              <span className="text-[14px] ml-2.5">{product.title}</span>
            </h3>

            <div className="savat__product-controls flex items-center w-[250px] justify-between">
              <div className="savat__product-counter flex flex-col items-end gap-2">
                <div className="savat__counter-buttons flex items-center gap-2">
                  <button
                    onClick={handleRemove}
                    className="savat__btn-minus bg-white border px-2 rounded cursor-pointer"
                  >
                    -
                  </button>
                  <span className="savat__count">{count}</span>
                  <button
                    onClick={handleAdd}
                    className="savat__btn-plus bg-white border px-2 rounded cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              <p className="savat__product-price text-[24px] text-[#7000FFFF] font-bold">
                ${product.price}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="savat__divider w-full mt-5 flex justify-center border border-gray-200 h-px"></div>
    </li>
  );
}

export default SavatItem;
