import React, { memo, useMemo } from "react";
// partnerPreferenceSchema.ts
import { z } from "zod";
import {
  CardHeaderComp,
  ControlledSelect,
  formatOption,
  FormField,
  PremiumCard,
  PremiumCardContent,
  PremiumLabel,
  PremiumSeparator,
} from "./FormComponents";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFetchEnumsQuery } from "@/redux/api/profileApi";

export const createPartnerPreferenceSchema = (data: EnumData) => {
  return z.object({
    marital_status: z.enum(data.maritial_status as [string, ...string[]]),
    children_details: z.enum(data.children_details as [string, ...string[]]),

    country_prefrence: z.string().min(1, "Country is required"),
    state_prefrence: z.string().min(1, "State is required"),
    city_prefrence: z.string().min(1, "City is required"),

    age_range: z.string().min(1, "Age range is required"),
    height_range: z.string().min(1, "Height range is required"),

    complexion: z.enum(data.complexion as [string, ...string[]]),
    body_type: z.enum(data.body_type as [string, ...string[]]),

    family_status: z.enum(data.family_status as [string, ...string[]]),
    education_level: z.enum(data.education_level as [string, ...string[]]),

    religion: z.enum(data.religion as [string, ...string[]]),
    manglik_status: z.enum(data.manglik_status as [string, ...string[]]),
    turban_pagri: z.enum(data.turban_pagri as [string, ...string[]]),

    occupation_type: z.enum(data.occupation_type as [string, ...string[]]),
    occupation: z.string().min(1, "Occupation is required"),
  });
};
const BasicPreferences = memo(({ control, formSchema }: any) => (
  <PremiumCard>
    <CardHeaderComp title="Basic Preferences" />
    <PremiumSeparator />
    <PremiumCardContent>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col gap-1">
          <PremiumLabel required>Marital Status</PremiumLabel>
          <ControlledSelect
            control={control}
            name="marital_status"
            options={formSchema.shape.marital_status.options}
            formatFn={formatOption}
            placeholder="Select Marital Status"
          />
        </div>

        <div className="flex flex-col gap-1">
          <PremiumLabel required>Children</PremiumLabel>
          <ControlledSelect
            control={control}
            name="children_details"
            options={formSchema.shape.children_details.options}
            placeholder="Select Children Details"
          />
        </div>
      </div>
    </PremiumCardContent>
  </PremiumCard>
));

const LocationPreference = memo(({ register, errors }: any) => (
  <PremiumCard>
    <CardHeaderComp title="Location Preference" />
    <PremiumSeparator />
    <PremiumCardContent>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <FormField
          label="Country"
          id="country_pref"
          register={register("country_prefrence")}
          error={errors.country_prefrence}
          required
        />
        <FormField
          label="State"
          id="state_pref"
          register={register("state_prefrence")}
          error={errors.state_prefrence}
          required
        />
        <FormField
          label="City"
          id="city_pref"
          register={register("city_prefrence")}
          error={errors.city_prefrence}
          required
        />
      </div>
    </PremiumCardContent>
  </PremiumCard>
));

const PhysicalPreferences = memo(
  ({ control, register, errors, formSchema }: any) => (
    <PremiumCard>
      <CardHeaderComp title="Physical Preferences" />
      <PremiumSeparator />
      <PremiumCardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FormField
            label="Age Range"
            id="age_range"
            placeholder="e.g. 25-30"
            register={register("age_range")}
            error={errors.age_range}
            required
          />

          <FormField
            label="Height Range"
            id="height_range"
            placeholder="e.g. 5ft 5in - 6ft"
            register={register("height_range")}
            error={errors.height_range}
            required
          />

          <div className="flex flex-col gap-1">
            <PremiumLabel required>Complexion</PremiumLabel>
            <ControlledSelect
              control={control}
              name="complexion"
              options={formSchema.shape.complexion.options}
              placeholder="Select Complexion"
            />
          </div>

          <div className="flex flex-col gap-1">
            <PremiumLabel required>Body Type</PremiumLabel>
            <ControlledSelect
              control={control}
              name="body_type"
              options={formSchema.shape.body_type.options}
              placeholder="Select Body Type"
            />
          </div>
        </div>
      </PremiumCardContent>
    </PremiumCard>
  ),
);

