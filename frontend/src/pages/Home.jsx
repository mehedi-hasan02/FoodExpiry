import { useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";

import { AuthContext } from "../context/AuthProvider";
import FoodCard from "../components/food/FoodCard";
import { Link } from "react-router-dom";
import UpdateFoodModal from "../components/food/UpdateFoodModal";
import Swal from "sweetalert2";
import default_food from "../assets/default_food.png";
import useDocumentTitle from "../hooks/useDocumentTitle";

const Home = () => {
  useDocumentTitle("Family Foods");
  const { server_url, userData } = useContext(AuthContext);

  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFood, setSelectedFood] = useState(null);

  // Search & Filter
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");
  // const [sortBy, setSortBy] = useState("Newest");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const foodsPerPage = 8;

  const getMyFoods = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get(`${server_url}/food/family`, {
        withCredentials: true,
      });

      setFoods(data.familyFoods.familyFoods || []);
    } catch (error) {
      console.log(error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Failed to load foods");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMyFoods();
  }, []);

  // console.log(foods);

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

  const filteredFoods = useMemo(() => {
    let data = [...foods];

    // Search
    if (search.trim()) {
      data = data.filter((food) =>
        food.name.toLowerCase().includes(search.toLowerCase()),
      );
    }

    // Category
    if (category !== "All") {
      data = data.filter((food) => food.category === category);
    }

    // Status
    if (status !== "All") {
      data = data.filter((food) => food.status === status);
    }

    // Sorting
    // switch (sortBy) {
    //   case "Newest":
    //     data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    //     break;

    //   case "Oldest":
    //     data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    //     break;

    //   case "Expiry":
    //     data.sort((a, b) => new Date(a.expiryDate) - new Date(b.expiryDate));
    //     break;

    //   case "A-Z":
    //     data.sort((a, b) => a.name.localeCompare(b.name));
    //     break;

    //   default:
    //     break;
    // }

    return data;
  }, [foods, search, category, status]);

  const indexOfLastFood = currentPage * foodsPerPage;
  const indexOfFirstFood = indexOfLastFood - foodsPerPage;

  const currentFoods = filteredFoods.slice(indexOfFirstFood, indexOfLastFood);

  const totalPages = Math.ceil(filteredFoods.length / foodsPerPage);

  return (
    <div
      className="max-w-7xl mx-auto px-5 py-10"
      style={{ colorScheme: "light" }}
    >
      {/* Hero */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-green-600">
          Manage Your Food Smarter
        </h1>

        <p className="text-gray-500 mt-2">
          Track expiry dates, reduce food waste and keep your kitchen organized.
        </p>
      </div>

      {/* Search & Filter */}
      <div className="bg-white rounded-2xl shadow-sm p-5 mb-8 border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Search */}
          <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl px-4 h-12 focus-within:bg-white focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-100 transition-colors">
            <FaSearch className="text-green-500 shrink-0" />
            <input
              type="text"
              placeholder="Search food..."
              className="grow bg-transparent text-gray-800 placeholder-gray-400 outline-none"
              value={search}
              onChange={(e) => {
                setCurrentPage(1);
                setSearch(e.target.value);
              }}
              style={{ colorScheme: "light" }}
            />
          </div>

          {/* Category */}
          <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl px-4 h-12 focus-within:bg-white focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-100 transition-colors">
            <select
              className="grow bg-transparent text-gray-800 outline-none cursor-pointer"
              value={category}
              onChange={(e) => {
                setCurrentPage(1);
                setCategory(e.target.value);
              }}
              style={{ colorScheme: "light" }}
            >
              <option>All</option>
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
              onChange={(e) => {
                setCurrentPage(1);
                setStatus(e.target.value);
              }}
              style={{ colorScheme: "light" }}
            >
              <option>All</option>
              <option>Fresh</option>
              <option>Expiring Soon</option>
              <option>Expired</option>
            </select>
          </div>
        </div>
      </div>

      {/* Food Grid */}
      {loading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <div
              key={item}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 animate-pulse h-[380px]"
            />
          ))}
        </div>
      ) : currentFoods.length > 0 ? (
        <>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {currentFoods.map((food) => (
              <FoodCard
                key={food._id}
                food={food}
                userData={userData}
                onDelete={() => handleDelete(food._id)}
                setSelectedFood={setSelectedFood}
              />
            ))}
          </div>

          <UpdateFoodModal
            food={selectedFood}
            getMyFoods={getMyFoods}
            setSelectedFood={setSelectedFood}
          />

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
        /* Empty State */
        <div className="bg-white rounded-2xl shadow-sm p-12 text-center border border-gray-200">
          <img src={default_food} alt="No Food" className="w-52 mx-auto mb-6" />

          <h2 className="text-2xl font-bold text-gray-700">No Food Found</h2>

          <p className="text-gray-500 mt-2">
            There are no food items matching your search.
          </p>

          <Link
            to="/add-food"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium bg-green-500 hover:bg-green-600 text-white transition-colors mt-6"
          >
            Add First Food
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;
