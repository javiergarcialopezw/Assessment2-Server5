function fibonacci(n: number): number  {
  if (n <= 1) {
    return n;
  }
  return fibonacci(n - 1) + fibonacci(n - 2);
}

describe('High CPU Load Test', () => {

  it('should be a positive integer', () => {
    const result = fibonacci(40); // Replace with your actual result
    expect(Number.isInteger(result) && result > 0).toBe(true);
  });

  it('should perform a CPU-intensive task', () => {
    const startTime = Date.now();
    const result = fibonacci(40); // Adjust the Fibonacci number to increase CPU load.
    const compareFibonacci = fibonacci(40);
    const endTime = Date.now();
    
    // Ensure that the task takes a significant amount of time (adjust as needed).
    expect(result).toBe(compareFibonacci);
    expect(endTime - startTime).toBeGreaterThan(5000); // This will pass if the task takes more than 5 seconds.
  });
});