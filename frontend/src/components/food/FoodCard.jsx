import { Link } from "react-router-dom";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaBoxes,
  FaEdit,
  FaTrash,
  FaEye,
} from "react-icons/fa";
import UpdateFoodModal from "./UpdateFoodModal";
import { useState } from "react";

const FoodCard = ({ food, userData, getMyFoods, onDelete }) => {
  const [selectedFood, setSelectedFood] = useState(null);
  const isOwner =
    food.user?._id === userData?._id || food.user === userData?._id;

  const getStatusColor = (status) => {
    switch (status) {
      case "Fresh":
        return "badge-success";
      case "Expiring Soon":
        return "badge-warning";
      case "Expired":
        return "badge-error";
      default:
        return "badge-neutral";
    }
  };

  const getRemainingDays = () => {
    const today = new Date();
    const expiry = new Date(food.expiryDate);

    const diff = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));

    if (diff < 0) return `${Math.abs(diff)} day(s) ago`;
    if (diff === 0) return "Today";
    return `${diff} day(s) left`;
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-green-100">
      {/* Food Image */}
      <figure className="h-52 overflow-hidden">
        <img
          src={food.image || "/food-placeholder.png"}
          alt={food.name}
          className="w-full h-full object-cover hover:scale-105 transition duration-300"
        />
      </figure>

      {/* Card Body */}
      <div className="p-5">
        {/* Name & Status */}
        <div className="flex justify-between items-start">
          <h2 className="text-xl font-bold text-gray-800">{food.name}</h2>

          <span className={`badge ${getStatusColor(food.status)}`}>
            {food.status}
          </span>
        </div>

        {/* Category */}
        <p className="text-green-600 font-medium mt-1">{food.category}</p>

        {/* Food Info */}
        <div className="mt-4 space-y-2 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <FaBoxes className="text-green-500" />
            <span>
              {food.quantity} {food.unit}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-green-500" />
            <span>{food.location}</span>
          </div>

          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-green-500" />
            <span>{new Date(food.expiryDate).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Remaining Days */}
        <div className="mt-4">
          <span className="text-sm font-semibold text-orange-500">
            {getRemainingDays()}
          </span>
        </div>

        {/* Buttons */}
        <div className="mt-6 space-y-3">
          <Link
            to={`/food/${food._id}`}
            className="btn btn-success w-full text-white"
          >
            <FaEye />
            Details
          </Link>

          {isOwner && (
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => {
                  setSelectedFood(food);
                  document.getElementById("update_food_modal").showModal();
                }}
                className="btn btn-info text-white"
              >
                <FaEdit />
                Edit
              </button>

              <UpdateFoodModal
                food={selectedFood}
                getMyFoods={getMyFoods}
                setSelectedFood={setSelectedFood}
              />

              <button
                onClick={() => onDelete(food._id)}
                className="btn btn-error text-white"
              >
                <FaTrash />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
