"use client";
import { useFetchEnumsQuery } from "@/redux/api/profileApi";
import { useMemo, useCallback } from "react";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";

// ============================================================
// TYPE DEFINITIONS
// ============================================================

type EnumData = {
  gender_type: string[];
  maritial_status: string[];
  religion: string[];
  children_details: string[];
  occupation_type: string[];
  annual_income_range: string[];
  body_type: string[];
  smoking_habit: string[];
  drinking_habit: string[];
  complexion: string[];
  diet_preference: string[];
  physical_status: string[];
  turban_pagri: string[];
  manglik_status: string[];
  education_level: string[];
  residency_status: string[];
  family_status: string[];
  profile_createdby: string[];
  family_background: string[];
  caste: string[];
  mother_tongue: string[];
};

type FormSchema = z.ZodObject<any>;
type FormValues = z.infer<FormSchema>;

// ============================================================
// UTILITY FUNCTIONS
// ============================================================

const formatOption = (option: string) =>
  option.charAt(0).toUpperCase() + option.slice(1).toLowerCase();

const generateNumberOptions = (start: number, count: number) =>
  Array.from({ length: count }, (_, i) => String(i + start));

// ============================================================
// REUSABLE COMPONENTS
// ============================================================

const PillSelector = ({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string;
  onChange: (val: string) => void;
}) => (
  <div className="flex gap-2 flex-wrap">
    {options.map((option) => (
      <button
        key={option}
        type="button"
        onClick={() => onChange(option)}
        className={cn(
          "px-4 py-1.5 rounded-full border text-sm cursor-pointer transition-colors",
          value === option
            ? "bg-primary text-primary-foreground border-primary"
            : "border-border text-muted-foreground hover:border-primary hover:text-primary",
        )}
      >
        {formatOption(option)}
      </button>
    ))}
  </div>
);

const ControlledSelect = ({
  control,
  name,
  options,
  placeholder = "Select",
  formatFn,
}: {
  control: any;
  name: string;
  options: string[];
  placeholder?: string;
  formatFn?: (opt: string) => string;
}) => (
  <Controller
    control={control}
    name={name}
    render={({ field, fieldState }) => (
      <div className="flex flex-col gap-1">
        <Select onValueChange={field.onChange} value={field.value}>
          <SelectTrigger
            aria-label={name}
            className={cn(fieldState.error && "border-destructive", "w-full")}
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent
            className="w-full"
            position="popper"
            align="start"
          >
            {" "}
            {options.map((option) => (
              <SelectItem key={option} value={option}>
                {formatFn ? formatFn(option) : option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {fieldState.error && (
          <span className="text-xs text-destructive">
            {fieldState.error.message}
          </span>
        )}
      </div>
    )}
  />
);

const FormField = ({
  label,
  id,
  type = "text",
  placeholder,
  register,
  error,
  required = false,
}: {
  label: string;
  id: string;
  type?: string;
  placeholder?: string;
  register: any;
  error?: any;
  required?: boolean;
}) => (
  <div className="flex flex-col gap-2">
    <Label htmlFor={id}>
      {label} {required && "*"}
    </Label>
    <Input id={id} type={type} placeholder={placeholder} {...register} />
    {error && <span className="text-xs text-destructive">{error.message}</span>}
  </div>
);

const SiblingCounter = ({
  label,
  youngerRegister,
  elderRegister,
}: {
  label: string;
  youngerRegister: any;
  elderRegister?: any;
}) => (
  <div className="flex flex-col gap-2">
    <Label>{label}</Label>
    <div className="grid grid-cols-2 gap-2">
      <div className="flex flex-col gap-1">
        <Label className="text-xs text-muted-foreground">Younger</Label>
        <Input type="number" min={0} placeholder="0" {...youngerRegister} />
      </div>
      {elderRegister && (
        <div className="flex flex-col gap-1">
          <Label className="text-xs text-muted-foreground">Elder</Label>
          <Input type="number" min={0} placeholder="0" {...elderRegister} />
        </div>
      )}
    </div>
  </div>
);

// ============================================================
// FORM SECTIONS
// ============================================================

const BasicInformation = ({
  register,
  control,
  errors,
  formSchema,
}: {
  register: any;
  control: any;
  errors: any;
  formSchema: FormSchema;
}) => (
  <Card>
    <CardHeader>
      <CardTitle>Basic Information</CardTitle>
    </CardHeader>
    <Separator />
    <CardContent className=" flex flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        <div className="flex flex-col gap-2">
          <Label>
            Profile Created By <span className="text-destructive">*</span>
          </Label>
          <ControlledSelect
            control={control}
            name="profile_created_by"
            options={formSchema.shape.profile_created_by.options}
            formatFn={formatOption}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label>
          Gender <span className="text-destructive">*</span>
        </Label>
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
                <span className="text-xs text-destructive">
                  {fieldState.error.message}
                </span>
              )}
            </>
          )}
        />
      </div>
    </CardContent>
  </Card>
);

