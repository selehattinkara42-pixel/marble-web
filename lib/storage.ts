import { put, del } from "@vercel/blob";
import fs from "fs";
import path from "path";

/**
 * Uploads a file to Vercel Blob (Production) or Local Filesystem (Development)
 */
export async function uploadFile(file: File, folder: string = "uploads"): Promise<string> {
    const isProduction = process.env.NODE_ENV === "production" || process.env.BLOB_READ_WRITE_TOKEN;

    if (isProduction && process.env.BLOB_READ_WRITE_TOKEN) {
        // Vercel Blob Storage
        const blob = await put(file.name, file, {
            access: "public",
        });
        return blob.url;
    } else {
        // Local Filesystem Storage (Fallback)
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Create unique filename
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        const ext = path.extname(file.name);
        const filename = `${path.parse(file.name).name}-${uniqueSuffix}${ext}`;

        // Ensure directory exists
        const uploadDir = path.join(process.cwd(), "public", folder);
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        const filepath = path.join(uploadDir, filename);
        fs.writeFileSync(filepath, buffer);

        return `/${folder}/${filename}`;
    }
}

/**
 * Deletes a file from Vercel Blob or Local Filesystem
 */
export async function deleteFile(url: string): Promise<void> {
    const isProduction = process.env.NODE_ENV === "production" || process.env.BLOB_READ_WRITE_TOKEN;

    if (isProduction && process.env.BLOB_READ_WRITE_TOKEN) {
        // Vercel Blob Delete
        // Blob URLs are absolute, e.g., https://...
        await del(url);
    } else {
        // Local File Delete
        // Local URLs are relative, e.g., /uploads/image.jpg
        // But sometimes full URL might be passed if stored that way. 
        // We assume relative path starts with /

        if (url.startsWith("http")) return; // Cannot delete external URLs locally easily or safely

        try {
            const publicPath = path.join(process.cwd(), "public");
            const filePath = path.join(publicPath, url); // url is like /uploads/file.jpg

            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        } catch (error) {
            console.error("Local file delete error:", error);
        }
    }
}
