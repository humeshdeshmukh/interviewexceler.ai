import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { useGeminiAI } from '@/lib/hooks/useGeminiAI';
import { Loader2, Send, Mic, StopCircle } from 'lucide-react';
import { useVoiceRecording } from '@/lib/hooks/useVoiceRecording';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export function AIConsultantChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { generateResponse } = useGeminiAI();
  const { 
    isRecording, 
    startRecording, 
    stopRecording, 
    transcript, 
    resetTranscript 
  } = useVoiceRecording();

  useEffect(() => {
    if (transcript) {
      setInput(transcript);
    }
  }, [transcript]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    resetTranscript();

    try {
      const context = messages.slice(-5).map(m => `${m.role}: ${m.content}`).join('\n');
      const response = await generateResponse(
        input,
        'You are an expert career consultant and interview coach. Provide detailed, actionable advice.',
        context
      );

      const aiMessage: Message = {
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error generating response:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[600px] w-full max-w-3xl mx-auto">
      <ScrollArea className="flex-1 p-4 space-y-4 bg-secondary/10 rounded-t-lg">
        {messages.map((message, index) => (
          <Card
            key={index}
            className={`p-4 mb-4 ${
              message.role === 'assistant' 
                ? 'bg-primary/10 ml-4' 
                : 'bg-secondary/10 mr-4'
            }`}
          >
            <div className="flex items-start gap-3">
              <Avatar className="w-8 h-8">
                {message.role === 'assistant' ? '🤖' : '👤'}
              </Avatar>
              <div className="flex-1">
                <div className="text-sm font-medium">
                  {message.role === 'assistant' ? 'AI Consultant' : 'You'}
                </div>
                <div className="mt-1 text-sm whitespace-pre-wrap">
                  {message.content}
                </div>
                <div className="mt-2 text-xs text-muted-foreground">
                  {message.timestamp.toLocaleTimeString()}
                </div>
              </div>
            </div>
          </Card>
        ))}
        {isLoading && (
          <div className="flex items-center justify-center">
            <Loader2 className="w-6 h-6 animate-spin" />
          </div>
        )}
        <div ref={scrollRef} />
      </ScrollArea>

      <div className="flex items-center gap-2 p-4 bg-background border-t">
        <Button
          variant="outline"
          size="icon"
          onClick={isRecording ? stopRecording : startRecording}
          className={isRecording ? 'text-red-500' : ''}
        >
          {isRecording ? <StopCircle /> : <Mic />}
        </Button>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message or use voice input..."
          className="flex-1"
          disabled={isLoading}
        />
        <Button 
          onClick={handleSend}
          disabled={!input.trim() || isLoading}
        >
          <Send className="w-4 h-4 mr-2" />
          Send
        </Button>
      </div>
    </div>
  );
}
