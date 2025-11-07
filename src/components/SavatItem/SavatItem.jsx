import { toast } from "react-toastify";
import { useAppContext } from "../../hooks/useAppContext";

function SavatItem({ count, product }) {
  const { cart, setCart } = useAppContext();

  const handleAdd = () => {
    const updated = cart.map((el) =>
      el.product.id === product.id ? { ...el, count: el.count + 1 } : el
    );
    setCart(updated);
  };

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
      className="cursor-pointer w-full p-[10px_20px_0_20px] bg-white"
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
          <div className="flex items-start justify-between">
            <p className="text-sm mb-5 max-w-[80%] text-gray-500">
              {product.description}
            </p>

            <button
              onClick={handleDelete}
              className="flex items-center cursor-pointer gap-[5px] text-[18px] text-[gray]"
            >
              <i className="bi bi-trash3-fill"></i>
              <span className="">Yoʻq qilish</span>
            </button>
          </div>
          <div className="flex items-center justify-between ">
            <h3 className="font-semibold">
              <span className="text-[12px] text-gray-500">Sotuvchi :</span>
              <span className="text-[14px] ml-2.5">{product.title}</span>
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
}

export default SavatItem;
