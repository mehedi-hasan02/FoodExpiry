import { useContext, useEffect, useMemo, useState } from "react";
import { FaSearch, FaFilter, FaSortAmountDown, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import FoodCard from "../../components/food/FoodCard";
import axios from "axios";
import { AuthContext } from "../../context/AuthProvider";

const MyFood = () => {
  // Replace with API data later
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  const { server_url } = useContext(AuthContext);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  //   const [sort, setSort] = useState("latest");

  const [currentPage, setCurrentPage] = useState(1);

  const getMyFoods = async () => {
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

    // switch (sort) {
    //   case "expiry":
    //     data.sort((a, b) => new Date(a.expiryDate) - new Date(b.expiryDate));
    //     break;

    //   case "name":
    //     data.sort((a, b) => a.name.localeCompare(b.name));
    //     break;

    //   default:
    //     data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    // }

    return data;
  }, [foods, search, category, status]);

  const totalPages = Math.ceil(filteredFoods.length / foodsPerPage);

  const currentFoods = filteredFoods.slice(
    (currentPage - 1) * foodsPerPage,
    currentPage * foodsPerPage,
  );

  const handleDelete = (id) => {
    console.log(id);
  };

  return (
    <div className="max-w-7xl mx-auto px-5 py-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold text-gray-800">My Foods</h1>

          <p className="text-gray-500 mt-2">Manage all foods you've added.</p>
        </div>

        <Link
          to="/add-food"
          className="btn bg-green-500 hover:bg-green-600 text-white border-none"
        >
          <FaPlus />
          Add Food
        </Link>
      </div>

      {/* Search & Filters */}
      <div className="bg-white rounded-2xl shadow-lg p-5 mt-8 border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <label className="input input-bordered flex items-center gap-3 rounded-xl w-full">
            <FaSearch className="text-green-500" />

            <input
              type="text"
              className="grow"
              placeholder="Search food..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </label>

          {/* Category */}
          <label className="select select-bordered rounded-xl flex items-center gap-2 w-full">
            <FaFilter className="text-green-500" />

            <select
              className="grow bg-transparent outline-none"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
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
          </label>

          {/* Status */}
          <label className="select select-bordered rounded-xl w-full">
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="">All Status</option>
              <option>Fresh</option>
              <option>Expiring Soon</option>
              <option>Expired</option>
            </select>
          </label>

          {/* Sort */}
          {/* <label className="select select-bordered rounded-xl flex items-center gap-2">
            <FaSortAmountDown className="text-green-500" />

            <select
              className="grow bg-transparent outline-none"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="latest">Latest</option>
              <option value="expiry">Expiry Date</option>
              <option value="name">Name (A-Z)</option>
            </select>
          </label> */}
        </div>
      </div>

      {/* Food Grid */}
      {currentFoods.length ? (
        <>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-8">
            {currentFoods.map((food) => (
              <FoodCard
                key={food._id}
                food={food}
                getMyFoods={getMyFoods}
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
                    currentPage === index + 1 ? "btn-success text-white" : ""
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
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center mt-8">
          <img
            src="/food-placeholder.png"
            alt="No Food"
            className="w-52 mx-auto"
          />

          <h2 className="text-3xl font-bold text-gray-700 mt-6">
            No Foods Added Yet
          </h2>

          <p className="text-gray-500 mt-3">
            Start tracking your food by adding your first item.
          </p>

          <Link
            to="/add-food"
            className="btn bg-green-500 hover:bg-green-600 text-white border-none mt-6"
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
