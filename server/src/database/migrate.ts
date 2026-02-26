import pool from '../config/db';
import fs from 'fs';
import path from 'path';

const migrate = async () => {
  // create migrations tracking table if it doesnt exist
  await pool.query(`
    CREATE TABLE IF NOT EXISTS migrations (
      id SERIAL PRIMARY KEY,
      filename VARCHAR(255) UNIQUE NOT NULL,
      ran_at TIMESTAMP DEFAULT NOW()
    )
  `);

  // read all sql files from migrations folder
  const migrationsDir = path.join(__dirname, 'migrations');
  const files = fs.readdirSync(migrationsDir).filter(f => f.endsWith('.sql')).sort();

  for (const file of files) {
    // check if already ran
    const result = await pool.query(
      'SELECT id FROM migrations WHERE filename = $1',
      [file]
    );

    if (result.rows.length > 0) {
      console.log(`Skipping ${file} — already ran`);
      continue;
    }

    // run the sql file
    const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf8');
    await pool.query(sql);

    // mark as ran
    await pool.query('INSERT INTO migrations (filename) VALUES ($1)', [file]);
    console.log(`Ran migration: ${file}`);
  }

  console.log('All migrations complete');
  process.exit();
};

migrate();