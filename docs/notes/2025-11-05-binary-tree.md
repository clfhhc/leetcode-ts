# Binary Tree

## Definition

Binary Tree is a non-linear and hierarchical data structure where each node has at most two children referred to as the left child and the right child.

## Structure

### Example Binary Tree

```mermaid
graph TD
    id15((15))
    id35((35))
    id40((40))
    id3((3))
    id6((6))
    id5((5))
    id7((7))
    id1((1))
    id10((10))
    id8((8))
    id41((41))

    id15 --- id35
    id15 --- id40
    id35 --- id3
    id35 --- id6
    id40 --- id5
    id40 --- id7
    id3 --- id1
    id3 --- id10
    id5 --- id8
    id5 --- id41

    classDef internalNode fill:#D3D3D3,stroke:#333,stroke-width:1px,color:#000
    classDef leafNode fill:#90EE90,stroke:#333,stroke-width:1px,color:#000

    class id15 internalNode
    class id35 internalNode
    class id40 internalNode
    class id3 internalNode
    class id6 internalNode
    class id5 leafNode
    class id7 leafNode
    class id1 leafNode
    class id10 leafNode
    class id8 leafNode
    class id41 leafNode
```

**Legend:**

- Gray nodes = Internal nodes (nodes with at least one child)
- Green nodes = Leaf nodes (nodes with no children)

**Tree Structure:**

- Root: `15`
- Level 1: `35` (left child), `40` (right child)
- Level 2: `3` (left of 35), `6` (right of 35), `5` (left of 40), `7` (right of 40)
- Level 3: `1` (left of 3), `10` (right of 3), `8` (left of 5), `41` (right of 5)

### Representation of a Binary Tree Node

- Each node has 3 parts:
  - Data
  - Left Child
  - Right Child

```typescript
class TreeNode {
  data: number;
  left: TreeNode | null;
  right: TreeNode | null;
}
```

### Terminology

- **Root**: The topmost node in the tree
- **Parent Node**: A node that is the direct ancestor of a node(its child node)
- **Child Node**: A node that is the direct descendant of another node (its parent)
- **Ancestors of a node**: All nodes on the path from the root to that node (including the node itself)
- **Descendants of a node**: All nodes that lie in the subtree rooted at that node (including the node itself)
- **Subtree of a node**: A tree consisting of that node as root and all its descendants
- **Edge**: The link/connection between a parent node and its child node
- **Path in a binary tree**: A sequence of nodes connected by edges from one node to another
- **Leaf Node**: A node that does not have any children or both children are null
- **Internal Node**: A node that has at least one child
- **Depth/Level of a Node**: The number of edges in the path from root to that node (the depth/level of the root node is zero)
- **Height of a Binary Tree**: The number of edges on the longest path from root to a leaf

### Properties of Binary Tree

- The maximum number of nodes at level $i$ of a binary tree is $2^i$.
- The maximum number of nodes in a binary tree of height $h$ is $2^{h + 1} - 1$.
- Total number of leaf nodes = total number of nodes with 2 children + 1.
- The minimum height of a binary tree with $n$ nodes is $\log_2^n$.
- A binary tree with $L$ leaves has at least $\log_2^L + 1$ levels.

## Operations on Binary Tree

- **Insertion**: Insert a new node into the binary tree.
- **Deletion**: Delete a node from the binary tree.
- **Search**: Search for a node in the binary tree.
- **Traversal**: Traverse the binary tree.

### Traversal of Binary Tree

- **Breadth-first Traversal**: Visit the nodes level by level, from left to right.
- **Depth-first Traversal**: Visit the nodes depth by depth, from left to right.
- **Pre-order Traversal**: Visit the root node first, then the left subtree, then the right subtree.
- **In-order Traversal**: Visit the left subtree first, then the root node, then the right subtree.
- **Post-order Traversal**: Visit the left subtree first, then the right subtree, then the root node.

## Advantages and Disadvantages of Binary Tree

### Disadvantages

- Limited structure
- Space inefficiency

### Advantages

- Represent hierarchical data
- Huffman Coding trees are used to compress data
- Useful for indexing segmented data and storing cache
- Useful for implementing decision trees, a type of machine learning algorithm for classification and regression analysis

## Types of Binary Tree

1. On Basis of Number of Children
   - Full Binary Tree: every node has 0 or 2 children
   - Degenerate (or Pathological) Binary Tree: every internal node has one child
   - Skewed Binary Trees: a degenerate tree in which the tree is either dominated by the left nodes or the right nodes

```mermaid
%%{ init: { 'flowchart': { 'curve': 'basis' } } }%%
flowchart LR
    subgraph Full["Full Binary Tree"]
        direction TB
        F1((1)) --- F2((2))
        F1 --- F3((3))
        F2 --- F4((4))
        F2 --- F5((5))
        F3 --- F6((6))
        F3 --- F7((7))
    end

    subgraph Degenerate["Degenerate Binary Tree"]
        direction TB
        D1 --- D2((2))
        D1((1)) ~~~ D_H1["H1"]
        D2 ~~~ D_H2["H2"]
        D2 --- D3((3))
        D3 ~~~ D_H3["H3"]
        D3 --- D4((4))

        D_H1:::hidden
        D_H2:::hidden
        D_H3:::hidden
    end

    subgraph Skewed["Skewed Binary Trees"]
        direction TB
        subgraph RightSkewed["Right Skewed"]
            direction TB
            RS1((1)) ~~~ RS_H1["H1"]
            RS1 --- RS2((2))
            RS2 ~~~ RS_H2["H2"]
            RS2 --- RS3((3))
            RS3 ~~~ RS_H3["H3"]
            RS3 --- RS4((4))

            RS_H1:::hidden
            RS_H2:::hidden
            RS_H3:::hidden
        end
        subgraph LeftSkewed["Left Skewed"]
            direction TB
            LS1 --- LS2((2))
            LS1((1)) ~~~ LS_H1["H1"]
            LS2 --- LS3((3))
            LS2 ~~~ LS_H2["H2"]
            LS3 --- LS4((4))
            LS3 ~~~ LS_H3["H3"]

            LS_H1:::hidden
            LS_H2:::hidden
            LS_H3:::hidden
        end
    end

    Full ~~~ Degenerate ~~~ Skewed

    classDef hidden display: none
```

