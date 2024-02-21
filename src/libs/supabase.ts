import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANONKEY = process.env.SUPABASE_ANONKEY;

export const supabase = createClient(SUPABASE_URL!!, SUPABASE_ANONKEY!!);
