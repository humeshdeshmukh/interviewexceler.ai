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
  onDelete?: (id: string) => void;
}

const RecordingsList: React.FC<RecordingsListProps> = ({
  recordings,
  questions,
  onPlay,
  onDelete
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

  if (recordings.length === 0) {
    return (
      <div className="text-center py-12 text-white/40">
        <p>No recordings yet. Start practicing to see your history!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <AnimatePresence>
        {recordings.map((recording) => (
          <motion.div
            key={recording.id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white/5 rounded-xl overflow-hidden backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all group"
          >
            {/* Thumbnail Section */}
            <div
              className="relative aspect-video bg-black/40 cursor-pointer group-hover:bg-black/30 transition-colors"
              onClick={() => onPlay(recording)}
            >
              {recording.thumbnailUrl ? (
                <img
                  src={recording.thumbnailUrl}
                  alt="Recording thumbnail"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                    <Play className="w-6 h-6 text-white/60" />
                  </div>
                </div>
              )}

              <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform">
                  <Play className="w-6 h-6 text-white fill-white" />
                </div>
              </div>

              <div className="absolute bottom-2 right-2 px-2 py-1 rounded bg-black/60 backdrop-blur-sm text-xs text-white font-medium flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {formatTime(recording.duration)}
              </div>
            </div>

            <div className="p-4">
              <div className="mb-4">
                <h3 className="text-white font-medium line-clamp-2 mb-1" title={questions[recording.questionIndex]?.text}>
                  {questions[recording.questionIndex]?.text || 'Interview Answer'}
                </h3>
                <p className="text-xs text-white/40">
                  {formatDate(recording.timestamp)}
                </p>
              </div>

              <div className="flex items-center justify-between gap-2">
                <button
                  className="flex-1 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/80 text-sm font-medium transition-colors flex items-center justify-center gap-2"
                  onClick={() => setExpandedId(expandedId === recording.id ? null : recording.id)}
                >
                  <MessageSquare className="w-4 h-4" />
                  {expandedId === recording.id ? 'Hide' : 'Show'} Transcript
                </button>

                <div className="flex items-center gap-1">
                  <button
                    className="p-2 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors"
                    title="Download"
                    onClick={() => {
                      const link = document.createElement('a');
                      link.href = recording.url;
                      link.download = `interview-answer-${recording.id}.webm`;
                      link.click();
                    }}
                  >
                    <Download className="w-4 h-4" />
                  </button>
                  <button
                    className="p-2 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors"
                    title="Share"
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
                    <Share2 className="w-4 h-4" />
                  </button>
                  {onDelete && (
                    <button
                      className="p-2 rounded-lg hover:bg-red-500/20 text-white/60 hover:text-red-400 transition-colors"
                      title="Delete"
                      onClick={() => onDelete(recording.id)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 6h18"></path>
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                      </svg>
                    </button>
                  )}
                </div>
              </div>

              <AnimatePresence>
                {expandedId === recording.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-3 pt-3 border-t border-white/10">
                      <p className="text-white/70 text-sm leading-relaxed">
                        {recording.transcript || "No transcript available."}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default RecordingsList;
