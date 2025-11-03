# **A Senior Engineer's Guide to Acing the Coding and System Design Interview**

## **Part I: Algorithmic Problem-Solving Patterns**

This report provides a comprehensive, expert-level guide to refresh and master the essential algorithmic patterns and system design principles required for senior software engineering interviews. The content is structured to move beyond rote memorization, focusing on the underlying patterns, strategic problem-solving, and architectural trade-offs that distinguish a senior candidate.

### **Class 1: Binary Search \- Beyond the Basics**

#### **Conceptual Refresher**

Binary search is a foundational divide-and-conquer algorithm that operates on a sorted, random-access data structure, achieving a time complexity of $O(\\log n)$.<sup>1</sup> Its fundamental mechanism involves repeatedly halving the search space by comparing a target value to the middle element of the collection.<sup>3</sup>

However, its application extends far beyond simple array lookups. The true power of binary search is unlocked when it is applied to any problem that can be modeled over a **monotonic function**.<sup>5</sup> This means the search space does not need to be a literal sorted array; it can be a range of potential answers, such as speeds, capacities, or time intervals, as long as a clear, monotonic condition can be defined over that range.

#### **Key Patterns and Strategies**

- **Standard Binary Search on an Array:** This is the foundational application. A robust implementation requires careful handling of pointer updates and loop termination conditions to avoid infinite loops. The standard template typically uses a while (left \<= right) loop and updates pointers with right \= mid \- 1 or left \= mid \+ 1 to ensure the search space shrinks with each iteration.<sup>3</sup>
- **Variations on a Sorted Array:** This pattern includes problems like finding the first or last occurrence of an element, or finding the correct insertion position for a new element. These require slight modifications to the standard template, particularly in how the pointers are adjusted when a match is found (target \== nums\[mid\]). For instance, to find the first occurrence, the search continues in the left half even after finding a match (right \= mid \- 1).<sup>3</sup>
- **Binary Search on the Answer:** This is the most critical and advanced pattern for senior-level interviews. It applies to optimization problems that ask for a minimum or maximum value satisfying a certain condition (e.g., "find the minimum speed to eat all bananas within h hours"). The strategy involves:
  1. Defining a search space for the _answer_ (e.g., a range of possible speeds from 1 to the maximum pile size).
  2. Using binary search to find the optimal value within this space.
  3. For each mid value tested, a "checker" function is used to determine if that value is a feasible solution. This checker function often employs a greedy approach and runs in linear time.<sup>4</sup>

