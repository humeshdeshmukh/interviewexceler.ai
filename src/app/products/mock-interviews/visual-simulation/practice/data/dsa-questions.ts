import { Question } from "./types";

export const dsaQuestions: Question[] = [
  {
    id: 1,
    category: "DSA",
    text: "Explain how you would implement a LRU (Least Recently Used) Cache",
    difficulty: "hard",
    expectedDuration: "4-5 min",
    sampleAnswer: {
      mainPoints: [
        "Data structure design",
        "Time complexity analysis",
        "Implementation details",
        "Edge cases handling"
      ],
      structure: {
        introduction: "An LRU Cache can be implemented using a combination of a HashMap and a Doubly Linked List to achieve O(1) operations.",
        body: [
          "HashMap stores key to node mapping for quick access",
          "Doubly Linked List maintains access order",
          "Move accessed items to front of list",
          "Remove least recently used item when full"
        ],
        conclusion: "This implementation provides efficient O(1) get and put operations while maintaining the LRU property."
      },
      tips: [
        "Explain data structure choices",
        "Discuss time complexity",
        "Cover edge cases",
        "Provide example usage"
      ],
      commonMistakes: [
        "Missing edge cases",
        "Wrong time complexity",
        "Forgetting capacity check",
        "Incorrect node removal"
      ],
      keywords: [
        "HashMap",
        "Doubly Linked List",
        "Time Complexity",
        "Cache",
        "Data Structure"
      ]
    }
  },
  {
    id: 2,
    category: "DSA",
    text: "Compare different sorting algorithms and their use cases",
    difficulty: "medium",
    expectedDuration: "4-5 min",
    sampleAnswer: {
      mainPoints: [
        "Common sorting algorithms",
        "Time/space complexity",
        "Best use cases",
        "Implementation trade-offs"
      ],
      structure: {
        introduction: "Different sorting algorithms have varying performance characteristics and are suited for different scenarios.",
        body: [
          "QuickSort: Average O(nlogn), good for large datasets",
          "MergeSort: Stable O(nlogn), uses extra space",
          "HeapSort: O(nlogn), in-place but not stable",
          "Insertion Sort: O(n²) but good for small/nearly sorted"
        ],
        conclusion: "Choosing the right sorting algorithm depends on factors like data size, stability requirements, and memory constraints."
      },
      tips: [
        "Compare complexities",
        "Discuss stability",
        "Mention practical cases",
        "Consider memory usage"
      ],
      commonMistakes: [
        "Wrong complexity analysis",
        "Ignoring space complexity",
        "Missing stability discussion",
        "Forgetting edge cases"
      ],
      keywords: [
        "Sorting",
        "Time Complexity",
        "Space Complexity",
        "Algorithm",
        "Optimization"
      ]
    }
  }
];
