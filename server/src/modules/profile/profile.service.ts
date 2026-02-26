import pool from "../../config/db";

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
    grouped[row.enum_name].push(row.enum_value)
  }
  return grouped
};
