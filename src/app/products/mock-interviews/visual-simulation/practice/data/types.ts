export interface Question {
  id: number;
  text: string;
  category: string;
  difficulty: "easy" | "medium" | "hard";
  expectedDuration: string;
  sampleAnswer: {
    mainPoints: string[];
    structure: {
      situation?: string;
      task?: string;
      action?: string;
      result?: string;
      introduction?: string;
      body?: string[];
      conclusion?: string;
    };
    tips: string[];
    commonMistakes: string[];
    keywords: string[];
  };
}
