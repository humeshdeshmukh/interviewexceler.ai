import { Question } from '../questions/common';

const QUESTION_TEMPLATES = {
  'Analogies': {
    template: (difficulty: string) => {
      const pairs = {
        Easy: [
          { word1: "Book", word2: "Author", relation: "creation" },
          { word1: "Tree", word2: "Fruit", relation: "production" }
        ],
        Medium: [
          { word1: "Democracy", word2: "Government", relation: "system" },
          { word1: "Algorithm", word2: "Solution", relation: "process" }
        ],
        Hard: [
          { word1: "Quantum", word2: "Particle", relation: "physics" },
          { word1: "Paradigm", word2: "Framework", relation: "structure" }
        ]
      };
      const pair = pairs[difficulty as keyof typeof pairs][Math.floor(Math.random() * 2)];
      return {
        question: `Choose the pair that best represents a similar relationship to ${pair.word1} : ${pair.word2}`,
        options: generateAnalogiesOptions(pair.relation),
        answer: generateAnalogiesAnswer(pair.relation),
        explanation: `The relationship between ${pair.word1} and ${pair.word2} is one of ${pair.relation}.`,
        hints: [`Think about the relationship of ${pair.relation}`, `Look for a similar pattern in the options`]
      };
    }
  },
  'Reading Comprehension': {
    template: (difficulty: string) => {
      const passages = {
        Easy: {
          text: "Technology has transformed how we work and communicate. Remote work has become increasingly common, and digital tools enable collaboration across time zones.",
          question: "What is the main impact of technology mentioned in the passage?",
          options: [
            "Changes in work and communication",
            "Increase in salary",
            "Environmental impact",
            "Educational benefits"
          ],
          answer: "Changes in work and communication"
        },
        Medium: {
          text: "Artificial Intelligence has both benefits and risks. While it can automate tasks and improve efficiency, there are concerns about privacy, bias, and job displacement.",
          question: "What balanced view does the passage present about AI?",
          options: [
            "Benefits and risks",
            "Only benefits",
            "Only risks",
            "Technical details"
          ],
          answer: "Benefits and risks"
        },
        Hard: {
          text: "Quantum computing leverages quantum mechanical phenomena like superposition and entanglement to perform computations. This could revolutionize fields like cryptography and drug discovery.",
          question: "What is the potential impact of quantum computing according to the passage?",
          options: [
            "Revolutionary changes in multiple fields",
            "Minor improvements in computing",
            "No significant impact",
            "Only affects cryptography"
          ],
          answer: "Revolutionary changes in multiple fields"
        }
      };
      const content = passages[difficulty as keyof typeof passages];
      return {
        question: `${content.text}\n\n${content.question}`,
        options: content.options,
        answer: content.answer,
        explanation: `Based on the passage, ${content.answer.toLowerCase()} is the correct answer as it directly reflects the main point discussed.`,
        hints: ["Focus on the main idea", "Look for explicit statements in the text"]
      };
    }
  }
};

function generateAnalogiesOptions(relation: string): string[] {
  const optionPairs = {
    creation: ["Painter : Artwork", "Student : Knowledge", "Cloud : Rain", "Wood : Table"],
    production: ["Factory : Product", "Farm : Crop", "Mind : Thought", "Machine : Noise"],
    system: ["Monarchy : Rule", "Science : Method", "School : Education", "Market : Trade"],
    process: ["Input : Output", "Problem : Solution", "Data : Information", "Code : Program"],
    physics: ["Wave : Particle", "Mass : Energy", "Space : Time", "Force : Motion"],
    structure: ["Pattern : Design", "Theory : Model", "Concept : Implementation", "Rule : Law"]
  };
  return optionPairs[relation as keyof typeof optionPairs] || optionPairs.creation;
}

function generateAnalogiesAnswer(relation: string): string {
  const answers = {
    creation: "Painter : Artwork",
    production: "Factory : Product",
    system: "Monarchy : Rule",
    process: "Input : Output",
    physics: "Wave : Particle",
    structure: "Pattern : Design"
  };
  return answers[relation as keyof typeof answers] || answers.creation;
}

export async function generateQuestion(
  company: string,
  category: string,
  difficulty: string
): Promise<Question> {
  try {
    const template = QUESTION_TEMPLATES[category as keyof typeof QUESTION_TEMPLATES];
    if (!template) {
      throw new Error(`Category ${category} not supported`);
    }

    const generated = template.template(difficulty);

    return {
      id: `vr_${company.toLowerCase()}_ai_${Date.now()}`,
      company,
      question: generated.question,
      options: generated.options,
      answer: generated.answer,
      explanation: generated.explanation,
      difficulty,
      category,
      hints: generated.hints,
    };
  } catch (error) {
    console.error('Error generating question:', error);
    throw new Error('Failed to generate question');
  }
}
