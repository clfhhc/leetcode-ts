# Divide and Conquer

## Definition

Divide and conquer is a problem-solving technique that involves breaking down a problem into smaller sub-problems, solving each sub-problem independently, and then combining the solutions to the sub-problems to solve the original problem.

## Characteristics

- Dividing the Problem
- Independence of Sub-problems
- Conquering Each Sub-problem
- Combining Solutions

## Applications

- Binary Search
- Quick Sort
- Merge Sort
- Closest Pair of Points
- Strassen's Matrix Multiplication
- Cooley-Tukey Fast Fourier Transform (FFT) Algorithm
- Karatsuba Algorithm for fast multiplication

## Advantages

- Solving difficult problems
- Algorithm efficiency
- Parallelism
- Memory access

## Disadvantages

- Overhead
- Complexity
- Difficulty of implementation
- Memory limitations

## Time and Space Complexity

### Advanced Master Theorem

$T(n) = aT(n/b) + \Theta(n^k (\log n)^p)$

where:

- $n$ = size of the problem
- $a$ = number of sub-problems, $a \geq 1$
- $n/b$ = size of each sub-problem
- $b > 1$, $k \geq 0$, $p \in \mathbb{R}$

#### Case 1: $a > b^k$

- Work to split/recombine the problem is negligible compared to the work to solve the sub-problems
- $T(n) = \Theta(n^{\log_b^a})$

#### Case 2: $a = b^k$

- Work to split/recombine the problem is comparable to the work to solve the sub-problems
  - if $p > -1$, then $T(n) = \Theta(n^{\log_b^a} (\log n)^{p+1})$
  - if $p = -1$, then $T(n) = \Theta(n^{\log_b^a} \log \log n)$
  - if $p < -1$, then $T(n) = \Theta(n^{\log_b^a})$

#### Case 3: $a < b^k$

- Work to split/recombine the problem is more than the work to solve the sub-problems
  - if $p \geq 0$, then $T(n) = \Theta(n^k \log^p n)$
  - if $p < 0$, then $T(n) = \Theta(n^k)$

#### Examples

| Algorithm                    | Recurrence relationship                          | Run time      | Comment                                                                                |
| ---------------------------- | ------------------------------------------------ | ------------- | -------------------------------------------------------------------------------------- |
| Binary search                | $T(n) = T\left(\frac{n}{2}\right) + O(1)$        | $O(\log n)$   | Apply Master theorem case $a = b^k$, where $a = 1, b = 2, k = 0, p = 0$                |
| Binary tree traversal        | $T(n) = 2 T\left(\frac{n}{2}\right) + O(1)$      | $O(n)$        | Apply Master theorem case $a > b^k$, where $a = 2, b = 2, k = 0$                       |
| Optimal sorted matrix search | $T(n) = 2 T\left(\frac{n}{2}\right) + O(\log n)$ | $O(n)$        | Apply the Akra–Bazzi theorem for $p=1$ and $g(u)=\log(u)$ to get $\Theta(2n - \log n)$ |
| Merge sort                   | $T(n) = 2 T\left(\frac{n}{2}\right) + O(n)$      | $O(n \log n)$ | Apply Master theorem case $c = \log_b a$, where $a = 2, b = 2, k = 1, p = 0$           |

#### Limitations

- The Master theorem does not apply to all problems
- The Master theorem does not apply to all recurrence relationships
