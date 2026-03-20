interface Profile {
  name: string;
  email: string;
  gender: string;
  date_of_birth: Date;
  time_of_birth: Date;
  place_of_birth: string;
  no_of_brothers: string;
  no_of_sisters: string;
  marital_status: string;
  children_details: string;
  address: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  phone: string;
  occupation_type: string;
  occupation: string;
  annual_income: string;
  height_feet: string;
  height_inches: string;
  body_type: string;
  smoking_habit: string;
  drinking_habit: string;
  complexion: string;
  diet_preference: string;
  physical_status: string;
  turban_pagri: string;
  manglik_status: string;
  religion: string;
  caste: string;
  paternal_surname: string;
  maternal_surname: string;
  mother_tongue: string;
  profile_created_by: string;
  family_background: string;
  family_status: string;
  residency_status: string;
  education_level: string;
  bio: string;
}

interface Preferences {
  marital_status: string;
  children_details: string;
  country_prefrence: string;
  state_prefrence: string;
  city_prefrence: string;
  age_range: string;
  height_range: string;
  complexion: string;
  body_type: string;
  family_status: string;
  education_level: string;
  religion: string;
  manglik_status: string;
  turban_pagri: string;
  occupation_type: string;
  occupation: string;
}

import pool from "../../config/db";
import { prisma } from "../../lib/prisma";
import { ApiError } from "../../utils/ApiError";

export const getAllEnums = async () => {
  const result = await pool.query(`
        SELECT t.typname AS enum_name, e.enumlabel AS enum_value
        FROM pg_type t
        JOIN pg_enum e ON t.oid = e.enumtypid
        ORDER BY t.typname, e.enumsortorder;
    `);

  const grouped: Record<string, string[]> = {};

  for (let row of result.rows) {
    if (!grouped[row.enum_name]) {
      grouped[row.enum_name] = [];
    }
    grouped[row.enum_name].push(row.enum_value);
  }
  return grouped;
};

export const create_Profile = async (profile: Profile) => {
  const values = Object.values(profile);

  const placeholders = values.map((_, i) => `$${i + 1}`).join(",");

  const result = await pool.query(
    `
    INSERT INTO profile (${Object.keys(profile).join(",")})
    VALUES (${placeholders})
    RETURNING *;
    `,
    values,
  );

  return result.rows[0];
};

export const get_Profile = async () => {
  const result = await pool.query(
    `SELECT * FROM users ORDER BY created_at DESC`,
  );

  return result.rows[0];
};

export const get_ProfileById = async (id: string) => {
  const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);
  
  // ❌ FIXED: Was using = instead of ===
  if (result.rows.length === 0) {
    throw new ApiError(400, "Profile Does Not Exist");
  }
  return result.rows[0];
};

export const update_Profile = async (id: string, profile: Profile) => {
  const values = Object.values(profile);
  const setClause = Object.keys(profile)
    .map((key, index) => `${key}=$${index + 1}`)
    .join(",");
  const result = await pool.query(
    `UPDATE profile SET ${setClause} WHERE id = $${values.length + 1} RETURNING *`,
    [...values, id],
  );
  return result.rows[0];
};

export const delete_Profile = async (id: string) => {
  const result = await pool.query(
    `DELETE FROM profile WHERE id = $1 RETURNING *`,
    [id],
  );
  return result.rows[0];
};

export const create_ProfileByUserId = async (id: string, profile: Profile) => {
  const values = Object.values(profile);
  const placeholders = values.map((_, i) => `$${i + 1}`).join(",");
  const result = await pool.query(
    `
    INSERT INTO profile (${Object.keys(profile).join(",")}, user_id)
    VALUES (${placeholders}, $${values.length + 1})
    RETURNING *;
    `,
    [...values, id],
  );
  return result.rows[0];
};

export const get_ProfileByUserId = async (id: string) => {
  const result = await pool.query(`SELECT * FROM profile WHERE user_id = $1`, [
    id,
  ]);
  
  // ❌ FIXED: Was using = instead of ===
  if (result.rows.length === 0) {
    throw new ApiError(400, "Profile Does Not Exist");
  }
  return result.rows[0];
};

export const get_PreferencesByProfileId = async (profileId: string) => {
  const result = await prisma.partnerPreference.findUnique({
    where: {
      profileId: profileId,
    },
  });

  if (!result) {
    throw new ApiError(400, "Partner Preferences Do Not Exist");
  }

  return result;
};

