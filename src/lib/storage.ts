import { supabase, isSupabaseConfigured } from '../config/supabase';

export const STORAGE_BUCKET = 'product-images';
export const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export interface UploadValidationResult {
  valid: boolean;
  error?: string;
}

export function validateImageFile(file: File): UploadValidationResult {
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: 'Invalid file format. Please upload JPG, PNG, or WEBP images only.',
    };
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
    return {
      valid: false,
      error: `File is too large (${sizeMb} MB). Maximum allowed size is 5 MB.`,
    };
  }

  return { valid: true };
}

/**
 * Upload a product image to Supabase Storage
 */
export async function uploadProductImage(
  file: File,
  prefix: string = 'general'
): Promise<string> {
  const validation = validateImageFile(file);
  if (!validation.valid) {
    throw new Error(validation.error);
  }

  if (isSupabaseConfigured && supabase) {
    const cleanPrefix = prefix.replace(/[^a-zA-Z0-9_-]/g, '_');
    const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
    const cleanFileName = file.name
      .replace(/\.[^/.]+$/, '')
      .replace(/[^a-zA-Z0-9_-]/g, '_')
      .slice(0, 30);
    const filePath = `${cleanPrefix}/${Date.now()}_${cleanFileName}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from(STORAGE_BUCKET)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (uploadError) {
      console.error('Storage upload error:', uploadError);
      throw uploadError;
    }

    const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(filePath);
    return data.publicUrl;
  }

  // Fallback: create base64 or temporary object URL for offline/mock development
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result as string);
    };
    reader.readAsDataURL(file);
  });
}

/**
 * Delete a product image from Supabase Storage
 */
export async function deleteProductImage(imageUrl: string): Promise<void> {
  if (!isSupabaseConfigured || !supabase) return;

  try {
    // If it's a Supabase storage URL, parse the relative path inside the bucket
    if (imageUrl.includes(STORAGE_BUCKET)) {
      const parts = imageUrl.split(`${STORAGE_BUCKET}/`);
      if (parts.length > 1) {
        const filePath = decodeURIComponent(parts[1]);
        await supabase.storage.from(STORAGE_BUCKET).remove([filePath]);
      }
    }
  } catch (err) {
    console.warn('Could not delete image from Supabase storage:', err);
  }
}
