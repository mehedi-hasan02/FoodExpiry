import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import {
  FaAppleAlt,
  FaBoxes,
  FaCalendarAlt,
  FaStickyNote,
} from "react-icons/fa";
import { AuthContext } from "../../context/AuthProvider";
import axios from "axios";
import { toast } from "react-toastify";

const FoodForm = () => {
  const { server_url, userData } = useContext(AuthContext);
  const [preview, setPreview] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const {
    ref: imageRef,
    onChange: imageOnChange,
    ...imageRegister
  } = register("image");

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      formData.append("user", userData._id);
      formData.append("name", data.name);
      formData.append("category", data.category);
      formData.append("quantity", data.quantity);
      formData.append("unit", data.unit);
      formData.append("expiryDate", data.expiryDate);
      formData.append("location", data.location);
      formData.append("notes", data.notes);

      if (data.image?.[0]) {
        formData.append("image", data.image[0]);
      }

      const res = await axios.post(`${server_url}/food`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      if (res) {
        toast.success(res.data?.message);
        reset();
        setPreview(null);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
      //   console.log(error.response?.data);
    }
  };

  return (
    <div
      className="bg-white shadow-xl rounded-3xl border border-gray-200 p-8"
      style={{ colorScheme: "light" }}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Food Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Food Name
            </label>

            <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl px-4 h-12 focus-within:bg-white focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-100 transition-colors">
              <FaAppleAlt className="text-green-500 shrink-0" />
              <input
                type="text"
                placeholder="Milk"
                className="grow bg-transparent text-gray-800 placeholder-gray-400 outline-none"
                style={{ colorScheme: "light" }}
                {...register("name", { required: "Food name is required" })}
              />
            </div>

            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Category
            </label>

            <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl px-4 h-12 focus-within:bg-white focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-100 transition-colors">
              <select
                className="grow bg-transparent text-gray-800 outline-none cursor-pointer"
                style={{ colorScheme: "light" }}
                {...register("category", { required: "Category is required" })}
              >
                <option value="">Select Category</option>
                <option value="Fruits">Fruits</option>
                <option value="Vegetables">Vegetables</option>
                <option value="Dairy">Dairy</option>
                <option value="Meat">Meat</option>
                <option value="Seafood">Seafood</option>
                <option value="Bakery">Bakery</option>
                <option value="Beverages">Beverages</option>
                <option value="Frozen">Frozen</option>
                <option value="Snacks">Snacks</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {errors.category && (
              <p className="text-red-500 text-sm mt-1">
                {errors.category.message}
              </p>
            )}
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Quantity
            </label>

            <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl px-4 h-12 focus-within:bg-white focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-100 transition-colors">
              <FaBoxes className="text-green-500 shrink-0" />
              <input
                type="number"
                min="1"
                placeholder="1"
                className="grow bg-transparent text-gray-800 placeholder-gray-400 outline-none"
                style={{ colorScheme: "light" }}
                {...register("quantity", { required: "Quantity is required" })}
              />
            </div>

            {errors.quantity && (
              <p className="text-red-500 text-sm mt-1">
                {errors.quantity.message}
              </p>
            )}
          </div>

          {/* Unit */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Unit
            </label>

            <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl px-4 h-12 focus-within:bg-white focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-100 transition-colors">
              <select
                className="grow bg-transparent text-gray-800 outline-none cursor-pointer"
                style={{ colorScheme: "light" }}
                {...register("unit", { required: "Unit is required" })}
              >
                <option value="">Select Unit</option>
                <option value="kg">kg</option>
                <option value="g">g</option>
                <option value="L">L</option>
                <option value="ml">ml</option>
                <option value="pcs">pcs</option>
                <option value="pack">pack</option>
                <option value="box">box</option>
              </select>
            </div>

            {errors.unit && (
              <p className="text-red-500 text-sm mt-1">{errors.unit.message}</p>
            )}
          </div>

          {/* Expiry Date */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Expiry Date
            </label>

            <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl px-4 h-12 focus-within:bg-white focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-100 transition-colors">
              <FaCalendarAlt className="text-green-500 shrink-0" />
              <input
                type="date"
                className="grow bg-transparent text-gray-800 outline-none"
                style={{ colorScheme: "light" }}
                {...register("expiryDate", {
                  required: "Expiry date is required",
                })}
              />
            </div>

            {errors.expiryDate && (
              <p className="text-red-500 text-sm mt-1">
                {errors.expiryDate.message}
              </p>
            )}
          </div>

          {/* Storage Location */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Storage Location
            </label>

            <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl px-4 h-12 focus-within:bg-white focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-100 transition-colors">
              <select
                className="grow bg-transparent text-gray-800 outline-none cursor-pointer"
                style={{ colorScheme: "light" }}
                {...register("location")}
              >
                <option value="Fridge">Fridge</option>
                <option value="Freezer">Freezer</option>
                <option value="Pantry">Pantry</option>
                <option value="Kitchen">Kitchen</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Notes
          </label>

          <div className="flex gap-3 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus-within:bg-white focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-100 transition-colors">
            <FaStickyNote className="text-green-500 mt-1 shrink-0" />
            <textarea
              rows="4"
              className="grow bg-transparent text-gray-800 placeholder-gray-400 outline-none resize-none"
              style={{ colorScheme: "light" }}
              placeholder="Any additional notes..."
              {...register("notes")}
            />
          </div>
        </div>

        {/* Food Image */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Food Image
          </label>

          <input
            id="foodImage"
            type="file"
            accept="image/*"
            className="block w-full text-sm text-gray-600 bg-gray-50 border border-gray-200 rounded-xl cursor-pointer file:mr-4 file:py-2.5 file:px-4 file:rounded-l-xl file:border-0 file:bg-green-500 file:text-white file:font-medium hover:file:bg-green-600 file:cursor-pointer"
            style={{ colorScheme: "light" }}
            ref={imageRef}
            {...imageRegister}
            onChange={(e) => {
              imageOnChange(e);
              handleImageChange(e);
            }}
          />

          {preview && (
            <div className="mt-4">
              <img
                src={preview}
                alt="Food Preview"
                className="w-40 h-40 rounded-xl object-cover border border-gray-200 shadow"
              />
            </div>
          )}

          {errors.image && (
            <p className="text-red-500 text-sm mt-2">{errors.image.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full h-12 rounded-xl font-medium bg-green-500 hover:bg-green-600 text-white text-lg transition-colors"
        >
          Add Food
        </button>
      </form>
    </div>
  );
};

export default FoodForm;
