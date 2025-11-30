import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { motion } from 'framer-motion';
import { FaUser, FaRobot } from 'react-icons/fa';
import { Message } from '../hooks/use-consultation';

interface ChatMessageProps {
    message: Message;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
    const isUser = message.role === 'user';

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className={`flex gap-4 ${isUser ? 'flex-row-reverse' : 'flex-row'} max-w-[90%] ${isUser ? 'ml-auto' : ''}`}
        >
            <div
                className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center shadow-md ${isUser ? 'bg-gradient-to-br from-[#fcba28] to-[#e9aa22] text-black' : 'bg-[#272727] border border-[#fcba28]/20 text-[#fcba28]'
                    }`}
            >
                {isUser ? <FaUser size={16} /> : <FaRobot size={20} />}
            </div>

            <div
                className={`px-5 py-4 shadow-lg ${isUser
                    ? 'bg-gradient-to-br from-[#fcba28] to-[#e9aa22] text-[#1a1a1a] rounded-[1.125rem] rounded-br-md'
                    : 'bg-[#272727] text-[#f9f4da] border border-[#fcba28]/20 rounded-[1.125rem] rounded-bl-md'
                    }`}
            >
                <div className={`prose ${isUser ? 'prose-invert' : 'prose-invert'} max-w-none`}>
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                            p: ({ children }) => <p className={`mb-2 last:mb-0 leading-relaxed ${isUser ? 'text-[#1a1a1a] font-medium' : 'text-[#f9f4da]'}`}>{children}</p>,
                            ul: ({ children }) => <ul className="list-disc ml-4 mb-2 space-y-1">{children}</ul>,
                            ol: ({ children }) => <ol className="list-decimal ml-4 mb-2 space-y-1">{children}</ol>,
                            li: ({ children }) => <li className="mb-1">{children}</li>,
                            h1: ({ children }) => <h1 className={`text-xl font-bold mb-2 mt-4 ${isUser ? 'text-[#1a1a1a]' : 'text-[#fcba28]'}`}>{children}</h1>,
                            h2: ({ children }) => <h2 className={`text-lg font-bold mb-2 mt-3 ${isUser ? 'text-[#1a1a1a]' : 'text-[#fcba28]'}`}>{children}</h2>,
                            h3: ({ children }) => <h3 className={`text-md font-bold mb-1 mt-2 ${isUser ? 'text-[#1a1a1a]' : 'text-[#fcba28]'}`}>{children}</h3>,
                            code: ({ node, inline, className, children, ...props }: any) => {
                                const match = /language-(\w+)/.exec(className || '')
                                return !inline && match ? (
                                    <div className="bg-[#1a1a1a] rounded-md p-3 my-2 overflow-x-auto border border-[#fcba28]/20">
                                        <code className={className} {...props}>
                                            {children}
                                        </code>
                                    </div>
                                ) : (
                                    <code className={`rounded px-1.5 py-0.5 text-sm font-mono ${isUser ? 'bg-black/10 text-black' : 'bg-[#1a1a1a] text-[#fcba28] border border-[#fcba28]/20'}`} {...props}>
                                        {children}
                                    </code>
                                )
                            }
                        }}
                    >
                        {message.content}
                    </ReactMarkdown>
                </div>
                <div className={`text-xs mt-2 opacity-70 ${isUser ? 'text-[#1a1a1a]' : 'text-[#f9f4da]'}`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
            </div>
        </motion.div>
    );
};
