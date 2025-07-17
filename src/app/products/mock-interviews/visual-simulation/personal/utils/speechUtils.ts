'use client';

export const getPreferredVoice = (voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null => {
  // Priority list for Indian English voices
  const preferredVoicePatterns = [
    // Google's Indian English voices
    'Google हिन्दी',
    'Google индийский',
    'Microsoft Heera',
    'Microsoft Ravi',
    // Fallback to other Indian-accented voices
    'English (India)',
    'en-IN',
    // Then try other natural English voices
    'Google UK English Female',
    'Microsoft Zira',
    'en-GB',
    'en-US'
  ];

  // Try to find a voice matching our preferences
  for (const pattern of preferredVoicePatterns) {
    const voice = voices.find(v => 
      v.name.includes(pattern) || 
      v.lang.includes(pattern)
    );
    if (voice) return voice;
  }

  // Fallback to any English voice
  return voices.find(voice => voice.lang.startsWith('en')) || null;
};

export const configureSpeech = (utterance: SpeechSynthesisUtterance) => {
  // Configure speech parameters for Indian English
  utterance.rate = 0.9; // Slightly slower for clarity
  utterance.pitch = 1.1; // Slightly higher pitch
  utterance.volume = 1;
  
  // Add slight pauses after punctuation for more natural speech
  utterance.text = utterance.text
    .replace(/\./g, '. ')
    .replace(/\,/g, ', ')
    .replace(/\!/g, '! ')
    .replace(/\?/g, '? ')
    .replace(/\s+/g, ' ')
    .trim();
};

export const initializeSpeechSynthesis = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') {
      resolve(false);
      return;
    }

    const synth = window.speechSynthesis;
    if (!synth) {
      resolve(false);
      return;
    }

    // Handle the case where voices might not be loaded immediately
    const handleVoicesChanged = () => {
      const voices = synth.getVoices();
      if (voices.length > 0) {
        synth.removeEventListener('voiceschanged', handleVoicesChanged);
        resolve(true);
      }
    };

    const voices = synth.getVoices();
    if (voices.length > 0) {
      resolve(true);
    } else {
      synth.addEventListener('voiceschanged', handleVoicesChanged);
    }
  });
};
