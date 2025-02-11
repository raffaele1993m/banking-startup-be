CREATE TABLE IF NOT EXISTS accounts (
  id SERIAL PRIMARY KEY NOT NULL,
  created_at DATE NOT NULL DEFAULT CURRENT_DATE,
  email TEXT,
  firstName TEXT,
  lastName TEXT,
  amount FLOAT NOT NULL DEFAULT 0.0
);