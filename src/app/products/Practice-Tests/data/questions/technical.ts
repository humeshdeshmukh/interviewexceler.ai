import { Test } from '../../utils/types';

export const technicalQuestions: Test[] = {
  algorithms: {
    beginner: [
      {
        text: 'What is the time complexity of finding an element in a balanced Binary Search Tree?',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
        correctAnswer: 'O(log n)',
        explanation: 'In a balanced BST, each comparison eliminates half of the remaining nodes, leading to logarithmic time complexity.'
      },
      {
        text: 'Which sorting algorithm has the worst-case time complexity of O(n²)?',
        options: ['Merge Sort', 'Quick Sort', 'Bubble Sort', 'Heap Sort'],
        correctAnswer: 'Bubble Sort',
        explanation: 'Bubble Sort uses nested loops to compare and swap adjacent elements, resulting in quadratic time complexity.'
      },
      {
        text: 'What data structure would you use to implement a First-In-First-Out (FIFO) collection?',
        options: ['Stack', 'Queue', 'Hash Table', 'Binary Tree'],
        correctAnswer: 'Queue',
        explanation: 'A Queue is specifically designed for FIFO operations, where elements are removed in the same order they were added.'
      },
      {
        text: 'What is the primary advantage of using a hash table?',
        options: [
          'Ordered data storage',
          'O(1) average case lookup',
          'Memory efficiency',
          'Sequential access'
        ],
        correctAnswer: 'O(1) average case lookup',
        explanation: 'Hash tables provide constant-time average case complexity for insertions, deletions, and lookups.'
      },
      {
        text: 'Which traversal method would visit nodes in ascending order in a Binary Search Tree?',
        options: [
          'Preorder traversal',
          'Inorder traversal',
          'Postorder traversal',
          'Level-order traversal'
        ],
        correctAnswer: 'Inorder traversal',
        explanation: 'Inorder traversal of a BST visits nodes in ascending order by visiting left subtree, root, then right subtree.'
      },
      {
        text: 'What is the space complexity of an array-based implementation of a stack?',
        options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
        correctAnswer: 'O(n)',
        explanation: 'A stack implemented using an array requires space proportional to the number of elements stored.'
      },
      {
        text: 'Which search algorithm requires the input array to be sorted?',
        options: [
          'Linear Search',
          'Binary Search',
          'Depth-First Search',
          'Breadth-First Search'
        ],
        correctAnswer: 'Binary Search',
        explanation: 'Binary Search relies on the array being sorted to eliminate half of the remaining elements in each step.'
      },
      {
        text: 'What is the time complexity of accessing an element by index in a linked list?',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
        correctAnswer: 'O(n)',
        explanation: 'In a linked list, accessing an element requires traversing from the head node until the desired index is reached.'
      },
      {
        text: 'Which data structure is most efficient for implementing an undo/redo feature?',
        options: ['Queue', 'Stack', 'Hash Table', 'Binary Tree'],
        correctAnswer: 'Stack',
        explanation: 'A Stack with its Last-In-First-Out (LIFO) nature is perfect for tracking operations that need to be undone in reverse order.'
      },
      {
        text: 'What is the primary disadvantage of using recursion compared to iteration?',
        options: [
          'Code readability',
          'Stack overflow risk',
          'Time complexity',
          'Code maintainability'
        ],
        correctAnswer: 'Stack overflow risk',
        explanation: 'Recursive solutions can lead to stack overflow for large inputs due to the overhead of maintaining the call stack.'
      }
    ],
    intermediate: [
      {
        text: 'What is the time complexity of the Floyd-Warshall algorithm for finding all-pairs shortest paths?',
        options: ['O(V²)', 'O(V³)', 'O(V × E)', 'O(V × log V)'],
        correctAnswer: 'O(V³)',
        explanation: 'Floyd-Warshall uses three nested loops over all vertices to find shortest paths between all pairs.'
      },
      {
        text: 'Which data structure would be most efficient for implementing a Least Recently Used (LRU) cache?',
        options: [
          'Array',
          'Hash Map with Doubly Linked List',
          'Binary Search Tree',
          'Queue'
        ],
        correctAnswer: 'Hash Map with Doubly Linked List',
        explanation: 'This combination provides O(1) access time via hash map and O(1) update time via doubly linked list.'
      },
      {
        text: 'What is the space complexity of the Dijkstra algorithm using a binary heap?',
        options: ['O(V)', 'O(V + E)', 'O(V²)', 'O(E log V)'],
        correctAnswer: 'O(V + E)',
        explanation: 'The algorithm needs space for the distance array O(V) and the binary heap O(E).'
      },
      {
        text: 'Which algorithm would you use to find strongly connected components in a directed graph?',
        options: [
          'Breadth-First Search',
          'Kosaraju Algorithm',
          'Prim Algorithm',
          'Bellman-Ford'
        ],
        correctAnswer: 'Kosaraju Algorithm',
        explanation: 'Kosaraju Algorithm efficiently finds strongly connected components using two DFS passes.'
      },
      {
        text: 'What is the time complexity of building a heap from an array of n elements?',
        options: ['O(n)', 'O(n log n)', 'O(log n)', 'O(n²)'],
        correctAnswer: 'O(n)',
        explanation: 'While inserting one element takes O(log n), building a heap from bottom-up takes linear time.'
      },
      {
        text: 'Which data structure would you use to efficiently find the k-th largest element in a stream?',
        options: [
          'Array',
          'Min Heap of size k',
          'Max Heap',
          'Binary Search Tree'
        ],
        correctAnswer: 'Min Heap of size k',
        explanation: 'A min heap of size k maintains the k largest elements with the k-th largest at the root.'
      },
      {
        text: 'What is the time complexity of the Union-Find data structure with path compression and union by rank?',
        options: [
          'O(1)',
          'O(log n)',
          'O(α(n))',
          'O(n)'
        ],
        correctAnswer: 'O(α(n))',
        explanation: 'With both optimizations, operations take amortized inverse Ackermann time, which is effectively constant.'
      },
      {
        text: 'Which algorithm would you use for topological sorting of a directed acyclic graph?',
        options: [
          'Depth-First Search',
          'Breadth-First Search',
          'Dijkstra Algorithm',
          'Floyd-Warshall'
        ],
        correctAnswer: 'Depth-First Search',
        explanation: 'DFS can be modified to perform topological sorting by adding vertices to the result in postorder.'
      },
      {
        text: 'What is the space complexity of the quicksort algorithm?',
        options: [
          'O(1)',
          'O(log n)',
          'O(n)',
          'O(n log n)'
        ],
        correctAnswer: 'O(log n)',
        explanation: 'Quicksort requires logarithmic space for the recursive call stack in the average case.'
      },
      {
        text: 'Which data structure would you use to implement a trie (prefix tree)?',
        options: [
          'Array of linked lists',
          'Hash map of arrays',
          'Array of node pointers',
          'Hash map of node pointers'
        ],
        correctAnswer: 'Hash map of node pointers',
        explanation: 'Using a hash map at each node provides efficient child lookup while saving space for sparse character sets.'
      }
    ],
    advanced: [
      {
        text: 'What is the time complexity of finding the maximum flow in a network using the Ford-Fulkerson algorithm with capacity C?',
        options: [
          'O(VE)',
          'O(E × C)',
          'O(V²E)',
          'O(VE²)'
        ],
        correctAnswer: 'O(E × C)',
        explanation: 'Ford-Fulkerson runtime depends on the maximum flow value (C) and the number of edges.'
      },
      {
        text: 'Which technique would you use to maintain dynamic connectivity in a graph with O(log n) operations?',
        options: [
          'Union-Find',
          'Link-Cut Trees',
          'Euler Tour Trees',
          'Both B and C'
        ],
        correctAnswer: 'Both B and C',
        explanation: 'Both Link-Cut Trees and Euler Tour Trees can maintain dynamic connectivity with logarithmic operations.'
      },
      {
        text: 'What is the space complexity of the Aho-Corasick algorithm for pattern matching?',
        options: [
          'O(m)',
          'O(m × Σ)',
          'O(n)',
          'O(n + m)'
        ],
        correctAnswer: 'O(m × Σ)',
        explanation: 'The automaton requires space proportional to the pattern length (m) and alphabet size (Σ).'
      },
      {
        text: 'What is the time complexity of computing the Lowest Common Ancestor (LCA) using the Tarjan offline algorithm?',
        options: [
          'O(n)',
          'O(n + q)',
          'O(n log n)',
          'O(q log n)'
        ],
        correctAnswer: 'O(n + q)',
        explanation: 'Tarjan offline algorithm processes all queries in O(n + q) time using Union-Find.'
      },
      {
        text: 'Which algorithm would you use for finding the maximum matching in a bipartite graph?',
        options: [
          'Hopcroft-Karp',
          'Ford-Fulkerson',
          'Hungarian algorithm',
          'Any of the above'
        ],
        correctAnswer: 'Any of the above',
        explanation: 'All these algorithms can find maximum matching in bipartite graphs, though with different complexities.'
      },
      {
        text: 'What is the space complexity of storing all shortest paths in a dense graph using Johnson algorithm?',
        options: [
          'O(V)',
          'O(E)',
          'O(V²)',
          'O(VE)'
        ],
        correctAnswer: 'O(V²)',
        explanation: 'Storing all pairs shortest paths requires quadratic space regardless of the algorithm used.'
      },
      {
        text: 'Which technique would you use to implement a persistent binary search tree?',
        options: [
          'Path copying',
          'Fat nodes',
          'Both A and B',
          'Regular BST with timestamps'
        ],
        correctAnswer: 'Both A and B',
        explanation: 'Both path copying and fat nodes are valid techniques for implementing persistent data structures.'
      },
      {
        text: 'What is the time complexity of finding bridges in an undirected graph?',
        options: [
          'O(V)',
          'O(E)',
          'O(V + E)',
          'O(V × E)'
        ],
        correctAnswer: 'O(V + E)',
        explanation: 'Using DFS with low values, bridges can be found in linear time relative to vertices and edges.'
      },
      {
        text: 'Which data structure would you use for implementing a suffix array with efficient pattern matching?',
        options: [
          'Suffix Tree',
          'Suffix Array with LCP Array',
          'KMP Automaton',
          'Trie'
        ],
        correctAnswer: 'Suffix Array with LCP Array',
        explanation: 'Suffix Array with LCP Array provides space-efficient pattern matching while maintaining good time complexity.'
      }
    ]
  }
};
