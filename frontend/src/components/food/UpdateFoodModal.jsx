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

  // console.log(food);

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
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <dialog
      id="update_food_modal"
      className="modal"
      style={{ colorScheme: "light" }}
    >
      <div
        className="modal-box max-w-4xl rounded-2xl"
        style={{
          colorScheme: "light",
          backgroundColor: "#ffffff",
          color: "#1f2937",
        }}
      >
        <h3 className="text-2xl font-bold mb-6" style={{ color: "#16a34a" }}>
          Update Food
        </h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Food Name */}
            <div>
              <label className="label">
                <span
                  className="label-text font-semibold"
                  style={{ color: "#1f2937" }}
                >
                  Food Name
                </span>
              </label>

              <label
                className="input input-bordered rounded-xl flex items-center gap-3 w-full"
                style={{
                  colorScheme: "light",
                  backgroundColor: "#ffffff",
                  borderColor: "#d1d5db",
                }}
              >
                <FaAppleAlt style={{ color: "#22c55e" }} />
                <input
                  type="text"
                  placeholder="Milk"
                  className="grow"
                  style={{
                    colorScheme: "light",
                    backgroundColor: "transparent",
                    color: "#1f2937",
                  }}
                  {...register("name", { required: "Food name is required" })}
                />
              </label>

              {errors.name && (
                <p className="text-sm mt-1" style={{ color: "#ef4444" }}>
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Category */}
            <div>
              <label className="label">
                <span
                  className="label-text font-semibold"
                  style={{ color: "#1f2937" }}
                >
                  Category
                </span>
              </label>

              <select
                className="select select-bordered rounded-xl w-full"
                style={{
                  colorScheme: "light",
                  backgroundColor: "#ffffff",
                  color: "#1f2937",
                  borderColor: "#d1d5db",
                }}
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

              {errors.category && (
                <p className="text-sm mt-1" style={{ color: "#ef4444" }}>
                  {errors.category.message}
                </p>
              )}
            </div>

            {/* Quantity */}
            <div>
              <label className="label">
                <span
                  className="label-text font-semibold"
                  style={{ color: "#1f2937" }}
                >
                  Quantity
                </span>
              </label>

              <label
                className="input input-bordered rounded-xl flex items-center gap-3 w-full"
                style={{
                  colorScheme: "light",
                  backgroundColor: "#ffffff",
                  borderColor: "#d1d5db",
                }}
              >
                <FaBoxes style={{ color: "#22c55e" }} />
                <input
                  type="number"
                  min="1"
                  placeholder="1"
                  className="grow"
                  style={{
                    colorScheme: "light",
                    backgroundColor: "transparent",
                    color: "#1f2937",
                  }}
                  {...register("quantity", {
                    required: "Quantity is required",
                  })}
                />
              </label>

              {errors.quantity && (
                <p className="text-sm mt-1" style={{ color: "#ef4444" }}>
                  {errors.quantity.message}
                </p>
              )}
            </div>

            {/* Unit */}
            <div>
              <label className="label">
                <span
                  className="label-text font-semibold"
                  style={{ color: "#1f2937" }}
                >
                  Unit
                </span>
              </label>

              <select
                className="select select-bordered rounded-xl w-full"
                style={{
                  colorScheme: "light",
                  backgroundColor: "#ffffff",
                  color: "#1f2937",
                  borderColor: "#d1d5db",
                }}
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

              {errors.unit && (
                <p className="text-sm mt-1" style={{ color: "#ef4444" }}>
                  {errors.unit.message}
                </p>
              )}
            </div>

            {/* Expiry Date */}
            <div>
              <label className="label">
                <span
                  className="label-text font-semibold"
                  style={{ color: "#1f2937" }}
                >
                  Expiry Date
                </span>
              </label>

              <label
                className="input input-bordered rounded-xl flex items-center gap-3 w-full"
                style={{
                  colorScheme: "light",
                  backgroundColor: "#ffffff",
                  borderColor: "#d1d5db",
                }}
              >
                <FaCalendarAlt style={{ color: "#22c55e" }} />
                <input
                  type="date"
                  className="grow"
                  style={{
                    colorScheme: "light",
                    backgroundColor: "transparent",
                    color: "#1f2937",
                  }}
                  {...register("expiryDate", {
                    required: "Expiry date is required",
                  })}
                />
              </label>

              {errors.expiryDate && (
                <p className="text-sm mt-1" style={{ color: "#ef4444" }}>
                  {errors.expiryDate.message}
                </p>
              )}
            </div>

            {/* Storage Location */}
            <div>
              <label className="label">
                <span
                  className="label-text font-semibold"
                  style={{ color: "#1f2937" }}
                >
                  Storage Location
                </span>
              </label>

              <select
                className="select select-bordered rounded-xl w-full"
                style={{
                  colorScheme: "light",
                  backgroundColor: "#ffffff",
                  color: "#1f2937",
                  borderColor: "#d1d5db",
                }}
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
              <span
                className="label-text font-semibold"
                style={{ color: "#1f2937" }}
              >
                Notes
              </span>
            </label>

            <label
              className="textarea textarea-bordered rounded-xl flex gap-3 w-full"
              style={{
                colorScheme: "light",
                backgroundColor: "#ffffff",
                borderColor: "#d1d5db",
              }}
            >
              <FaStickyNote className="mt-1" style={{ color: "#22c55e" }} />
              <textarea
                rows="4"
                className="grow outline-none resize-none"
                style={{
                  colorScheme: "light",
                  backgroundColor: "transparent",
                  color: "#1f2937",
                }}
                placeholder="Any additional notes..."
                {...register("notes")}
              />
            </label>
          </div>

          {/* Food Image */}
          <div>
            <label className="label">
              <span
                className="label-text font-semibold"
                style={{ color: "#1f2937" }}
              >
                Food Image
              </span>
            </label>

            <input
              id="foodImage"
              type="file"
              accept="image/*"
              className="file-input file-input-bordered w-full"
              style={{
                colorScheme: "light",
                backgroundColor: "#ffffff",
                color: "#1f2937",
                borderColor: "#d1d5db",
              }}
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
                  className="w-40 h-40 rounded-xl object-cover shadow"
                  style={{
                    borderWidth: "1px",
                    borderColor: "#bbf7d0",
                    borderStyle: "solid",
                  }}
                />
              </div>
            )}

            {errors.image && (
              <p className="text-sm mt-2" style={{ color: "#ef4444" }}>
                {errors.image.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="btn w-full border-none text-lg"
            style={{ backgroundColor: "#22c55e", color: "#ffffff" }}
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
