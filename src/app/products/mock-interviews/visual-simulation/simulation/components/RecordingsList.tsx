import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Download, Share2, Clock, MessageSquare } from 'lucide-react';

interface Recording {
  id: string;
  timestamp: Date;
  duration: number;
  url: string;
  thumbnailUrl: string;
  questionIndex: number;
  transcript: string;
}

interface RecordingsListProps {
  recordings: Recording[];
  questions: { text: string }[];
  onPlay: (recording: Recording) => void;
}

const RecordingsList: React.FC<RecordingsListProps> = ({
  recordings,
  questions,
  onPlay
}) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    }).format(date);
  };

  return (
    <div className="space-y-4">
      <AnimatePresence>
        {recordings.map((recording) => (
          <motion.div
            key={recording.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white/5 rounded-xl overflow-hidden backdrop-blur-sm border border-white/10"
          >
            <div className="p-4">
              <div className="flex items-start gap-4">
                {/* Thumbnail */}
                <div 
                  className="relative w-40 h-24 rounded-lg overflow-hidden bg-black/20 cursor-pointer"
                  onClick={() => onPlay(recording)}
                >
                  <img
                    src={recording.thumbnailUrl}
                    alt="Recording thumbnail"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity">
                    <Play className="w-8 h-8 text-white" />
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1">
                  <h3 className="text-white font-medium mb-2">
                    {questions[recording.questionIndex]?.text || 'Question'}
                  </h3>
                  
                  <div className="flex items-center gap-4 text-sm text-white/60">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {formatTime(recording.duration)}
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageSquare className="w-4 h-4" />
                      {recording.transcript.split(' ').length} words
                    </div>
                    <span>{formatDate(recording.timestamp)}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button
                    className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                    onClick={() => {
                      const link = document.createElement('a');
                      link.href = recording.url;
                      link.download = `interview-answer-${recording.id}.webm`;
                      link.click();
                    }}
                  >
                    <Download className="w-5 h-5 text-white/60" />
                  </button>
                  <button
                    className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: 'Interview Answer',
                          text: questions[recording.questionIndex]?.text,
                          url: recording.url
                        });
                      }
                    }}
                  >
                    <Share2 className="w-5 h-5 text-white/60" />
                  </button>
                </div>
              </div>

              {/* Transcript */}
              <div className="mt-4">
                <button
                  className="text-sm text-white/60 hover:text-white/80 transition-colors"
                  onClick={() => setExpandedId(expandedId === recording.id ? null : recording.id)}
                >
                  {expandedId === recording.id ? 'Hide' : 'Show'} Transcript
                </button>
                
                <AnimatePresence>
                  {expandedId === recording.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="mt-2 p-3 rounded-lg bg-black/20 text-white/70 text-sm">
                        {recording.transcript}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default RecordingsList;
