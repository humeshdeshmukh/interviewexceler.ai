'use client';
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateChatResponse } from './chatService';
import styles from './ChatBot.module.css';
import { IoSend } from 'react-icons/io5';
import Image from 'next/image';

interface Message {
  content: string;
  isBot: boolean;
  timestamp: Date;
}

const ChatBotIcon = () => (
  <Image
    src="/logo.svg"
    alt="InterviewExceler.Ai Chat"
    width={40}
    height={40}
    className={styles.chatbotIcon}
  />
);

export const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        content: "👋 Welcome to InterviewExceler.Ai! I'm your personal interview preparation assistant. I can help you with:\n\n• Mock interviews and feedback\n• Technical interview preparation\n• Resume reviews\n• Career guidance\n• Interview strategies\n\nHow can I assist you today?",
        isBot: true,
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      content: inputMessage,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      const response = await generateChatResponse(inputMessage);
      const botMessage: Message = {
        content: response,
        isBot: true,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error getting response:', error);
      const errorMessage: Message = {
        content: "I apologize, but I encountered an error. Please try again.",
        isBot: true,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className={styles.chatbotContainer}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={styles.chatWindow}
          >
            <div className={styles.chatHeader}>
              <div className={styles.headerContent}>
                <ChatBotIcon />
                <div className={styles.headerText}>
                  <h3>InterviewExceler.Ai</h3>
                  <span className={styles.onlineStatus}>Ready to help</span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className={styles.closeButton}
                aria-label="Close chat"
              >
                ×
              </button>
            </div>
            <div className={styles.messagesContainer}>
              {messages.map((msg, index) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  key={index}
                  className={`${styles.message} ${
                    msg.isBot ? styles.botMessage : styles.userMessage
                  }`}
                >
                  {msg.isBot && <ChatBotIcon />}
                  <div className={styles.messageContent}>
                    <div className={styles.messageText}>
                      {msg.content.split('\n').map((line, i) => (
                        <React.Fragment key={i}>
                          {line}
                          {i < msg.content.split('\n').length - 1 && <br />}
                        </React.Fragment>
                      ))}
                    </div>
                    <span className={styles.timestamp}>
                      {new Date(msg.timestamp).toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </span>
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`${styles.message} ${styles.botMessage}`}
                >
                  <ChatBotIcon />
                  <div className={styles.typingIndicator}>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>
            <div className={styles.inputContainer}>
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask me anything about interview preparation..."
                className={styles.input}
                aria-label="Chat input"
              />
              <button 
                onClick={handleSendMessage} 
                className={styles.sendButton}
                disabled={!inputMessage.trim()}
                aria-label="Send message"
              >
                <IoSend size={20} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className={styles.chatbotButton}
        aria-label="Open chat"
      >
        <ChatBotIcon />
      </motion.button>
    </div>
  );
};
