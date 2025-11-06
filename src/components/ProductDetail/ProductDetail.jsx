import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function ProductDetail() {
  const { newId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  async function getProduct() {
    try {
      setLoading(true);
      const res = await axios.get(`https://dummyjson.com/products/${newId}`);
      setProduct(res.data);
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getProduct();
  }, [newId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500 text-lg">
        Loading product details...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500 text-lg">
        Product not found!
      </div>
    );
  }

  return (
    <div className="flex min-h-[76vh] flex-col justify-center items-center py-10 px-5">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-md overflow-hidden p-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition"
        >
          <span>Back</span>
        </button>

        {/* Product Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Image Section */}
          <div className="flex justify-center items-center bg-gray-100 rounded-xl p-6">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full max-w-sm h-auto object-contain"
            />
          </div>

          {/* Info Section */}
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {product.title}
              </h1>
              <p className="text-gray-600 mb-4">{product.description}</p>

              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl font-bold text-blue-600">
                  ${product.price}
                </span>
                {product.discountPercentage > 0 && (
                  <span className="bg-gradient-to-r from-pink-500 to-red-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-md">
                    -{product.discountPercentage}%
                  </span>
                )}
              </div>

              <p className="text-sm text-gray-700 mb-2">
                <span className="font-semibold">Brand:</span> {product.brand}
              </p>
              <p className="text-sm text-gray-700 mb-2">
                <span className="font-semibold">Category:</span>{" "}
                {product.category}
              </p>
              <p
                className={`text-sm font-semibold ${
                  product.availabilityStatus === "In Stock"
                    ? "text-green-600"
                    : "text-red-500"
                }`}
              >
                {product.availabilityStatus || "In Stock"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
