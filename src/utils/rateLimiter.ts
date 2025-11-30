interface RateLimiter {
  (): Promise<void>;
  reset: () => void;
}

export function createRateLimiter(requestsPerMinute: number): RateLimiter {
  const requests: number[] = [];
  
  const limiter = async function() {
    const now = Date.now();
    const oneMinuteAgo = now - 60000; // 60 seconds
    
    // Remove timestamps older than 1 minute
    while (requests.length > 0 && requests[0] < oneMinuteAgo) {
      requests.shift();
    }
    
    // If we've hit the rate limit, calculate delay
    if (requests.length >= requestsPerMinute) {
      const oldestRequest = requests[0];
      const timeToWait = oneMinuteAgo - oldestRequest + 1000; // Add 1s buffer
      if (timeToWait > 0) {
        await new Promise(resolve => setTimeout(resolve, timeToWait));
      }
    }
    
    // Add current timestamp
    requests.push(Date.now());
  };
  
  limiter.reset = () => {
    requests.length = 0;
  };
  
  return limiter;
}

// Default rate limiter (adjust based on your API limits)
export const geminiRateLimiter = createRateLimiter(15); // 15 requests per minute
