import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[67vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-[120px] font-bold text-[#7000FF] leading-none">
        404
      </h1>
      <p className="text-2xl font-semibold text-gray-800 mb-2">
        Sahifa topilmadi
      </p>
      <p className="text-gray-500 mb-6">
        Kechirasiz, siz izlagan sahifa mavjud emas yoki o‘chirilgan.
      </p>
      <button
        onClick={() => navigate(-1)}
        className="bg-[#7000FF] text-white px-6 py-3 rounded-md text-sm font-medium hover:bg-[#5a00cc] transition"
      >
        Back
      </button>
    </div>
  );
}
