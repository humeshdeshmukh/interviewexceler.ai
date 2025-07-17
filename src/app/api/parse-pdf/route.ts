import { NextRequest, NextResponse } from 'next/server';
import pdftk from 'node-pdftk';
import { writeFile, unlink } from 'fs/promises';
import { join } from 'path';
import { tmpdir } from 'os';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Create a temporary file
    const buffer = Buffer.from(await file.arrayBuffer());
    const tempPath = join(tmpdir(), `${Date.now()}-${file.name}`);
    await writeFile(tempPath, buffer);

    try {
      // Extract text from PDF
      const data = await pdftk
        .input(tempPath)
        .cat()
        .text();

      return NextResponse.json({ text: data || 'No text content found in PDF' });
    } finally {
      // Clean up temporary file
      try {
        await unlink(tempPath);
      } catch (e) {
        console.error('Failed to delete temporary file:', e);
      }
    }
  } catch (error: any) {
    console.error('PDF parsing error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to parse PDF' },
      { status: 500 }
    );
  }
}
