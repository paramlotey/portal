"use client";
import { useFetchEnumsQuery } from "@/redux/api/profileApi";
import { useMemo, useCallback, memo } from "react";
import { z } from "zod";

import { Textarea } from "@/components/ui/textarea";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CardHeaderComp,
  ControlledSelect,
  formatOption,
  FormField,
  PillSelector,
  PremiumCard,
  PremiumCardContent,
  PremiumLabel,
  PremiumSeparator,
  SiblingCounter,
} from "./FormComponents";

const generateNumberOptions = (start: number, count: number) =>
  Array.from({ length: count }, (_, i) => String(i + start));

const BasicInformation = memo(
  ({ register, control, errors, formSchema }: any) => (
    <PremiumCard>
      <CardHeaderComp title="Basic Information" />
      <PremiumSeparator />
      <PremiumCardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FormField
            label="Full Name"
            id="name"
            placeholder="Enter your full name"
            register={register("name")}
            error={errors.name}
            required
          />
          <FormField
            label="Email"
            id="email"
            type="email"
            placeholder="your.email@example.com"
            register={register("email")}
            error={errors.email}
            required
          />
          <FormField
            label="Phone Number"
            id="phone"
            placeholder="+91 98765 43210"
            register={register("phone")}
            error={errors.phone}
            required
          />
          <div className="flex flex-col gap-1">
            <PremiumLabel required>Profile Created By</PremiumLabel>
            <ControlledSelect
              control={control}
              name="profile_created_by"
              options={formSchema.shape.profile_created_by.options}
              formatFn={formatOption}
              placeholder="Select Profile Created By"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <PremiumLabel required>Gender</PremiumLabel>
          <Controller
            control={control}
            name="gender"
            render={({ field, fieldState }) => (
              <>
                <PillSelector
                  options={formSchema.shape.gender.options}
                  value={field.value}
                  onChange={field.onChange}
                />
                {fieldState.error && (
                  <span className="text-xs text-destructive mt-1">
                    {fieldState.error.message}
                  </span>
                )}
              </>
            )}
          />
        </div>
      </PremiumCardContent>
    </PremiumCard>
  ),
);
BasicInformation.displayName = "BasicInformation";

