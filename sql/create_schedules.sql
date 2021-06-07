DROP TABLE IF EXISTS schedules;

CREATE TABLE IF NOT EXISTS schedules (
    schedule_id SERIAL PRIMARY KEY, 
    user_name VARCHAR (30) NOT NULL, 
    day INTEGER NOT NULL CHECK (day >= 1 AND day <= 7),
    start_at TIME NOT NULL,
    end_at TIME NOT NULL
);