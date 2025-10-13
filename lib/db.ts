import Database from 'better-sqlite3'
import { existsSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'

let db: Database.Database | null = null

export function getDB(){
  if (db) return db
  const DB_PATH = process.env.SQLITE_PATH || join(process.cwd(), 'data', 'data.sqlite')
  const dir = dirname(DB_PATH)
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true })
  db = new Database(DB_PATH)
  db.pragma('journal_mode = WAL')
  db.exec(`
    CREATE TABLE IF NOT EXISTS deletion_requests (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL,
      reason TEXT NOT NULL,
      message TEXT DEFAULT '',
      status TEXT NOT NULL DEFAULT 'received',
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
    CREATE INDEX IF NOT EXISTS idx_del_email ON deletion_requests(email);
    CREATE INDEX IF NOT EXISTS idx_del_created ON deletion_requests(created_at);
  `)
  return db
}
