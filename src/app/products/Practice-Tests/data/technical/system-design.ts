import { Test } from '../../utils/types';

export const systemDesignTests: Test[] = [
  {
    id: 'sys-beginner',
    title: 'System Design Beginner Test',
    description: 'A comprehensive beginner level test covering system design fundamentals.',
    difficulty: 'beginner',
    timeLimit: 30,
    totalQuestions: 10,
    category: 'technical',
    subcategory: 'system-design',
    questions: [
      {
        text: 'What is the primary purpose of using a load balancer?',
        options: [
          'To distribute traffic across multiple servers',
          'To store data in the database',
          'To cache database queries',
          'To encrypt network traffic'
        ],
        correctAnswer: 'To distribute traffic across multiple servers',
        explanation: 'Load balancers distribute incoming network traffic across multiple servers to ensure no single server bears too much load.'
      },
      {
        text: 'Which type of database would be best suited for storing user session data?',
        options: [
          'SQL Database',
          'In-memory Database (like Redis)',
          'Document Database',
          'Graph Database'
        ],
        correctAnswer: 'In-memory Database (like Redis)',
        explanation: 'In-memory databases are ideal for session storage due to their fast access times and built-in TTL support.'
      },
      {
        text: 'What is the main purpose of a Content Delivery Network (CDN)?',
        options: [
          'To store application data',
          'To process user requests',
          'To deliver content from locations closer to users',
          'To manage database connections'
        ],
        correctAnswer: 'To deliver content from locations closer to users',
        explanation: 'CDNs cache content at edge locations worldwide to reduce latency by serving content from locations physically closer to users.'
      },
      {
        text: 'What is the difference between horizontal and vertical scaling?',
        options: [
          'Horizontal adds more machines, vertical adds more power',
          'Horizontal adds more storage, vertical adds more memory',
          'Horizontal adds more networks, vertical adds more CPU',
          'Horizontal adds more software, vertical adds more hardware'
        ],
        correctAnswer: 'Horizontal adds more machines, vertical adds more power',
        explanation: 'Horizontal scaling adds more machines to your pool of resources, while vertical scaling adds more power to existing machines.'
      },
      {
        text: 'What is the purpose of a message queue in a distributed system?',
        options: [
          'To store application logs',
          'To handle asynchronous processing',
          'To cache database queries',
          'To manage user sessions'
        ],
        correctAnswer: 'To handle asynchronous processing',
        explanation: 'Message queues enable asynchronous communication between components, helping decouple services and handle tasks that do not need immediate processing.'
      },
      {
        text: 'Which of these is NOT a benefit of microservices architecture?',
        options: [
          'Independent deployment',
          'Technology flexibility',
          'Simplified data management',
          'Team autonomy'
        ],
        correctAnswer: 'Simplified data management',
        explanation: 'Microservices actually make data management more complex due to distributed data ownership and consistency requirements.'
      },
      {
        text: 'What is the CAP theorem in distributed systems?',
        options: [
          'Choose Any Protocol',
          'Consistency, Availability, Partition tolerance',
          'Cache And Persist',
          'Compute And Process'
        ],
        correctAnswer: 'Consistency, Availability, Partition tolerance',
        explanation: 'CAP theorem states that a distributed system can only provide two of three guarantees: Consistency, Availability, and Partition tolerance.'
      },
      {
        text: 'What is the primary purpose of a reverse proxy?',
        options: [
          'To protect client identity',
          'To protect server identity and provide additional features',
          'To balance database load',
          'To store static files'
        ],
        correctAnswer: 'To protect server identity and provide additional features',
        explanation: 'Reverse proxies hide server details from clients and can provide additional features like caching, SSL termination, and load balancing.'
      },
      {
        text: 'Which storage type is best for handling large file uploads?',
        options: [
          'SQL Database',
          'Object Storage (like S3)',
          'In-memory Cache',
          'Message Queue'
        ],
        correctAnswer: 'Object Storage (like S3)',
        explanation: 'Object storage systems are designed for storing and serving large files efficiently, with high durability and scalability.'
      },
      {
        text: 'What is the main purpose of database indexing?',
        options: [
          'To backup data',
          'To speed up queries',
          'To validate data',
          'To compress data'
        ],
        correctAnswer: 'To speed up queries',
        explanation: 'Indexes improve query performance by providing quick access paths to data, similar to how a book index helps find content quickly.'
      }
    ]
  },
  {
    id: 'sys-intermediate',
    title: 'System Design Intermediate Test',
    description: 'A comprehensive intermediate level test covering system design patterns and practices.',
    difficulty: 'intermediate',
    timeLimit: 45,
    totalQuestions: 10,
    category: 'technical',
    subcategory: 'system-design',
    questions: [
      {
        text: 'How would you design a rate limiting system?',
        options: [
          'Using a simple counter',
          'Using Token Bucket algorithm',
          'Using database locks',
          'Using load balancer configuration'
        ],
        correctAnswer: 'Using Token Bucket algorithm',
        explanation: 'Token Bucket algorithm provides flexible rate limiting with burst allowance and is widely used in production systems.'
      },
      {
        text: 'What pattern would you use to handle system failures in microservices?',
        options: [
          'Circuit Breaker',
          'Retry with exponential backoff',
          'Fallback responses',
          'All of the above'
        ],
        correctAnswer: 'All of the above',
        explanation: 'A robust system uses multiple patterns: Circuit Breaker prevents cascade failures, retries handle temporary issues, and fallbacks provide degraded functionality.'
      },
      {
        text: 'How would you design a distributed caching system?',
        options: [
          'Single Redis instance',
          'Redis cluster with sharding',
          'Local caching only',
          'Database caching'
        ],
        correctAnswer: 'Redis cluster with sharding',
        explanation: 'A Redis cluster with sharding provides high availability, scalability, and fault tolerance for distributed caching needs.'
      },
      {
        text: 'What is the best approach for handling eventual consistency in microservices?',
        options: [
          'Using synchronous calls',
          'Event-driven architecture with compensation',
          'Avoiding distributed transactions',
          'Using two-phase commit'
        ],
        correctAnswer: 'Event-driven architecture with compensation',
        explanation: 'Event-driven architecture with compensation transactions handles eventual consistency while maintaining system reliability.'
      },
      {
        text: 'How would you implement data partitioning in a large-scale system?',
        options: [
          'Vertical partitioning',
          'Hash-based sharding',
          'Range-based sharding',
          'All of the above'
        ],
        correctAnswer: 'All of the above',
        explanation: 'Different partitioning strategies can be combined based on data access patterns and scalability requirements.'
      },
      {
        text: 'What is the best strategy for database backup in a high-traffic system?',
        options: [
          'Daily full backups',
          'Continuous replication with point-in-time recovery',
          'Weekly backups',
          'In-memory snapshots'
        ],
        correctAnswer: 'Continuous replication with point-in-time recovery',
        explanation: 'Continuous replication with point-in-time recovery provides minimal data loss and quick recovery capabilities.'
      },
      {
        text: 'How would you handle hot partitions in a distributed database?',
        options: [
          'Increase partition size',
          'Split hot partitions and rebalance',
          'Ignore the problem',
          'Add more indexes'
        ],
        correctAnswer: 'Split hot partitions and rebalance',
        explanation: 'Splitting hot partitions and rebalancing helps distribute load evenly across the system.'
      },
      {
        text: 'What is the best approach for service discovery in microservices?',
        options: [
          'Hard-coded endpoints',
          'DNS-based discovery',
          'Service mesh with dynamic registry',
          'Load balancer configuration'
        ],
        correctAnswer: 'Service mesh with dynamic registry',
        explanation: 'Service mesh provides advanced service discovery, load balancing, and traffic management capabilities.'
      },
      {
        text: 'How would you implement authentication in a microservices architecture?',
        options: [
          'Individual service authentication',
          'API Gateway with JWT',
          'OAuth2 with identity service',
          'Basic authentication'
        ],
        correctAnswer: 'OAuth2 with identity service',
        explanation: 'OAuth2 with a dedicated identity service provides secure, scalable authentication across microservices.'
      },
      {
        text: 'What is the best strategy for handling distributed transactions?',
        options: [
          'Two-phase commit',
          'Saga pattern',
          'Single database',
          'Avoid transactions'
        ],
        correctAnswer: 'Saga pattern',
        explanation: 'Saga pattern handles distributed transactions through a series of local transactions with compensating actions.'
      }
    ]
  }
];
