import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://uibjdzmjzylsfaqgppfu.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVpYmpkem1qenlsc2ZhcWdwcGZ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjEwMjQ4NzQsImV4cCI6MjAzNjYwMDg3NH0.vUBNluFqDHUK4X5BlI5euIFWhxt5rveqLzxlOwbHOPI";
const supabase = createClient(supabaseUrl, supabaseKey);

export { supabase };
