import FoodForm from "../../components/food/FoodForm";

const AddFood = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Add Food</h1>
        <p className="text-gray-500 mt-2">
          Add a new food item to keep track of its expiry date.
        </p>
      </div>

      <FoodForm />
    </div>
  );
};

export default AddFood;
