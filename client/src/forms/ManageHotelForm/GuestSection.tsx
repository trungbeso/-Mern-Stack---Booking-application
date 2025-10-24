import { useFormContext } from "react-hook-form";
import type { HotelFormData } from "./ManageHotelForm";

const GuestSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-3xl font-bold mb-3">Guest</h2>
      <div className="flex gap-4 bg-blue-400 p-4 rounded-md">
        <label className="text-gray-700 text-sm font-bold flex-1">
          Adult
          <input
            type="number"
            min={1}
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("adultCount", { required: "This field is required" })}
          />
          {errors.adultCount && (
            <span className="text-red-500">{errors.adultCount.message}</span>
          )}
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Child
          <input
            type="number"
            min={1}
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("childCount", { required: "This field is required" })}
          />
          {errors.childCount && (
            <span className="text-red-500">{errors.childCount.message}</span>
          )}
        </label>
      </div>
    </div>
  );
};

export default GuestSection;
