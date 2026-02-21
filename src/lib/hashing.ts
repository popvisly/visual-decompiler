import crypto from 'crypto';
import fs from 'fs';

/**
 * Generates a SHA-256 hash from a file path.
 */
export async function hashFile(filePath: string): Promise<string> {
    return new Promise((resolve, reject) => {
        const hash = crypto.createHash('sha256');
        const stream = fs.createReadStream(filePath);
        stream.on('data', (data) => hash.update(data));
        stream.on('end', () => resolve(hash.digest('hex')));
        stream.on('error', (err) => reject(err));
    });
}

/**
 * Generates a SHA-256 hash from a buffer or string.
 */
export function hashData(data: Buffer | string): string {
    return crypto.createHash('sha256').update(data).digest('hex');
}