This technique effectively reframes a complex optimization problem into a series of simpler decision problems. The key is to identify a monotonic property. For example, if a speed k is sufficient to eat all bananas, any speed greater than k will also be sufficient. This creates a conceptual boolean array over the search space, like \`\`, where binary search can efficiently find the first True—the minimum feasible answer.<sup>4</sup>

#### **Recommended Study Materials**

- **LeetCode Study Plan:** LeetCode offers a dedicated Binary Search study plan that covers 8 common patterns across 42 curated problems, providing a structured path to mastery.<sup>6</sup>
- **Comprehensive Guides:** Detailed articles on platforms like LeetCode Discuss and Towards Data Science provide generalized templates that are particularly useful for mastering the "Binary Search on the Answer" pattern.<sup>4</sup>

#### **Curated LeetCode Practice Problems**

| Problem                                                      | Difficulty | Key Pattern/Insight Tested                                                                  |
| :----------------------------------------------------------- | :--------- | :------------------------------------------------------------------------------------------ |
| 704\. Binary Search                                          | Easy       | Foundational implementation.<sup>1</sup>                                                    |
| 35\. Search Insert Position                                  | Easy       | Handling cases where the target is not present.<sup>3</sup>                                 |
| 34\. Find First and Last Position of Element in Sorted Array | Medium     | Modified binary search to find boundaries.<sup>3</sup>                                      |
| 74\. Search a 2D Matrix                                      | Medium     | Applying binary search on an abstracted 1D space.<sup>3</sup>                               |
| 875\. Koko Eating Bananas                                    | Medium     | Classic "Binary Search on the Answer" pattern.<sup>4</sup>                                  |
| 1011\. Capacity To Ship Packages Within D Days               | Medium     | "Binary Search on the Answer"; identifying the monotonic property.<sup>4</sup>              |
| 410\. Split Array Largest Sum                                | Hard       | Advanced "Binary Search on the Answer" combined with a greedy checker function.<sup>4</sup> |

### **Class 2: Tree \+ Divide and Conquer (D\&C)**

#### **Conceptual Refresher**

The **Divide and Conquer (D\&C)** paradigm is a powerful algorithmic strategy that involves three core steps: 1\) **Divide** the problem into smaller, similar subproblems; 2\) **Conquer** the subproblems by solving them recursively; and 3\) **Combine** the solutions to form the solution to the original problem.<sup>7</sup>

**Trees**, as inherently recursive data structures, are a natural fit for D\&C algorithms. Nearly any problem on a tree can be approached by applying an operation recursively to the left and right subtrees and then combining those results at the current node.<sup>9</sup>

#### **Key Patterns and Strategies**

- **Tree Traversal as D\&C:** The fundamental tree traversals (pre-order, in-order, and post-order) are themselves D\&C algorithms. The order in which the current node is processed ("combined") relative to the recursive calls on its children defines the traversal type.<sup>10</sup> Post-order traversal, where children are processed before the parent, is a particularly common pattern for problems that require information from subtrees to be aggregated upwards.
- **Property Validation and Path-Finding:** Problems like "Maximum Depth of Binary Tree," "Diameter of Binary Tree," or "Validate Binary Search Tree" are solved by recursively gathering properties from the left and right subtrees (e.g., their depth, longest path, or value ranges) and then combining or validating that information at the current node.<sup>9</sup>
- **Tree Construction:** Problems such as "Construct Binary Tree from Preorder and Inorder Traversal" use D\&C to build a tree. The preorder traversal identifies the root of a subtree, while the inorder traversal partitions the remaining nodes into left and right subtrees, which are then built recursively.
- **D\&C on Arrays:** While tree problems are more common in modern interviews, classic D\&C examples on arrays include Merge Sort, Quick Sort, and finding the "Maximum Subarray".<sup>7</sup>

A common pattern in advanced tree problems is for the recursive function to manage more complex state. Instead of returning a single value (like an integer for depth), it may return a tuple or object containing multiple pieces of information from the subtree. For example, in "Binary Tree Maximum Path Sum," the recursive helper must both update a global maximum value and return the maximum path sum that can be extended by its parent node. This separation of concerns—updating a global state while returning a local one—is a key technique.<sup>13</sup>

#### **Recommended Study Materials**

- **Recursion Fundamentals:** Playlists on recursion from sources like Abdul Bari and mycodeschool are invaluable for building a strong mental model of the call stack, which is the mechanism that powers D\&C.<sup>14</sup>
- **LeetCode Explore Cards:** The Binary Tree explore card on LeetCode offers a structured introduction to traversals, properties, and common problems.<sup>15</sup>
- **Textbooks:** For a formal theoretical foundation, Chapter 4 on Divide and Conquer in _Introduction to Algorithms_ (CLRS) is highly recommended.<sup>14</sup>

#### **Curated LeetCode Practice Problems**

| Problem                                                         | Difficulty | Key Pattern/Insight Tested                                                                           |
| :-------------------------------------------------------------- | :--------- | :--------------------------------------------------------------------------------------------------- |
| 104\. Maximum Depth of Binary Tree                              | Easy       | Basic D\&C: 1 \+ max(depth(left), depth(right)).<sup>16</sup>                                        |
| 100\. Same Tree                                                 | Easy       | Simple D\&C applied to two trees simultaneously.<sup>9</sup>                                         |
| 543\. Diameter of Binary Tree                                   | Easy       | D\&C where the recursive function updates a global max while returning local depth.<sup>9, 16</sup>  |
| 98\. Validate Binary Search Tree                                | Medium     | D\&C with constraints (min/max bounds) passed down the recursive calls.<sup>11</sup>                 |
| 236\. Lowest Common Ancestor of a Binary Tree                   | Medium     | Classic D\&C where results from children identify the split point.<sup>9</sup>                       |
| 124\. Binary Tree Maximum Path Sum                              | Hard       | Advanced D\&C: updating a global variable while returning a local value for the parent.<sup>13</sup> |
| 105\. Construct Binary Tree from Preorder and Inorder Traversal | Medium     | D\&C applied to tree construction from traversals.<sup>16</sup>                                      |

### **Class 3: BFS \+ Topological Sorting**

#### **Conceptual Refresher**

**Breadth-First Search (BFS)** is a graph traversal algorithm that explores nodes level by level, starting from a source node. It uses a queue to manage the order of nodes to visit. Its most prominent application is finding the **shortest path in an unweighted graph**, as it guarantees that the first time a node is reached, it is via the shortest possible path.<sup>17</sup>

**Topological Sort** produces a linear ordering of vertices in a **Directed Acyclic Graph (DAG)**. For every directed edge from vertex u to v, u appears before v in the ordering. This is essential for problems involving dependencies, such as task scheduling or course prerequisites.<sup>19</sup>

#### **Key Patterns and Strategies**

- **BFS for Shortest Path/Time:** In problems set on grids or implicit graphs, such as "Rotting Oranges" or finding the shortest path in a maze, BFS is the optimal choice. It explores all paths of length k before exploring any path of length k+1, guaranteeing the discovery of the shortest path first.<sup>18</sup>
- **Kahn's Algorithm (BFS-based Topological Sort):** This is the most common and intuitive algorithm for topological sorting.
  1. **Compute In-degrees:** Calculate the number of incoming edges for every vertex in the graph.
  2. **Initialize Queue:** Add all vertices with an in-degree of 0 to a queue. These are the starting points with no dependencies.
  3. **Process Queue:** While the queue is not empty, dequeue a vertex. Add this vertex to the final sorted list.
  4. **Update Neighbors:** For each neighbor of the dequeued vertex, decrement its in-degree. If a neighbor's in-degree becomes 0, enqueue it.
  5. **Cycle Detection:** After the loop, if the number of vertices in the sorted list is less than the total number of vertices in the graph, a cycle exists, and a topological sort is not possible.<sup>19</sup>

Many challenging problems do not present an explicit graph but instead describe a set of dependencies. The crucial step is to recognize these dependencies, model them as a DAG, and then apply topological sort. For instance, in "Alien Dictionary," the relative ordering of characters is derived by comparing adjacent words in a sorted list. This comparison reveals dependencies (e.g., if "xza" comes before "xzb", then a must come before b), which can be used to construct a graph. The problem then becomes finding a valid topological sort of this character graph.<sup>20</sup>

#### **Recommended Study Materials**

- **Visual Guides:** Visual walkthroughs of Kahn's algorithm are highly effective for understanding its mechanics, particularly how the queue and in-degree counts evolve.<sup>22</sup>
- **LeetCode Discuss:** The platform contains comprehensive guides on identifying topological sort patterns and provides templates for both BFS-based (Kahn's) and DFS-based implementations.<sup>19</sup>

#### **Curated LeetCode Practice Problems**

| Problem                    | Difficulty | Key Pattern/Insight Tested                                                                                    |
| :------------------------- | :--------- | :------------------------------------------------------------------------------------------------------------ |
| 994\. Rotting Oranges      | Medium     | Classic BFS for finding the minimum time in a grid.<sup>18</sup>                                              |
| 542\. 01 Matrix            | Medium     | Multi-source BFS, where all nodes with value 0 are added to the queue initially.<sup>17, 23</sup>             |
| 207\. Course Schedule      | Medium     | Canonical topological sort problem focused on cycle detection.<sup>20</sup>                                   |
| 210\. Course Schedule II   | Medium     | Generating the topological sort order itself.<sup>20, 23</sup>                                                |
| 310\. Minimum Height Trees | Medium     | A clever, modified topological sort on an _undirected_ graph by iteratively trimming leaf nodes.<sup>20</sup> |
| 269\. Alien Dictionary     | Hard       | Identifying an implicit dependency graph from rules and then applying topological sort.                       |

### **Class 4: DFS**

#### **Conceptual Refresher**

**Depth-First Search (DFS)** is a graph traversal algorithm that explores as far as possible along each branch before backtracking.<sup>24</sup> It can be implemented either recursively, which naturally uses the call stack, or iteratively with an explicit stack. DFS is highly versatile and forms the basis for solving a wide range of problems involving paths, connectivity, and graph structures.<sup>18</sup>

#### **Key Patterns and Strategies**

- **Graph and Tree Traversal:** DFS is used for standard tree traversals (pre-order, in-order, post-order) and for exploring all reachable nodes from a starting point in a graph.<sup>24</sup>
- **Connected Components:** In problems like "Number of Islands" or "Number of Provinces," DFS is used to find and mark all nodes within a single connected component. A loop iterates through all nodes, starting a new DFS traversal for each unvisited node, and increments a counter for each new component found.<sup>18</sup>
- **Path Finding and Backtracking:** DFS is the natural algorithm for problems that ask to find _if a path exists_ or to find _all possible paths_ that meet certain criteria (e.g., "Path Sum"). This often involves a backtracking approach where the algorithm explores a path, and if it doesn't lead to a solution, it "backtracks" to try another choice.
- **Cycle Detection:** In a directed graph, DFS can detect cycles by tracking the nodes currently in the recursion stack. If DFS encounters a node that is already in the current recursion path, a back edge is found, indicating a cycle. In an undirected graph, a cycle is found if DFS encounters a visited node that is not the immediate parent of the current node.
- **Topological Sort (DFS-based):** An alternative to Kahn's algorithm, a DFS-based topological sort adds a vertex to the head of a list after all its descendants have been visited (i.e., upon finishing its recursive call). The final list is a topologically sorted order in reverse.

#### **Recommended Study Materials**

- **LeetCode Patterns:** Several articles on LeetCode Discuss and Medium break down how a large percentage of tree and graph problems are simply variations of BFS or DFS, providing pattern-based learning paths.<sup>17</sup>
- **Iterative vs. Recursive DFS:** Understanding both implementations is key. The LeetCode "Queue & Stack" explore card explains the role of the stack in both implicit (recursion) and explicit (iterative) DFS.<sup>25</sup>

#### **Curated LeetCode Practice Problems**

| Problem                           | Difficulty | Key Pattern/Insight Tested                                                                        |
| :-------------------------------- | :--------- | :------------------------------------------------------------------------------------------------ |
| 200\. Number of Islands           | Medium     | Finding connected components in a grid using DFS.<sup>24, 26</sup>                                |
| 547\. Number of Provinces         | Medium     | Finding connected components in a graph represented by an adjacency matrix.<sup>18</sup>          |
| 112\. Path Sum                    | Easy       | Basic path-finding in a binary tree.<sup>13, 16</sup>                                             |
| 79\. Word Search                  | Medium     | Backtracking on a grid with DFS to find a path that forms a word.<sup>26</sup>                    |
| 98\. Validate Binary Search Tree  | Medium     | Using DFS with passed-down constraints (min/max bounds) to validate a tree property.<sup>13</sup> |
| 417\. Pacific Atlantic Water Flow | Medium     | Multi-source DFS/BFS starting from the "ocean" cells and working inwards.<sup>26</sup>            |
| 133\. Clone Graph                 | Medium     | Graph traversal (DFS or BFS) to copy nodes and edges while handling cycles via a visited map.     |

### **Class 5: Graph \+ Trie**

#### **Conceptual Refresher: Graph**

A **Graph** is a non-linear data structure consisting of a set of vertices (nodes) and edges that connect pairs of vertices. Graphs are used to model networks and relationships.<sup>18</sup> Key algorithms for graphs include traversals (BFS, DFS), shortest path algorithms (Dijkstra's, Bellman-Ford), minimum spanning tree algorithms (Prim's, Kruskal's), and flow networks.<sup>27</sup> For interviews, a strong command of BFS and DFS, along with their applications in problems like cycle detection, connectivity, and topological sorting, is essential.<sup>29</sup>

#### **Recommended Study Materials for Graphs**

- **LeetCode Explore Card:** The "Graph" card on LeetCode provides a structured introduction to fundamental graph theory concepts and algorithms.<sup>15</sup>
- **Comprehensive Guides:** LeetCode Discuss has several "one-stop" guides that provide implementations and explanations for all major graph algorithms, from beginner to advanced levels.<sup>28</sup>

#### **Curated LeetCode Practice Problems for Graphs**

| Problem                               | Difficulty | Key Pattern/Insight Tested                                           |
| :------------------------------------ | :--------- | :------------------------------------------------------------------- |
| 200\. Number of Islands               | Medium     | Graph traversal (DFS/BFS) on a grid.<sup>31</sup>                    |
| 133\. Clone Graph                     | Medium     | Graph traversal with a hash map to handle cycles.<sup>31</sup>       |
| 207\. Course Schedule                 | Medium     | Topological Sort (cycle detection in a directed graph).<sup>31</sup> |
| 785\. Is Graph Bipartite?             | Medium     | Graph coloring using DFS or BFS.<sup>18</sup>                        |
| 743\. Network Delay Time              | Medium     | Single-source shortest path (Dijkstra's Algorithm).<sup>18</sup>     |
| 1584\. Min Cost to Connect All Points | Medium     | Minimum Spanning Tree (Prim's or Kruskal's Algorithm).<sup>27</sup>  |

#### **Conceptual Refresher: Trie**

A **Trie** (or prefix tree) is a specialized tree-like data structure used for storing and retrieving strings efficiently. Each node represents a character, and paths from the root to a node represent a prefix. A special marker in a node (e.g., a boolean flag) indicates the end of a complete word.<sup>32</sup> Tries are optimal for problems involving prefixes, such as autocomplete or dictionary searches.

- **Operations:**
  - **Insertion:** To insert a word, traverse the trie from the root, creating new nodes for characters not yet in the path. Mark the final node as the end of a word. Time complexity is $O(L)$, where $L$ is the length of the word.<sup>32</sup>
  - **Search:** To search for a word, traverse the trie. If the path exists and the final node is marked as a word-end, the word is in the trie. Time complexity is $O(L)$.<sup>32</sup>
  - **Prefix Search (startsWith):** Traverse the trie based on the prefix. If the path exists, the prefix is present. Time complexity is $O(P)$, where $P$ is the length of the prefix.<sup>32</sup>

#### **Recommended Study Materials for Tries**

- **Beginner-Friendly Guides:** LeetCode Discuss features excellent tutorials that explain the trie structure, implementation, and applications with clear examples and code.<sup>32</sup>
- **LeetCode Explore Card:** The "Trie" card provides interactive lessons and practice problems.<sup>15</sup>

#### **Curated LeetCode Practice Problems for Tries**

| Problem                                            | Difficulty | Key Pattern/Insight Tested                                                                                |
| :------------------------------------------------- | :--------- | :-------------------------------------------------------------------------------------------------------- |
| 208\. Implement Trie (Prefix Tree)                 | Medium     | Foundational implementation of the Trie data structure.<sup>32, 33</sup>                                  |
| 211\. Add and Search Word \- Data structure design | Medium     | Modified Trie search to handle wildcards ('.').<sup>32</sup>                                              |
| 212\. Word Search II                               | Hard       | Combining a Trie with DFS/backtracking on a grid to find all words from a dictionary.<sup>32, 33</sup>    |
| 648\. Replace Words                                | Medium     | Using a Trie to find the shortest root prefix for words in a sentence.<sup>32</sup>                       |
| 677\. Map Sum Pairs                                | Medium     | Augmenting Trie nodes to store additional information (e.g., sums) for prefix-based queries.<sup>32</sup> |

### **Class 6: Two Pointers & Linked List**

#### **Conceptual Refresher**

The **Two Pointers** technique is an efficient method for solving problems involving sorted arrays or linked lists by using two pointers to traverse the data structure. It typically reduces a solution's time complexity from quadratic ($O(n^2)$) to linear ($O(n)$) while using constant extra space ($O(1)$).<sup>34</sup>

The **Linked List** is a linear data structure where elements are not stored at contiguous memory locations but are linked using pointers. This structure makes insertions and deletions efficient but disallows random access, making techniques like two pointers particularly valuable.<sup>35</sup>

#### **Key Patterns and Strategies**

- **Opposite Ends Pointers:** One pointer starts at the beginning of an array and the other at the end. They move towards each other until they meet. This is common for problems on sorted arrays, such as "Two Sum II" or "Valid Palindrome".<sup>36</sup>
- **Fast and Slow Pointers:** Both pointers start at the head of a linked list but move at different speeds. This is an extremely powerful pattern for linked lists, as it can solve problems that are otherwise difficult due to the lack of random access.<sup>35</sup>
  - **Cycle Detection:** A slow pointer moves one step at a time (slow \= slow.next), while a fast pointer moves two steps (fast \= fast.next.next). If the list has a cycle, the fast pointer will eventually catch up to the slow pointer.<sup>37</sup>
  - **Finding the Middle Node:** When the fast pointer reaches the end of the list, the slow pointer will be at the middle.<sup>38</sup>
  - **Finding the Nth Node from the End:** Start two pointers at the head. Move the first pointer n steps forward. Then, move both pointers one step at a time until the first pointer reaches the end. The second pointer will then be at the Nth node from the end.<sup>38</sup>

#### **Recommended Study Materials**

- **LeetCode Explore Card:** The "Linked List" card has a dedicated chapter on the two-pointer technique, with explanations and classic problems.<sup>35</sup>
- **Pattern-Based Lists:** LeetCode Discuss has posts that categorize dozens of two-pointer problems, helping to solidify pattern recognition.<sup>36</sup>

#### **Curated LeetCode Practice Problems**

| Problem                                   | Difficulty | Key Pattern/Insight Tested                                                      |
| :---------------------------------------- | :--------- | :------------------------------------------------------------------------------ |
| 167\. Two Sum II \- Input Array Is Sorted | Medium     | Opposite ends pointers on a sorted array.<sup>36</sup>                          |
| 125\. Valid Palindrome                    | Easy       | Opposite ends pointers moving inwards.<sup>36</sup>                             |
| 876\. Middle of the Linked List           | Easy       | Fast and slow pointers to find the middle.<sup>38</sup>                         |
| 141\. Linked List Cycle                   | Easy       | Fast and slow pointers for cycle detection.<sup>38</sup>                        |
| 142\. Linked List Cycle II                | Medium     | An extension of cycle detection to find the cycle's entry point.<sup>37</sup>   |
| 19\. Remove Nth Node From End of List     | Medium     | Two pointers with an initial offset to find the Nth-from-end node.<sup>38</sup> |
| 21\. Merge Two Sorted Lists               | Easy       | A classic two-pointer approach to merge two lists iteratively.<sup>38</sup>     |

### **Class 7: Heap \+ Top K \+ Monotonic Stack**

#### **Conceptual Refresher: Heap and Top K Problems**

A **Heap** is a specialized tree-based data structure that satisfies the heap property: in a min-heap, for any given node, its value is less than or equal to the values of its children; in a max-heap, it is greater than or equal.<sup>39</sup> Heaps are commonly used to implement **Priority Queues**. Operations like insertion and deletion of the root element have a time complexity of $O(\\log n)$, while finding the min/max element is an $O(1)$ operation.<sup>39</sup>

**Top K** problems ask for the k largest or smallest elements in a collection. While sorting provides an $O(n \\log n)$ solution, a heap offers a more optimal approach with a time complexity of $O(n \\log k)$. The standard technique is to use a min-heap of size k to find the top k largest elements (or a max-heap for the k smallest). As you iterate through the elements, you add each to the heap. If the heap's size exceeds k, you remove the smallest element (the root of the min-heap). At the end, the heap contains the k largest elements encountered.<sup>40</sup>

#### **Conceptual Refresher: Monotonic Stack**

A **Monotonic Stack** is a technique, not a distinct data structure, that uses a standard stack to maintain a sequence of elements in either strictly increasing or decreasing order.<sup>42</sup> It is exceptionally useful for problems that require finding the **next greater/smaller element** or **previous greater/smaller element** for all items in an array. The general approach involves iterating through the array and, for each element, popping from the stack while the monotonic property is violated. This popping action is where the logic happens—the popped element's "next greater/smaller" is the current element being processed.<sup>43</sup> This pattern achieves a linear time complexity of $O(n)$ because each element is pushed and popped from the stack at most once.<sup>45</sup>

#### **Recommended Study Materials**

- **Heap/Top K:** The "Top 'K' Elements" pattern is well-documented in articles that explain the heap-based approach and its time complexity benefits over sorting.<sup>41</sup>
- **Monotonic Stack:** LeetCode Discuss has excellent guides that provide a template for monotonic stack problems and categorize them based on whether they find the "next" or "previous" and "greater" or "smaller" element.<sup>43</sup>

#### **Curated LeetCode Practice Problems**

| Problem                               | Difficulty | Key Pattern/Insight Tested                                                                                                                                      |
| :------------------------------------ | :--------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Heap / Top K**                      |            |                                                                                                                                                                 |
| 215\. Kth Largest Element in an Array | Medium     | Classic Top K problem solved with a min-heap of size k.<sup>41</sup>                                                                                            |
| 347\. Top K Frequent Elements         | Medium     | Combining a hash map for frequency counting with a heap to find the top k frequent elements.<sup>40</sup>                                                       |
| 973\. K Closest Points to Origin      | Medium     | Using a max-heap of size k to find the k points with the smallest distance to the origin.<sup>47</sup>                                                          |
| 703\. Kth Largest Element in a Stream | Easy       | Designing a class that maintains the k largest elements in a stream, a direct application of a min-heap.<sup>48</sup>                                           |
| **Monotonic Stack**                   |            |                                                                                                                                                                 |
| 496\. Next Greater Element I          | Easy       | Foundational monotonic stack problem for finding the next greater element.<sup>44</sup>                                                                         |
| 739\. Daily Temperatures              | Medium     | A variation of "Next Greater Element" where you find the distance to the next warmer day.<sup>42</sup>                                                          |
| 84\. Largest Rectangle in Histogram   | Hard       | Advanced monotonic stack application to find the largest rectangle by finding the nearest smaller elements to the left and right for each bar.<sup>42, 43</sup> |
| 402\. Remove K Digits                 | Medium     | Using a monotonic (increasing) stack to build the lexicographically smallest number after removing k digits.<sup>43</sup>                                       |

### **Class 8: Sliding Window \+ Sweep Line**

#### **Conceptual Refresher: Sliding Window**

The **Sliding Window** technique is used to efficiently solve problems involving contiguous subarrays or substrings. It works by maintaining a "window" (a subsegment of the array/string) and sliding it through the data. This avoids the redundant computations of a brute-force approach, typically reducing time complexity from $O(n^2)$ to $O(n)$.<sup>49</sup> There are two main types:

- **Fixed-Size Window:** The window size k is constant. The window slides one element at a time, adding a new element at the end and removing one from the beginning.<sup>50</sup>
- **Variable-Size Window:** The window expands by moving the end pointer and shrinks by moving the start pointer, based on conditions specified in the problem (e.g., keeping the number of distinct characters within a limit).<sup>49</sup>

#### **Conceptual Refresher: Sweep Line**

The **Sweep Line** algorithm is a technique primarily used for geometric or interval-based problems. It involves imagining a vertical line "sweeping" across a plane or a timeline. The algorithm processes events only at specific points where the state changes (e.g., the start or end of an interval). By sorting these event points and processing them in order, complex overlap or intersection problems can be solved efficiently, often in $O(n \\log n)$ time due to the sorting step.<sup>51</sup> A common implementation involves converting intervals into start (+1) and end (-1) points, sorting these points, and iterating through them while maintaining a running count of active intervals.<sup>51</sup>

#### **Recommended Study Materials**

- **Sliding Window:** LeetCode Discuss and other platforms offer comprehensive guides that provide templates for both fixed and variable-size windows, along with categorized problem lists.<sup>49</sup>
- **Sweep Line:** Medium articles and tutorials provide excellent visualizations and explanations of the event-based thinking central to the sweep line algorithm.<sup>51</sup>

#### **Curated LeetCode Practice Problems**

| Problem                                            | Difficulty | Key Pattern/Insight Tested                                                                                                                    |
| :------------------------------------------------- | :--------- | :-------------------------------------------------------------------------------------------------------------------------------------------- |
| **Sliding Window**                                 |            |                                                                                                                                               |
| 643\. Maximum Average Subarray I                   | Easy       | Basic fixed-size sliding window.<sup>52</sup>                                                                                                 |
| 3\. Longest Substring Without Repeating Characters | Medium     | Classic variable-size sliding window using a hash set or map to track characters.<sup>49, 52</sup>                                            |
| 209\. Minimum Size Subarray Sum                    | Medium     | Variable-size sliding window that shrinks from the left once a condition is met.<sup>50</sup>                                                 |
| 76\. Minimum Window Substring                      | Hard       | Advanced variable-size sliding window with two hash maps to match character counts.                                                           |
| 239\. Sliding Window Maximum                       | Hard       | A challenging sliding window problem often solved with a deque (monotonic queue) to find the max in $O(1)$ time for each window.<sup>52</sup> |
| **Sweep Line**                                     |            |                                                                                                                                               |
| 253\. Meeting Rooms II                             | Medium     | Classic sweep line problem. Convert intervals to start/end events and sort to find max concurrent meetings.                                   |
| 218\. The Skyline Problem                          | Hard       | Advanced sweep line problem using a heap or balanced binary search tree to track building heights.                                            |
| 1854\. Maximum Population Year                     | Easy       | Textbook sweep line: increment for birth year, decrement for death year, find max population.<sup>51</sup>                                    |

### **Class 9: Prefix Sum \+ Stack \+ DP**

#### **Conceptual Refresher: Prefix Sum**

The **Prefix Sum** technique involves pre-computing an array where each element prefix\[i\] stores the cumulative sum of the original array's elements up to index i. This allows for the calculation of the sum of any subarray \`\` in constant $O(1)$ time using the formula prefix \- prefix\[L-1\].<sup>54</sup> This simple pre-computation, which takes $O(n)$ time, is extremely powerful for problems with multiple range sum queries.<sup>57</sup> The concept can also be extended to 2D matrices for sub-rectangle sum queries and other operations like prefix products or XORs.<sup>54</sup>

#### **Conceptual Refresher: Stack**

A **Stack** is a linear data structure that follows the Last-In, First-Out (LIFO) principle. Its primary operations are push (add to top), pop (remove from top), and peek (view top), all of which take $O(1)$ time.<sup>58</sup> Stacks are fundamental for managing function calls (the call stack), parsing expressions (e.g., "Valid Parentheses"), and implementing backtracking and DFS algorithms iteratively.<sup>58</sup>

#### **Conceptual Refresher: Dynamic Programming (DP)**

**Dynamic Programming (DP)** is an algorithmic paradigm for solving complex problems by breaking them down into simpler, overlapping subproblems. The key idea is to solve each subproblem only once and store its result to avoid redundant computations.<sup>61</sup> A problem can be solved with DP if it exhibits two properties:

1. **Optimal Substructure:** The optimal solution to the main problem can be constructed from the optimal solutions of its subproblems.
2. **Overlapping Subproblems:** The same subproblems are encountered and solved multiple times in a naive recursive approach.<sup>61</sup>

There are two main implementation strategies:

- **Top-Down with Memoization:** A recursive approach where the results of subproblems are cached (memoized) in a lookup table (e.g., an array or hash map) as they are computed.<sup>62</sup>
- **Bottom-Up with Tabulation:** An iterative approach that fills a DP table starting from the base cases and progressively builds up to the solution for the original problem.<sup>62</sup>

#### **Recommended Study Materials**

- **Prefix Sum:** Visual guides are effective for understanding the core formula and its application.<sup>55</sup> LeetCode problem lists provide good practice for both 1D and 2D applications.<sup>56</sup>
- **Stack:** LeetCode's "Queue & Stack" explore card is a good starting point.<sup>25</sup> Problem lists on GeeksforGeeks and LeetCode Discuss categorize problems by pattern (e.g., parenthesis matching, monotonic stack).<sup>60</sup>
- **Dynamic Programming:** This is a vast topic. Start with beginner-friendly guides that explain the core principles and patterns (e.g., 0/1 Knapsack, Fibonacci, Longest Common Subsequence).<sup>61</sup> LeetCode's DP study plan is also a valuable resource.<sup>65</sup>

#### **Curated LeetCode Practice Problems**

| Problem                              | Difficulty | Key Pattern/Insight Tested                                                                                                        |
| :----------------------------------- | :--------- | :-------------------------------------------------------------------------------------------------------------------------------- |
| **Prefix Sum**                       |            |                                                                                                                                   |
| 1480\. Running Sum of 1d Array       | Easy       | Foundational prefix sum implementation.<sup>54</sup>                                                                              |
| 303\. Range Sum Query \- Immutable   | Easy       | Direct application of prefix sums for efficient querying.<sup>54</sup>                                                            |
| 560\. Subarray Sum Equals K          | Medium     | Combining prefix sums with a hash map to find subarrays with a specific sum in $O(n)$ time.<sup>63</sup>                          |
| **Stack**                            |            |                                                                                                                                   |
| 20\. Valid Parentheses               | Easy       | Classic stack problem for matching pairs.<sup>66</sup>                                                                            |
| 155\. Min Stack                      | Medium     | Designing a stack that supports getMin() in $O(1)$ time, often by using an auxiliary stack.                                       |
| 71\. Simplify Path                   | Medium     | Using a stack to process file system path components.                                                                             |
| **Dynamic Programming**              |            |                                                                                                                                   |
| 70\. Climbing Stairs                 | Easy       | Introductory DP problem, equivalent to Fibonacci sequence.<sup>61</sup>                                                           |
| 322\. Coin Change                    | Medium     | Classic unbounded knapsack-style DP problem to find the minimum number of coins.<sup>61</sup>                                     |
| 5\. Longest Palindromic Substring    | Medium     | 2D DP to determine if s\[i:j\] is a palindrome.<sup>62</sup>                                                                      |
| 300\. Longest Increasing Subsequence | Medium     | A foundational DP problem with an $O(n^2)$ solution and an advanced $O(n \\log n)$ solution using patience sorting/binary search. |

### **Class 10: Object-Oriented Design (OOD) Interview**

#### **OOD Interview Overview**

Object-Oriented Design (OOD) interviews assess a candidate's ability to translate real-world requirements into a logical, maintainable, and extensible system of classes and objects. Unlike system design interviews that focus on high-level architecture, OOD interviews drill down into low-level design, focusing on class structure, relationships, and the application of design principles and patterns.<sup>67</sup>

Interviewers evaluate several key skills:

- **Systems Thinking:** The ability to break down a complex problem (e.g., "Design a parking lot") into logical components (classes like Vehicle, ParkingSpot, ParkingLot, Ticket).
- **OOP Knowledge:** A strong grasp of core OOP concepts (Encapsulation, Inheritance, Polymorphism, Abstraction) and design principles like SOLID.
- **Design Patterns:** The ability to recognize when to apply standard design patterns (e.g., Singleton, Factory, Strategy) to solve common problems.
- **Code Quality and Maintainability:** The focus is on creating a design that is clean, organized, and easy to extend in the future, rather than just the most performant algorithm.<sup>67</sup>

#### **SOLID Principles**

The SOLID principles are a set of five design guidelines for creating understandable, flexible, and maintainable software.<sup>68</sup>

1. **Single Responsibility Principle (SRP):** A class should have only one reason to change. It should have a single, well-defined responsibility.<sup>68</sup>
2. **Open/Closed Principle (OCP):** Software entities (classes, modules) should be open for extension but closed for modification. New functionality should be added via new classes rather than changing existing ones.<sup>68</sup>
3. **Liskov Substitution Principle (LSP):** Subtypes must be substitutable for their base types without altering the correctness of the program.
4. **Interface Segregation Principle (ISP):** Clients should not be forced to depend on interfaces they do not use. It's better to have many small, specific interfaces than one large, general-purpose one.
5. **Dependency Inversion Principle (DIP):** High-level modules should not depend on low-level modules. Both should depend on abstractions (e.g., interfaces). Abstractions should not depend on details; details should depend on abstractions.<sup>68</sup>

#### **Classic OOD Interview Problems**

- Design a Parking Lot
- Design an Elevator Control System
- Design a Vending Machine
- Design a Library Management System
- Design a Deck of Cards
- Design a Restaurant Reservation System
- Design a Movie Ticket Booking System

## **Part II: Mastering the System Design Interview**

### **A Strategic Framework for System Design Interviews**

For a senior engineer, a system design interview is not just a test of technical knowledge but also an evaluation of leadership, communication, and the ability to navigate ambiguity. The expectation is to drive the conversation, define the problem, and lead the interviewer through a structured design process.<sup>69</sup>

#### **A 4-Step Iterative Framework**

This framework provides a structured approach to tackle any system design prompt, ensuring all critical aspects are covered logically.<sup>71</sup>

1. **Step 1: Scope and Constraints (5-10 minutes)**
   - **Clarify Functional Requirements:** Begin by asking targeted questions to transform the vague prompt (e.g., "Design a ride-sharing service") into a concrete set of features for a Minimum Viable Product (MVP). For example: "Are we supporting ride-pooling? Do we need to handle pre-scheduled rides, or just on-demand?" This demonstrates product sense and an ability to scope large projects.<sup>69</sup>
   - **Define Non-Functional Requirements (NFRs):** This is a critical step that distinguishes senior candidates. Explicitly discuss and quantify requirements for scalability (e.g., "Let's assume 10 million Daily Active Users"), availability ("Are we aiming for 'five nines'?"), latency ("What is the acceptable latency for a ride match?"), and consistency ("Is eventual consistency acceptable for ride history, or do we need strong consistency for payments?").<sup>69</sup>
   - **Perform Back-of-the-Envelope Estimation:** Use the defined NFRs to make high-level estimations of traffic (QPS), storage needs, and bandwidth. For example, "With 10 million DAU and an average of 2 rides per day, that's 20 million rides. If each ride generates 10 API calls, we're looking at roughly 2,300 QPS on average, with peaks potentially 5-10x higher." This quantitative reasoning justifies subsequent architectural decisions.<sup>72</sup>
2. **Step 2: High-Level Design (10-15 minutes)**
   - **Sketch the Architecture:** Draw a high-level block diagram showing the main components and their interactions. This typically includes clients (mobile/web), a load balancer, an API gateway, various microservices (e.g., User Service, Dispatch Service, Payment Service), databases, caches, a CDN, and message queues.<sup>73</sup>
   - **Define APIs:** Outline the key API endpoints and their request/response formats (e.g., POST /api/v1/rides, GET /api/v1/rides/{rideId}). This establishes a clear contract for the system.<sup>72</sup>
   - **Data Model Design:** Sketch out the primary database schemas or data entities. For a ride-sharing app, this would include tables for Users, Drivers, Rides, and Vehicles. This clarifies data relationships and access patterns early on.<sup>69</sup>
3. **Step 3: Deep Dive (20-30 minutes)**
   - **Identify and Address Bottlenecks:** Proactively identify potential bottlenecks in the high-level design. For example, in a ride-sharing service, the driver location tracking and ride-matching components are high-throughput and low-latency, making them prime candidates for a deep dive.<sup>78</sup>
   - **Justify Design Choices with Trade-offs:** For each major component, discuss the alternatives and justify your choice. For instance, "For real-time driver location updates, we could use polling, but WebSockets or QUIC would be better to reduce latency and server load. I'll choose WebSockets for broad client support. For the location database, I'd use an in-memory store like Redis with geospatial indexing over a traditional SQL database to handle the high write and read QPS".<sup>77</sup>
   - **Detail Scaling Strategies:** Explain how each part of the system will scale. This includes horizontal scaling of stateless application servers, database scaling strategies like sharding (e.g., by user ID or region) and read replicas, and scaling asynchronous workflows with message queues.<sup>80</sup>
4. **Step 4: Wrap-up and Future Considerations (5 minutes)**
   - **Summarize the Design:** Briefly recap the key architectural decisions and how they address the initial requirements.
   - **Discuss Operational Readiness:** Touch upon crucial operational aspects like monitoring (metrics, dashboards), logging, and alerting to ensure system health.<sup>74</sup>
   - **Consider Future Evolution:** Suggest how the design could evolve to handle 10x scale, accommodate new features (like ride-pooling), or improve reliability (e.g., multi-region deployment for disaster recovery).<sup>74</sup>

### **Core Concepts for Designing Scalable Systems**

- **Scalability:**
  - **Horizontal vs. Vertical Scaling:** Horizontal scaling (adding more machines) is the standard for modern, large-scale applications as it provides near-linear scalability and fault tolerance. Vertical scaling (making one machine more powerful) is limited and creates a single point of failure.<sup>76</sup>
  - **Stateless Services:** Design application servers to be stateless. Any user-specific state (like session information) should be externalized to a distributed store like Redis or a database. This allows any server to handle any user's request, simplifying load balancing and auto-scaling.<sup>76</sup>
- **Availability and Reliability:**
  - **Redundancy and Failover:** Eliminate single points of failure (SPOFs) by deploying multiple instances of every component (servers, databases, load balancers) across different physical locations (e.g., AWS Availability Zones).<sup>76</sup>
  - **Load Balancing:** Distribute incoming traffic across a pool of servers to ensure no single server is overwhelmed. Discuss different algorithms (e.g., Round Robin, Least Connections) and layers (L4 vs. L7).<sup>76</sup>
- **Data Management:**
  - **SQL vs. NoSQL Databases:** Understand the trade-offs. SQL databases provide ACID guarantees and are excellent for transactional data with complex query needs. NoSQL databases generally offer better horizontal scalability and availability, making them suitable for large-scale, high-throughput use cases like storing user-generated content or time-series data.<sup>84</sup>
  - **CAP Theorem:** In a distributed system, you can only choose two of three guarantees: Consistency, Availability, and Partition Tolerance. Since network partitions are inevitable in distributed systems, the real trade-off is between consistency and availability. For example, a banking system might prioritize consistency, while a social media feed might prioritize availability.<sup>76</sup>
  - **Data Partitioning (Sharding):** A technique to horizontally scale a database by splitting the data across multiple servers. Discuss different sharding strategies (e.g., range-based, hash-based) and the challenges of re-sharding and hot spots.<sup>81</sup>
- **Performance and Latency:**
  - **Caching:** A fundamental technique for reducing latency and database load. Discuss different caching layers (client, CDN, application-level cache) and strategies (e.g., read-aside/cache-aside, write-through) with appropriate eviction policies (LRU, LFU).<sup>76</sup>
  - **Content Delivery Network (CDN):** A geographically distributed network of servers used to cache and deliver static content (images, videos, JS/CSS) from edge locations close to users. This significantly reduces latency for a global user base.<sup>85</sup>

### **Curated Resources for System Design Mastery**

This list is curated for senior engineers, prioritizing resources that offer depth, analyze real-world trade-offs, and cover modern, large-scale architectures.

- **Books:**
  - **_System Design Interview – An Insider's Guide (Volumes 1 & 2\)_** by Alex Xu: An excellent and highly visual starting point that covers common interview problems with clear diagrams and explanations.<sup>87</sup>
  - **_Designing Data-Intensive Applications_** by Martin Kleppmann: Considered the definitive guide for a deep, theoretical understanding of the principles behind distributed systems. A must-read for senior and staff-level engineers.
- **Courses and Blogs:**
  - **ByteByteGo:** Alex Xu's course and newsletter are renowned for their clear, visual explanations of complex systems, from fundamentals to deep dives into specific products like YouTube and Slack.74
  - **Grokking the System Design Interview & Grokking the Advanced System Design Interview (Design Gurus):** These text-based courses are interview-focused and cover a wide range of patterns and problems. The advanced course is particularly relevant for senior roles, delving into more complex topics.<sup>87</sup>
  - **Engineering Blogs:** Reading the official engineering blogs of companies like Netflix, Uber, Meta, and Google provides invaluable insight into how real-world problems are solved at massive scale.
- **Video Resources:**
  - **Gaurav Sen's YouTube Playlist:** Breaks down complex system design problems into digestible components, making them easier to understand.<sup>87</sup>
  - **Exponent's Mock Interviews:** Watching mock system design interviews helps in understanding the expected communication patterns, pacing, and depth of discussion for different seniority levels.<sup>87</sup>

#### **Works cited**

1. Binary Search \- LeetCode, accessed October 29, 2025, [https://leetcode.com/problems/binary-search/](https://leetcode.com/problems/binary-search/)
2. Master Binary Search: LeetCode Guide for All \- Sean Coughlin's Blog, accessed October 29, 2025, [https://blog.seancoughlin.me/conquer-the-binary-search-mastering-leetcodes-classic-challenge](https://blog.seancoughlin.me/conquer-the-binary-search-mastering-leetcodes-classic-challenge)
3. Binary Search — LeetCode Problems | by Mitchell Cheng \- Medium, accessed October 29, 2025, [https://medium.com/@chengbotier1/binary-search-leetcode-problems-724a87ccf63a](https://medium.com/@chengbotier1/binary-search-leetcode-problems-724a87ccf63a)
4. Powerful Ultimate Binary Search Template and Many LeetCode Problems, accessed October 29, 2025, [https://towardsdatascience.com/powerful-ultimate-binary-search-template-and-many-leetcode-problems-1f850ef95651/](https://towardsdatascience.com/powerful-ultimate-binary-search-template-and-many-leetcode-problems-1f850ef95651/)
5. Binary Search: A Comprehensive Guide \- Discuss \- LeetCode, accessed October 29, 2025, [https://leetcode.com/discuss/study-guide/3726061/Binary-Search%3A-A-Comprehensive-Guide](https://leetcode.com/discuss/study-guide/3726061/Binary-Search%3A-A-Comprehensive-Guide)
6. Binary Search \- Study Plan \- LeetCode, accessed October 29, 2025, [https://leetcode.com/studyplan/binary-search/](https://leetcode.com/studyplan/binary-search/)
7. Solve Problems on LeetCode using Divide and Conquer, Dynamic Programming, and Backtracking | by Li Yin | Algorithms and Coding Interviews | Medium, accessed October 29, 2025, [https://medium.com/algorithms-and-leetcode/note-for-divide-and-conquer-algorithms-c8bcffcd4440](https://medium.com/algorithms-and-leetcode/note-for-divide-and-conquer-algorithms-c8bcffcd4440)
8. 50 divide and conquer interview questions \[easy, medium, hard\] \- IGotAnOffer, accessed October 29, 2025, [https://igotanoffer.com/blogs/tech/divide-and-conquer-interview-questions](https://igotanoffer.com/blogs/tech/divide-and-conquer-interview-questions)
9. How to Approach LeetCode: Tree. Step-by-Step Solutions to Boost ..., accessed October 29, 2025, [https://medium.com/@nikhil.cse16/how-to-approach-leetcode-tree-a6fb3ec22bdd](https://medium.com/@nikhil.cse16/how-to-approach-leetcode-tree-a6fb3ec22bdd)
10. Tree Problem Quantitative Breakdown \- Discuss \- LeetCode, accessed October 29, 2025, [https://leetcode.com/discuss/study-guide/5075566/Tree-Problem-Quantitative-Breakdown/](https://leetcode.com/discuss/study-guide/5075566/Tree-Problem-Quantitative-Breakdown/)
11. Validate Binary Search Tree \- LeetCode, accessed October 29, 2025, [https://leetcode.com/problems/validate-binary-search-tree/discuss/639473/C%2B%2B-divide-and-conquer-recursive-solution](https://leetcode.com/problems/validate-binary-search-tree/discuss/639473/C%2B%2B-divide-and-conquer-recursive-solution)
12. LeetCode Week 1 Summary \+ Divide\&Conquer and More \- YouTube, accessed October 29, 2025, [https://www.youtube.com/watch?v=OVvgiWeKI14](https://www.youtube.com/watch?v=OVvgiWeKI14)
13. Leveraging the .self Method to Simplify most DFS questions on LeetCode | by Michael (Yong Shen) Chen | Medium, accessed October 29, 2025, [https://medium.com/@0429shen/leveraging-the-self-method-to-simplify-most-dfs-questions-on-leetcode-8be6e7e247bd](https://medium.com/@0429shen/leveraging-the-self-method-to-simplify-most-dfs-questions-on-leetcode-8be6e7e247bd)
14. Comprehensive Data Structure and Algorithm Study Guide \- Discuss \- LeetCode, accessed October 29, 2025, [https://leetcode.com/discuss/study-guide/494279/comprehensive-data-structure-and-algorithm-study-guide](https://leetcode.com/discuss/study-guide/494279/comprehensive-data-structure-and-algorithm-study-guide)
15. Explore Learn Cards \- LeetCode, accessed October 29, 2025, [https://leetcode.com/explore/learn/](https://leetcode.com/explore/learn/)
16. Leetcode Pattern 1 | DFS \+ BFS \== 25% of the problems — part 2 | by csgator \- Medium, accessed October 29, 2025, [https://medium.com/leetcode-patterns/leetcode-pattern-2-dfs-bfs-25-of-the-problems-part-2-a5b269597f52](https://medium.com/leetcode-patterns/leetcode-pattern-2-dfs-bfs-25-of-the-problems-part-2-a5b269597f52)
17. Graph Its Implementation And Some popular BFS/DFS Problems….. \- Discuss \- LeetCode, accessed October 29, 2025, [https://leetcode.com/discuss/study-guide/3903992/graph-its-implementation-and-some-popular-bfsdfs-problems](https://leetcode.com/discuss/study-guide/3903992/graph-its-implementation-and-some-popular-bfsdfs-problems)
18. Topological Sort (Using BFS & DFS) \- Discuss \- LeetCode, accessed October 29, 2025, [https://leetcode.com/discuss/study-guide/3759433/Topological-Sort-(Using-BFS-and-DFS)](<https://leetcode.com/discuss/study-guide/3759433/Topological-Sort-(Using-BFS-and-DFS)>)
19. \[Pattern\&Template\] Topological Sorting Pattern in Graph Problems \- Discuss \- LeetCode, accessed October 29, 2025, [https://leetcode.com/discuss/study-guide/6125954/PatternandTemplate-Topological-Sorting-Pattern-in-Graph-Problems/](https://leetcode.com/discuss/study-guide/6125954/PatternandTemplate-Topological-Sorting-Pattern-in-Graph-Problems/)
20. Distilled • LeetCode • Topological Sort \- aman.ai, accessed October 29, 2025, [https://aman.ai/code/top-sort/](https://aman.ai/code/top-sort/)
21. A Visual Guide to Topological Sort \- leetcode \- Reddit, accessed October 29, 2025, [https://www.reddit.com/r/leetcode/comments/1eyr275/a_visual_guide_to_topological_sort/](https://www.reddit.com/r/leetcode/comments/1eyr275/a_visual_guide_to_topological_sort/)
22. Depth First Search: a DFS Graph Traversal Guide with 6 Leetcode ..., accessed October 29, 2025, [https://www.freecodecamp.org/news/dfs-for-your-next-tech-giant-interview/](https://www.freecodecamp.org/news/dfs-for-your-next-tech-giant-interview/)
23. Queue & Stack \- Explore \- LeetCode, accessed October 29, 2025, [https://leetcode.com/explore/learn/card/queue-stack/](https://leetcode.com/explore/learn/card/queue-stack/)
24. Graph \- Explore \- LeetCode, accessed October 29, 2025, [https://leetcode.com/explore/learn/card/graph/](https://leetcode.com/explore/learn/card/graph/)
25. Graph (Beginners to Advanced) All Algorithms \- Python \- Discuss ..., accessed October 29, 2025, [https://leetcode.com/discuss/study-guide/4283222/Graph-(Beginners-to-Advanced)-All-Algorithms-Python/](<https://leetcode.com/discuss/study-guide/4283222/Graph-(Beginners-to-Advanced)-All-Algorithms-Python/>)
26. "Mastering Graph Algorithms: A Comprehensive DSA Graph Common Question Patterns CheatSheet" \- Discuss \- LeetCode, accessed October 29, 2025, [https://leetcode.com/discuss/post/3900838/mastering-graph-algorithms-a-comprehensi-xyws/](https://leetcode.com/discuss/post/3900838/mastering-graph-algorithms-a-comprehensi-xyws/)
27. All Graph Algorithms \- One Stop Destination \[Standard ... \- LeetCode, accessed October 29, 2025, [https://leetcode.com/discuss/study-guide/6132428/All-Graph-Algorithms-One-Stop-Destination-Standard-Implementations](https://leetcode.com/discuss/study-guide/6132428/All-Graph-Algorithms-One-Stop-Destination-Standard-Implementations)
28. Beginner-friendly guide to Trie \[Tutorial \+ Practice Problems ..., accessed October 29, 2025, [https://leetcode.com/discuss/study-guide/931977/Beginner-friendly-guide-to-Trie-Tutorial-%2B-Practice-Problems](https://leetcode.com/discuss/study-guide/931977/Beginner-friendly-guide-to-Trie-Tutorial-%2B-Practice-Problems)
29. Understanding Two Pointers in Python: Guide with LeetCode Tips & Tricks \- Medium, accessed October 29, 2025, [https://medium.com/@abasaeed/understanding-two-pointers-in-python-guide-with-leetcode-tips-tricks-cd8f91ce31a9](https://medium.com/@abasaeed/understanding-two-pointers-in-python-guide-with-leetcode-tips-tricks-cd8f91ce31a9)
30. Linked List \- Explore \- LeetCode, accessed October 29, 2025, [https://leetcode.com/explore/learn/card/linked-list/214/linked-list-two-pointer/](https://leetcode.com/explore/learn/card/linked-list/214/linked-list-two-pointer/)
31. Solved all two pointers problems in 100 days. \- Discuss \- LeetCode, accessed October 29, 2025, [https://leetcode.com/discuss/post/1688903/solved-all-two-pointers-problems-in-100-z56cn/](https://leetcode.com/discuss/post/1688903/solved-all-two-pointers-problems-in-100-z56cn/)
32. How to Solve Linked List Cycle I I Leetcode Problem \- Interview Coder Guide, accessed October 29, 2025, [https://www.interviewcoder.co/leetcode-problems/linked-list-cycle-ii](https://www.interviewcoder.co/leetcode-problems/linked-list-cycle-ii)
33. Two Pointer Techniques for Linked List Problems | Labuladong Algo ..., accessed October 29, 2025, [https://labuladong.online/algo/en/essential-technique/linked-list-skills-summary/](https://labuladong.online/algo/en/essential-technique/linked-list-skills-summary/)
34. Heap cheatsheet for coding interviews | Tech Interview Handbook, accessed October 29, 2025, [https://www.techinterviewhandbook.org/algorithms/heap/](https://www.techinterviewhandbook.org/algorithms/heap/)
35. 347\. Top K Frequent Elements \- In-Depth Explanation, accessed October 29, 2025, [https://algo.monster/liteproblems/347](https://algo.monster/liteproblems/347)
36. Mastering the Top 'K' Elements Pattern in Kotlin Using Heaps | Medium, accessed October 29, 2025, [https://medium.com/@chetanshingare2991/mastering-the-top-k-elements-pattern-using-heaps-in-kotlin-4b3e701b46e5](https://medium.com/@chetanshingare2991/mastering-the-top-k-elements-pattern-using-heaps-in-kotlin-4b3e701b46e5)
37. Monotonic Stack \- Hello Interview, accessed October 29, 2025, [https://www.hellointerview.com/learn/code/stack/monotonic-stack](https://www.hellointerview.com/learn/code/stack/monotonic-stack)
38. Monotonic Stack \- Guide \+ List of Problems \- Discuss \- LeetCode, accessed October 29, 2025, [https://leetcode.com/discuss/study-guide/5148505/Monotonic-Stack-Guide-%2B-List-of-Problems/](https://leetcode.com/discuss/study-guide/5148505/Monotonic-Stack-Guide-%2B-List-of-Problems/)
39. Mastering Monotonic Stack: Unlocking Efficient Problem-Solving Pattern Technique, Once & Forever...\! \- Discuss \- LeetCode, accessed October 29, 2025, [https://leetcode.com/discuss/study-guide/3773642/Mastering-Monotonic-Stack%3A-Unlocking-Efficient-Problem-Solving-Pattern-Technique-Once-and-Forever](https://leetcode.com/discuss/study-guide/3773642/Mastering-Monotonic-Stack%3A-Unlocking-Efficient-Problem-Solving-Pattern-Technique-Once-and-Forever)
40. I don't understand when to reach for a monotonic stack vs a MinHeap : r/leetcode \- Reddit, accessed October 29, 2025, [https://www.reddit.com/r/leetcode/comments/194b9pp/i_dont_understand_when_to_reach_for_a_monotonic/](https://www.reddit.com/r/leetcode/comments/194b9pp/i_dont_understand_when_to_reach_for_a_monotonic/)
41. Top K problems \- Sort, Heap, and QuickSelect \- Discuss \- LeetCode, accessed October 29, 2025, [https://leetcode.com/discuss/general-discussion/1088565/top-k-problems-sort-heap-and-quickselect](https://leetcode.com/discuss/general-discussion/1088565/top-k-problems-sort-heap-and-quickselect)
42. Sliding Window Technique: A Comprehensive Guide \- Discuss \- LeetCode, accessed October 29, 2025, [https://leetcode.com/discuss/post/3722472/sliding-window-technique-a-comprehensive-ix2k/](https://leetcode.com/discuss/post/3722472/sliding-window-technique-a-comprehensive-ix2k/)
43. Sliding Window | Summary with practice questions Sheet (C++) on LeetCode | by Amit Maity | Medium, accessed October 29, 2025, [https://medium.com/@maityamit/sliding-window-summary-with-practice-questions-sheet-c-on-leetcode-7e275b4ed194](https://medium.com/@maityamit/sliding-window-summary-with-practice-questions-sheet-c-on-leetcode-7e275b4ed194)
44. Mastering the Sweep Line Algorithm: From LeetCode to Real-World ..., accessed October 29, 2025, [https://medium.com/@hanxuyang0826/mastering-the-sweep-line-algorithm-from-leetcode-to-real-world-a3ae111e61bb](https://medium.com/@hanxuyang0826/mastering-the-sweep-line-algorithm-from-leetcode-to-real-world-a3ae111e61bb)
45. Top 30 Sliding Window Problems for beginners \- Discuss \- LeetCode, accessed October 29, 2025, [https://leetcode.com/discuss/study-guide/3630462/Top-20-Sliding-Window-Problems-for-beginners](https://leetcode.com/discuss/study-guide/3630462/Top-20-Sliding-Window-Problems-for-beginners)
46. Sliding Window Cheatsheet with Categorized Problems : r/leetcode \- Reddit, accessed October 29, 2025, [https://www.reddit.com/r/leetcode/comments/1lnujcc/sliding_window_cheatsheet_with_categorized/](https://www.reddit.com/r/leetcode/comments/1lnujcc/sliding_window_cheatsheet_with_categorized/)
47. Prefix Sum | LeetCode The Hard Way, accessed October 29, 2025, [https://leetcodethehardway.com/tutorials/basic-topics/prefix-sum](https://leetcodethehardway.com/tutorials/basic-topics/prefix-sum)
48. A Visual Guide to Prefix Sums : r/leetcode \- Reddit, accessed October 29, 2025, [https://www.reddit.com/r/leetcode/comments/1ewxiqt/a_visual_guide_to_prefix_sums/](https://www.reddit.com/r/leetcode/comments/1ewxiqt/a_visual_guide_to_prefix_sums/)
49. Prefix Sum | Summary with practice questions Sheet (1D, 2D) on LeetCode | by Amit Maity, accessed October 29, 2025, [https://medium.com/@maityamit/prefix-sum-summary-with-practice-questions-sheet-1d-2d-on-leetcode-83c8deb4f713](https://medium.com/@maityamit/prefix-sum-summary-with-practice-questions-sheet-1d-2d-on-leetcode-83c8deb4f713)
50. prefix sum questions to practice \- Discuss \- LeetCode, accessed October 29, 2025, [https://leetcode.com/discuss/study-guide/4023666/prefix-sum-questions-to-practice](https://leetcode.com/discuss/study-guide/4023666/prefix-sum-questions-to-practice)
51. Stack \- Discuss \- LeetCode, accessed October 29, 2025, [https://leetcode.com/discuss/study-guide/4967545/Stack/](https://leetcode.com/discuss/study-guide/4967545/Stack/)
52. Stack Data Structure \- Discuss \- LeetCode, accessed October 29, 2025, [https://leetcode.com/discuss/study-guide/5063458/Stack-Data-Structure/](https://leetcode.com/discuss/study-guide/5063458/Stack-Data-Structure/)
53. Stack Coding Problems for SDE Interviews \- GeeksforGeeks, accessed October 29, 2025, [https://www.geeksforgeeks.org/dsa/top-50-problems-on-stack-data-structure-asked-in-interviews/](https://www.geeksforgeeks.org/dsa/top-50-problems-on-stack-data-structure-asked-in-interviews/)
54. Dynamic Programming: A Beginning Guide \- Discuss \- LeetCode, accessed October 29, 2025, [https://leetcode.com/discuss/interview-question/5041413/Dynamic-Programming%3A-A-Beginning-Guide](https://leetcode.com/discuss/interview-question/5041413/Dynamic-Programming%3A-A-Beginning-Guide)
55. A beginner's guide to LeetCode dynamic programming \- Educative.io, accessed October 29, 2025, [https://www.educative.io/blog/leetcode-dynamic-programming](https://www.educative.io/blog/leetcode-dynamic-programming)
56. Optimizing with Prefix Sums Pattern: Your Key to Efficient Problem-Solving \- ArchitectAlgos, accessed October 29, 2025, [https://www.architectalgos.com/optimizing-with-prefix-sums-pattern-your-key-to-efficient-problem-solving-3a0400438d99](https://www.architectalgos.com/optimizing-with-prefix-sums-pattern-your-key-to-efficient-problem-solving-3a0400438d99)
57. A general approach to Stack problems in C++ | Generic Template \- Discuss \- LeetCode, accessed October 29, 2025, [https://leetcode.com/discuss/post/3168516/a-general-approach-to-stack-problems-in-xsba0/](https://leetcode.com/discuss/post/3168516/a-general-approach-to-stack-problems-in-xsba0/)
58. Dynamic Programming \- Study Plan \- LeetCode, accessed October 29, 2025, [https://leetcode.com/studyplan/dynamic-programming/](https://leetcode.com/studyplan/dynamic-programming/)
59. What is an Object-Oriented Design Interview \- ByteByteGo ..., accessed October 29, 2025, [https://bytebytego.com/courses/object-oriented-design-interview/what-is-an-object-oriented-design-interview](https://bytebytego.com/courses/object-oriented-design-interview/what-is-an-object-oriented-design-interview)
60. SOLID Principles with Real Life Examples \- GeeksforGeeks, accessed October 29, 2025, [https://www.geeksforgeeks.org/system-design/solid-principle-in-programming-understand-with-real-life-examples/](https://www.geeksforgeeks.org/system-design/solid-principle-in-programming-understand-with-real-life-examples/)
61. System Design Interview Questions & Prep (from FAANG experts ..., accessed October 29, 2025, [https://igotanoffer.com/blogs/tech/system-design-interviews](https://igotanoffer.com/blogs/tech/system-design-interviews)
62. System Design in a Hurry \- Hello Interview, accessed October 29, 2025, [https://www.hellointerview.com/learn/system-design/in-a-hurry/introduction](https://www.hellointerview.com/learn/system-design/in-a-hurry/introduction)
63. System Design Interview Frameworks: What You Need to Know \- Data Engineer Academy, accessed October 29, 2025, [https://dataengineeracademy.com/blog/system-design-interview-frameworks-what-you-need-to-know/](https://dataengineeracademy.com/blog/system-design-interview-frameworks-what-you-need-to-know/)
64. System Design Interview Guide – 7 Steps to Ace It \- Design Gurus, accessed October 29, 2025, [https://www.designgurus.io/blog/step-by-step-guide](https://www.designgurus.io/blog/step-by-step-guide)
65. System Design Interview Questions for Senior Engineers \- Design Gurus, accessed October 29, 2025, [https://www.designgurus.io/answers/detail/system-design-interview-questions-for-senior-engineers](https://www.designgurus.io/answers/detail/system-design-interview-questions-for-senior-engineers)
66. A Framework For System Design Interviews \- ByteByteGo ..., accessed October 29, 2025, [https://bytebytego.com/courses/system-design-interview/a-framework-for-system-design-interviews](https://bytebytego.com/courses/system-design-interview/a-framework-for-system-design-interviews)
67. 4 Step Framework for System Design Interview \- Preplaced, accessed October 29, 2025, [https://www.preplaced.in/blog/framework-for-system-24](https://www.preplaced.in/blog/framework-for-system-24)
68. System Design Fundamentals: The Building Blocks of Scalable ..., accessed October 29, 2025, [https://www.systemdesigninterview.net/blog/system-design-fundamentals](https://www.systemdesigninterview.net/blog/system-design-fundamentals)
69. System Design Uber, Lyft | System Design Interview Question, accessed October 29, 2025, [https://systemdesignschool.io/problems/uber/solution](https://systemdesignschool.io/problems/uber/solution)
70. How to Design a Ride Sharing Service \- Design Gurus, accessed October 29, 2025, [https://www.designgurus.io/blog/ride-sharing-service](https://www.designgurus.io/blog/ride-sharing-service)
71. Design a Ride-Sharing Platform Like Uber, accessed October 29, 2025, [https://www.systemdesignhandbook.com/guides/design-uber/](https://www.systemdesignhandbook.com/guides/design-uber/)
72. Designing for scalability: Principles every engineer should know \- Statsig, accessed October 29, 2025, [https://www.statsig.com/perspectives/designing-for-scalability-principles](https://www.statsig.com/perspectives/designing-for-scalability-principles)
73. System design: Designing Scalable Systems \- DEV Community, accessed October 29, 2025, [https://dev.to/jayaprasanna_roddam/system-design-designing-scalable-systems-283m](https://dev.to/jayaprasanna_roddam/system-design-designing-scalable-systems-283m)
74. Uber \- System Design Interview Question (Ride Sharing Service) \- YouTube, accessed October 29, 2025, [https://www.youtube.com/watch?v=DGtalg5efCw](https://www.youtube.com/watch?v=DGtalg5efCw)
75. Guide to System Design Interview for Senior Engineers \- GeeksforGeeks, accessed October 29, 2025, [https://www.geeksforgeeks.org/system-design/guide-to-system-design-interview-for-senior-engineers/](https://www.geeksforgeeks.org/system-design/guide-to-system-design-interview-for-senior-engineers/)
76. Ultimate System Design Interview Guide for 2025 | by Fahim ul Haq \- Medium, accessed October 29, 2025, [https://medium.com/@fahimulhaq/ultimate-system-design-interview-guide-for-2025-c5dfa0ca6557](https://medium.com/@fahimulhaq/ultimate-system-design-interview-guide-for-2025-c5dfa0ca6557)
77. How to Answer Questions About CDNs in a System Design Interview \- Exponent, accessed October 29, 2025, [https://www.tryexponent.com/courses/system-design-interviews/content-delivery-network](https://www.tryexponent.com/courses/system-design-interviews/content-delivery-network)
78. Scale From Zero To Millions Of Users \- ByteByteGo | Technical Interview Prep, accessed October 29, 2025, [https://bytebytego.com/courses/system-design-interview/scale-from-zero-to-millions-of-users](https://bytebytego.com/courses/system-design-interview/scale-from-zero-to-millions-of-users)
79. System design interview guide for Software Engineers | Tech ..., accessed October 29, 2025, [https://www.techinterviewhandbook.org/system-design/](https://www.techinterviewhandbook.org/system-design/)
