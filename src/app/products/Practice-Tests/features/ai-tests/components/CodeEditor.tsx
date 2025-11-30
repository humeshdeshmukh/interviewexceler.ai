'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaPlay, FaCode, FaCheck, FaTimes, FaRobot } from 'react-icons/fa';
import Editor from '@monaco-editor/react';

interface CodeEditorProps {
  question: {
    id: string;
    language: string;
    starterCode: string;
    testCases: Array<{
      input: string;
      expectedOutput: string;
    }>;
  };
  value?: string;
  onChange?: (value: string) => void;
  onTestResult: (passed: boolean) => void;
  onGrade?: () => void;
  isGrading?: boolean;
}

export default function CodeEditor({ question, value, onChange, onTestResult, onGrade, isGrading }: CodeEditorProps) {
  const [internalCode, setInternalCode] = useState(question.starterCode);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [testResults, setTestResults] = useState<Array<{ passed: boolean; output: string }>>([]);

  // Sync internal state with prop if provided
  useEffect(() => {
    if (value !== undefined) {
      setInternalCode(value);
    }
  }, [value]);

  const handleCodeChange = (val: string | undefined) => {
    const newCode = val || '';
    setInternalCode(newCode);
    if (onChange) {
      onChange(newCode);
    }
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput('Running code...');
    setTestResults([]);

    try {
      const results = await Promise.all(question.testCases.map(async (testCase) => {
        const response = await fetch('/api/run-code', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            code: internalCode,
            language: question.language,
            input: testCase.input
          })
        });

        const result = await response.json();
        return {
          passed: result.output.trim() === testCase.expectedOutput.trim(),
          output: result.output
        };
      }));

      setTestResults(results);
      const allPassed = results.every(r => r.passed);
      onTestResult(allPassed);
      setOutput(allPassed ? 'All test cases passed!' : 'Some test cases failed.');
    } catch (error) {
      setOutput('Error running code: ' + (error as Error).message);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="rounded-lg overflow-hidden border border-[#fcba28]/20">
        <div className="bg-[#fcba28]/10 p-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-[#fcba28]">
            <FaCode className="w-4 h-4" />
            <span className="font-medium">{question.language}</span>
          </div>
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRunCode}
              disabled={isRunning}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 ${isRunning
                  ? 'bg-gray-500 cursor-not-allowed'
                  : 'bg-[#fcba28] hover:bg-[#fcd978]'
                } text-black font-medium transition-colors`}
            >
              <FaPlay className="w-3 h-3" />
              {isRunning ? 'Running...' : 'Run Code'}
            </motion.button>

            {onGrade && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onGrade}
                disabled={isGrading}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 ${isGrading
                    ? 'bg-gray-500 cursor-not-allowed'
                    : 'bg-purple-600 hover:bg-purple-500'
                  } text-white font-medium transition-colors`}
              >
                <FaRobot className="w-3 h-3" />
                {isGrading ? 'Grading...' : 'Grade with AI'}
              </motion.button>
            )}
          </div>
        </div>
        <Editor
          height="400px"
          defaultLanguage={question.language.toLowerCase()}
          value={internalCode}
          onChange={handleCodeChange}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            automaticLayout: true,
            padding: { top: 16, bottom: 16 },
          }}
        />
      </div>

      {/* Test Cases */}
      <div className="space-y-3">
        <div className="text-[#fcba28] font-medium">Test Cases</div>
        {question.testCases.map((testCase, index) => (
          <div
            key={index}
            className="p-4 rounded-lg bg-white/5 border border-[#fcba28]/20 space-y-2"
          >
            <div className="flex items-center justify-between">
              <div className="text-gray-400">Test Case {index + 1}</div>
              {testResults[index] && (
                <div className={`flex items-center gap-2 ${testResults[index].passed ? 'text-green-500' : 'text-red-500'
                  }`}>
                  {testResults[index].passed ? (
                    <>
                      <FaCheck className="w-4 h-4" />
                      <span>Passed</span>
                    </>
                  ) : (
                    <>
                      <FaTimes className="w-4 h-4" />
                      <span>Failed</span>
                    </>
                  )}
                </div>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-[#fcba28] mb-1">Input</div>
                <div className="p-2 rounded bg-black/30 text-gray-300 font-mono text-sm">
                  {testCase.input}
                </div>
              </div>
              <div>
                <div className="text-sm text-[#fcba28] mb-1">Expected Output</div>
                <div className="p-2 rounded bg-black/30 text-gray-300 font-mono text-sm">
                  {testCase.expectedOutput}
                </div>
              </div>
              {testResults[index] && !testResults[index].passed && (
                <div className="col-span-2">
                  <div className="text-sm text-red-500 mb-1">Your Output</div>
                  <div className="p-2 rounded bg-red-500/10 text-gray-300 font-mono text-sm border border-red-500/20">
                    {testResults[index].output}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Output Console */}
      {output && (
        <div className="p-4 rounded-lg bg-black/30 border border-[#fcba28]/20">
          <div className="text-[#fcba28] font-medium mb-2">Console Output</div>
          <pre className="text-gray-300 font-mono text-sm whitespace-pre-wrap">{output}</pre>
        </div>
      )}
    </div>
  );
}
