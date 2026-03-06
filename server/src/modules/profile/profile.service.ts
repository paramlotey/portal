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

import pool from "../../config/db";
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
  if ((result.rows.length = 0)) {
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
  if ((result.rows.length = 0)) {
    throw new ApiError(400, "Profile Does Not Exist");
  }
  return result.rows[0];
};
