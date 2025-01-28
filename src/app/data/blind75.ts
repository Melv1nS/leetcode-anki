import type { Problem } from "@/app/types/problems";

interface CategoryData {
  name: string;
  problems: Problem[];
}

export const BLIND75_CATEGORIES: CategoryData[] = [
  {
    name: "Array",
    problems: [
      {
        id: "two-sum",
        title: "Two Sum",
        url: "https://leetcode.com/problems/two-sum/",
        difficulty: "Easy",
      },
      {
        id: "best-time-to-buy-and-sell-stock",
        title: "Best Time to Buy and Sell Stock",
        url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
        difficulty: "Easy",
      },
      {
        id: "contains-duplicate",
        title: "Contains Duplicate",
        url: "https://leetcode.com/problems/contains-duplicate/",
        difficulty: "Easy",
      },
      {
        id: "product-of-array-except-self",
        title: "Product of Array Except Self",
        url: "https://leetcode.com/problems/product-of-array-except-self/",
        difficulty: "Medium",
      },
      {
        id: "maximum-subarray",
        title: "Maximum Subarray",
        url: "https://leetcode.com/problems/maximum-subarray/",
        difficulty: "Medium",
      },
      {
        id: "maximum-product-subarray",
        title: "Maximum Product Subarray",
        url: "https://leetcode.com/problems/maximum-product-subarray/",
        difficulty: "Medium",
      },
      {
        id: "find-minimum-in-rotated-sorted-array",
        title: "Find Minimum in Rotated Sorted Array",
        url: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/",
        difficulty: "Medium",
      },
      {
        id: "search-in-rotated-sorted-array",
        title: "Search in Rotated Sorted Array",
        url: "https://leetcode.com/problems/search-in-rotated-sorted-array/",
        difficulty: "Medium",
      },
      {
        id: "3sum",
        title: "3Sum",
        url: "https://leetcode.com/problems/3sum/",
        difficulty: "Medium",
      },
      {
        id: "container-with-most-water",
        title: "Container With Most Water",
        url: "https://leetcode.com/problems/container-with-most-water/",
        difficulty: "Medium",
      },
    ],
  },
  {
    name: "Binary",
    problems: [
      {
        id: "sum-of-two-integers",
        title: "Sum of Two Integers",
        url: "https://leetcode.com/problems/sum-of-two-integers/",
        difficulty: "Medium",
      },
      {
        id: "number-of-1-bits",
        title: "Number of 1 Bits",
        url: "https://leetcode.com/problems/number-of-1-bits/",
        difficulty: "Easy",
      },
      {
        id: "counting-bits",
        title: "Counting Bits",
        url: "https://leetcode.com/problems/counting-bits/",
        difficulty: "Easy",
      },
      {
        id: "missing-number",
        title: "Missing Number",
        url: "https://leetcode.com/problems/missing-number/",
        difficulty: "Easy",
      },
      {
        id: "reverse-bits",
        title: "Reverse Bits",
        url: "https://leetcode.com/problems/reverse-bits/",
        difficulty: "Easy",
      },
    ],
  },
  {
    name: "Dynamic Programming",
    problems: [
      {
        id: "climbing-stairs",
        title: "Climbing Stairs",
        url: "https://leetcode.com/problems/climbing-stairs/",
        difficulty: "Easy",
      },
      {
        id: "coin-change",
        title: "Coin Change",
        url: "https://leetcode.com/problems/coin-change/",
        difficulty: "Medium",
      },
      {
        id: "longest-increasing-subsequence",
        title: "Longest Increasing Subsequence",
        url: "https://leetcode.com/problems/longest-increasing-subsequence/",
        difficulty: "Medium",
      },
      {
        id: "longest-common-subsequence",
        title: "Longest Common Subsequence",
        url: "https://leetcode.com/problems/longest-common-subsequence/",
        difficulty: "Medium",
      },
      {
        id: "word-break",
        title: "Word Break",
        url: "https://leetcode.com/problems/word-break/",
        difficulty: "Medium",
      },
      {
        id: "combination-sum",
        title: "Combination Sum",
        url: "https://leetcode.com/problems/combination-sum/",
        difficulty: "Medium",
      },
      {
        id: "house-robber",
        title: "House Robber",
        url: "https://leetcode.com/problems/house-robber/",
        difficulty: "Medium",
      },
      {
        id: "house-robber-ii",
        title: "House Robber II",
        url: "https://leetcode.com/problems/house-robber-ii/",
        difficulty: "Medium",
      },
      {
        id: "decode-ways",
        title: "Decode Ways",
        url: "https://leetcode.com/problems/decode-ways/",
        difficulty: "Medium",
      },
      {
        id: "unique-paths",
        title: "Unique Paths",
        url: "https://leetcode.com/problems/unique-paths/",
        difficulty: "Medium",
      },
      {
        id: "jump-game",
        title: "Jump Game",
        url: "https://leetcode.com/problems/jump-game/",
        difficulty: "Medium",
      },
    ],
  },
  {
    name: "Graph",
    problems: [
      {
        id: "clone-graph",
        title: "Clone Graph",
        url: "https://leetcode.com/problems/clone-graph/",
        difficulty: "Medium",
      },
      {
        id: "course-schedule",
        title: "Course Schedule",
        url: "https://leetcode.com/problems/course-schedule/",
        difficulty: "Medium",
      },
      {
        id: "pacific-atlantic-water-flow",
        title: "Pacific Atlantic Water Flow",
        url: "https://leetcode.com/problems/pacific-atlantic-water-flow/",
        difficulty: "Medium",
      },
      {
        id: "number-of-islands",
        title: "Number of Islands",
        url: "https://leetcode.com/problems/number-of-islands/",
        difficulty: "Medium",
      },
      {
        id: "longest-consecutive-sequence",
        title: "Longest Consecutive Sequence",
        url: "https://leetcode.com/problems/longest-consecutive-sequence/",
        difficulty: "Medium",
      },
      {
        id: "alien-dictionary",
        title: "Alien Dictionary",
        url: "https://leetcode.com/problems/alien-dictionary/",
        difficulty: "Hard",
      },
      {
        id: "graph-valid-tree",
        title: "Graph Valid Tree",
        url: "https://leetcode.com/problems/graph-valid-tree/",
        difficulty: "Medium",
      },
      {
        id: "number-of-connected-components-in-an-undirected-graph",
        title: "Number of Connected Components in an Undirected Graph",
        url: "https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/",
        difficulty: "Medium",
      },
    ],
  },
  {
    name: "Interval",
    problems: [
      {
        id: "insert-interval",
        title: "Insert Interval",
        url: "https://leetcode.com/problems/insert-interval/",
        difficulty: "Medium",
      },
      {
        id: "merge-intervals",
        title: "Merge Intervals",
        url: "https://leetcode.com/problems/merge-intervals/",
        difficulty: "Medium",
      },
      {
        id: "non-overlapping-intervals",
        title: "Non-overlapping Intervals",
        url: "https://leetcode.com/problems/non-overlapping-intervals/",
        difficulty: "Medium",
      },
      {
        id: "meeting-rooms",
        title: "Meeting Rooms",
        url: "https://leetcode.com/problems/meeting-rooms/",
        difficulty: "Easy",
      },
      {
        id: "meeting-rooms-ii",
        title: "Meeting Rooms II",
        url: "https://leetcode.com/problems/meeting-rooms-ii/",
        difficulty: "Medium",
      },
    ],
  },
  {
    name: "Linked List",
    problems: [
      {
        id: "reverse-linked-list",
        title: "Reverse Linked List",
        url: "https://leetcode.com/problems/reverse-linked-list/",
        difficulty: "Easy",
      },
      {
        id: "linked-list-cycle",
        title: "Linked List Cycle",
        url: "https://leetcode.com/problems/linked-list-cycle/",
        difficulty: "Easy",
      },
      {
        id: "merge-two-sorted-lists",
        title: "Merge Two Sorted Lists",
        url: "https://leetcode.com/problems/merge-two-sorted-lists/",
        difficulty: "Easy",
      },
      {
        id: "merge-k-sorted-lists",
        title: "Merge K Sorted Lists",
        url: "https://leetcode.com/problems/merge-k-sorted-lists/",
        difficulty: "Hard",
      },
      {
        id: "remove-nth-node-from-end-of-list",
        title: "Remove Nth Node From End of List",
        url: "https://leetcode.com/problems/remove-nth-node-from-end-of-list/",
        difficulty: "Medium",
      },
      {
        id: "reorder-list",
        title: "Reorder List",
        url: "https://leetcode.com/problems/reorder-list/",
        difficulty: "Medium",
      },
    ],
  },
  {
    name: "Matrix",
    problems: [
      {
        id: "set-matrix-zeroes",
        title: "Set Matrix Zeroes",
        url: "https://leetcode.com/problems/set-matrix-zeroes/",
        difficulty: "Medium",
      },
      {
        id: "spiral-matrix",
        title: "Spiral Matrix",
        url: "https://leetcode.com/problems/spiral-matrix/",
        difficulty: "Medium",
      },
      {
        id: "rotate-image",
        title: "Rotate Image",
        url: "https://leetcode.com/problems/rotate-image/",
        difficulty: "Medium",
      },
      {
        id: "word-search",
        title: "Word Search",
        url: "https://leetcode.com/problems/word-search/",
        difficulty: "Medium",
      },
    ],
  },
  {
    name: "String",
    problems: [
      {
        id: "longest-substring-without-repeating-characters",
        title: "Longest Substring Without Repeating Characters",
        url: "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
        difficulty: "Medium",
      },
      {
        id: "longest-repeating-character-replacement",
        title: "Longest Repeating Character Replacement",
        url: "https://leetcode.com/problems/longest-repeating-character-replacement/",
        difficulty: "Medium",
      },
      {
        id: "minimum-window-substring",
        title: "Minimum Window Substring",
        url: "https://leetcode.com/problems/minimum-window-substring/",
        difficulty: "Hard",
      },
      {
        id: "valid-anagram",
        title: "Valid Anagram",
        url: "https://leetcode.com/problems/valid-anagram/",
        difficulty: "Easy",
      },
      {
        id: "group-anagrams",
        title: "Group Anagrams",
        url: "https://leetcode.com/problems/group-anagrams/",
        difficulty: "Medium",
      },
      {
        id: "valid-parentheses",
        title: "Valid Parentheses",
        url: "https://leetcode.com/problems/valid-parentheses/",
        difficulty: "Easy",
      },
      {
        id: "valid-palindrome",
        title: "Valid Palindrome",
        url: "https://leetcode.com/problems/valid-palindrome/",
        difficulty: "Easy",
      },
      {
        id: "longest-palindromic-substring",
        title: "Longest Palindromic Substring",
        url: "https://leetcode.com/problems/longest-palindromic-substring/",
        difficulty: "Medium",
      },
      {
        id: "palindromic-substrings",
        title: "Palindromic Substrings",
        url: "https://leetcode.com/problems/palindromic-substrings/",
        difficulty: "Medium",
      },
      {
        id: "encode-and-decode-strings",
        title: "Encode and Decode Strings",
        url: "https://leetcode.com/problems/encode-and-decode-strings/",
        difficulty: "Medium",
      },
    ],
  },
  {
    name: "Tree",
    problems: [
      {
        id: "maximum-depth-of-binary-tree",
        title: "Maximum Depth of Binary Tree",
        url: "https://leetcode.com/problems/maximum-depth-of-binary-tree/",
        difficulty: "Easy",
      },
      {
        id: "same-tree",
        title: "Same Tree",
        url: "https://leetcode.com/problems/same-tree/",
        difficulty: "Easy",
      },
      {
        id: "invert-binary-tree",
        title: "Invert/Flip Binary Tree",
        url: "https://leetcode.com/problems/invert-binary-tree/",
        difficulty: "Easy",
      },
      {
        id: "binary-tree-maximum-path-sum",
        title: "Binary Tree Maximum Path Sum",
        url: "https://leetcode.com/problems/binary-tree-maximum-path-sum/",
        difficulty: "Hard",
      },
      {
        id: "binary-tree-level-order-traversal",
        title: "Binary Tree Level Order Traversal",
        url: "https://leetcode.com/problems/binary-tree-level-order-traversal/",
        difficulty: "Medium",
      },
      {
        id: "serialize-and-deserialize-binary-tree",
        title: "Serialize and Deserialize Binary Tree",
        url: "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/",
        difficulty: "Hard",
      },
      {
        id: "subtree-of-another-tree",
        title: "Subtree of Another Tree",
        url: "https://leetcode.com/problems/subtree-of-another-tree/",
        difficulty: "Easy",
      },
      {
        id: "construct-binary-tree-from-preorder-and-inorder-traversal",
        title: "Construct Binary Tree from Preorder and Inorder Traversal",
        url: "https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/",
        difficulty: "Medium",
      },
      {
        id: "validate-binary-search-tree",
        title: "Validate Binary Search Tree",
        url: "https://leetcode.com/problems/validate-binary-search-tree/",
        difficulty: "Medium",
      },
      {
        id: "kth-smallest-element-in-a-bst",
        title: "Kth Smallest Element in a BST",
        url: "https://leetcode.com/problems/kth-smallest-element-in-a-bst/",
        difficulty: "Medium",
      },
      {
        id: "lowest-common-ancestor-of-a-binary-search-tree",
        title: "Lowest Common Ancestor of BST",
        url: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/",
        difficulty: "Medium",
      },
      {
        id: "implement-trie-prefix-tree",
        title: "Implement Trie (Prefix Tree)",
        url: "https://leetcode.com/problems/implement-trie-prefix-tree/",
        difficulty: "Medium",
      },
      {
        id: "add-and-search-word",
        title: "Add and Search Word",
        url: "https://leetcode.com/problems/add-and-search-word-data-structure-design/",
        difficulty: "Medium",
      },
      {
        id: "word-search-ii",
        title: "Word Search II",
        url: "https://leetcode.com/problems/word-search-ii/",
        difficulty: "Hard",
      },
    ],
  },
  {
    name: "Heap",
    problems: [
      {
        id: "find-median-from-data-stream",
        title: "Find Median from Data Stream",
        url: "https://leetcode.com/problems/find-median-from-data-stream/",
        difficulty: "Hard",
      },
      {
        id: "top-k-frequent-elements",
        title: "Top K Frequent Elements",
        url: "https://leetcode.com/problems/top-k-frequent-elements/",
        difficulty: "Medium",
      },
    ],
  },
];
