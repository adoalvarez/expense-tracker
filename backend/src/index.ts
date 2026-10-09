import "dotenv/config";
import express from "express";
import cors from "cors";
import { Pool } from "pg";

const app = express();
app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(express.json());

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

app.get("/health", (_req, res) => res.json({ ok: true }));

app.get("/api/time", async (_req, res) => {
  const { rows } = await pool.query("SELECT NOW() AS now");
  res.json(rows[0]);
});

app.get("/api/expenses", async (req, res) => {
  const { category } = req.query;
  const params: string[] = [];

  let sql = "SELECT id, amount_cents, category, description, spent_on, created_at FROM expenses";

  if (typeof category === 'string' && category !== '') {
    params.push(category);
    sql += ` WHERE category = $${params.length}`;
  }

  sql += ' ORDER BY spent_on DESC, id DESC';

  const { rows } = await pool.query(sql, params);
  res.json(rows);
})

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`API running on port ${port}`));