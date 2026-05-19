import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

// Create connection to Supabase Utama (Main Data Center)
const mainUrl = process.env.SUPABASE_UTAMA_URL || process.env.SUPABASE_URL || '';
const mainKey = process.env.SUPABASE_UTAMA_KEY || process.env.SUPABASE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || '';

const mainConfigured = !!(mainUrl && mainKey);
if (!mainConfigured) {
    console.warn("⚠️ SUPABASE_UTAMA_URL or SUPABASE_UTAMA_KEY is not defined in .env! Backend Sync to Main Supabase will be disabled.");
} else {
    console.log("[Supabase Utama] Configured — game_sessions sync enabled.");
}

export const isMainSupabaseConfigured = mainConfigured;
export const supabaseUtama = mainConfigured ? createClient(mainUrl, mainKey) : null as any;

// Create connection to Supabase B (Sessions & Participants)
const bUrl = process.env.SUPABASE_B_URL || '';
const bKey = process.env.SUPABASE_B_KEY || '';

const bConfigured = !!(bUrl && bKey);
if (!bConfigured) {
    console.warn("⚠️ SUPABASE_B_URL or SUPABASE_B_KEY is not defined in .env! Backend Sync to Supabase B will be disabled.");
} else {
    console.log("[Supabase B] Configured — realtime session sync enabled.");
}

export const supabaseB = bConfigured ? createClient(bUrl, bKey) : null as any;
