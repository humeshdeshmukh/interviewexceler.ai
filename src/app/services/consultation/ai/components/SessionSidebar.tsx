import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaTrash, FaTimes, FaComments, FaRobot } from 'react-icons/fa';

export interface Session {
    id: string;
    title: string;
    created_at: Date;
    updated_at: Date;
    messageCount?: number;
}

interface SessionSidebarProps {
    isOpen: boolean;
    onClose: () => void;
    sessions: Session[];
    activeSessionId: string | null;
    onNewSession: () => void;
    onSelectSession: (id: string) => void;
    onDeleteSession: (id: string) => void;
}

export const SessionSidebar = ({
    isOpen,
    onClose,
    sessions,
    activeSessionId,
    onNewSession,
    onSelectSession,
    onDeleteSession
}: SessionSidebarProps) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const formatDate = (date: Date) => {
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays}d ago`;
        return date.toLocaleDateString();
    };

    const sidebarVariants = {
        open: isMobile
            ? { x: 0, opacity: 1, width: '20rem' }
            : { width: '20rem', opacity: 1, x: 0 },
        closed: isMobile
            ? { x: '-100%', opacity: 0, width: '20rem' }
            : { width: 0, opacity: 0, x: 0 }
    };

    return (
        <>
            {/* Mobile Overlay */}
            <AnimatePresence>
                {isOpen && isMobile && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <motion.div
                initial={false}
                animate={isOpen ? 'open' : 'closed'}
                variants={sidebarVariants}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className={`
          flex flex-col bg-[#1a1a1a] border-r border-[#fcba28]/20 shadow-2xl overflow-hidden z-50
          ${isMobile ? 'fixed inset-y-0 left-0 h-full' : 'relative h-full'}
        `}
            >
                {/* Content Container - needed for width animation to not squash content */}
                <div className="w-80 flex flex-col h-full">

                    {/* Header */}
                    <div className="relative p-6 border-b border-[#fcba28]/20 bg-gradient-to-r from-[#2a2a2a] to-[#1f1f1f]">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-[#272727] border border-[#fcba28]/20">
                                    <FaRobot className="text-[#fcba28] text-lg" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold text-[#fcba28]">Sessions</h2>
                                    <p className="text-xs text-[#f9f4da]/70">{sessions.length} conversations</p>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition-all hover:scale-110 active:scale-95"
                            >
                                <FaTimes className="text-[#f9f4da]/70 hover:text-[#fcba28] transition-colors" />
                            </button>
                        </div>

                        {/* New Chat Button */}
                        <button
                            onClick={() => {
                                onNewSession();
                                if (isMobile) onClose();
                            }}
                            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-[#fcba28] to-[#e9aa22] text-[#1a1a1a] font-semibold rounded-xl hover:shadow-[0_4px_12px_rgba(252,186,40,0.3)] transition-all duration-300 hover:scale-[1.02] active:scale-95 group"
                        >
                            <FaPlus className="group-hover:rotate-90 transition-transform duration-300" />
                            <span>New Chat</span>
                        </button>
                    </div>

                    {/* Session List */}
                    <div className="relative flex-1 overflow-y-auto p-4 space-y-2 scrollbar-thin scrollbar-thumb-[#fcba28] scrollbar-track-transparent">
                        <AnimatePresence mode="popLayout">
                            {sessions.length === 0 ? (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-center py-12 px-4"
                                >
                                    <div className="inline-block p-4 rounded-full bg-[#272727] border border-[#fcba28]/10 mb-4">
                                        <FaComments className="text-3xl text-[#fcba28]/50" />
                                    </div>
                                    <p className="text-sm text-[#f9f4da]/70 mb-1">No sessions yet</p>
                                    <p className="text-xs text-[#f9f4da]/50">Start a new chat to begin</p>
                                </motion.div>
                            ) : (
                                sessions.map((session, index) => (
                                    <motion.div
                                        key={session.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20, height: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        layout
                                        className={`group relative p-4 rounded-xl cursor-pointer transition-all duration-200 border ${session.id === activeSessionId
                                                ? 'bg-[#272727] border-[#fcba28]/40 shadow-[0_4px_12px_rgba(0,0,0,0.2)]'
                                                : 'bg-transparent border-transparent hover:bg-[#272727] hover:border-[#fcba28]/20'
                                            }`}
                                        onClick={() => {
                                            onSelectSession(session.id);
                                            if (isMobile) onClose();
                                        }}
                                    >
                                        {/* Active indicator */}
                                        {session.id === activeSessionId && (
                                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#fcba28] rounded-r-full shadow-[0_0_8px_rgba(252,186,40,0.4)]" />
                                        )}

                                        <div className="flex items-start justify-between gap-3">
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <FaComments className={`text-xs flex-shrink-0 ${session.id === activeSessionId ? 'text-[#fcba28]' : 'text-[#f9f4da]/50'
                                                        }`} />
                                                    <h3 className={`text-sm font-medium truncate ${session.id === activeSessionId ? 'text-[#fcba28]' : 'text-[#f9f4da]/90'
                                                        }`}>
                                                        {session.title || 'New Chat'}
                                                    </h3>
                                                </div>
                                                <p className="text-xs text-[#f9f4da]/50">
                                                    {formatDate(session.updated_at)}
                                                </p>
                                            </div>

                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    if (confirm(`Delete "${session.title || 'this session'}"?`)) {
                                                        onDeleteSession(session.id);
                                                    }
                                                }}
                                                className="opacity-0 group-hover:opacity-100 p-2 hover:bg-red-500/10 rounded-lg transition-all hover:scale-110 active:scale-95"
                                            >
                                                <FaTrash className="text-xs text-red-400 hover:text-red-300" />
                                            </button>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Footer hint */}
                    <div className="relative p-4 border-t border-[#fcba28]/20 bg-[#1f1f1f]">
                        <p className="text-xs text-center text-[#f9f4da]/50">
                            💡 Tip: Click any chat to continue
                        </p>
                    </div>
                </div>
            </motion.div>
        </>
    );
};
