import { useContext, useEffect, useMemo, useState } from "react";
import { FaSearch, FaFilter, FaPlus, FaLeaf } from "react-icons/fa";
import { Link } from "react-router-dom";
import FoodCard from "../../components/food/FoodCard";
import axios from "axios";
import { AuthContext } from "../../context/AuthProvider";
import UpdateFoodModal from "../../components/food/UpdateFoodModal";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import default_food from "../../assets/default_food.png";
import useDocumentTitle from "../../hooks/useDocumentTitle";

const MyFood = () => {
  useDocumentTitle("MyFoods");
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFood, setSelectedFood] = useState(null);

  const { server_url, userData } = useContext(AuthContext);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const getMyFoods = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${server_url}/myfoods`, {
        withCredentials: true,
      });

      //   console.log(data);

      setFoods(data.foods);
    } catch (error) {
      console.error(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMyFoods();
  }, []);

  const foodsPerPage = 8;

  const filteredFoods = useMemo(() => {
    let data = [...foods];

    if (search) {
      data = data.filter((food) =>
        food.name.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (category) {
      data = data.filter((food) => food.category === category);
    }

    if (status) {
      data = data.filter((food) => food.status === status);
    }

    return data;
  }, [foods, search, category, status]);

  const totalPages = Math.ceil(filteredFoods.length / foodsPerPage);

  const currentFoods = filteredFoods.slice(
    (currentPage - 1) * foodsPerPage,
    currentPage * foodsPerPage,
  );

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "This member will be removed from your family.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#ef4444",
        cancelButtonColor: "#6b7280",
        confirmButtonText: "Yes, Remove",
        cancelButtonText: "Cancel",
      });

      if (!result.isConfirmed) return;

      const res = await axios.delete(`${server_url}/food/${id}`, {
        withCredentials: true,
      });

      if (res.status === 200) {
        getMyFoods();
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  if (loading) {
    return (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 text-green-600 text-4xl animate-ping">
        <FaLeaf />
        <span className=" font-bold whitespace-nowrap">FoodExpiry</span>
      </div>
    );
  }

  return (
    <div
      className="max-w-7xl mx-auto px-5 py-10"
      style={{ colorScheme: "light" }} // stops native <input>/<select> from rendering OS dark chrome
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold text-green-600">My Foods</h1>
          <p className="text-gray-500 mt-2">Manage all foods you've added.</p>
        </div>

        <Link
          to="/add-food"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium bg-green-500 hover:bg-green-600 text-white transition-colors"
        >
          <FaPlus />
          Add Food
        </Link>
      </div>

      {/* Search & Filters */}
      <div className="bg-white rounded-2xl shadow-sm p-5 mt-8 border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl px-4 h-12 focus-within:bg-white focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-100 transition-colors">
            <FaSearch className="text-green-500 shrink-0" />
            <input
              type="text"
              className="grow bg-transparent text-gray-800 placeholder-gray-400 outline-none"
              placeholder="Search food..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ colorScheme: "light" }}
            />
          </div>

          {/* Category */}
          <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-4 h-12 focus-within:bg-white focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-100 transition-colors">
            <FaFilter className="text-green-500 shrink-0" />
            <select
              className="grow bg-transparent text-gray-800 outline-none cursor-pointer"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{ colorScheme: "light" }}
            >
              <option value="">All Categories</option>
              <option>Fruits</option>
              <option>Vegetables</option>
              <option>Dairy</option>
              <option>Meat</option>
              <option>Seafood</option>
              <option>Bakery</option>
              <option>Beverages</option>
              <option>Frozen</option>
              <option>Snacks</option>
              <option>Other</option>
            </select>
          </div>

          {/* Status */}
          <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl px-4 h-12 focus-within:bg-white focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-100 transition-colors">
            <select
              className="grow bg-transparent text-gray-800 outline-none cursor-pointer"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              style={{ colorScheme: "light" }}
            >
              <option value="">All Status</option>
              <option>Fresh</option>
              <option>Expiring Soon</option>
              <option>Expired</option>
            </select>
          </div>
        </div>
      </div>

      {/* Food Grid */}
      {currentFoods?.length ? (
        <>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-8">
            {currentFoods?.map((food) => (
              <FoodCard
                key={food._id}
                food={food}
                userData={userData}
                getMyFoods={getMyFoods}
                onDelete={() => handleDelete(food._id)}
                setSelectedFood={setSelectedFood}
              />
            ))}

            <UpdateFoodModal
              food={selectedFood}
              getMyFoods={getMyFoods}
              setSelectedFood={setSelectedFood}
            />
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-12">
            <div className="flex items-center bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
              <button
                className="px-4 h-11 text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white transition-colors border-r border-gray-200"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
              >
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  className={`px-4 h-11 text-sm font-medium transition-colors border-r border-gray-200 last:border-r-0 ${
                    currentPage === index + 1
                      ? "bg-green-500 text-white"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </button>
              ))}

              <button
                className="px-4 h-11 text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white transition-colors"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
              >
                Next
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center mt-8">
          <img src={default_food} alt="No Food" className="w-52 mx-auto" />

          <h2 className="text-3xl font-bold text-gray-700 mt-6">
            No Foods Added Yet
          </h2>

          <p className="text-gray-500 mt-3">
            Start tracking your food by adding your first item.
          </p>

          <Link
            to="/add-food"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium bg-green-500 hover:bg-green-600 text-white transition-colors mt-6"
          >
            <FaPlus />
            Add Food
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyFood;