2. On the basis of level completion
   - Complete Binary Tree: all levels are completely filled except possibly the last level and the last level is filled from left side
   - Perfect Binary Tree: every internal nodes have two children and all leaf nodes are at the same level
   - Balanced Binary Tree: h = O(log n)

```mermaid
%%{ init: { 'flowchart': { 'curve': 'basis' } } }%%
graph LR
    subgraph Complete["Complete Binary Tree"]
        direction TB
        C1((1)) --- C2((2))
        C1 --- C3((3))
        C2 --- C4((4))
        C2 --- C5((5))
        C3 --- C6((6))
    end

    subgraph Perfect["Perfect Binary Tree"]
        direction TB
        P1((1)) --- P2((2))
        P1 --- P3((3))
        P2 --- P4((4))
        P2 --- P5((5))
        P3 --- P6((6))
        P3 --- P7((7))
    end

    subgraph Balanced["Balanced Binary Tree"]
        direction TB
        B1((5)) --- B2((3))
        B1 --- B3((8))
        B2 --- B4((2))
        B2 --- B5((4))
        B3 --- B6((7))
        B3 --- B7((9))
    end

    Complete ~~~ Perfect ~~~ Balanced
```

3. Some Special Types of Trees
   - Binary Search Tree (BST):
     - left subtree of a node contains only nodes with keys lesser than the node's key
     - right subtree of a node contains only nodes with keys greater than the node's key
     - left and right subtree must be a binary search tree
   - AVL Tree: a self-balancing BST where the difference between heights of left and right subtrees of all nodes is at most 1
   - Red Black Tree:
     - a self-balancing BST where each node has an extra bit, and that bit is often interpreted as the color (red or black)
     - colors are used to ensure that the tree remains balanced using insertions and deletions
     - good enough to reduce the searching time and maintain it around O(log n) time
   - B Tree:
     - a self-balancing BST designed for efficient insertion, deletion and search operations on disk-based systems
     - each node can have multiple keys and children, keys within a node are sorted and subtrees between keys hold values within that key range
     - ensures balance and minimizes height
   - B+ Tree:
     - an extension of B-Tree where all data is stored only in the leaf nodes, while internal nodes store keys only for indexing
     - left nodes are linked sequentially, forming a linked list that allows efficient range queries and ordered traversals

```mermaid
graph TB
    subgraph BST["Binary Search Tree (BST)"]
        direction TB
        BST1((8)) --- BST2((3))
        BST1 --- BST3((10))
        BST2 --- BST4((1))
        BST2 --- BST5((6))
        BST3 --- BST6((9))
        BST3 --- BST7((14))
        BST5 --- BST8((4))
        BST5 --- BST9((7))
    end

    subgraph AVL["AVL Tree"]
        direction TB
        AVL1((5)) --- AVL2((3))
        AVL1 --- AVL3((8))
        AVL2 --- AVL4((2))
        AVL2 --- AVL5((4))
        AVL3 --- AVL6((7))
        AVL3 --- AVL7((9))
    end

    subgraph RB["Red-Black Tree"]
        direction TB
        RB1((13)) --- RB2((8))
        RB1 --- RB3((17))
        RB2 --- RB4((1))
        RB2 --- RB5((11))
        RB3 --- RB6((15))
        RB3 --- RB7((25))

        classDef redNode fill:#FF6B6B,stroke:#333,stroke-width:2px,color:#000
        classDef blackNode fill:#2C3E50,stroke:#333,stroke-width:2px,color:#FFF

        class RB1,RB3,RB5 blackNode
        class RB2,RB4,RB6,RB7 redNode
    end

    subgraph BTree["B Tree (Keys + Data in All Nodes)"]
        direction TB
        BT1["[10:data10<br/>20:data20]"] --- BT2["[5:data5<br/>7:data7]"]
        BT1 --- BT3["[15:data15<br/>18:data18]"]
        BT1 --- BT4["[25:data25<br/>30:data30]"]

        classDef bTreeInternal fill:#FFE5B4,stroke:#333,stroke-width:2px,color:#000

        class BT1,BT2,BT3,BT4 bTreeInternal
    end

    subgraph BPlus["B+ Tree (Keys Only in Internal, Data in Leaves)"]
        direction TB
        BP1["[10, 20]"] --- BP2["[5:data5<br/>7:data7]"]
        BP1 --- BP3["[15:data15<br/>18:data18]"]
        BP1 --- BP4["[25:data25<br/>30:data30]"]
        BP2 -.->|linked| BP3
        BP3 -.->|linked| BP4

        classDef leafNode fill:#90EE90,stroke:#333,stroke-width:2px,color:#000
        classDef internalNode fill:#D3D3D3,stroke:#333,stroke-width:2px,color:#000

        class BP2,BP3,BP4 leafNode
        class BP1 internalNode
    end

    BST ~~~ AVL ~~~ RB ~~~ BTree ~~~ BPlus
```
