import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'Hanya dapat dilakukan di mode development (localhost).' }, { status: 403 });
  }

  try {
    const data = await request.json();
    const configPath = path.join(process.cwd(), 'data', 'storeConfig.json');
    
    // Ensure the data directory exists
    const dataDir = path.dirname(configPath);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    fs.writeFileSync(configPath, JSON.stringify(data, null, 2), 'utf-8');
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving defaults:', error);
    return NextResponse.json({ error: 'Gagal menyimpan konfigurasi permanen.' }, { status: 500 });
  }
}
