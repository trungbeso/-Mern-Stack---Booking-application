import { useForm, FormProvider } from "react-hook-form";
import DetailSection from "./DetailSection";
import TypeSection from "./TypeSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestSection from "./GuestSection";

export type HotelFormData = {
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  pricePerNight: number;
  starRating: number;
  facilities: string[];
  imageFiles: FileList;
  adultCount: number;
  childCount: number;
};

const ManageHotelForm = () => {
  const formMethods = useForm<HotelFormData>();
  return (
    <FormProvider {...formMethods}>
      <form className="flex flex-col gap-10">
        <DetailSection />
        <TypeSection />
        <FacilitiesSection />
        <GuestSection />
      </form>
    </FormProvider>
  );
};

export default ManageHotelForm;
