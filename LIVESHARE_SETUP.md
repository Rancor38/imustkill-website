# Liveshare Feature Setup Guide

This guide will help you set up the Liveshare feature for the Initiative Tracker, which allows users to share a read-only view of their combat state with others in real-time.

## Prerequisites

1. A Supabase account (free tier works fine)
2. Your application deployed on Netlify (or running locally for development)

## Setting Up Supabase

1. Log in to Supabase (https://supabase.com) or create a new account
2. Create a new project
3. Once your project is created, go to the SQL Editor
4. Create a new table using the following SQL:

```sql
-- Create a fresh table with the proper structure
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
```

5. Enable Realtime for this table:
    - Go to Database → Replication
    - Enable Realtime for the `initiative_sessions` table

## Important Notes About the Schema

-   The column name is `combat_state` (not `data`) for storing the JSON data
-   We don't use a `last_updated` column as Supabase handles timestamps automatically
-   The schema is kept minimal to avoid naming conflicts

## Implemented Features

1. **Liveshare functionality** - Users can create shareable real-time view-only links
2. **Time-limited sessions** - Options for 1-4 hour session durations
3. **UI placement** - "Share Live" button positioned to the right of the Load button
4. **Safety features** - Page refresh warning and automatic session termination

## Environment Variables

### Local Development

Create a `.env` file in the root of your project with the following variables:

```
REACT_APP_SUPABASE_URL=https://your-project-id.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-anon-key
```

Replace `your-project-id` and `your-anon-key` with your actual Supabase project information, which you can find in your Supabase project settings under API.

### Netlify Deployment

1. Go to your site settings in Netlify
2. Navigate to "Build & deploy" → "Environment variables"
3. Add the following environment variables:
    - `REACT_APP_SUPABASE_URL`: Your Supabase project URL
    - `REACT_APP_SUPABASE_ANON_KEY`: Your Supabase anonymous/public key

## Usage

Once configured:

1. Users can create a Liveshare by clicking the "Share Live" button in the Initiative Tracker
2. A configuration dialog will appear allowing users to set expiration options (1-4 hours)
3. After confirming, a shareable link will be generated
4. Other users can open this link to view (but not modify) the combat state in real-time
5. Changes made by the owner will be instantly visible to all viewers
6. The Liveshare can be manually stopped at any time using the "Stop Sharing" button
7. If the user refreshes or closes their browser, they'll get a warning about ending the session
8. The session will automatically expire after the selected time period

## Troubleshooting

If you encounter issues:

1. Check if your Supabase environment variables are correctly set
2. Verify that Realtime is enabled for the `initiative_sessions` table
3. Check the browser console for any errors
4. Ensure your Supabase project is on an active plan (even the free tier)
5. Verify the column names match exactly (`combat_state`, not `data`)
