import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

export async function uploadFile(file: File): Promise<string> {
    try {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Create unique filename
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
        const filename = `${uniqueSuffix}.${ext}`;

        // Ensure upload directory exists
        const uploadDir = join(process.cwd(), "public", "uploads");
        if (!existsSync(uploadDir)) {
            await mkdir(uploadDir, { recursive: true });
        }

        // Save file
        const path = join(uploadDir, filename);
        await writeFile(path, buffer);

        return `/uploads/${filename}`;
    } catch (error) {
        console.error("Upload error:", error);
        throw new Error("Dosya yüklenirken bir hata oluştu.");
    }
}
