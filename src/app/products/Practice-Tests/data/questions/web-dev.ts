import { Test } from '../../utils/types';

export const webDevQuestions: Test[] = {
  beginner: [
    {
      text: 'What is the difference between localStorage and sessionStorage?',
      options: [
        'localStorage persists after browser close, sessionStorage does not',
        'localStorage has more storage capacity',
        'sessionStorage is more secure',
        'There is no difference'
      ],
      correctAnswer: 'localStorage persists after browser close, sessionStorage does not',
      explanation: 'localStorage data persists until explicitly cleared, while sessionStorage data is cleared when the browser session ends.'
    },
    {
      text: 'What is the purpose of the DOCTYPE declaration?',
      options: [
        'To link JavaScript files',
        'To tell the browser which version of HTML/XML to use',
        'To define the document title',
        'To include CSS styles'
      ],
      correctAnswer: 'To tell the browser which version of HTML/XML to use',
      explanation: 'DOCTYPE declaration informs the browser about the version of HTML being used, ensuring proper rendering.'
    },
    {
      text: 'What is the difference between == and === in JavaScript?',
      options: [
        'No difference',
        '=== checks value only',
        '== checks type only',
        '=== checks both type and value'
      ],
      correctAnswer: '=== checks both type and value',
      explanation: '=== is strict equality, checking both value and type, while == performs type coercion before comparison.'
    },
    {
      text: 'What is the box model in CSS?',
      options: [
        'A layout system for tables',
        'A way to structure HTML',
        'Content, padding, border, and margin',
        'A 3D rendering model'
      ],
      correctAnswer: 'Content, padding, border, and margin',
      explanation: 'The CSS box model describes the rectangular boxes generated for elements, including content, padding, border, and margin areas.'
    },
    {
      text: 'What is the purpose of the alt attribute in img tags?',
      options: [
        'To show image title',
        'To provide alternative text for accessibility',
        'To specify image size',
        'To add image effects'
      ],
      correctAnswer: 'To provide alternative text for accessibility',
      explanation: 'The alt attribute provides alternative text for screen readers and displays when images fail to load.'
    },
    {
      text: 'What is the purpose of semantic HTML?',
      options: [
        'To make code look prettier',
        'To improve website design',
        'To provide meaning and structure to content',
        'To increase website speed'
      ],
      correctAnswer: 'To provide meaning and structure to content',
      explanation: 'Semantic HTML uses meaningful tags that describe their content purpose, improving accessibility and SEO.'
    },
    {
      text: 'What is the difference between display: none and visibility: hidden?',
      options: [
        'They are the same',
        'display: none removes from layout, visibility: hidden only hides',
        'visibility: hidden removes from layout, display: none only hides',
        'Both remove from layout'
      ],
      correctAnswer: 'display: none removes from layout, visibility: hidden only hides',
      explanation: 'display: none removes the element from the document flow, while visibility: hidden keeps the space but makes it invisible.'
    },
    {
      text: 'What is the purpose of the async and defer attributes in script tags?',
      options: [
        'They are the same',
        'async loads scripts asynchronously, defer waits for HTML parsing',
        'defer loads scripts asynchronously, async waits for HTML parsing',
        'Both wait for HTML parsing'
      ],
      correctAnswer: 'async loads scripts asynchronously, defer waits for HTML parsing',
      explanation: 'async downloads scripts asynchronously and executes immediately, while defer waits until HTML parsing is complete.'
    },
    {
      text: 'What is the purpose of media queries in CSS?',
      options: [
        'To play media files',
        'To style images',
        'To create responsive designs',
        'To handle form submissions'
      ],
      correctAnswer: 'To create responsive designs',
      explanation: 'Media queries allow CSS to adapt styles based on device characteristics like screen size, enabling responsive design.'
    },
    {
      text: 'What is the difference between GET and POST methods?',
      options: [
        'No difference',
        'GET is faster, POST is slower',
        'GET sends data in URL, POST in request body',
        'POST is more secure by default'
      ],
      correctAnswer: 'GET sends data in URL, POST in request body',
      explanation: 'GET requests send data as URL parameters, while POST requests send data in the request body, making it suitable for sensitive data.'
    }
  ],
  intermediate: [
    {
      text: 'What are Web Workers and what are they used for?',
      options: [
        'UI threads for animations',
        'Background threads for CPU-intensive tasks',
        'Server-side processing units',
        'Database connection pools'
      ],
      correctAnswer: 'Background threads for CPU-intensive tasks',
      explanation: 'Web Workers enable running scripts in background threads, allowing CPU-intensive tasks without blocking the UI thread.'
    },
    {
      text: 'What is the Virtual DOM and how does it work?',
      options: [
        'A direct copy of the browser DOM',
        'A lightweight copy of the DOM for diffing',
        'A database for DOM elements',
        'A DOM caching mechanism'
      ],
      correctAnswer: 'A lightweight copy of the DOM for diffing',
      explanation: 'Virtual DOM is a lightweight copy of the actual DOM used to calculate minimal required changes before updating the real DOM.'
    },
    {
      text: 'What is Cross-Origin Resource Sharing (CORS)?',
      options: [
        'A security feature restricting cross-origin requests',
        'A way to share resources between servers',
        'A caching mechanism',
        'A compression algorithm'
      ],
      correctAnswer: 'A security feature restricting cross-origin requests',
      explanation: 'CORS is a security mechanism that allows or restricts resources on a web page to be requested from another domain.'
    }
  ]
};
