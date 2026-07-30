import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  FaAppleAlt,
  FaBoxes,
  FaCalendarAlt,
  FaStickyNote,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthProvider";

const UpdateFoodModal = ({ food, getMyFoods, setSelectedFood }) => {
  const { server_url } = useContext(AuthContext);
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

  // console.log(food);

  useEffect(() => {
    if (food) {
      reset({
        name: food.name,
        category: food.category,
        quantity: food.quantity,
        unit: food.unit,
        expiryDate: food.expiryDate
          ? new Date(food.expiryDate).toISOString().split("T")[0]
          : "",
        location: food.location,
        notes: food.notes,
      });
    }
  }, [food, reset]);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

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

      const res = await axios.put(`${server_url}/food/${food._id}`, formData, {
        withCredentials: true,
      });

      if (res) {
        toast.success(res.data?.message);
        getMyFoods();
        document.getElementById("update_food_modal").close();
        setSelectedFood(null);
      }
    } catch (error) {
      toast.error(error.response?.data.error || error.message);
    }
  };

  return (
    <dialog id="update_food_modal" className="modal">
      <div className="modal-box max-w-4xl rounded-2xl">
        <h3 className="text-2xl font-bold mb-6 text-green-600">Update Food</h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Food Name */}
            <div>
              <label className="label">
                <span className="label-text font-semibold">Food Name</span>
              </label>

              <label className="input input-bordered rounded-xl flex items-center gap-3 w-full">
                <FaAppleAlt className="text-green-500" />
                <input
                  type="text"
                  placeholder="Milk"
                  className="grow"
                  {...register("name", {
                    required: "Food name is required",
                  })}
                />
              </label>

              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Category */}
            <div>
              <label className="label">
                <span className="label-text font-semibold">Category</span>
              </label>

              <select
                className="select select-bordered rounded-xl w-full"
                {...register("category", {
                  required: "Category is required",
                })}
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

              {errors.category && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.category.message}
                </p>
              )}
            </div>

            {/* Quantity */}
            <div>
              <label className="label">
                <span className="label-text font-semibold">Quantity</span>
              </label>

              <label className="input input-bordered rounded-xl flex items-center gap-3 w-full">
                <FaBoxes className="text-green-500" />
                <input
                  type="number"
                  min="1"
                  placeholder="1"
                  className="grow"
                  {...register("quantity", {
                    required: "Quantity is required",
                  })}
                />
              </label>

              {errors.quantity && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.quantity.message}
                </p>
              )}
            </div>

            {/* Unit */}
            <div>
              <label className="label">
                <span className="label-text font-semibold">Unit</span>
              </label>

              <select
                className="select select-bordered rounded-xl w-full"
                {...register("unit", {
                  required: "Unit is required",
                })}
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

              {errors.unit && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.unit.message}
                </p>
              )}
            </div>

            {/* Expiry Date */}
            <div>
              <label className="label">
                <span className="label-text font-semibold">Expiry Date</span>
              </label>

              <label className="input input-bordered rounded-xl flex items-center gap-3 w-full">
                <FaCalendarAlt className="text-green-500" />
                <input
                  type="date"
                  className="grow"
                  {...register("expiryDate", {
                    required: "Expiry date is required",
                  })}
                />
              </label>

              {errors.expiryDate && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.expiryDate.message}
                </p>
              )}
            </div>

            {/* Storage Location */}
            <div>
              <label className="label">
                <span className="label-text font-semibold">
                  Storage Location
                </span>
              </label>

              <select
                className="select select-bordered rounded-xl w-full"
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

          {/* Notes */}
          <div>
            <label className="label">
              <span className="label-text font-semibold">Notes</span>
            </label>

            <label className="textarea textarea-bordered rounded-xl flex gap-3 w-full">
              <FaStickyNote className="text-green-500 mt-1" />
              <textarea
                rows="4"
                className="grow outline-none resize-none"
                placeholder="Any additional notes..."
                {...register("notes")}
              />
            </label>
          </div>

          {/* Food Image */}
          <div>
            <label className="label">
              <span className="label-text font-semibold">Food Image</span>
            </label>

            <input
              id="foodImage"
              type="file"
              accept="image/*"
              className="file-input file-input-bordered w-full"
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
                  className="w-40 h-40 rounded-xl object-cover border border-green-200 shadow"
                />
              </div>
            )}

            {errors.image && (
              <p className="text-red-500 text-sm mt-2">
                {errors.image.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="btn w-full bg-green-500 hover:bg-green-600 border-none text-white text-lg"
          >
            Update Food
          </button>
        </form>
      </div>

      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default UpdateFoodModal;
