import { useFormContext } from "react-hook-form";
import { hotelTypes } from "../../config/hotel-options-config";

const TypeSection = () => {
  const { register, watch } = useFormContext();
  const typeWatch = watch("type");

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Type</h2>
      <div className="grid grid-cols-5 gap-2 text-center">
        {hotelTypes.map((type) => (
          <label
            className={
              typeWatch === type
                ? "cursor-pointer bg-blue-700 text-sm rounded-full px-4 py-2 font-semibold"
                : "cursor-pointer bg-blue-400 text-gray-700 text-sm rounded-full px-4 py-2 font-semibold"
            }
            key={type}
          >
            <input
              className="hidden"
              type="radio"
              value={type}
              {...register("type", { required: "This field is required" })}
            />
            <span className="select-none">{type}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default TypeSection;
