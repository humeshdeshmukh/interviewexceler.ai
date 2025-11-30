'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Play, Download, Share2, Trash2 } from 'lucide-react';

interface VideoPreviewProps {
  recordings: {
    id: string;
    timestamp: Date;
    duration: number;
    url: string;
    questionIndex: number;
  }[];
  onPlay: (recordingId: string) => void;
  onDelete: (recordingId: string) => void;
  onDownload: (recordingId: string) => void;
  onShare: (recordingId: string) => void;
}

export const VideoPreview: React.FC<VideoPreviewProps> = ({
  recordings,
  onPlay,
  onDelete,
  onDownload,
  onShare,
}) => {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <motion.div
      className="bg-white/5 border border-white/10 rounded-xl backdrop-blur-lg p-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h3 className="text-lg font-semibold text-white mb-4">Recent Recordings</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recordings.map((recording) => (
          <div
            key={recording.id}
            className="relative group rounded-lg overflow-hidden"
          >
            {/* Video Thumbnail */}
            <div className="aspect-video bg-black/40 rounded-lg relative">
              <video
                src={recording.url}
                className="w-full h-full object-cover"
                poster="/video-thumbnail.png"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors" />
              
              {/* Play Button Overlay */}
              <button
                onClick={() => onPlay(recording.id)}
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <div className="w-12 h-12 rounded-full bg-[#fcba28] flex items-center justify-center">
                  <Play className="w-6 h-6 text-black" />
                </div>
              </button>
            </div>

            {/* Recording Info */}
            <div className="p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-white font-medium">
                  {formatDate(recording.timestamp)}
                </span>
                <span className="text-xs text-gray-400">
                  {formatDuration(recording.duration)}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onDownload(recording.id)}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <Download className="w-4 h-4 text-white" />
                </button>
                <button
                  onClick={() => onShare(recording.id)}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <Share2 className="w-4 h-4 text-white" />
                </button>
                <button
                  onClick={() => onDelete(recording.id)}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-red-500"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {recordings.length === 0 && (
          <div className="col-span-full text-center py-8 text-gray-400">
            No recordings yet. Start your interview to record your responses.
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default VideoPreview;