const PersonalInformation = ({
  register,
  control,
  errors,
  formSchema,
}: {
  register: any;
  control: any;
  errors: any;
  formSchema: FormSchema;
}) => (
  <Card>
    <CardHeader>
      <CardTitle>Personal Information</CardTitle>
    </CardHeader>
    <Separator />
    <CardContent className=" flex flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        />
        <FormField
          label="Place of Birth"
          id="placeOfBirth"
          placeholder="City, State"
          register={register("place_of_birth")}
        />
        <div className="flex flex-col gap-2">
          <Label>
            Marital Status <span className="text-destructive">*</span>
          </Label>
          <ControlledSelect
            control={control}
            name="marital_status"
            options={formSchema.shape.marital_status.options}
            formatFn={formatOption}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label>Children</Label>
          <ControlledSelect
            control={control}
            name="children_details"
            options={formSchema.shape.children_details.options}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label>
            Mother Tongue <span className="text-destructive">*</span>
          </Label>
          <ControlledSelect
            control={control}
            name="mother_tongue"
            options={formSchema.shape.mother_tongue.options}
            formatFn={formatOption}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
    </CardContent>
  </Card>
);

const ReligionCommunity = ({
  register,
  control,
  formSchema,
}: {
  register: any;
  control: any;
  formSchema: FormSchema;
}) => (
  <Card>
    <CardHeader>
      <CardTitle>Religion &amp; Community</CardTitle>
    </CardHeader>
    <Separator />
    <CardContent className=" flex flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <Label>
            Religion <span className="text-destructive">*</span>
          </Label>
          <ControlledSelect
            control={control}
            name="religion"
            options={formSchema.shape.religion.options}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label>
            Caste <span className="text-destructive">*</span>
          </Label>
          <ControlledSelect
            control={control}
            name="caste"
            options={formSchema.shape.caste.options}
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
        <div className="flex flex-col gap-2">
          <Label>Manglik Status</Label>
          <ControlledSelect
            control={control}
            name="manglik_status"
            options={formSchema.shape.manglik_status.options}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label>Turban / Pagri</Label>
          <ControlledSelect
            control={control}
            name="turban_pagri"
            options={formSchema.shape.turban_pagri.options}
          />
        </div>
      </div>
    </CardContent>
  </Card>
);

const PhysicalAppearance = ({
  register,
  control,
  formSchema,
  feetOptions,
  inchesOptions,
}: {
  register: any;
  control: any;
  formSchema: FormSchema;
  feetOptions: string[];
  inchesOptions: string[];
}) => (
  <Card>
    <CardHeader>
      <CardTitle>Physical Appearance</CardTitle>
    </CardHeader>
    <Separator />
    <CardContent className=" flex flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <Label>
            Height <span className="text-destructive">*</span>
          </Label>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col gap-1">
              <ControlledSelect
                control={control}
                name="height_feet"
                options={feetOptions}
                placeholder="Ft"
                formatFn={(ft) => `${ft} ft`}
              />
              <Label className="text-xs text-muted-foreground">Feet</Label>
            </div>
            <div className="flex flex-col gap-1">
              <ControlledSelect
                control={control}
                name="height_inches"
                options={inchesOptions}
                placeholder="In"
                formatFn={(inch) => `${inch} in`}
              />
              <Label className="text-xs text-muted-foreground">Inches</Label>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Label>Body Type</Label>
          <ControlledSelect
            control={control}
            name="body_type"
            options={formSchema.shape.body_type.options}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label>Complexion</Label>
          <ControlledSelect
            control={control}
            name="complexion"
            options={formSchema.shape.complexion.options}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label>Physical Status</Label>
          <ControlledSelect
            control={control}
            name="physical_status"
            options={formSchema.shape.physical_status.options}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label>Diet Preference</Label>
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
                <span className="text-xs text-destructive">
                  {fieldState.error.message}
                </span>
              )}
            </>
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <Label>Smoking</Label>
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
                  <span className="text-xs text-destructive">
                    {fieldState.error.message}
                  </span>
                )}
              </>
            )}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label>Drinking</Label>
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
                  <span className="text-xs text-destructive">
                    {fieldState.error.message}
                  </span>
                )}
              </>
            )}
          />
        </div>
      </div>
    </CardContent>
  </Card>
);

