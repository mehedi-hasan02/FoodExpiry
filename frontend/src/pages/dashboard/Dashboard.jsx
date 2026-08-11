import axios from "axios";
import { useContext, useEffect, useState } from "react";
import {
  FaAppleAlt,
  FaArrowRight,
  FaBoxes,
  FaExclamationTriangle,
  FaPlusCircle,
  FaUsers,
} from "react-icons/fa";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { AuthContext } from "../../context/AuthProvider";
import { calculateRemainingDays } from "../../utils/calculateRemainingDays";
import default_food from "../../assets/default_food.png";
import { MdOutlineGppGood } from "react-icons/md";
import { Link } from "react-router-dom";
import useDocumentTitle from "../../hooks/useDocumentTitle";

const Dashboard = () => {
  useDocumentTitle("Dashboard");
  const { server_url, userData } = useContext(AuthContext);
  const [allFoods, setAllFood] = useState([]);
  const [familyMembers, setFamilyMembers] = useState([]);
  const [familyName, setFamilyName] = useState("");
  const [expiringFoods, setExpiringFoods] = useState([]);
  const [expiredFoods, setExpiredFoods] = useState([]);
  const [freshFoods, setFreshFoods] = useState([]);

  const categoryData = Object.values(
    allFoods.reduce((acc, food) => {
      if (!acc[food.category]) {
        acc[food.category] = {
          name: food.category,
          value: 0,
        };
      }

      acc[food.category].value += 1;

      return acc;
    }, {}),
  );

  const expiryData = [
    {
      name: "Fresh",
      value: allFoods.filter((food) => food.status === "Fresh").length,
    },
    {
      name: "Expiring Soon",
      value: allFoods.filter((food) => food.status === "Expiring Soon").length,
    },
    {
      name: "Expired",
      value: allFoods.filter((food) => food.status === "Expired").length,
    },
  ];

  const recentFoods = [...allFoods]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);

  const getAddedText = (createdAt) => {
    const today = new Date();
    const created = new Date(createdAt);

    today.setHours(0, 0, 0, 0);
    created.setHours(0, 0, 0, 0);

    const diff = (today - created) / (1000 * 60 * 60 * 24);

    if (diff === 0) return "Added today";
    if (diff === 1) return "Added yesterday";

    return `Added ${diff} days ago`;
  };

  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour < 12) {
      return "Good morning";
    }

    if (hour < 18) {
      return "Good afternoon";
    }

    return "Good evening";
  };

  const categoryColors = [
    "#22c55e",
    "#84cc16",
    "#f59e0b",
    "#ef4444",
    "#94a3b8",
  ];

  const getAllFamilyFoods = async () => {
    try {
      const { data } = await axios.get(`${server_url}/food/family`, {
        withCredentials: true,
      });

      // console.log(data.familyFoods);

      setFamilyMembers(data.familyFoods.familyMembers);
      setFamilyName(data.familyFoods.familyName);

      const foods = data.familyFoods.familyFoods;

      setAllFood(foods);

      setExpiredFoods(foods.filter((food) => food.status === "Expired"));

      setExpiringFoods(foods.filter((food) => food.status === "Expiring Soon"));

      setFreshFoods(
        foods.filter(
          (food) =>
            food.status !== "Expired" && food.status !== "Expiring Soon",
        ),
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllFamilyFoods();
  }, []);

  const expiryColors = ["#22c55e", "#f59e0b", "#ef4444"];

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* ================= HEADER ================= */}
        <div className="flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl">
              {getGreeting()}, {userData?.name} 👋
            </h1>

            <p className="mt-1 text-sm text-gray-500 sm:text-base">
              Here's what's happening with your food today.
            </p>
          </div>

          <Link
            to={"/add-food"}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md font-medium bg-green-500 hover:bg-green-600 text-white transition-colors"
          >
            <FaPlusCircle />
            Add Food
          </Link>
        </div>

        {/* ================= SUMMARY CARDS ================= */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {/* Total */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="rounded-xl bg-green-100 p-3 text-green-600">
                <FaBoxes size={20} />
              </div>

              <span className="text-xs font-medium text-gray-400">
                All inventory
              </span>
            </div>

            <p className="mt-5 text-3xl font-bold text-gray-800">
              {allFoods?.length}
            </p>

            <p className="mt-1 text-sm text-gray-500">Total Foods</p>
          </div>

          {/* Expiring */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="rounded-xl bg-amber-100 p-3 text-amber-600">
                <FaExclamationTriangle size={20} />
              </div>

              <span className="text-xs font-medium text-amber-500">
                Need attention
              </span>
            </div>

            <p className="mt-5 text-3xl font-bold text-gray-800">
              {expiringFoods.length}
            </p>

            <p className="mt-1 text-sm text-gray-500">Expiring Soon</p>
          </div>

          {/* Expired */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="rounded-xl bg-red-100 p-3 text-red-600">
                <FaExclamationTriangle size={20} />
              </div>

              <span className="text-xs font-medium text-red-500">
                Need attention
              </span>
            </div>

            <p className="mt-5 text-3xl font-bold text-gray-800">
              {expiredFoods.length}
            </p>

            <p className="mt-1 text-sm text-gray-500">Expired Foods</p>
          </div>

          {/* Fresh */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="rounded-xl bg-emerald-100 p-3 text-emerald-600">
                <MdOutlineGppGood size={20} />
              </div>

              <span className="text-xs font-medium text-emerald-500">
                Good condition
              </span>
            </div>

            <p className="mt-5 text-3xl font-bold text-gray-800">
              {freshFoods.length}
            </p>

            <p className="mt-1 text-sm text-gray-500">Fresh Foods</p>
          </div>
        </div>

        {/* ================= EXPIRING + EXPIRED ================= */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Expiring Soon */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm lg:col-span-2">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="flex items-center gap-2 text-lg font-bold text-gray-800">
                  <FaExclamationTriangle className="text-amber-500" />
                  Expiring Soon
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Food items that need your attention.
                </p>
              </div>

              <Link
                to={"/family-foods"}
                className="flex items-center gap-1 text-sm font-semibold text-green-600 hover:text-green-700"
              >
                View All
                <FaArrowRight size={12} />
              </Link>
            </div>

            <div className="space-y-3">
              {expiringFoods?.slice(0, 3).map((food) => (
                <div
                  key={food._id}
                  className="flex items-center justify-between rounded-xl border border-gray-100 p-4 transition hover:bg-gray-50"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-100 text-2xl">
                      <img src={food.image || default_food} />
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-800">
                        {food.name}
                      </h3>

                      <p className="text-sm text-gray-500">
                        {food.category} • {food.quantity}
                      </p>
                    </div>
                  </div>

                  <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                    {(() => {
                      const days = calculateRemainingDays(food.expiryDate);

                      if (days < 0) {
                        return `Expired ${Math.abs(days)} days ago`;
                      }

                      if (days === 0) {
                        return "Expires today";
                      }

                      if (days === 1) {
                        return "Expires tomorrow";
                      }

                      return `Expires in ${days} days`;
                    })()}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Expired Foods */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-lg font-bold text-gray-800">
                <FaExclamationTriangle className="text-red-500" />
                Expired Foods
              </h2>

              <Link
                to={"/family-foods"}
                className="flex items-center gap-1 text-sm font-semibold text-green-600 hover:text-green-700"
              >
                View All
                <FaArrowRight size={12} />
              </Link>
            </div>

            <div className="space-y-4">
              {expiredFoods.slice(0, 2).map((food) => (
                <div
                  key={food._id}
                  className="rounded-xl border border-red-100 bg-red-50/40 p-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-xl">
                      <img src={food.image || default_food} />
                    </div>

                    <div className="min-w-0">
                      <h3 className="font-semibold text-gray-800">
                        {food.name}
                      </h3>

                      <p className="text-xs text-gray-500">
                        {food.category} • {food.quantity}
                      </p>
                    </div>
                  </div>

                  <p className="mt-3 text-xs font-semibold text-red-600">
                    {(() => {
                      const days = Math.abs(
                        calculateRemainingDays(food.expiryDate),
                      );

                      if (days === 1) {
                        return "Expired 1 day ago";
                      }

                      return `Expired ${days} days ago`;
                    })()}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-xl bg-amber-50 p-3 text-xs leading-5 text-amber-700">
              ⚠️ Consider using these foods before they become unnecessary
              waste.
            </div>
          </div>
        </div>

        {/* ================= CHARTS ================= */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Category Chart */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="mb-4">
              <h2 className="text-lg font-bold text-gray-800">
                Food by Category
              </h2>

              <p className="text-sm text-gray-500">
                Distribution of your food inventory.
              </p>
            </div>

            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={100}
                    paddingAngle={3}
                  >
                    {categoryData?.map((_, index) => (
                      <Cell key={index} fill={categoryColors[index]} />
                    ))}
                  </Pie>

                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {categoryData?.map((item, index) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between text-sm"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{
                        backgroundColor: categoryColors[index],
                      }}
                    />

                    <span className="text-gray-600">{item.name}</span>
                  </div>

                  <span className="font-semibold text-gray-800">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Expiry Chart */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="mb-4">
              <h2 className="text-lg font-bold text-gray-800">
                Expiry Overview
              </h2>

              <p className="text-sm text-gray-500">
                Current condition of your food inventory.
              </p>
            </div>

            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={expiryData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={100}
                    paddingAngle={3}
                  >
                    {expiryData.map((_, index) => (
                      <Cell key={index} fill={expiryColors[index]} />
                    ))}
                  </Pie>

                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-3">
              {expiryData?.map((item, index) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="h-3 w-3 rounded-full"
                      style={{
                        backgroundColor: expiryColors[index],
                      }}
                    />

                    <span className="text-sm text-gray-600">{item.name}</span>
                  </div>

                  <span className="font-semibold text-gray-800">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ================= RECENT + FAMILY ================= */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Recently Added */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm lg:col-span-2">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-gray-800">
                  Recently Added
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Your latest food inventory.
                </p>
              </div>

              <Link
                to={"/family-foods"}
                className="flex items-center gap-1 text-sm font-semibold text-green-600"
              >
                View All
                <FaArrowRight size={12} />
              </Link>
            </div>

            <div className="space-y-3">
              {recentFoods?.map((food) => (
                <div
                  key={food._id}
                  className="flex items-center justify-between rounded-xl border border-gray-100 p-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-100 text-xl">
                      <img src={food.image || default_food} />
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-800">
                        {food.name}
                      </h3>

                      <p className="text-sm text-gray-500">
                        {food.category} • {food.quantity}
                      </p>
                    </div>
                  </div>

                  <span className="hidden text-xs text-gray-400 sm:block">
                    {getAddedText(food.createdAt)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Family */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-lg font-bold text-gray-800">
                <FaUsers className="text-green-600" />
                My Family
              </h2>

              <Link
                to={"/family-member"}
                className="flex items-center gap-1 text-sm font-semibold text-green-600"
              >
                View All
                <FaArrowRight size={12} />
              </Link>
            </div>

            <div className="mb-5 rounded-xl bg-green-50 p-4">
              <p className="text-xs font-medium text-green-600">Family</p>

              <h3 className="mt-1 font-bold text-gray-800">{familyName}</h3>
            </div>

            <div className="space-y-3">
              {familyMembers?.slice(0, 5).map((member) => (
                <div
                  key={member._id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-green-700">
                      {member.name.charAt(0)}
                    </div>

                    <span className="text-sm font-medium text-gray-700">
                      {member.name}
                    </span>
                  </div>

                  <span
                    className={`text-xs font-medium ${
                      member.role === "Owner"
                        ? "text-green-600"
                        : "text-gray-400"
                    }`}
                  >
                    {member.role}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-5 border-t border-gray-100 pt-4 text-center">
              <span className="text-sm font-semibold text-gray-600">
                {familyMembers?.length} Members
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
