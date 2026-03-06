"use client";
import { useFetchEnumsQuery } from "@/redux/api/profileApi";
import { useMemo } from "react";
import z from "zod";

const RegisterComp = () => {
  const { data } = useFetchEnumsQuery({});

  const formSchema = useMemo(() => {
    if (!data?.data) return null;

    return z.object({
      name: z.string().min(1),
      email: z.email(),
      gender: z.enum(data.data.gender_type as [string, ...string[]]),
      marital_status: z.enum(
        data.data.maritial_status as [string, ...string[]],
      ),
      religion: z.enum(data.data.religion as [string, ...string[]]),
      date_of_birth: z.string().min(1),
      time_of_birth: z.string().min(1),
      place_of_birth: z.string().min(1),
      no_of_brothers: z.string().min(1),
      no_of_sisters: z.string().min(1),
      address: z.string().min(1),
      city: z.string().min(1),
      state: z.string().min(1),
      country: z.string().min(1),
      pincode: z.string().min(1),
      phone: z.string().min(1),
      occupation: z.string().min(1),
      height_feet: z.string().min(1),
      height_inches: z.string().min(1),
      bio: z.string().min(1),
      children_details: z.enum(
        data.data.children_details as [string, ...string[]],
      ),
      occupation_type: z.enum(
        data.data.occupation_type as [string, ...string[]],
      ),
      annual_income: z.enum(data.data.annual_income as [string, ...string[]]),
      body_type: z.enum(data.data.body_type as [string, ...string[]]),
      smoking_habit: z.enum(data.data.smoking_habit as [string, ...string[]]),
      drinking_habit: z.enum(data.data.drinking_habit as [string, ...string[]]),
      complexion: z.enum(data.data.complexion as [string, ...string[]]),
      diet_preference: z.enum(
        data.data.diet_preference as [string, ...string[]],
      ),
      physical_status: z.enum(
        data.data.physical_status as [string, ...string[]],
      ),
      turban_pagri: z.enum(data.data.turban_pagri as [string, ...string[]]),
      manglik_status: z.enum(data.data.manglik_status as [string, ...string[]]),
      education_level: z.enum(
        data.data.education_level as [string, ...string[]],
      ),
      residency_status: z.enum(
        data.data.residency_status as [string, ...string[]],
      ),
      family_status: z.enum(data.data.family_status as [string, ...string[]]),
      profile_created_by: z.enum(
        data.data.profile_created_by as [string, ...string[]],
      ),
      family_background: z.enum(
        data.data.family_background as [string, ...string[]],
      ),
      caste: z.enum(data.data.caste as [string, ...string[]]),
      mother_tongue: z.enum(data.data.mother_tongue as [string, ...string[]]),
      paternal_surname: z.string().min(1),
      maternal_surname: z.string().min(1),
    });
  }, [data]);

  if (!formSchema) return <div>Loading...</div>;

  return <div>RegisterComp</div>;
};

export default RegisterComp;
