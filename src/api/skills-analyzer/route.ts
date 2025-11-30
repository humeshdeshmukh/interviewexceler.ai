// import { NextResponse } from 'next/server';
// import {
//   calculateSkillLevel,
//   analyzeSkillGaps,
//   getMarketAnalysis,
//   generateSkillsReport
// } from '@/utils/skillsAnalyzer';

// export async function POST(req: Request) {
//   try {
//     const data = await req.json();
    
//     switch (data.action) {
//       case 'analyze': {
//         const skillCategories = data.skills.map((category: any) => ({
//           name: category.name,
//           skills: category.skills.map((skill: any) => ({
//             name: skill.name,
//             proficiency: calculateSkillLevel(
//               skill.experience,
//               skill.projects?.length || 0,
//               skill.certifications || []
//             ),
//             lastUsed: skill.lastUsed,
//             projects: skill.projects,
//             certifications: skill.certifications
//           }))
//         }));

//         const skillGaps = analyzeSkillGaps(skillCategories, data.targetRole);
//         const marketAnalysis = await getMarketAnalysis(
//           skillCategories.flatMap(cat => cat.skills.map(skill => skill.name)),
//           data.location
//         );

//         const analysis = {
//           categories: skillCategories,
//           overallScore: Math.round(
//             skillCategories.reduce((sum, cat) =>
//               sum + cat.skills.reduce((skillSum, skill) =>
//                 skillSum + skill.proficiency.score, 0
//               ), 0) / (skillCategories.reduce((count, cat) =>
//                 count + cat.skills.length, 0
//               ) || 1)
//           ),
//           skillGaps,
//           marketAnalysis,
//           recommendations: generateRecommendations(skillGaps, marketAnalysis)
//         };

//         return NextResponse.json({ success: true, analysis });
//       }
      
//       case 'generateReport': {
//         const report = generateSkillsReport(data.analysis);
//         return NextResponse.json({ success: true, report });
//       }
      
//       default:
//         return NextResponse.json(
//           { error: 'Invalid action specified' },
//           { status: 400 }
//         );
//     }
//   } catch (error) {
//     console.error('Skills analysis error:', error);
//     return NextResponse.json(
//       { error: 'Failed to process skills analysis request', details: error instanceof Error ? error.message : 'Unknown error' },
//       { status: 500 }
//     );
//   }
// }

// function generateRecommendations(skillGaps: any[], marketAnalysis: any) {
//   return {
//     immediate: [
//       'Focus on high-priority skill gaps',
//       'Start online courses for critical skills',
//       'Join relevant professional communities'
//     ],
//     shortTerm: [
//       'Complete certifications in growing areas',
//       'Build portfolio projects',
//       'Participate in hackathons or coding challenges'
//     ],
//     longTerm: [
//       'Develop expertise in emerging technologies',
//       'Consider specialized training programs',
//       'Build thought leadership in your domain'
//     ]
//   };
// }
