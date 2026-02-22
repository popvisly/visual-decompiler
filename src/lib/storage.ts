'use server';

import { supabaseAdmin } from './supabase';
import { v4 as uuidv4 } from 'uuid';

/**
 * Uploads a file to Supabase Storage and returns the public URL.
 * Requires a bucket named 'ad-media' to exist and be public.
 */
export async function uploadAdMedia(file: File): Promise<string> {
    const fileExt = file.name.split('.').pop();
    const fileName = `${uuidv4()}.${fileExt}`;
    const filePath = `uploads/${fileName}`;

    const { data, error } = await supabaseAdmin.storage
        .from('ad-media')
        .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false
        });

    if (error) {
        console.error('[Storage] Upload failed:', error);
        throw new Error(`Upload failed: ${error.message}`);
    }

    const { data: { publicUrl } } = supabaseAdmin.storage
        .from('ad-media')
        .getPublicUrl(filePath);

    return publicUrl;
}