const ReligionPreferences = memo(({ control, formSchema }: any) => (
  <PremiumCard>
    <CardHeaderComp title="Religion & Cultural Preferences" />
    <PremiumSeparator />
    <PremiumCardContent>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col gap-1">
          <PremiumLabel required>Religion</PremiumLabel>
          <ControlledSelect
            control={control}
            name="religion"
            options={formSchema.shape.religion.options}
          />
        </div>

        <div className="flex flex-col gap-1">
          <PremiumLabel required>Manglik Status</PremiumLabel>
          <ControlledSelect
            control={control}
            name="manglik_status"
            options={formSchema.shape.manglik_status.options}
          />
        </div>

        <div className="flex flex-col gap-1">
          <PremiumLabel required>Turban / Pagri</PremiumLabel>
          <ControlledSelect
            control={control}
            name="turban_pagri"
            options={formSchema.shape.turban_pagri.options}
          />
        </div>
      </div>
    </PremiumCardContent>
  </PremiumCard>
));

const CareerPreferences = memo(
  ({ control, register, errors, formSchema }: any) => (
    <PremiumCard>
      <CardHeaderComp title="Education & Career Preference" />
      <PremiumSeparator />
      <PremiumCardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col gap-1">
            <PremiumLabel required>Education</PremiumLabel>
            <ControlledSelect
              control={control}
              name="education_level"
              options={formSchema.shape.education_level.options}
            />
          </div>

          <div className="flex flex-col gap-1">
            <PremiumLabel required>Occupation Type</PremiumLabel>
            <ControlledSelect
              control={control}
              name="occupation_type"
              options={formSchema.shape.occupation_type.options}
            />
          </div>

          <FormField
            label="Occupation"
            id="occupation_pref"
            register={register("occupation")}
            error={errors.occupation}
            required
          />

          <div className="flex flex-col gap-1">
            <PremiumLabel required>Family Status</PremiumLabel>
            <ControlledSelect
              control={control}
              name="family_status"
              options={formSchema.shape.family_status.options}
            />
          </div>
        </div>
      </PremiumCardContent>
    </PremiumCard>
  ),
);
const PartnerPreferenceForm = ({ formSchema }: any) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: any) => {
    console.log("Partner Preference:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-10">
      <BasicPreferences control={control} formSchema={formSchema} />

      <LocationPreference register={register} errors={errors} />

      <PhysicalPreferences
        control={control}
        register={register}
        errors={errors}
        formSchema={formSchema}
      />

      <ReligionPreferences control={control} formSchema={formSchema} />

      <CareerPreferences
        control={control}
        register={register}
        errors={errors}
        formSchema={formSchema}
      />
    </form>
  );
};

const PartnerPreferencePage = () => {
  const { data, isLoading, isError } = useFetchEnumsQuery({});

  const formSchema = useMemo(() => {
    if (!data?.data) return null;
    return createPartnerPreferenceSchema(data.data);
  }, [data]);

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#660b26]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#d4af37] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#d4af37] font-medium tracking-widest uppercase">
            Loading...
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (isError || !formSchema) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#660b26] p-4">
        <div className="text-center bg-white/10 backdrop-blur-md p-10 rounded-3xl border border-[#d4af37]/30 shadow-2xl">
          <p className="text-red-300 mb-2 text-xl font-serif">
            Failed to load form
          </p>
          <p className="text-sm text-white/70">
            Please refresh the page to try again
          </p>
        </div>
      </div>
    );
  }

  return <PartnerPreferenceForm formSchema={formSchema} />;
};

export default PartnerPreferencePage;
