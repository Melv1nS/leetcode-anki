import type { Problem } from "@/app/types/problems";

interface CategoryData {
  name: string;
  problems: Problem[];
}

export const BLIND75_CATEGORIES: CategoryData[] = [
  {
    name: "Arrays & Hashing",
    problems: [
      {
        id: "1",
        title: "Two Sum",
        url: "https://leetcode.com/problems/two-sum/",
        difficulty: "Easy",
        isCompleted: false,
        category: "Arrays & Hashing",
      },
      {
        id: "217",
        title: "Contains Duplicate",
        difficulty: "Easy",
        category: "Arrays & Hashing",
        isCompleted: false,
        url: "https://leetcode.com/problems/contains-duplicate/",
      },
      {
        id: "242",
        title: "Valid Anagram",
        difficulty: "Easy",
        category: "Arrays & Hashing",
        isCompleted: false,
        url: "https://leetcode.com/problems/valid-anagram/",
      },
      {
        id: "49",
        title: "Group Anagrams",
        difficulty: "Medium",
        category: "Arrays & Hashing",
        isCompleted: false,
        url: "https://leetcode.com/problems/group-anagrams/",
      },
      {
        id: "347",
        title: "Top K Frequent Elements",
        difficulty: "Medium",
        category: "Arrays & Hashing",
        isCompleted: false,
        url: "https://leetcode.com/problems/top-k-frequent-elements/",
      },
      {
        id: "238",
        title: "Product of Array Except Self",
        difficulty: "Medium",
        category: "Arrays & Hashing",
        isCompleted: false,
        url: "https://leetcode.com/problems/product-of-array-except-self/",
      },
    ],
  },
  {
    name: "Two Pointers",
    problems: [
      {
        id: "125",
        title: "Valid Palindrome",
        difficulty: "Easy",
        category: "Two Pointers",
        isCompleted: false,
        url: "https://leetcode.com/problems/valid-palindrome/",
      },
      {
        id: "15",
        title: "3Sum",
        difficulty: "Medium",
        category: "Two Pointers",
        isCompleted: false,
        url: "https://leetcode.com/problems/3sum/",
      },
      {
        id: "11",
        title: "Container With Most Water",
        difficulty: "Medium",
        category: "Two Pointers",
        isCompleted: false,
        url: "https://leetcode.com/problems/container-with-most-water/",
      },
    ],
  },
  {
    name: "Sliding Window",
    problems: [
      {
        id: "121",
        title: "Best Time to Buy and Sell Stock",
        difficulty: "Easy",
        category: "Sliding Window",
        isCompleted: false,
        url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
      },
      {
        id: "3",
        title: "Longest Substring Without Repeating Characters",
        difficulty: "Medium",
        category: "Sliding Window",
        isCompleted: false,
        url: "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
      },
      {
        id: "424",
        title: "Longest Repeating Character Replacement",
        difficulty: "Medium",
        category: "Sliding Window",
        isCompleted: false,
        url: "https://leetcode.com/problems/longest-repeating-character-replacement/",
      },
    ],
  },
  {
    name: "Stack",
    problems: [
      {
        id: "20",
        title: "Valid Parentheses",
        difficulty: "Easy",
        category: "Stack",
        isCompleted: false,
        url: "https://leetcode.com/problems/valid-parentheses/",
      },
    ],
  },
  {
    name: "Binary Search",
    problems: [
      {
        id: "704",
        title: "Binary Search",
        difficulty: "Easy",
        category: "Binary Search",
        isCompleted: false,
        url: "https://leetcode.com/problems/binary-search/",
      },
      {
        id: "33",
        title: "Search in Rotated Sorted Array",
        difficulty: "Medium",
        category: "Binary Search",
        isCompleted: false,
        url: "https://leetcode.com/problems/search-in-rotated-sorted-array/",
      },
      {
        id: "153",
        title: "Find Minimum in Rotated Sorted Array",
        difficulty: "Medium",
        category: "Binary Search",
        isCompleted: false,
        url: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/",
      },
    ],
  },
  {
    name: "Trees",
    problems: [
      {
        id: "226",
        title: "Invert Binary Tree",
        difficulty: "Easy",
        category: "Trees",
        isCompleted: false,
        url: "https://leetcode.com/problems/invert-binary-tree/",
      },
      {
        id: "104",
        title: "Maximum Depth of Binary Tree",
        difficulty: "Easy",
        category: "Trees",
        isCompleted: false,
        url: "https://leetcode.com/problems/maximum-depth-of-binary-tree/",
      },
      {
        id: "100",
        title: "Same Tree",
        difficulty: "Easy",
        category: "Trees",
        isCompleted: false,
        url: "https://leetcode.com/problems/same-tree/",
      },
      {
        id: "102",
        title: "Binary Tree Level Order Traversal",
        difficulty: "Medium",
        category: "Trees",
        isCompleted: false,
        url: "https://leetcode.com/problems/binary-tree-level-order-traversal/",
      },
    ],
  },
  // ... Adding more categories and problems would make this response too long
];
