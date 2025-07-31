import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xkrjnizwzbthvuxfrfrn.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhrcmpuaXp3emJ0aHZ1eGZyZnJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM5MzAxODYsImV4cCI6MjA2OTUwNjE4Nn0.HD8jkoC-jRpAof5KK-U55L_JVuqCCG7bn3wwTuN-jh4';

export const supabase = createClient(supabaseUrl, supabaseKey);
