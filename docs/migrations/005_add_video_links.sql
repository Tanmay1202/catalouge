-- Migration: 005_add_video_links.sql
-- Adds the video_links column to the products table.
-- Run this in the Supabase SQL Editor for your project.

ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS video_links TEXT[] NOT NULL DEFAULT '{}';

-- Verify
SELECT column_name, data_type, column_default
FROM information_schema.columns
WHERE table_schema = 'public'
  AND table_name = 'products'
  AND column_name = 'video_links';
