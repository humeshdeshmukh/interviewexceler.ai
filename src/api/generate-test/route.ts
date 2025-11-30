// import { NextResponse } from 'next/server';
// import { generateTest } from '@/app/products/Practice-Tests/services/aiTestGenerator';

// export async function POST(req: Request) {
//   try {
//     const { topic, difficulty, numberOfQuestions, specificConcepts } = await req.json();

//     // Validate input
//     if (!topic || !difficulty || !numberOfQuestions) {
//       return NextResponse.json(
//         { error: 'Missing required fields' },
//         { status: 400 }
//       );
//     }

//     // Initialize AI test generator
//     const generator = generateTest();

//     // Generate test
//     const test = await generator.generateTest({
//       topic,
//       difficulty,
//       numberOfQuestions,
//       specificConcepts
//     });

//     return NextResponse.json({ test });
//   } catch (error) {
//     console.error('Error generating test:', error);
//     return NextResponse.json(
//       { error: 'Failed to generate test' },
//       { status: 500 }
//     );
//   }
// }
