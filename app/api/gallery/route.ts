import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const sourceDir = path.join(process.cwd(), 'assets', '.aistudio', 'image');
    const targetDir = path.join(process.cwd(), 'public', 'images');

    // Create target dir if it doesn't exist
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    // Check if source dir exists
    if (!fs.existsSync(sourceDir)) {
      return NextResponse.json({ images: [] });
    }

    // Read all files in source dir
    const files = fs.readdirSync(sourceDir);
    const images: string[] = [];

    for (const file of files) {
      // Check if it's an image file
      if (file.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i)) {
        const sourcePath = path.join(sourceDir, file);
        const targetPath = path.join(targetDir, file);

        // Always copy to make sure it's up to date
        fs.copyFileSync(sourcePath, targetPath);
        
        // Add a timestamp to bypass browser cache
        const stats = fs.statSync(sourcePath);
        images.push(`/images/${file}?v=${stats.mtimeMs}`);
      }
    }

    return NextResponse.json({ images });
  } catch (error) {
    console.error('Error reading gallery:', error);
    return NextResponse.json({ error: 'Failed to load gallery' }, { status: 500 });
  }
}
