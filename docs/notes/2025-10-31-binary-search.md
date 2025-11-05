# Binary Search

## Definition

Binary search is a search algorithm that finds the position of a specific value within an ordered collection.

## Templates

<table>
<tr>
<th>Template #1</th>
<th>Template #2</th>
<th>Template #3</th>
</tr>
<tr>
<td valign="top">

```cpp
// Pre-processing
...
left = 0; right = length - 1;
while (left <= right) {
    mid = left + (right - left) / 2;
    if (nums[mid] == target) {
        return mid;
    } else if(nums[mid] < target) {
        left = mid + 1;
    } else {
        right = mid - 1;
    }
}
...
// right + 1 == left
// No more candidate
```

</td>
<td valign="top">

```cpp
// Pre-processing
...
left = 0; right = length - 1;
while (left < right) {
    mid = left + (right - left) / 2;
    if(nums[mid] < target) {
        left = mid + 1;
    } else {
        right = mid;
    }
}

...
// left == right
// 1 more candidate
// Post-Processing
```

</td>
<td valign="top">

```cpp
// Pre-processing
...
left = 0; right = length - 1;
while (left + 1 < right) {
    mid = left + (right - left) / 2;
    if (num[mid] < target) {
        left = mid;
    } else {
        right = mid;
    }
}

...
// left + 1 == right
// 2 more candidates
// Post-Processing
```

</td>
</tr>
</table>

### Template #1 `left <= right`

- Most basic form
- Search Condition: `nums[mid] == target`
- Post-Processing: none

### Template #2 `left < right`

- An advanced form
- Search Condition: needs to access the element's immediate right neighbor
- Guarantees Search Space: at least 2 elements at each step
- Post-Processing: required, 1 element left

### Template #3 `left + 1 < right`

- An alternative form
- Search Condition: needs to access the element's immediate left and right neighbors
- Guarantees Search Space: at least 3 elements at each step
- Post-Processing: required, 2 elements left

## Time and Space Complexity

- Time Complexity: O(log n)
- Space Complexity: O(1)