const PersonalInformation = memo(
  ({ register, control, errors, formSchema }: any) => (
    <PremiumCard>
      <CardHeaderComp title="Personal Information" />
      <PremiumSeparator />
      <PremiumCardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FormField
            label="Date of Birth"
            id="dob"
            type="date"
            register={register("date_of_birth")}
            error={errors.date_of_birth}
            required
          />
          <FormField
            label="Time of Birth"
            id="tob"
            type="time"
            register={register("time_of_birth")}
            error={errors.time_of_birth}
            required
          />
          <FormField
            label="Place of Birth"
            id="placeOfBirth"
            placeholder="City, State"
            register={register("place_of_birth")}
            error={errors.place_of_birth}
            required
          />
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
          <div className="flex flex-col gap-1">
            <PremiumLabel required>Mother Tongue</PremiumLabel>
            <ControlledSelect
              control={control}
              name="mother_tongue"
              options={formSchema.shape.mother_tongue.options}
              formatFn={formatOption}
              placeholder="Select Mother Tongue"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-linear-to-br from-[#d4af37]/5 to-gray-50/50 p-6 rounded-2xl border border-[#d4af37]/20">
          <SiblingCounter
            label="No. of Brothers"
            youngerRegister={register("no_of_brothers")}
            elderRegister={register("no_of_brothers_elders")}
          />
          <SiblingCounter
            label="No. of Sisters"
            youngerRegister={register("no_of_sisters")}
            elderRegister={register("no_of_sisters_elders")}
          />
        </div>
      </PremiumCardContent>
    </PremiumCard>
  ),
);
PersonalInformation.displayName = "PersonalInformation";

const ReligionCommunity = memo(({ register, control, formSchema }: any) => (
  <PremiumCard>
    <CardHeaderComp title="Religion & Community" />
    <PremiumSeparator />
    <PremiumCardContent>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col gap-1">
          <PremiumLabel required>Religion</PremiumLabel>
          <ControlledSelect
            control={control}
            name="religion"
            options={formSchema.shape.religion.options}
            formatFn={formatOption}
            placeholder="Select Religion"
          />
        </div>
        <div className="flex flex-col gap-1">
          <PremiumLabel required>Caste</PremiumLabel>
          <ControlledSelect
            control={control}
            name="caste"
            options={formSchema.shape.caste.options}
            placeholder="Select Caste"
          />
        </div>
        <FormField
          label="Paternal Surname / Gotra"
          id="paternalSurname"
          placeholder="e.g. Dhaliwal"
          register={register("paternal_surname")}
        />
        <FormField
          label="Maternal Surname / Gotra"
          id="maternalSurname"
          placeholder="e.g. Sandhu"
          register={register("maternal_surname")}
        />
        <div className="flex flex-col gap-1">
          <PremiumLabel required>Manglik Status</PremiumLabel>
          <ControlledSelect
            control={control}
            name="manglik_status"
            options={formSchema.shape.manglik_status.options}
            placeholder="Select Manglik Status"
          />
        </div>
        <div className="flex flex-col gap-1">
          <PremiumLabel required>Turban / Pagri</PremiumLabel>
          <ControlledSelect
            control={control}
            name="turban_pagri"
            options={formSchema.shape.turban_pagri.options}
            placeholder="Select Turban / Pagri"
          />
        </div>
      </div>
    </PremiumCardContent>
  </PremiumCard>
));
ReligionCommunity.displayName = "ReligionCommunity";

const PhysicalAppearance = memo(
  ({ register, control, formSchema, feetOptions, inchesOptions }: any) => (
    <PremiumCard>
      <CardHeaderComp title="Physical Appearance" />
      <PremiumSeparator />
      <PremiumCardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col gap-2">
            <PremiumLabel required>Height</PremiumLabel>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <ControlledSelect
                  control={control}
                  name="height_feet"
                  options={feetOptions}
                  placeholder="Ft"
                  formatFn={(ft) => `${ft} ft`}
                />
              </div>
              <div className="flex flex-col gap-1">
                <ControlledSelect
                  control={control}
                  name="height_inches"
                  options={inchesOptions}
                  placeholder="In"
                  formatFn={(inch) => `${inch} in`}
                />
              </div>
            </div>
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
            <PremiumLabel required>Physical Status</PremiumLabel>
            <ControlledSelect
              control={control}
              name="physical_status"
              options={formSchema.shape.physical_status.options}
              placeholder="Select Physical Status"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <PremiumLabel required>Diet Preference</PremiumLabel>
          <Controller
            control={control}
            name="diet_preference"
            render={({ field, fieldState }) => (
              <>
                <PillSelector
                  options={formSchema.shape.diet_preference.options}
                  value={field.value}
                  onChange={field.onChange}
                />
                {fieldState.error && (
                  <span className="text-xs text-destructive mt-1">
                    {fieldState.error.message}
                  </span>
                )}
              </>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
          <div className="flex flex-col gap-2">
            <PremiumLabel required>Smoking</PremiumLabel>
            <Controller
              control={control}
              name="smoking_habit"
              render={({ field, fieldState }) => (
                <>
                  <PillSelector
                    options={formSchema.shape.smoking_habit.options}
                    value={field.value}
                    onChange={field.onChange}
                  />
                  {fieldState.error && (
                    <span className="text-xs text-destructive mt-1">
                      {fieldState.error.message}
                    </span>
                  )}
                </>
              )}
            />
          </div>
          <div className="flex flex-col gap-2">
            <PremiumLabel required>Drinking</PremiumLabel>
            <Controller
              control={control}
              name="drinking_habit"
              render={({ field, fieldState }) => (
                <>
                  <PillSelector
                    options={formSchema.shape.drinking_habit.options}
                    value={field.value}
                    onChange={field.onChange}
                  />
                  {fieldState.error && (
                    <span className="text-xs text-destructive mt-1">
                      {fieldState.error.message}
                    </span>
                  )}
                </>
              )}
            />
          </div>
        </div>
      </PremiumCardContent>
    </PremiumCard>
  ),
);
PhysicalAppearance.displayName = "PhysicalAppearance";

const EducationCareer = memo(({ register, control, formSchema }: any) => (
  <PremiumCard>
    <CardHeaderComp title="Education & Career" />
    <PremiumSeparator />
    <PremiumCardContent>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col gap-1">
          <PremiumLabel required>Education Level</PremiumLabel>
          <ControlledSelect
            control={control}
            name="education_level"
            options={formSchema.shape.education_level.options}
            formatFn={formatOption}
            placeholder="Select Education Level"
          />
        </div>
        <div className="flex flex-col gap-1">
          <PremiumLabel required>Occupation Type</PremiumLabel>
          <ControlledSelect
            control={control}
            name="occupation_type"
            options={formSchema.shape.occupation_type.options}
            placeholder="Select Occupation Type"
          />
        </div>
        <FormField
          label="Occupation / Designation"
          id="occupation"
          placeholder="e.g. Software Engineer"
          register={register("occupation")}
          required
        />
        <div className="flex flex-col gap-1">
          <PremiumLabel required>Annual Income</PremiumLabel>
          <ControlledSelect
            control={control}
            name="annual_income"
            options={formSchema.shape.annual_income.options}
            placeholder="Select Annual Income Range"
          />
        </div>
      </div>
    </PremiumCardContent>
  </PremiumCard>
));
EducationCareer.displayName = "EducationCareer";

const FamilyDetails = memo(({ control, formSchema }: any) => (
  <PremiumCard>
    <CardHeaderComp title="Family Details" />
    <PremiumSeparator />
    <PremiumCardContent>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex flex-col gap-1">
          <PremiumLabel required>Family Background</PremiumLabel>
          <ControlledSelect
            control={control}
            name="family_background"
            options={formSchema.shape.family_background.options}
            formatFn={formatOption}
            placeholder="Select Family Background"
          />
        </div>
        <div className="flex flex-col gap-1">
          <PremiumLabel required>Family Status</PremiumLabel>
          <ControlledSelect
            control={control}
            name="family_status"
            options={formSchema.shape.family_status.options}
            formatFn={formatOption}
            placeholder="Select Family Status"
          />
        </div>
        <div className="flex flex-col gap-1">
          <PremiumLabel required>Residency Status</PremiumLabel>
          <ControlledSelect
            control={control}
            name="residency_status"
            options={formSchema.shape.residency_status.options}
            formatFn={formatOption}
            placeholder="Select Residency Status"
          />
        </div>
      </div>
    </PremiumCardContent>
  </PremiumCard>
));
FamilyDetails.displayName = "FamilyDetails";

const LocationSection = memo(({ register, errors }: any) => (
  <PremiumCard>
    <CardHeaderComp title="Location" />
    <PremiumSeparator />
    <PremiumCardContent>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <FormField
          label="Country"
          id="country"
          placeholder="Select country"
          register={register("country")}
          error={errors.country}
          required
        />
        <FormField
          label="State"
          id="state"
          placeholder="Select state"
          register={register("state")}
          error={errors.state}
          required
        />
        <FormField
          label="City"
          id="city"
          placeholder="Enter city"
          register={register("city")}
          error={errors.city}
          required
        />
        <FormField
          label="Pincode"
          id="pincode"
          placeholder="e.g. 160001"
          register={register("pincode")}
          error={errors.pincode}
          required
        />
        <div className="flex flex-col gap-1 md:col-span-2">
          <PremiumLabel htmlFor="address">Full Address</PremiumLabel>
          <Textarea
            id="address"
            placeholder="House no., street, locality..."
            className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm text-gray-800 transition-all placeholder:text-gray-400 focus:bg-white focus:outline-none focus:border-[#d4af37]! focus:ring-2 focus:ring-[#d4af37]/20! resize-y"
            {...register("address")}
          />
        </div>
      </div>
    </PremiumCardContent>
  </PremiumCard>
));
LocationSection.displayName = "LocationSection";

const AboutSection = memo(({ register }: any) => (
  <PremiumCard>
    <CardHeaderComp title="About Yourself" />
    <PremiumSeparator />
    <PremiumCardContent>
      <div className="flex flex-col gap-1">
        <PremiumLabel htmlFor="bio" required>
          Bio
        </PremiumLabel>
        <Textarea
          id="bio"
          placeholder="Describe yourself, your family, values, and what you are looking for in a partner... (max 240 words)"
          className="min-h-40 w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm text-gray-800 transition-all placeholder:text-gray-400 focus:bg-white focus:outline-none focus:border-[#d4af37]! focus:ring-2 focus:ring-[#d4af37]/20! resize-y"
          {...register("bio")}
        />
        <span className="text-xs text-gray-400 mt-2 font-medium">
          This will be visible to other members. Let your personality shine.
        </span>
      </div>
    </PremiumCardContent>
  </PremiumCard>
));
AboutSection.displayName = "AboutSection";

// ============================================================
// FORM SCHEMA BUILDER
// ============================================================

const createFormSchema = (data: EnumData) => {
  return z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    gender: z.enum(data.gender_type as [string, ...string[]]),
    marital_status: z.enum(data.maritial_status as [string, ...string[]]),
    religion: z.enum(data.religion as [string, ...string[]]),
    date_of_birth: z.string().min(1, "Date of birth is required"),
    time_of_birth: z.string().min(1, "Time of birth is required"),
    place_of_birth: z.string().min(1, "Place of birth is required"),
    no_of_brothers: z.string(),
    no_of_sisters: z.string(),
    address: z.string(),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    country: z.string().min(1, "Country is required"),
    pincode: z.string().min(1, "Pincode is required"),
    phone: z.string().min(1, "Phone number is required"),
    occupation: z.string().min(1, "Occupation is required"),
    height_feet: z.string().min(1, "Height is required"),
    height_inches: z.string().min(1, "Height is required"),
    bio: z.string(),
    children_details: z.enum(data.children_details as [string, ...string[]]),
    occupation_type: z.enum(data.occupation_type as [string, ...string[]]),
    annual_income: z.enum(data.annual_income_range as [string, ...string[]]),
    body_type: z.enum(data.body_type as [string, ...string[]]),
    smoking_habit: z.enum(data.smoking_habit as [string, ...string[]]),
    drinking_habit: z.enum(data.drinking_habit as [string, ...string[]]),
    complexion: z.enum(data.complexion as [string, ...string[]]),
    diet_preference: z.enum(data.diet_preference as [string, ...string[]]),
    physical_status: z.enum(data.physical_status as [string, ...string[]]),
    turban_pagri: z.enum(data.turban_pagri as [string, ...string[]]),
    manglik_status: z.enum(data.manglik_status as [string, ...string[]]),
    education_level: z.enum(data.education_level as [string, ...string[]]),
    residency_status: z.enum(data.residency_status as [string, ...string[]]),
    family_status: z.enum(data.family_status as [string, ...string[]]),
    profile_created_by: z.enum(data.profile_createdby as [string, ...string[]]),
    family_background: z.enum(data.family_background as [string, ...string[]]),
    caste: z.enum(data.caste as [string, ...string[]]),
    mother_tongue: z.enum(data.mother_tongue as [string, ...string[]]),
    paternal_surname: z.string(),
    maternal_surname: z.string(),
  });
};

// ============================================================
// MAIN COMPONENTS
// ============================================================

const ProfileForm = memo(({ formSchema }: { formSchema: FormSchema }) => {
  const feetOptions = useMemo(() => generateNumberOptions(4, 4), []);
  const inchesOptions = useMemo(() => generateNumberOptions(0, 12), []);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = useCallback((values: FormValues) => {
    console.log(values);
    // API call here
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-10">
        <BasicInformation
          register={register}
          control={control}
          errors={errors}
          formSchema={formSchema}
        />
        <PersonalInformation
          register={register}
          control={control}
          errors={errors}
          formSchema={formSchema}
        />
        <ReligionCommunity
          register={register}
          control={control}
          formSchema={formSchema}
        />
        <PhysicalAppearance
          register={register}
          control={control}
          formSchema={formSchema}
          feetOptions={feetOptions}
          inchesOptions={inchesOptions}
        />
        <EducationCareer
          register={register}
          control={control}
          formSchema={formSchema}
        />
        <FamilyDetails control={control} formSchema={formSchema} />
        <LocationSection register={register} errors={errors} />
        <AboutSection register={register} />
      </form>
    </>
  );
});
ProfileForm.displayName = "ProfileForm";

const RegisterComp = () => {
  // Using your actual RTK Query hook
  const { data, isError, isLoading } = useFetchEnumsQuery({});

  const formSchema = useMemo(() => {
    if (!data?.data) return null;
    return createFormSchema(data.data);
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

  return <ProfileForm formSchema={formSchema} />;
};

export default RegisterComp;
