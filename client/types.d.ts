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