export const get_AllPreferences = async () => {
  const result = await prisma.partnerPreference.findMany();

  if (result.length === 0) {
    throw new ApiError(400, "No Partner Preferences Found");
  }

  return result;
};

export const get_PreferencesWithProfile = async (profileId: string) => {
  const result = await prisma.partnerPreference.findUnique({
    where: {
      profileId: profileId,
    },
    include: {
      profile: true,
    },
  });

  if (!result) {
    throw new ApiError(400, "Partner Preferences Do Not Exist");
  }

  return result;
};

export const get_PreferencesByUserIdOptimized = async (userId: number) => {
  const result = await prisma.profiles.findFirst({
    where: {
      created_by: userId,
    },
    include: {
      partnerPreference: true,
    },
  });

  if (!result) {
    throw new ApiError(400, "Profile Does Not Exist");
  }

  if (!result.partnerPreference) {
    throw new ApiError(400, "Partner Preferences Do Not Exist");
  }

  return result.partnerPreference;
};

// ✅ FIXED: Proper Prisma create with correct data structure
export const create_PreferenceByUserID = async (
  userId: number,
  data: Preferences,
) => {
  // Find the profile first
  const profile = await prisma.profiles.findFirst({
    where: {
      created_by: userId,
    },
  });

  if (!profile) {
    throw new ApiError(400, "Profile Does Not Exist");
  }

  // Check if preferences already exist
  const existingPreference = await prisma.partnerPreference.findUnique({
    where: {
      profileId: profile.id,
    },
  });

  if (existingPreference) {
    throw new ApiError(400, "Partner Preferences Already Exist");
  }

  // Create new preference with proper data structure
  const newPreference = await prisma.partnerPreference.create({
    data: {
      profileId: profile.id,  // ✅ Connect to profile
      marital_status: data.marital_status as any,
      children_details: data.children_details as any,
      country_prefrence: data.country_prefrence,
      state_prefrence: data.state_prefrence,
      city_prefrence: data.city_prefrence,
      age_range: data.age_range,
      height_range: data.height_range,
      complexion: data.complexion as any,
      body_type: data.body_type as any,
      family_status: data.family_status as any,
      education_level: data.education_level as any,
      religion: data.religion as any,
      manglik_status: data.manglik_status as any,
      turban_pagri: data.turban_pagri as any,
      occupation_type: data.occupation_type as any,
      occupation: data.occupation,
    },
  });

  return newPreference;  // ✅ Return the created preference
};

// ✅ BONUS: Upsert version (create or update)
export const upsert_PreferenceByUserID = async (
  userId: number,
  data: Preferences,
) => {
  // Find the profile first
  const profile = await prisma.profiles.findFirst({
    where: {
      created_by: userId,
    },
  });

  if (!profile) {
    throw new ApiError(400, "Profile Does Not Exist");
  }

  // Upsert: create if doesn't exist, update if exists
  const preference = await prisma.partnerPreference.upsert({
    where: {
      profileId: profile.id,
    },
    create: {
      profileId: profile.id,
      marital_status: data.marital_status as any,
      children_details: data.children_details as any,
      country_prefrence: data.country_prefrence,
      state_prefrence: data.state_prefrence,
      city_prefrence: data.city_prefrence,
      age_range: data.age_range,
      height_range: data.height_range,
      complexion: data.complexion as any,
      body_type: data.body_type as any,
      family_status: data.family_status as any,
      education_level: data.education_level as any,
      religion: data.religion as any,
      manglik_status: data.manglik_status as any,
      turban_pagri: data.turban_pagri as any,
      occupation_type: data.occupation_type as any,
      occupation: data.occupation,
    },
    update: {
      marital_status: data.marital_status as any,
      children_details: data.children_details as any,
      country_prefrence: data.country_prefrence,
      state_prefrence: data.state_prefrence,
      city_prefrence: data.city_prefrence,
      age_range: data.age_range,
      height_range: data.height_range,
      complexion: data.complexion as any,
      body_type: data.body_type as any,
      family_status: data.family_status as any,
      education_level: data.education_level as any,
      religion: data.religion as any,
      manglik_status: data.manglik_status as any,
      turban_pagri: data.turban_pagri as any,
      occupation_type: data.occupation_type as any,
      occupation: data.occupation,
      updated_at: new Date(),
    },
  });

  return preference;
};