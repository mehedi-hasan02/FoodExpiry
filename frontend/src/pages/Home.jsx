import { useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";

import { AuthContext } from "../context/AuthProvider";
import FoodCard from "../components/food/FoodCard";
import { Link } from "react-router-dom";

const Home = () => {
  const { server_url, userData } = useContext(AuthContext);

  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search & Filter
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const foodsPerPage = 8;

  const getFoods = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get(`${server_url}/food`, {
        withCredentials: true,
      });

      setFoods(data.foods || []);
    } catch (error) {
      console.log(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFoods();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this food?",
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`${server_url}/food/${id}`, {
        withCredentials: true,
      });

      toast.success("Food deleted successfully");

      setFoods((prev) => prev.filter((food) => food._id !== id));
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
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
    switch (sortBy) {
      case "Newest":
        data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;

      case "Oldest":
        data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;

      case "Expiry":
        data.sort((a, b) => new Date(a.expiryDate) - new Date(b.expiryDate));
        break;

      case "A-Z":
        data.sort((a, b) => a.name.localeCompare(b.name));
        break;

      default:
        break;
    }

    return data;
  }, [foods, search, category, status, sortBy]);

  const indexOfLastFood = currentPage * foodsPerPage;
  const indexOfFirstFood = indexOfLastFood - foodsPerPage;

  const currentFoods = filteredFoods.slice(indexOfFirstFood, indexOfLastFood);

  const totalPages = Math.ceil(filteredFoods.length / foodsPerPage);

  return (
    <div className="max-w-7xl mx-auto px-5 py-10">
      {/* Hero */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-800">
          Manage Your Food Smarter
        </h1>

        <p className="text-gray-500 mt-2">
          Track expiry dates, reduce food waste and keep your kitchen organized.
        </p>
      </div>

      {/* Search & Filter */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
        {/* Search */}

        <label className="input input-bordered rounded-xl flex items-center gap-2 w-full">
          <FaSearch className="text-green-500" />

          <input
            type="text"
            placeholder="Search food..."
            className="grow"
            value={search}
            onChange={(e) => {
              setCurrentPage(1);
              setSearch(e.target.value);
            }}
          />
        </label>

        {/* Category */}

        <select
          className="select select-bordered rounded-xl w-full"
          value={category}
          onChange={(e) => {
            setCurrentPage(1);
            setCategory(e.target.value);
          }}
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

        {/* Status */}

        <select
          className="select select-bordered rounded-xl w-full"
          value={status}
          onChange={(e) => {
            setCurrentPage(1);
            setStatus(e.target.value);
          }}
        >
          <option>All</option>
          <option>Fresh</option>
          <option>Expiring Soon</option>
          <option>Expired</option>
        </select>

        {/* Sort */}

        {/* <select
          className="select select-bordered rounded-xl w-full"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option>Newest</option>
          <option>Oldest</option>
          <option>Expiry</option>
          <option>A-Z</option>
        </select> */}
      </div>
      {/* Food Grid */}
      {loading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <div
              key={item}
              className="bg-white rounded-2xl shadow animate-pulse h-[380px]"
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
                onDelete={() => handleDelete(food._id)}
              />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-12">
            <div className="join">
              <button
                className="join-item btn"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
              >
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  className={`join-item btn ${
                    currentPage === index + 1 ? "btn-success" : ""
                  }`}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </button>
              ))}

              <button
                className="join-item btn"
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
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-gray-100">
          <img
            src="/food-placeholder.png"
            alt="No Food"
            className="w-52 mx-auto mb-6"
          />

          <h2 className="text-2xl font-bold text-gray-700">No Food Found</h2>

          <p className="text-gray-500 mt-2">
            There are no food items matching your search.
          </p>

          <Link to="/add-food" className="btn btn-success mt-6 text-white">
            Add First Food
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;
