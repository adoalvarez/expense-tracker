CREATE TABLE IF NOT EXISTS expenses (
  id            SERIAL PRIMARY KEY,
  amount_cents  INTEGER NOT NULL CHECK (amount_cents > 0),
  category      TEXT NOT NULL,
  description   TEXT NOT NULL DEFAULT '',
  spent_on      DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);