-- A simplified approach to fixing the initiative_sessions table
-- This script completely recreates the table with the proper structure

-- First, drop the existing table if it exists
DROP TABLE IF EXISTS public.initiative_sessions;

-- Create a fresh table with the structure that matches our JavaScript code
CREATE TABLE public.initiative_sessions (
    id TEXT PRIMARY KEY,
    combat_state JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE
);

-- Enable row-level security
ALTER TABLE public.initiative_sessions ENABLE ROW LEVEL SECURITY;

-- Create policy that allows anyone to select data
CREATE POLICY "Allow anyone to select initiative sessions"
  ON public.initiative_sessions
  FOR SELECT
  USING (true);

-- Create policy that allows insert by anyone
CREATE POLICY "Allow anyone to insert initiative sessions"
  ON public.initiative_sessions
  FOR INSERT
  WITH CHECK (true);

-- Create policy that allows update based on ID
CREATE POLICY "Allow anyone to update initiative sessions"
  ON public.initiative_sessions
  FOR UPDATE
  USING (true);

-- Create policy that allows delete based on ID
CREATE POLICY "Allow anyone to delete initiative sessions"
  ON public.initiative_sessions
  FOR DELETE
  USING (true);

-- Enable Supabase realtime for this table
ALTER PUBLICATION supabase_realtime ADD TABLE public.initiative_sessions;