const EducationCareer = ({
  register,
  control,
  formSchema,
}: {
  register: any;
  control: any;
  formSchema: FormSchema;
}) => (
  <Card>
    <CardHeader>
      <CardTitle>Education &amp; Career</CardTitle>
    </CardHeader>
    <Separator />
    <CardContent className=" flex flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <Label>
            Education Level <span className="text-destructive">*</span>
          </Label>
          <ControlledSelect
            control={control}
            name="education_level"
            options={formSchema.shape.education_level.options}
            formatFn={formatOption}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label>
            Occupation Type <span className="text-destructive">*</span>
          </Label>
          <ControlledSelect
            control={control}
            name="occupation_type"
            options={formSchema.shape.occupation_type.options}
          />
        </div>
        <FormField
          label="Occupation / Designation"
          id="occupation"
          placeholder="e.g. Software Engineer"
          register={register("occupation")}
        />
        <div className="flex flex-col gap-2">
          <Label>Annual Income</Label>
          <ControlledSelect
            control={control}
            name="annual_income"
            options={formSchema.shape.annual_income.options}
            placeholder="Select range"
          />
        </div>
      </div>
    </CardContent>
  </Card>
);

const FamilyDetails = ({
  control,
  formSchema,
}: {
  control: any;
  formSchema: FormSchema;
}) => (
  <Card>
    <CardHeader>
      <CardTitle>Family Details</CardTitle>
    </CardHeader>
    <Separator />
    <CardContent className="">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex flex-col gap-2">
          <Label>Family Background</Label>
          <ControlledSelect
            control={control}
            name="family_background"
            options={formSchema.shape.family_background.options}
            formatFn={formatOption}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label>Family Status</Label>
          <ControlledSelect
            control={control}
            name="family_status"
            options={formSchema.shape.family_status.options}
            formatFn={formatOption}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label>Residency Status</Label>
          <ControlledSelect
            control={control}
            name="residency_status"
            options={formSchema.shape.residency_status.options}
            formatFn={formatOption}
          />
        </div>
      </div>
    </CardContent>
  </Card>
);

const LocationSection = ({
  register,
  errors,
}: {
  register: any;
  errors: any;
}) => (
  <Card>
    <CardHeader>
      <CardTitle>Location</CardTitle>
    </CardHeader>
    <Separator />
    <CardContent className=" flex flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        />
        <div className="flex flex-col gap-2 md:col-span-2">
          <Label htmlFor="address">Full Address</Label>
          <Textarea
            id="address"
            placeholder="House no., street, locality..."
            {...register("address")}
          />
        </div>
      </div>
    </CardContent>
  </Card>
);

const AboutSection = ({ register }: { register: any }) => (
  <Card>
    <CardHeader>
      <CardTitle>About Yourself</CardTitle>
    </CardHeader>
    <Separator />
    <CardContent className="">
      <div className="flex flex-col gap-2">
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          id="bio"
          placeholder="Describe yourself, your family, values, and what you are looking for in a partner... (max 240 words)"
          className="min-h-25"
          {...register("bio")}
        />
        <span className="text-xs text-muted-foreground">
          This will be visible to other members
        </span>
      </div>
    </CardContent>
  </Card>
);

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
    time_of_birth: z.string().min(1),
    place_of_birth: z.string().min(1),
    no_of_brothers: z.string(),
    no_of_sisters: z.string(),
    address: z.string(),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    country: z.string().min(1, "Country is required"),
    pincode: z.string(),
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

const ProfileForm = ({ formSchema }: { formSchema: FormSchema }) => {
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

  const onSaveDraft = useCallback(() => {
    console.log("Saving draft...");
    // Draft save logic here
  }, []);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 max-w-6xl mx-auto px-2 py-10"
    >
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

      <div className="flex justify-between items-center pb-6">
        <span className="text-xs text-muted-foreground">* Required fields</span>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onSaveDraft}
            className="px-5 py-2 border border-border rounded-md text-sm text-muted-foreground hover:bg-muted transition-colors"
          >
            Save draft
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            Continue to partner preferences →
          </button>
        </div>
      </div>
    </form>
  );
};

const RegisterComp = () => {
  const { data, isError } = useFetchEnumsQuery({});

  const formSchema = useMemo(() => {
    if (!data?.data) return null;
    return createFormSchema(data.data);
  }, [data]);

  if (isError || !formSchema) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <p className="text-destructive mb-2">Failed to load form</p>
          <p className="text-sm text-muted-foreground">
            Please refresh the page to try again
          </p>
        </div>
      </div>
    );
  }

  return <ProfileForm formSchema={formSchema} />;
};

export default RegisterComp;
