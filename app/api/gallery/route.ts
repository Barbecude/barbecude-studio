import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const sourceDir = path.join(process.cwd(), 'assets', '.aistudio', 'image');
    const targetDir = path.join(process.cwd(), 'public', 'images');

    // Create target dir if it doesn't exist
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    // If source dir exists (local environment), sync files to target
    if (fs.existsSync(sourceDir)) {
      const sourceFiles = fs.readdirSync(sourceDir);
      for (const file of sourceFiles) {
        if (file.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i)) {
          const sourcePath = path.join(sourceDir, file);
          const targetPath = path.join(targetDir, file);
          try {
            fs.copyFileSync(sourcePath, targetPath);
          } catch (e) {
            console.error(`Failed to copy ${file}:`, e);
          }
        }
      }
    }

    // Now always read from target dir (public/images) which works on both local and Vercel
    const images: string[] = [];
    if (fs.existsSync(targetDir)) {
      const files = fs.readdirSync(targetDir);
      for (const file of files) {
        if (file.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i)) {
          const targetPath = path.join(targetDir, file);
          const stats = fs.statSync(targetPath);
          images.push(`/images/${file}?v=${stats.mtimeMs}`);
        }
      }
    }

    return NextResponse.json({ images });
  } catch (error) {
    console.error('Error reading gallery:', error);
    return NextResponse.json({ error: 'Failed to load gallery' }, { status: 500 });
  }
}
