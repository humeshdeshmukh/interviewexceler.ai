import { geminiService } from '../services/geminiService';

/**
 * Corrects spelling and grammar in transcript text using Gemini AI
 */
export class TranscriptCorrection {
    private correctionCache: Map<string, string> = new Map();
    private pendingCorrections: Map<string, Promise<string>> = new Map();

    /**
     * Corrects text using Gemini API with caching to avoid redundant calls
     */
    async correctText(text: string): Promise<string> {
        if (!text || text.trim().length < 5) return text;

        // Check cache first
        const cached = this.correctionCache.get(text);
        if (cached) return cached;

        // Check if correction is already in progress
        const pending = this.pendingCorrections.get(text);
        if (pending) return pending;

        // Start new correction
        const correctionPromise = this.performCorrection(text);
        this.pendingCorrections.set(text, correctionPromise);

        try {
            const corrected = await correctionPromise;
            this.correctionCache.set(text, corrected);
            return corrected;
        } finally {
            this.pendingCorrections.delete(text);
        }
    }

    private async performCorrection(text: string): Promise<string> {
        try {
            const prompt = `Fix spelling and grammar errors in this transcript. Return ONLY the corrected text, no explanations:

"${text}"

Corrected:`;

            const corrected = await geminiService.generateContent(prompt);

            // Clean up the response (remove quotes if present)
            return corrected.replace(/^"|"$/g, '').trim() || text;
        } catch (error) {
            console.error('Correction failed:', error);
            return text; // Return original on error
        }
    }

    /**
     * Basic text cleanup without API call
     */
    basicCleanup(text: string): string {
        let cleaned = text;

        // Capitalize first letter of sentences
        cleaned = cleaned.replace(/(^\w|[.!?]\s+\w)/g, (match) => match.toUpperCase());

        // Remove extra spaces
        cleaned = cleaned.replace(/\s+/g, ' ').trim();

        // Fix common spacing issues with punctuation
        cleaned = cleaned.replace(/\s+([.,!?;:])/g, '$1');
        cleaned = cleaned.replace(/([.,!?;:])(\w)/g, '$1 $2');

        return cleaned;
    }

    /**
     * Clear the cache to free memory
     */
    clearCache() {
        this.correctionCache.clear();
    }
}

export const transcriptCorrection = new TranscriptCorrection();
