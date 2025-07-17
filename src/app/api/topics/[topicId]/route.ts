import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET(
  request: Request,
  { params }: { params: { topicId: string } }
) {
  try {
    const topicPath = path.join(process.cwd(), 'src/app/products/coding-practice/learning-paths/data/topics', `${params.topicId}.json`);
    const fileContents = await fs.readFile(topicPath, 'utf8');
    const data = JSON.parse(fileContents);

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Topic not found' },
      { status: 404 }
    );
  }
}
