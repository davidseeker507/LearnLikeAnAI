// Pattern: Category A = numbers where (first digit × last digit) % 3 === 0
// This is much less obvious!

const data = [
    { value: "24", label: "A" },      // 2×4=8, 8%3=2 → B (wait, let me recalculate)
    // Actually: 2×4=8, 8%3=2, so should be B if pattern is %3===0
    
    // Let me suggest a cleaner pattern:
    // Category A = numbers where the product of first and last digit ends in 0, 2, 4, 6, or 8
    // Category B = numbers where the product ends in 1, 3, 5, 7, or 9
    
    // Or simplest: Category A = sum of digits is even, Category B = sum is odd
    { value: "24", label: "A" },      // 2+4=6 (even) → A
    { value: "37", label: "B" },      // 3+7=10 (even) → A (wrong!)
    { value: "15", label: "B" },      // 1+5=6 (even) → A (wrong!)
    
    // Actually the cleanest: Category A = first digit is even, Category B = first digit is odd
    { value: "24", label: "A" },      // first digit 2 (even) → A
    { value: "37", label: "B" },      // first digit 3 (odd) → B
    { value: "15", label: "B" },      // first digit 1 (odd) → B
    { value: "28", label: "A" },      // first digit 2 (even) → A
];

