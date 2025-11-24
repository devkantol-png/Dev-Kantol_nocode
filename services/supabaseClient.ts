import { createClient } from '@supabase/supabase-js';

// ------------------------------------------------------------------
// 🛑 ACTION REQUIRED: PASTE YOUR SUPABASE KEYS BELOW
// 1. Go to your Supabase Dashboard -> Project Settings -> API
// 2. Copy the "Project URL" and the "anon" public key.
// ------------------------------------------------------------------

const SUPABASE_URL = 'https://acclfutzptbzztxjxqkz.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFjY2xmdXR6cHRienp0eGp4cWt6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM5NjgzMjEsImV4cCI6MjA3OTU0NDMyMX0.jI6yy3yesTyjp8oCLqzGPBOnHjtQiUDp670zahILmz8';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);