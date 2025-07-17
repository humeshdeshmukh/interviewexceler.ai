'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPlay, FaCode, FaCheck, FaTimes } from 'react-icons/fa';
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
  onTestResult: (passed: boolean) => void;
}

export default function CodeEditor({ question, onTestResult }: CodeEditorProps) {
  const [code, setCode] = useState(question.starterCode);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [testResults, setTestResults] = useState<Array<{passed: boolean; output: string}>>([]);

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput('Running code...');
    setTestResults([]);

    try {
      const results = await Promise.all(question.testCases.map(async (testCase) => {
        // In a real implementation, you would send this to your backend
        // Here we're just simulating the API call
        const response = await fetch('/api/run-code', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            code,
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
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRunCode}
            disabled={isRunning}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
              isRunning
                ? 'bg-gray-500 cursor-not-allowed'
                : 'bg-[#fcba28] hover:bg-[#fcd978]'
            } text-black font-medium transition-colors`}
          >
            <FaPlay className="w-3 h-3" />
            {isRunning ? 'Running...' : 'Run Code'}
          </motion.button>
        </div>
        <Editor
          height="300px"
          defaultLanguage={question.language.toLowerCase()}
          defaultValue={question.starterCode}
          onChange={(value) => setCode(value || '')}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            automaticLayout: true,
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
                <div className={`flex items-center gap-2 ${
                  testResults[index].passed ? 'text-green-500' : 'text-red-500'
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
          <pre className="text-gray-300 font-mono text-sm">{output}</pre>
        </div>
      )}
    </div>
  );
}
