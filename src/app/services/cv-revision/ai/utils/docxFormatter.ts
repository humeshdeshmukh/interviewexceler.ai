import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, IRunOptions } from 'docx';

export interface DocumentFormatting {
    fontFamily: string;
    fontSize: number;
    headingFont?: string;
    headingSize?: number;
    lineSpacing?: number;
    paragraphSpacing?: number;
}

export const defaultFormatting: DocumentFormatting = {
    fontFamily: 'Calibri',
    fontSize: 22, // 11pt in half-points
    headingFont: 'Calibri',
    headingSize: 28, // 14pt in half-points
    lineSpacing: 276, // 1.15 line spacing
    paragraphSpacing: 120
};

/**
 * Parses content into structured paragraphs with formatting
 */
export function parseContentToParagraphs(
    content: string,
    formatting: DocumentFormatting = defaultFormatting
): Paragraph[] {
    const lines = content.split('\n');
    const paragraphs: Paragraph[] = [];

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const trimmed = line.trim();

        if (trimmed === '') {
            // Empty line for spacing
            paragraphs.push(new Paragraph({ text: '', spacing: { after: formatting.paragraphSpacing / 2 } }));
            continue;
        }

        // Detect if it's a heading (all caps, ends with colon, or short line at start of section)
        const isAllCaps = trimmed === trimmed.toUpperCase() && trimmed.length > 2 && /[A-Z]/.test(trimmed);
        const endsWithColon = trimmed.endsWith(':');
        const isHeading = isAllCaps || endsWithColon;

        if (isHeading) {
            // Create heading
            paragraphs.push(
                new Paragraph({
                    text: trimmed.replace(/:$/, ''), // Remove trailing colon
                    heading: HeadingLevel.HEADING_2,
                    spacing: {
                        before: i > 0 ? formatting.paragraphSpacing * 2 : formatting.paragraphSpacing,
                        after: formatting.paragraphSpacing
                    },
                    run: {
                        font: formatting.headingFont || formatting.fontFamily,
                        size: formatting.headingSize || formatting.fontSize + 4,
                        bold: true
                    }
                })
            );
        } else if (trimmed.startsWith('•') || trimmed.startsWith('-') || trimmed.startsWith('*')) {
            // Bullet point
            const bulletText = trimmed.substring(1).trim();
            paragraphs.push(
                new Paragraph({
                    text: bulletText,
                    bullet: {
                        level: 0
                    },
                    spacing: {
                        before: 60,
                        after: 60
                    },
                    run: {
                        font: formatting.fontFamily,
                        size: formatting.fontSize
                    }
                })
            );
        } else {
            // Regular paragraph
            const runOptions: IRunOptions = {
                font: formatting.fontFamily,
                size: formatting.fontSize
            };

            // Detect bold text (between ** or __)
            const parts = trimmed.split(/(\*\*.*?\*\*|__.*?__)/g);
            const runs: TextRun[] = [];

            for (const part of parts) {
                if (part.startsWith('**') && part.endsWith('**')) {
                    runs.push(new TextRun({ ...runOptions, text: part.slice(2, -2), bold: true }));
                } else if (part.startsWith('__') && part.endsWith('__')) {
                    runs.push(new TextRun({ ...runOptions, text: part.slice(2, -2), bold: true }));
                } else if (part) {
                    runs.push(new TextRun({ ...runOptions, text: part }));
                }
            }

            paragraphs.push(
                new Paragraph({
                    children: runs.length > 0 ? runs : [new TextRun({ ...runOptions, text: trimmed })],
                    spacing: {
                        before: formatting.paragraphSpacing / 2,
                        after: formatting.paragraphSpacing / 2,
                        line: formatting.lineSpacing
                    }
                })
            );
        }
    }

    return paragraphs;
}

/**
 * Creates a formatted DOCX document
 */
export async function createFormattedDocx(
    content: string,
    formatting: DocumentFormatting = defaultFormatting
): Promise<Blob> {
    const paragraphs = parseContentToParagraphs(content, formatting);

    const doc = new Document({
        sections: [
            {
                properties: {
                    page: {
                        margin: {
                            top: 720, // 0.5 inch
                            right: 720,
                            bottom: 720,
                            left: 720
                        }
                    }
                },
                children: paragraphs
            }
        ]
    });

    return await Packer.toBlob(doc);
}

/**
 * Extracts basic formatting from uploaded file metadata/content
 * Note: For full DOCX parsing, we'd need mammoth or docx libraries with read capabilities
 */
export function extractFormattingFromContent(
    content: string,
    fileType: string
): DocumentFormatting {
    // For now, return default formatting
    // In a full implementation, we would parse DOCX structure
    // to extract actual font families, sizes, etc.

    // We can make educated guesses based on content structure
    const hasLongLines = content.split('\n').some(line => line.length > 100);
    const fontSize = hasLongLines ? 20 : 22; // 10pt vs 11pt

    return {
        ...defaultFormatting,
        fontSize
    };
}

/**
 * Attempts to detect font size from text patterns
 */
export function detectFontSizeFromContent(content: string): number {
    // This is a heuristic - in reality, we'd need to parse the actual DOCX
    const avgLineLength = content.split('\n')
        .filter(line => line.trim().length > 0)
        .reduce((sum, line) => sum + line.length, 0) / content.split('\n').length;

    if (avgLineLength > 80) return 20; // 10pt
    if (avgLineLength > 60) return 22; // 11pt
    return 24; // 12pt
}
